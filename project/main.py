from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_required, current_user
from . import db
from .models import Graph


main = Blueprint('main', __name__)

@main.route('/')
@login_required
def index():
    graphs = Graph.query.filter_by(user_id=current_user.id)
    return render_template('index.html', name=current_user.name, graphs=graphs)


@main.route('/graph')
def graph():
    return render_template('graph.html')


# 'add-graph': endpoint for creating new graph files & adding them to the DB. 
@main.route('/add-graph', methods=['POST'])
@login_required
def add_graph(): 
    filename = request.form['filename']
    
    print('filename: ', filename)
    # TODO: create a graph object and save it to db
    graph = Graph(filename="filname", user_id=current_user.id, graph_text="some text")
    db.session.add(graph)
    db.session.commit()

    return redirect(url_for("main.index"))


@main.route('/profile')
def profile(): 
    return 'Profile'