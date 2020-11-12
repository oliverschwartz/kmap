# kmap

## Setup
From the top level directory, run:
- `source app/flask/bin/activate`
- `pip install -r requirements.txt`
- `export FLASK_APP=project`
- `export FLASK_DEBUG=1`
- `export DATABASE_URL=$(heroku config:get DATABASE_URL -a iw-study-graph)`

To simulate the Procfile configuration locally, run from the top-level directory:
- `heroku local -f Procfile`
