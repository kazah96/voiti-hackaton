import csv
from time import sleep
import numpy
import matplotlib.pyplot
import matplotlib
print("wef")


a = numpy.zeros([3, 2])
a[0, 0] = 1
a[0, 1] = 2
a[1, 0] = 9
a[2, 1] = 12


def show_plot(a):
    matplotlib.pyplot.imshow(a)
    matplotlib.pyplot.waitforbuttonpress(0)


def draw_from_test_set(num):
    input_file = open('datasets/mnist_test_10.csv', mode='r',  newline='')

    spreader = csv.reader(input_file)

    for idx, line in enumerate(spreader):
        # if num == idx:
            image_array = numpy.asfarray(line[1:]).reshape((28, 28))
            show_plot(image_array)


if __name__ == '__main__':
    draw_from_test_set(2)
