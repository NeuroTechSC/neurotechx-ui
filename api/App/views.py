import sqlite3
import time
import random
from random import randrange
from datetime import datetime
import csv
import pandas as pd

from flask import Blueprint, send_file, json, request, current_app
from flask import flash
# from flask_cors import CORS
from sqlalchemy import func
from App import dataProcessing, ml, hardware
from App.models import db, Trial, ModelResponse
from App.service import calculate_accuracy

import App.hardware
import App.dataProcessing
import App.ml

# PORTNUM = ""

blue = Blueprint('blue', __name__)


def init_blueprint(app):
    app.register_blueprint(blueprint=blue)


@blue.route('/question/', methods=['POST', 'GET'])
def get_random_question():
    trial = Trial.query.order_by(func.random()).first()
    # ModelResponse = ModelResponse()
    m = ModelResponse()
    m.trial_number = trial.trial_id
    m.expected_response = m.expected_response
    m.recorded_response = '1'
    m.correct = m.correct
    m.user_id = 0
    db.session.add(m)
    db.session.commit()
    id = db.session.query(func.max(ModelResponse.response_id)).one()[0]
    ID = int(id)
    # print(id)
    return json.jsonify([{'question': trial.question}, {'responseID': ID}])


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


@blue.route('/getPrevQuestion/')
def get_prev_question():
    print(current_app.config['PORTNUMBER'])
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


@blue.route('/recordCorrection/', methods=['POST', 'GET'])
def record_correction():
    q_id = request.args.get('questionid')
    correction = request.args.get('correction')  # True or False
    print(eval(correction))
    if correction and q_id:
        db.session.query(ModelResponse).filter(ModelResponse.response_id == q_id).update(
            {'correct': eval(correction)}
        )
        db.session.commit()
        return 'success'
    else:
        return 'fail', 404
    # return 'aaa'


@blue.route('/getQuestion/', methods=['POST', 'GET'])
def get_question_byid():
    q_id = request.args.get('questionid')
    result = db.session.query(ModelResponse, Trial).filter(ModelResponse.trial_number == Trial.trial_id).filter(
        ModelResponse.response_id == q_id).first()
    if result:
        model, trail = result
        # print(result)
        return json.jsonify({'id': model.response_id,
                             'question': trail.question,
                             'recordedResponse': model.recorded_response,
                             'correct': model.correct,
                             'expectedResponse': model.expected_response
                             })
    return 'fail', 404


@blue.route('/getAccuracy/', methods=['POST', 'GET'])
def get_accuracy():
    result = calculate_accuracy()
    return json.jsonify({'accuracy': result})


@blue.route("/Insert-Correction/<response_id>/")
def update_correct(response_id):
    answer = request.args.get('answer')
    print(answer)

    print(bool(answer))
    # return answer
    db.session.query(ModelResponse).filter(ModelResponse.response_id == response_id).update(
        {"correct": bool(answer)})
    db.session.commit()
    return {"success": 200}


@blue.route("/InsertAnswer/<response_id>/")
def insert_answer(response_id):
    # print(response_id)
    answer = request.args.get('answer')
    db.session.query(ModelResponse).filter(ModelResponse.response_id == response_id).update(
        {"recorded_response": answer})
    db.session.commit()
    print(answer)
    print("aaaa")
    return {"success": 200}


@blue.route('/inputPort/', methods=['POST', 'GET'])
def input_PortNum():
    PORTNUM = request.args.get('PortNum')
    current_app.config['PORTNUMBER'] = PORTNUM
    print("Port Number: " + current_app.config['PORTNUMBER'])
    return json.jsonify({'PortNum': PORTNUM})


@blue.route('/getPort/', methods=['POST', 'GET'])
def get_PortNum():
    PORTNUM = current_app.config['PORTNUMBER']
    print(PORTNUM);
    return json.jsonify({'PortNum': PORTNUM})


@blue.route('/recordSubvocalization/', methods=['POST', 'GET'])
def record_Subvocalization():
    # # TODO: get serial port from POST
    #
    # # Start recording (2 second chunk..)
    port_number = current_app.config['PORTNUMBER']
    # chunk = hardware.recordData(port_number)
    # # chunk = hardware.recordData('/dev/' + PORTNUM)
    # print(chunk.shape)
    # # #
    # # # # Data Processing pipeline (2 second chunk..)
    # chunk = dataProcessing.process(chunk)
    # print(chunk.shape)
    # # #
    # # # # ML Model return 1 or 0
    # prediction = ml.predict(chunk, './ml_model.pt')
    # print(prediction)
    prediction = 0
    trail_id = request.args.get('questionid')
    print(trail_id)
    db.session.query(ModelResponse).filter(ModelResponse.response_id == trail_id).update(
        {"expected_response": prediction})
    db.session.commit()
    # Return yes or no ...
    print("Prediction: " + str(prediction))
    return json.jsonify({'prediction': prediction})
