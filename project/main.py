from flask import Blueprint, render_template
from flask_login import login_required, current_user
from . import db


main = Blueprint('main', __name__)

@main.route('/')
@login_required
def index():
    return render_template('index.html', name=current_user.name)

@main.route('/graph')
def graph():
    return render_template('graph.html')

@main.route('/profile')
def profile(): 
    return 'Profile'