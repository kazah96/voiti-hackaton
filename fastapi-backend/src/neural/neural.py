from copy import copy
import json
from typing import List
import numpy
import scipy.special
import csv
# import .plotting


class NeuralNetwork:
    @staticmethod
    def get_weights(nodes_from, nodes_into):
        return numpy.random.normal(0.0, pow(nodes_from, -0.5), (nodes_from, nodes_into))
        # return numpy.random.rand(nodes_from, nodes_into) - 0.5

    def __init__(self, input_nodes, hidden_nodes, output_nodes, learning_rate) -> None:
        self.input_nodes = input_nodes
        self.hidden_nodes = hidden_nodes
        self.output_nodes = output_nodes
        self.learning_rate = learning_rate
        self.activation_function = lambda x: scipy.special.expit(x)

        # using {rows, columns}
        # 3 rows, 2 columns
        self.weights_input_hidden = NeuralNetwork.get_weights(
            hidden_nodes, input_nodes)
        self.weights_hidden_output = NeuralNetwork.get_weights(
            output_nodes, hidden_nodes)

    def save_model(self, filename):
        data = {
            'input_nodes': self.input_nodes,
            'hidden_nodes': self.hidden_nodes,
            'output_nodes': self.output_nodes,
            'learning_rate': self.learning_rate,
            'weights_input_hidden': self.weights_input_hidden.tolist(),
            'weights_hidden_output': self.weights_hidden_output.tolist()
        }

        with open(filename, mode='w') as file:
            file.write(json.dumps(data))

    def load_model(self, filename):
        with open(filename, mode='r') as file:
            data = json.loads(file.read())

        self.input_nodes = data['input_nodes']
        self.hidden_nodes = data['hidden_nodes']
        self.output_nodes = data['output_nodes']
        self.learning_rate = data['learning_rate']
        self.weights_input_hidden = data['weights_input_hidden']
        self.weights_hidden_output = data['weights_hidden_output']

    def train(self, input_list: List[int], targets_list: List[int]):
        targets = numpy.array(targets_list, ndmin=2).T
        inputs = numpy.array(input_list, ndmin=2).T
        hidden_inputs = numpy.dot(self.weights_input_hidden, inputs)
        hidden_outputs = self.activation_function(hidden_inputs)
        final_inputs = numpy.dot(self.weights_hidden_output, hidden_outputs)
        final_outputs = self.activation_function(final_inputs)

        output_errors = targets - final_outputs

        hidden_errors = numpy.dot(self.weights_hidden_output.T, output_errors)

        self.weights_hidden_output += self.learning_rate * \
            numpy.dot((output_errors * final_outputs *
                      (1.0 - final_outputs)), numpy.transpose(hidden_outputs))

        self.weights_input_hidden += self.learning_rate * \
            numpy.dot(hidden_errors * hidden_outputs *
                      (1.0 - hidden_outputs), numpy.transpose(inputs))

    def query(self, input_list: List[int]):
        hidden_inputs = numpy.dot(self.weights_input_hidden, input_list)

        hidden_outputs = self.activation_function(hidden_inputs)

        final_inputs = numpy.dot(self.weights_hidden_output, hidden_outputs)
        final_outputs = self.activation_function(final_inputs)

        return final_outputs


empty_neural_output = [0.01 for i in range(10)]


def number_to_neural_output(number):
    new_arr = copy(empty_neural_output)
    new_arr[number] = 0.99

    return new_arr


class DigitRecognition:
    @staticmethod
    def load_and_transform_csv(filename: str):
        with open(filename, mode='r') as input_file:
            spreader = csv.reader(input_file)

            for line in spreader:
                line = [int(value) for value in line]
                digit = line[0]

                scaled_values = (numpy.asfarray(
                    line[1:])) / 255.0 * 0.99 + 0.01
                yield (digit, scaled_values)

    def __init__(self) -> None:
        self.train_set = []
        self.test_set = []
        self.network = NeuralNetwork(28*28, 130, 10, 0.2)

    def guess_number(self, bitmap_values: List[int]):
        result = self.network.query(bitmap_values)

        r = max(enumerate(result), key=lambda x: x[1])

        return (r[0], result.tolist())

    def train(self, epochs: int):
        if self.train_set == []:
            raise Exception("Trainset empty")

        for _ in range(epochs):
            for digit, values in self.train_set:
                self.network.train(values, number_to_neural_output(digit))

    def query(self, input_values):
        return self.network.query(input_values)

    def load_test_set(self):
        for record in DigitRecognition.load_and_transform_csv("./datasets/mnist_test_10.csv"):
            self.test_set.append(record)

    def load_train_set(self):
        for record in DigitRecognition.load_and_transform_csv("./datasets/mnist_train.csv"):
            self.train_set.append(record)

# c = NeuralNetwork(2, 15, 3, 0.4)
# print(c.train([1, 2], [1, 1, 1]))

# main = Main()


# main.load_csv()
# main.train_set

# record = main.train_set[0]
# values = record[1]

# image_array = numpy.asfarray(values).reshape((28, 28))
# plotting.show_plot(image_array)
# print('sdf')

def check_validity():
    digit_recognition = DigitRecognition()
    digit_recognition.network.load_model('model.json')

    digit_recognition.load_test_set()

    total_checks = 0
    passes = 0

    for digit, values in digit_recognition.test_set:
        total_checks += 1
        result = digit_recognition.network.query(values)

        r = max(enumerate(result), key=lambda x: x[1])
        if r[0] == digit:
            passes += 1

        # print(f"Expected {digit}, Have {r}")

    print(f"Error {100 - (passes/total_checks*100)}%")


def train(epochs: int):
    digit_recognition = DigitRecognition()
    digit_recognition.load_train_set()
    digit_recognition.train(epochs)
    digit_recognition.network.save_model('model.json')
    # digit_recognition.network.load_model('model.json')


if __name__ == '__main__':
    # train(4)
    check_validity()


    # digit_recognition = DigitRecognition()
    # print("Training")
    # digit_recognition.train()

    # digit_recognition.network.save_model('model.json')

    # digit_recognition.load_test_set()

    # total_checks = 0
    # passes = 0

    # for digit, values in digit_recognition.test_set:
    #     total_checks += 1
    #     result = digit_recognition.network.query(values)

    #     r = max(enumerate(result), key=lambda x: x[1])
    #     if r[0] == digit:
    #         passes += 1

    #     print(f"Expected {digit}, Have {r}")

    # print(f"Error {100 - (passes/total_checks*100)}%")
