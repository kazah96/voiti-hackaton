from time import sleep
from fastapi import FastAPI, File, UploadFile
import numpy
from socketio import AsyncServer
from neural.neural import DigitRecognition
from images.converter import convert_png_to_28bitmap, from_28bitmap_to_array
from neural.plotting import show_plot


def make_endpoints(app: FastAPI, sio: AsyncServer, recognition: DigitRecognition):
    @app.post('/guess_number')
    def guess_number(in_file: bytes = File(...)):
        image = convert_png_to_28bitmap(in_file)
        arr = from_28bitmap_to_array(image)
        image_array = numpy.asfarray(arr).reshape((28, 28))
        show_plot(image_array)

        result = recognition.guess_number(arr.tolist())

        image.save('gdfsg.jpg')

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
