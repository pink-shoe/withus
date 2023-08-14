from flask import Flask, jsonify, request, render_template
from flask_restx import Api, Resource
from PIL import Image
import configparser
from flask_cors import CORS

import tensorflow as tf
from tensorflow.python.keras.utils import np_utils
from keras.datasets import mnist
from keras.models import Sequential
from keras.layers import Dense, Activation
import numpy as np
from numpy import argmax

import torch
from torch import nn
import torch.optim as optim
from torch.utils.data import TensorDataset, DataLoader

import pymysql
import configparser
import base64

import io
import cv2
import time as t

from service import ImagePreProcessService

app = Flask(__name__)
CORS(app)
api = Api(app)

# pyvenv.cfg 파일 부르기
config = configparser.ConfigParser()
config.read('./pyvenv.cfg')

# config 변수 가져오기
main_config = config['MAIN']
mysql_config = config['DATABASE']

# image 전처리 서비스
# __init__ 한번만 불리도록 설정
imageService = ImagePreProcessService.ImagePreProcessService()


@app.route('/ai/receive_capture', methods=['POST'])
def receive_capture():
    if request.method == 'POST':
        data = request.json

        # shapeInfo = getShapeInfo(data.get('shapeId')[0])
        # shapeInfo = data.get('shapeId')[0]
        shapeInfo = int(data['shapeId'])
        img_data = data['image']
        base64_encoded = img_data.split('base64,')[1]
        imgdata = base64.b64decode(base64_encoded)
        # base64_encoded += '=' * (4 - len(base64_encoded) % 4)

        dataBytesIO = io.BytesIO(imgdata)
        image = Image.open(dataBytesIO)

        # image_cv2 = np.array(image)

        image_cv2 = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

        # 이미지 표시
        # cv2.imshow('Captured Image', image_cv2)
        # cv2.waitKey(0)  # 키 입력을 기다림

        # ai model에서 처리 -> isCorrect, correctRate

        skeleton_image = imageService.getPreProcess(image_cv2)
        print(type(skeleton_image))
        # cv2.imshow(cv2.cvtColor(skeleton_image, cv2.COLOR_BGR2GRAY))
        # cv2.waitKey(0)  # 키 입력을 기다림
        
        result = run_model(skeleton_image)
        
        isCorrect = result == shapeInfo
        # correctRate = 80
        shape_list = ["4star", "circle", "pacman", "square", "triangle"]
        
        print(shape_list[shapeInfo])
        print(shape_list[result])
        res = jsonify({
            "isCorrect": isCorrect,
            "result": shape_list[result]
        })
        return res, 200
    return "Invalid request method.", 405


def getShapeInfo(shapeId):
    shape = ()
    try:
        db = pymysql.connect(
            host=mysql_config['host'],
            port=mysql_config['port'],
            user=mysql_config['user'],
            password=mysql_config['password'],
            db=mysql_config['db'],
            charset=mysql_config['charset']
            )

        cursor = db.cursor()

        sql = "select * from shape where shape_id = " + str(shapeId)
        cursor.execute(sql)
        shape = cursor.fetchone()
    except Exception as e:
        print('DB ERROR', e)
    # finally:
    #     db.close()

    return shape

class Flatten(torch.nn.Module):
    def __init__(self):
        super(Flatten, self).__init__()

    def forward(self, x):
        return x.view(-1, 512)


# 추후에 AI 모델 교체할 것
def run_model(skeleton_image):
    model_path = './Include/model/model.pt'
    device=torch.device("cpu")
    # model = tf.keras.models.load_model('venv/Include/model/mnist_mlp_model.h5')
    model = torch.nn.Sequential(
        torch.nn.Conv2d(1, 16, (5, 5)),
        torch.nn.MaxPool2d(2),
        torch.nn.ReLU(),
        torch.nn.Dropout(),
        torch.nn.Conv2d(16, 32, (5, 5)),
        torch.nn.MaxPool2d(2),
        torch.nn.ReLU(),
        torch.nn.Dropout(),
        Flatten(),
        torch.nn.Linear(512, 256),
        torch.nn.ReLU(),
        torch.nn.Dropout(),
        torch.nn.Linear(256, 5),
    )
    
    model.to(device)
    # cpu로 바꾸기
    model.load_state_dict(torch.load(model_path, map_location=device))
    
    # 모델 학습을 다시 하지 않는다
    model.eval()
    
    # pred = model(skeleton_image)
    # _, pred_label = torch.max(pred.data, 1)
    # answer = pred_label[0].item ()

    # Convert numpy array to torch.Tensor
    # skeleton_image = cv2.cvtColor(skeleton_image, cv2.COLOR_BGR2GRAY)
    skeleton_image_tensor = torch.tensor(cv2.cvtColor(skeleton_image, cv2.COLOR_BGR2GRAY), dtype=torch.float32)
    skeleton_image_tensor = skeleton_image_tensor.unsqueeze(0)  # Add batch dimension
    
    skeleton_image_tensor = skeleton_image_tensor.to(device)
    
    with torch.no_grad():
        pred = model(skeleton_image_tensor)
        _, pred_label = torch.max(pred.data, 1)
        answer = pred_label[0].item()
    
    return answer

if __name__ == '__main__':
    app.debug = True
    app.run()
