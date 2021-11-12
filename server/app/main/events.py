from .. import socketio, login_manager
import functools
from flask import request
from flask_login import current_user
from flask_socketio import disconnect, emit


def authenticated_only(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if not current_user.is_authenticated:
            emit('forbiden', {'data': "Can't access"})
            disconnect()
        else:
            return f(*args, **kwargs)
    return wrapped

@login_manager.user_loader
def load_user(user_id):
    return None

#Обработчики событий


@socketio.on('connect')
def handle_connection(connection):
    print(f"Connected: {connection}")

@socketio.on('message')
@authenticated_only
def handle_message(data):
    print(f"Recive message: {data}")

@socketio.on('ping')
def handle_ping(ping):
    socketio.emit('pong', {'data':'pong'})



