# kmap

## Setup
From the top level directory, run:
- `export FLASK_APP=project`
- `export DEBUG=1`
- `rm project/db.sqlite`

Then, run a Python shell in the top level directory and run the following commands: 
- `from project import db, create_app`
- `db.create_all(app=create_app())`
