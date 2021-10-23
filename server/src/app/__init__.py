from flask import Flask
from flask_socketio import SocketIO
import sys
from pathlib import Path
path_dir = Path(__file__).parent.parent
sys.path.append(path_dir.__str__())
from config import Config

socketio = SocketIO()

def create_app(config_class=Config, debug=False):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.debug = app.config['DEBUG'] or debug
    # import logging
    # logging.basicConfig(filename='error.log',level=logging.DEBUG)
    socketio.init_app(app)
    return app

app = create_app()