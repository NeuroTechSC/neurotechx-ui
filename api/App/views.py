import sqlite3
import time
import random
from random import randrange
from datetime import datetime
import csv
import pandas as pd

from flask import Blueprint, send_file, json
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
    return json.jsonify({'question': trial.question})


@blue.route('/convertData')
def convert_db():
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
