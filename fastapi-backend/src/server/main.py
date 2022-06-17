import os
from time import sleep
from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from .endpoints import make_endpoints
from neural.neural import DigitRecognition

import socketio

app = FastAPI()
sio = socketio.AsyncServer(async_mode='asgi')
ws_app = socketio.ASGIApp(sio)


recognition = DigitRecognition()
print(os.path.realpath(__file__))
# print(os.environ['PYTHONPATH'])
recognition.network.load_model("src/models/model.json")

make_endpoints(app, sio, recognition)


async def root(scope, recieve, send):
    path = scope.get("path")
    chosen = ws_app

    print(path)
    if not (path is None or path.startswith('/socket.io')):
        chosen = app

    return await chosen(scope, recieve, send)
