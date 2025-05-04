import csv
import json

data = None

with open('backend/data/coursesJSON.csv', 'r') as f:
    reader = csv.DictReader(f)
    data = [row for row in reader]

with open('courses.json', 'w') as f:
    json.dump(data, f, indent=2)