from datetime import datetime
from urllib import parse
from flask import Blueprint, render_template, request, redirect, url_for, jsonify, flash
from flask_login import login_required, current_user
from . import db
from .models import Graph, Node


main = Blueprint('main', __name__)

@main.route('/')
def index():
    # Landing page for anonymous user
    if not current_user.is_authenticated:  
        print("index: current user not authenticated")
        return render_template('index-anon.html')
    
    # Landing page for signed-in user
    graphs = Graph.query.filter_by(user_id=current_user.id).order_by(Graph.filename)
    return render_template('index.html', name=current_user.name, graphs=graphs)

@main.route('/login')
def login():
    return render_template('login.html')

@main.route('/signup')
def signup():
    return render_template('signup.html')

@main.route('/graph')
def graph():
    return render_template('graph.html')

''' 'add-graph': endpoint for creating new graph files & adding them to the DB. '''
@main.route('/graph-add', methods=['POST'])
@login_required
def graph_add(): 
    filename = request.form['filename']

    # Check if a graph with this name already exists.
    g = Graph.query.filter_by(filename=filename, user_id=current_user.id)
    if g.first() is not None: 
        flash("This file name is already taken.")

    # Create a graph object and save it to db
    else: 
        g = Graph(filename=filename, user_id=current_user.id, graph_text='[]', last_opened=datetime.today())
        db.session.add(g)
        db.session.commit()

    return redirect(url_for("main.index"))


''' 'graph-load': load a specific graph from the index page. '''
@main.route('/graph-load', methods=['GET'])
def graph_load(): 

    if not current_user.is_authenticated: 
        return redirect(url_for("auth.login"))

    graph_id = request.args.get('graph_id')

    # Retrieve graph object from database.
    g = Graph.query.filter_by(id=graph_id)
    if g.first() is None: 
        print("Could not retrieve such graph.")
        return redirect(url_for("main.index"))

    # Update access time. 
    g.first().last_opened = datetime.today()
    db.session.commit()

    return render_template('graph.html', graph_id=graph_id)


''' 'graph-delete': delete the specified graph from the database. '''
@main.route('/graph-delete', methods=['GET'])
@login_required
def graph_delete(): 
    graph_id = request.args.get('graph_id')
    
    # Retrieve graph object from database and delete it.
    g = Graph.query.filter_by(id=graph_id)
    if g.first() is None: print("Could not retrieve such graph.")
    db.session.delete(g[0])
    db.session.commit()
    return redirect(url_for("main.index"))


''' 'graph-rename': rename the specified graph. '''
@main.route('/graph-rename', methods=['POST'])
@login_required
def graph_rename(): 
    graph_id = request.args.get('graph_id')
    new_filename = request.form['new_filename']
    print(new_filename)

    # Retrive the graph object and rename it. 
    g = Graph.query.filter_by(id=graph_id)[0]
    if g is None: print("Could not retrieve such graph.")
    g.filename = new_filename
    db.session.commit()
    return redirect(url_for("main.index"))


''' 'graph-content': Retrieve the encoded graph from the database. '''
@main.route('/graph-content', methods=['POST'])
@login_required
def graph_content():
    graph_id = request.form['graph_id']
    g = Graph.query.filter_by(id=graph_id)[0]
    return g.graph_text


''' 'graph-save': save a graph to the DB. Called from Javascript (terminal-view.js).'''
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

### TODO: make this authenticated
''' Load a markdown editor for a particular node. '''
@main.route('/markdown', methods=['GET'])
def markdown(): 
    return render_template('markdown.html')


''' Save a node's markdown editor content to the database. '''
@main.route('/node-save', methods=['POST'])
def node_save(): 

    # Retrieve the graph id, node title, content from the request. 
    graph_id = request.args.get('graph_id')
    node_title = parse.unquote(request.args.get('node_id'))
    markdown_text = request.form['markdown_text']

    # If this node doesn't exist in the database, create it. 
    n = Node.query.filter_by(graph_id=graph_id, node_title=node_title)
    if n.first() is None: 
        n = Node(graph_id=graph_id, node_title=node_title, content=markdown_text)
        db.session.add(n)
    
    # Otherwise, update the existing node. 
    else: 
        n.first().content = markdown_text
    
    db.session.commit()
    return 'Ok'


''' 'node-load': Retrieve the content of a node from the database. '''
@main.route('/node-load', methods=['POST'])
def node_load():
    graph_id = request.form['graph_id']
    node_title = request.form['node_id']
    n = Node.query.filter_by(graph_id=graph_id, node_title=node_title)[0]
    return n.content 