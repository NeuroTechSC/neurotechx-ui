from flask_sqlalchemy import SQLAlchemy

from App.ext import db


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(16))
    pass


class Trail(db.Model):
    trail_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(50))
    word = db.Column(db.String(50))


class ModelResponse(db.Model):
    response_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer)
    trial_number = db.Column(db.Integer)
    recorded_response = db.Column(db.String(50))
    expected_response = db.Column(db.String(50))
    correct = db.Column(db.Boolean)
