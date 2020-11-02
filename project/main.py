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
@main.route('/dummy', methods=["POST"])
@login_required
def dummy():
    g = Graph.query.filter_by(id=4)[0]
    return g.graph_text


@main.route('/graph', methods=['POST'])
@login_required
def graph():
    graph_id = request.form['graph_id']

    # Retrieve graph object from database. 
    g = Graph.query.filter_by(id=graph_id)[0]
    if g is None: print("Could not retrieve such graph.")
    json = g.graph_text
    return render_template('graph.html', json=json)


# 'add-graph': endpoint for creating new graph files & adding them to the DB. 
@main.route('/add-graph', methods=['POST'])
@login_required
def add_graph(): 
    filename = request.form['filename']
    
    print('filename: ', filename)
    # TODO: create a graph object and save it to db
    graph = Graph(filename="filname", user_id=current_user.id, graph_text='[{"dependencies":[],"summary":"Machinelearning(ML)isthestudyofcomputeralgorithmsthatimproveautomaticallythroughexperience.","id":"MachineLearning","title":"MachineLearning"},{"dependencies":[],"summary":"NaiveBayesclassifiersareafamilyofsimpleprobabilisticclassifiersbasedonapplyingBayestheoremwithstgBayestheoremwithstrong(naïve)independenceassumptionsbetweenthefeatures.TheyareamongthesimplestBayesiannetworkmodels.","id":"NaiveBayes","title":"NaiveBayes"}]')
    db.session.add(graph)
    db.session.commit()

    return redirect(url_for("main.index"))


@main.route('/profile')
def profile(): 
    return 'Profile'