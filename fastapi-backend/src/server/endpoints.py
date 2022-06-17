from time import sleep
from fastapi import FastAPI, File, UploadFile
import numpy
from pydantic import BaseModel
from socketio import AsyncServer
from neural.neural import DigitRecognition
from images.converter import convert_png_to_28bitmap, from_28bitmap_to_array
from neural.plotting import show_plot
import requests


# TODO: разобраться с Body параметрами для fastapi
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

    @sio.event
    def connect(a, b, c):
        print("User has been connected via websocket")

    @sio.on("websocket_test_event")
    async def websocket_test_event(sid, data):
        print("Inited websocket_test_event", sid, data)

        await sio.emit("websocket_test_event", "Workds")

        return "Is it possible"
