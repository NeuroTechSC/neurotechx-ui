from flask_sqlalchemy import SQLAlchemy

from App.ext import db


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(16))
    email = db.Column(db.String(320), primary_key=True)
    password = db.Column(db.String(30))
    authenticated = db.Column(db.Boolean, default=False)

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def is_authenticated(self):
        return self.authenticated

    def get_id(self):
        return self.user_id
    pass


class Trial(db.Model):
    trial_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(50))


class ModelResponse(db.Model):
    response_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer)
    trial_number = db.Column(db.Integer)
    recorded_response = db.Column(db.String(50))
    expected_response = db.Column(db.String(50))
    correct = db.Column(db.Boolean)
