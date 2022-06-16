import io
from PIL import Image
from PIL import ImageOps
import numpy


def convert_png_to_28bitmap(image_bytes: bytes) -> Image.Image:
    image = Image.open(io.BytesIO(image_bytes))
    image = ImageOps.grayscale(image)
    image = image.resize((28, 28))

    return image

    image.save("fsdf.bmp")


def from_28bitmap_to_array(image: Image.Image) -> numpy.ndarray:
    return numpy.asarray(image).flatten()


if __name__ == '__main__':
    with open('./image.jpg', mode='rb') as file:
        b = file.read()
        convert_png_to_28bitmap(b)
