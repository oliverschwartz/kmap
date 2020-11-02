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

# Retrieve a hard-coded graph. 
# TODO: parse the id from the post request.
@main.route('/graph-content', methods=['POST'])
@login_required
def graph_content():
    graph_id = request.form['graph_id']
    g = Graph.query.filter_by(id=graph_id)[0]

    print(g.graph_text)

    return g.graph_text


@main.route('/graph-load', methods=['POST'])
@login_required
def graph_load():
    graph_id = request.form['graph_id']

    # Retrieve graph object from database. 
    g = Graph.query.filter_by(id=graph_id)[0]
    if g is None: print("Could not retrieve such graph.")
    return render_template('graph.html', graph_id=graph_id)


# 'add-graph': endpoint for creating new graph files & adding them to the DB. 
@main.route('/graph-add', methods=['POST'])
@login_required
def graph_add(): 
    filename = request.form['filename']
    
    # TODO: create a graph object and save it to db
    g = Graph(filename=filename, user_id=current_user.id, graph_text='[{"dependencies":[],"summary":"Machinelearning(ML)isthestudyofcomputeralgorithmsthatimproveautomaticallythroughexperience.","id":"MachineLearning","title":"MachineLearning"},{"dependencies":[],"summary":"NaiveBayesclassifiersareafamilyofsimpleprobabilisticclassifiersbasedonapplyingBayestheoremwithstgBayestheoremwithstrong(naïve)independenceassumptionsbetweenthefeatures.TheyareamongthesimplestBayesiannetworkmodels.","id":"NaiveBayes","title":"NaiveBayes"}]')
    db.session.add(g)
    db.session.commit()

    return redirect(url_for("main.index"))

@main.route('/graph-save', methods=['POST'])
@login_required
def graph_save(): 
    graph_text = str(request.form['graph_text'])
    graph_id = int(request.form['graph_id'])

    # Get this graph from the database; update it; save it. 
    g = Graph.query.filter_by(id=graph_id)[0]
    g.graph_text = graph_text
    db.session.commit()

    print(graph_text)

    return render_template('graph.html', graph_id=graph_id)


@main.route('/profile')
def profile(): 
    return 'Profile'