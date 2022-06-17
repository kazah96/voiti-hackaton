import csv
import sys

print(sys.argv)


def make_reduced_dataset(input_file_name: str, output_file_name: str, count: int):
    input_file = open('datasets/'+input_file_name, mode='r',  newline='')
    output_file = open('datasets/'+output_file_name, mode='w', newline='')

    spreader = csv.reader(input_file)
    spwriter = csv.writer(output_file)

    for idx, line in enumerate(spreader):
        spwriter.writerow(line)
        if idx == count:
            break

    input_file.close()
    output_file.close()


if __name__ == "__main__":
    input_filename = sys.argv[1]
    output_filename = sys.argv[2]
    counts = int(sys.argv[3])

    make_reduced_dataset(input_filename, output_filename, counts)
