from flask import Flask, jsonify, request, render_template
from PIL import Image
import configparser
from flask_cors import CORS
import numpy as np

import time

import traceback
import base64

import io
import cv2

import logging
import os

if not os.path.isdir('logs'):
    os.mkdir('logs')

logging.getLogger('werkzeug').disabled = True
logging.basicConfig(filename="logs/server.log", level=logging.DEBUG
                    , datefmt='%Y/%m%d %H:%M:%S'
                    , format = '%(asctime)s:%(levelname)s:%(message)s')

from service import ImagePreProcessService, ImageMatchService, DataBaseService

app = Flask(__name__)
#CORS 설정
CORS(app)

# image preprocessing service
imageService = ImagePreProcessService.ImagePreProcessService()
# image predict service
predictService = ImageMatchService.Model()
# database connection service
DataBaseConnection = DataBaseService.MySqlConnection()

@app.route('/ai/predict/', methods=['POST'], strict_slashes=False)
def receive_capture():
    app.logger.info(f'[{request.method}] {request.path}')
    if request.method == 'POST':
        try:
            data = request.json
            roomId = int(data['roomId'])
            img_data = data['image']
            shapeId = int(data['shapeId'])
            current_round = int(data['currentRound'])
            base64_encoded = img_data.split('base64,')[1]
            imgdata = base64.b64decode(base64_encoded)
            dataBytesIO = io.BytesIO(imgdata)
            image = Image.open(dataBytesIO)
            
            app.logger.info(f'[roomId] {roomId}')
            app.logger.info(f'[image] {type(image)}')
            app.logger.info(f'[shapeId] {shapeId}')
            app.logger.info(f'[current_round] {current_round}')
            
            t = time.time()
            
            image_cv2 = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            app.logger.info(f'[image process start]')
            skeleton_image = imageService.getPreProcess(image_cv2)
            app.logger.info(f'[image process end]')
            app.logger.info(f'[classification start]')
            # ai model에서 처리 -> isCorrect, correctRate
            result_index, result_shape = predictService.getAnswer(skeleton_image)
            app.logger.info(f'[classification end]')
            
            app.logger.info(f'[process time] {time.time() - t}')
            isCorrect = (result_index == shapeId)
            
            
            # db 저장
            game_result = {
                'is_correct': isCorrect,
                'round': current_round,
                'prediction': result_index,
                'room_id': roomId,
                'answer': shapeId,
            }
            # print(type(game_result))
            result_string, http_code = DataBaseConnection.insert_into_game_result(game_result)
            
            return result_string, http_code
        except Exception as e:
            traceback.print_exc()
            return "Bad Request" , 400
    return "Invalid Request Method.", 405


if __name__ == '__main__':
    app.logger.info("server on :: PORT="+str('5000'))
    app.run()
