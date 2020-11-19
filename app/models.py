from datetime import datetime
from flask_login import UserMixin
from . import db

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))

class Graph(db.Model): 
    __tablename__ = 'graphs'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    filename = db.Column(db.String(50))
    last_opened = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    graph_text = db.Column(db.String())

class Node(db.Model): 
    __tablename__ = 'nodes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    graph_id = db.Column(db.Integer, db.ForeignKey('graphs.id'))
    node_title = db.Column(db.String())
    content = db.Column(db.String()) 