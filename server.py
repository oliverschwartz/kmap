""" server.py """
from flask import Flask, render_template, jsonify

app = Flask(__name__, static_url_path="")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/graph/")
def graph(): 
    return render_template("main.html")

if __name__ == "__main__":
    app.run(port=8000, debug=True)