from flask import Flask, jsonify, request
# from flask_restx import Api
import tensorflow as tf
from PIL import Image

from tensorflow.python.keras.utils import np_utils
from keras.datasets import mnist
from keras.models import Sequential
from keras.layers import Dense, Activation
import numpy as np
from numpy import argmax

import pymysql
import configparser

import os

app = Flask(__name__)

# api = Api(app)

config = configparser.ConfigParser()
config.read('pyvenv.cfg')

@app.route('/ai/receive_capture', methods=['POST'])
def receive_capture():
    if request.method == 'POST':
        data = request.json

        shapeInfo = getShapeInfo(data.get('shapeId')[0])

        print('-----image 전---------')
        if 'image' in request.files:
            image = request.files['image']
            image.save(os.path.join('static', 'doggggg.jfif'))
            print("---- image 중 -------")
        print('----- image 후-------')
        # ai model에서 처리 -> isCorrect, correctRate
        isCorrect = True
        correctRate = 80

        predication = run_model()

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
            host='connectwithus.site',
            port=3306,
            user='withus',
            password='withus',
            db='withus',
            charset='utf8')

        cursor = db.cursor()

        sql = "select * from shape where shape_id = " + str(shapeId)
        cursor.execute(sql)
        shape = cursor.fetchone()
    except Exception as e:
        print('DB ERROR', e)
    finally:
        db.close()

    return shape

# 추후에 AI 모델 교체할 것
def run_mode():
    model = tf.keras.models.load_model('venv/Include/model/mnist_mlp_model.h5')

    # input data
    (x_train, y_train), (x_test, y_test) = mnist.load_data()
    x_test = x_test.reshape(10000, 784).astype('float32') / 255.0
    y_test = np_utils.to_categorical(y_test)
    xhat_idx = np.random.choice(x_test.shape[0], 5)
    xhat = x_test[xhat_idx]

    prediction = model.predict(xhat)

    for i in range(5):
        print('True : ' + str(argmax(y_test[xhat_idx[i]])) + ', Predict : ' + str(prediction[i]))

    return prediction

if __name__ == '__main__':
    app.run()
