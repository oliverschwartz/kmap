from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from flask_login import login_required, current_user
from . import db
from .models import Graph


main = Blueprint('main', __name__)

@main.route('/')
@login_required
def index():
    graphs = Graph.query.filter_by(user_id=current_user.id)
    return render_template('index.html', graphs=graphs)


# 'add-graph': endpoint for creating new graph files & adding them to the DB. 
@main.route('/graph-add', methods=['POST'])
@login_required
def graph_add(): 
    filename = request.form['filename']
    
    # TODO: create a graph object and save it to db
    g = Graph(filename=filename, user_id=current_user.id, graph_text='[]')
    db.session.add(g)
    db.session.commit()

    return redirect(url_for("main.index"))


# 'graph-load': load a specific graph from the index page. 
@main.route('/graph-load', methods=['GET'])
@login_required
def graph_load(): 
    graph_id = request.args.get('graph_id')

    # Retrieve graph object from database. 
    g = Graph.query.filter_by(id=graph_id)[0]
    if g is None: print("Could not retrieve such graph.")
    return render_template('graph.html', graph_id=graph_id)


# Retrieve the encoded graph from the database. 
@main.route('/graph-content', methods=['POST'])
@login_required
def graph_content():
    graph_id = request.form['graph_id']
    g = Graph.query.filter_by(id=graph_id)[0]
    return g.graph_text


# 'graph-save': save a graph to the DB. Called from Javascript (terminal-view.js).
@main.route('/graph-save', methods=['POST'])
@login_required
def graph_save(): 
    graph_text = str(request.form['graph_text'])
    graph_id = int(request.form['graph_id'])

    # Get this graph from the database; update it; save it. 
    g = Graph.query.filter_by(id=graph_id)[0]
    g.graph_text = graph_text
    db.session.commit()

    # This should not change the rendered view. 
    return "Ok"
