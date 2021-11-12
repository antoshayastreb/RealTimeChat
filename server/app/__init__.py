from flask import Flask
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from config import Config
import uuid

socketio = SocketIO()
db:SQLAlchemy
login_manager = LoginManager()

def create_app(config_class=Config, debug=False):
    app = Flask(__name__)

    #Конфигурация приложения на основе класса Config
    app.config.from_object(config_class)
    app.debug = app.config['DEBUG'] or debug
    app.config['SECRET_KEY'] = str(uuid.uuid4())
    # import logging
    # logging.basicConfig(filename='error.log',level=logging.DEBUG)
    
    #Инициализация flask-login
    login_manager.init_app(app)

    #Инициализация базы данных
    db = SQLAlchemy(app)

    #Регистрация Blueprint'ов
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    #Инициализация socket-io
    socketio.init_app(app)

    return app

app = create_app()