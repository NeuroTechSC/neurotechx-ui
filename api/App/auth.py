from flask import Blueprint, redirect, flash, request, url_for
from flask_login import login_required, logout_user, current_user, login_user

from App.models import db, User
from App.ext import login_manager

auth = Blueprint('auth', __name__)


def init_bp(app):
    app.register_blueprint(blueprint=auth)


@auth.route('/register,', methods=['POST', 'GET'])
def register():
    email = request.form.get('email')
    password = request.form.get('password')
    name = request.form.get('name')

    user = User.query.filter_by(email=email).first()

    if user is not None:
        flash('There is already an account associated with that address')
        redirect(url_for('register'))
    else:
        user = User(name=name, email=email, password=password)
        flash('Registration successful.')
        return redirect(url_for('login'))


@auth.route('/login/', methods=['POST', 'GET'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')

    user = User.query.filter_by(email=email).first()

    if user is None:
        flash('The email address entered is not associated with an account')
        return redirect(url_for('login'))
    elif user.password != password:
        flash('The email or password entered is not correct, please try again.')
        return redirect(url_for('login'))
    else:
        login_user(user)
        current_user.authenticated = True
        return redirect(url_for('index'))


@auth.route('/logout/', methods=['Post', 'GET'])
@login_required
def logout():
    current_user.authenticated = False
    logout_user()
    flash('You are now logged out.')
    return redirect(url_for('login'))


@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


@login_manager.unauthorized_handler
def unauthorized():
    flash('Please log in in order to view this page.')
    return redirect(url_for('auth.login'))
