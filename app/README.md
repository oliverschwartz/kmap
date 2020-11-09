# kmap

## Setup
From the top level directory, run:
- `export FLASK_APP=project`
- `export FLASK_DEBUG=1`
- `rm project/db.sqlite`

Then, run a Python shell in the top level directory and run the following commands: 
- `from project import db, create_app`
- `db.create_all(app=create_app())`

To simulate the Procfile configuration locally, run from the top-level directory:
- `export DATABASE_URL=$(heroku config:get DATABASE_URL -a iw-study-graph)`
- `heroku local -f Procfile`