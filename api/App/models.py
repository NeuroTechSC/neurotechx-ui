from flask_sqlalchemy import SQLAlchemy

from App.ext import db


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(16))
    pass


class Trial(db.Model):
    trial_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(50))


class ModelResponse(db.Model):
    response_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer)
    trial_number = db.Column(db.Integer)
    recorded_response = db.Column(db.Integer,db.ForeignKey('answer.answer_id'))
    expected_response = db.Column(db.Integer,db.ForeignKey('answer.answer_id'))
    correct = db.Column(db.Boolean)


class Answer(db.Model):
    answer_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    trail_number = db.Column(db.Integer, db.ForeignKey('trial.trial_id'))
    answer = db.Column(db.String(100))
    correction = db.Column(db.Boolean)
