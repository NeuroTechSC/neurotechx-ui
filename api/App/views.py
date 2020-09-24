import sqlite3
import time
import random
from random import randrange
from datetime import datetime
import csv
import pandas as pd

import hardware

from flask import Blueprint, send_file, json, request
from sqlalchemy import func

from App.models import db, Trial, ModelResponse

blue = Blueprint('blue', __name__)


def init_blueprint(app):
    app.register_blueprint(blueprint=blue)


@blue.route('/question/', methods=['POST', 'GET'])
def get_random_question():
    trial = Trial.query.order_by(func.random()).first()
    # ModelResponse = ModelResponse()
    m = ModelResponse()
    m.trial_number = trial.trial_id
    m.expected_response = '1'
    m.recorded_response = '1'
    m.correct = False
    m.user_id = 0
    db.session.add(m)
    db.session.commit()
    id = db.session.query(func.max(ModelResponse.response_id)).one()[0]
    # print(id)
    return json.jsonify([{'question': trial.question}, {'responseID': id}])


@blue.route('/convertData')
def convert_db():
    result = db.session.query(ModelResponse, Trial).filter(ModelResponse.trial_number == Trial.trial_id).all()
    data = []
    for r in result:
        model, trail = r
        temp = {'id': model.response_id,
                'question': trail.question,
                'response': model.recorded_response,
                'correct': model.correct,
                'time': time.time()
                }
        data.append(temp)
    df = pd.DataFrame(data)
    # print(df)
    df.to_csv('api/database.csv')
    # print(data)
    return 'database.csv'


@blue.route('/csv/', methods=['POST', 'GET'])
def download_csv():
    return send_file("../database.csv", as_attachment=True)


@blue.route('/time/')
def get_current_time():
    return json.jsonify({'time': time.time()})


@blue.route('/create/')
def create_db():
    db.create_all()
    return 'success'


@blue.route('/addquestion/')
def insert_question():
    ran = ['Do you believe in ghosts?',
           'Have you ever seen a UFO?',
           'Can cats jump six times their length?',
           'Do you like chocolate milkshakes?',
           'Were you in the swamp yesterday?',
           'Did you see Bigfoot?',
           'Can you see the moon?',
           'Do you know how to swim?',
           'Can you play poker?',
           'Do you have a twin?',
           'Were you born in the summer?',
           'Do you believe in Santa Claus?',
           'Can you make yourself disappear?',
           'Were you on Survivor last year?',
           'Do you know the Schrödinger equation of quantum theory?',
           'Do mice really eat cheese?',
           'Is your shoe size 14?',
           'Can you see out the back of your head?',
           'Are Martians really green?',
           'Have elves always live at the North Pole?']
    for question in ran:
        q = Trial()
        q.question = question
        q.word = 'y/n'
        db.session.add(q)
        db.session.commit()
    return 'add success'


@blue.route('/getPrevQuestion/')
def get_prev_question():
    ret = []
    result = db.session.query(ModelResponse, Trial).join(Trial, ModelResponse.trial_number == Trial.trial_id).all()
    for r in result:
        print(r)
        model, trail = r
        temp = {'id': model.response_id,
                'question': trail.question,
                'recordedResponse': model.recorded_response,
                'correct': model.correct,
                'time': time.time(),
                'expectedResponse': model.expected_response
                }
        print(temp)
        ret.append(temp)
    return json.jsonify(ret)


@blue.route('/recordAnswer/', methods=['POST', 'GET'])
def record_answer():
    qaram = request.args
    trail_id = qaram.get('questionid')
    record_response = qaram.get('answer')
    if trail_id and record_response:
        print(trail_id)
        db.session.query(ModelResponse).filter(ModelResponse.response_id == trail_id).update(
            {"recorded_response": record_response})
        db.session.commit()
    else:
        return 'fail', 404
    return 'success'


@blue.route('/recordSubvocalization/', methods=['POST', 'GET'])
def record_Subvocalization():

    # Start recording (2 second chunk..)


    data = hardware.returnData(board_id, args)

    # Data Processing pipeline (2 second chunk..)

    # ML Model return 1 or 0

    # Return yes or no ...
