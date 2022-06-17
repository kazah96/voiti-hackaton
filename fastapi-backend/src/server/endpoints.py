from time import sleep
from fastapi import FastAPI, File, UploadFile
import numpy
from pydantic import BaseModel
from socketio import AsyncServer
from neural.neural import DigitRecognition
from images.converter import convert_png_to_28bitmap, from_28bitmap_to_array
from neural.plotting import show_plot
import requests


# class GuessnumberModel(BaseModel):
#     name: str
#     description: str | None = None
#     price: float
#     tax: float | None = None

class Item(BaseModel):
    file_url: str


def make_endpoints(app: FastAPI, sio: AsyncServer, recognition: DigitRecognition):
    @app.post('/guess_number')
    def guess_number(in_file: bytes = File(...)):
        image = convert_png_to_28bitmap(in_file)
        arr = from_28bitmap_to_array(image)
        result = recognition.guess_number(arr.tolist())
        return result

    @app.post('/guess_number_by_url')
    def guess_number_by_url(item: Item):
        if item.file_url:
            in_file = requests.get(item.file_url)

        image = convert_png_to_28bitmap(in_file.content)
        arr = from_28bitmap_to_array(image)
        result = recognition.guess_number(arr.tolist())
        return result

    @app.post('/save_file')
    def save_file(in_file: bytes = File(...)):

        return "got it"

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
