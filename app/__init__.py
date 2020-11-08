from flask import Flask
from config import Config
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

# init SQLAlchemy so we can use it later in our models
db = SQLAlchemy()

def create_app():
    flaskapp = Flask(__name__, static_url_path="")

    flaskapp.config['SECRET_KEY'] = Config.SECRET_KEY
    flaskapp.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI

    db.init_app(flaskapp)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(flaskapp)

    from .models import User

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return User.query.get(int(user_id))

    # blueprint for auth routes in our app
    from .auth import auth as auth_blueprint
    flaskapp.register_blueprint(auth_blueprint)

    # blueprint for non-auth parts of app
    from .main import main as main_blueprint
    flaskapp.register_blueprint(main_blueprint)

    return flaskapp
