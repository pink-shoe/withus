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

import pymysql
import configparser
import base64

import io
import cv2

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

        shapeInfo = getShapeInfo(data.get('shapeId')[0])

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
        isCorrect = True
        correctRate = 80

        skeleton_image = imageService.getPreProcess(image_cv2)
        # cv2.imshow(skeleton_image)
        # cv2.waitKey(0)  # 키 입력을 기다림

        run_model(skeleton_image)

        res = jsonify({
            "isCorrect": isCorrect,
            "correctRate": correctRate
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

# 추후에 AI 모델 교체할 것
def run_model(skeleton_image):
    # model = tf.keras.models.load_model('venv/Include/model/mnist_mlp_model.h5')
    # cpu로 바꾸기
    model = torch.load('./Include/model/model.pt')

    # input data
    # (x_train, y_train), (x_test, y_test) = mnist.load_data()
    # x_test = x_test.reshape(10000, 784).astype('float32') / 255.0
    # y_test = np_utils.to_categorical(y_test)
    # xhat_idx = np.random.choice(x_test.shape[0], 5)
    # xhat = x_test[xhat_idx]

    prediction = model.predict(skeleton_image)

    print("-----------------------")
    print(prediction)
    # for i in range(5):
    #     print('True : ' + str(argmax(y_test[xhat_idx[i]])) + ', Predict : ' + str(prediction[i]))

    return prediction

if __name__ == '__main__':
    app.debug = True
    app.run()
