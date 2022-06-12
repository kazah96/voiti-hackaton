from time import sleep
from fastapi import FastAPI
import socketio

app = FastAPI()

sio = socketio.AsyncServer(async_mode='asgi')
ws_app = socketio.ASGIApp(sio)

ggg = {
    "a": 10
}


@app.get("/eaq")
async def h():
    return {'as': 123}


@app.get("/api/")
async def root():
    return ggg


@app.get("/q")
def ggf():
    for i in range(5):
        print(i)
        sleep(1)

    return {"m": "done"}


@sio.event
def connect(a, b, c):
    print("ddw")


@sio.on("eve")
async def eve(sid, data):
    print("Eve", sid, data)

    ggg["a"] += 1
    await sio.emit("aaa", "ddf")
    return "sdfsdf"
    # await sio.send("sdfsdf", to=sid)


async def root(scope, recieve, send):
    path = scope.get("path")
    chosen = ws_app

    print(path)
    if not (path is None or path.startswith('/socket.io')):
        chosen = app

    return await chosen(scope, recieve, send)
