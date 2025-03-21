from flask import Flask, render_template, jsonify
from Models import *

app = Flask(__name__)

'''
json({
'subject': subject
'number': number
'course': name
})
'''

@app.route('/', methods=['GET'])
def home():
    l = Sbert("First course in calculus and analytic geometry; basic techniques of differentiation and integration with applications including curve sketching; antidifferentation, the Riemann integral, fundamental theorem, exponential and trigonometric functions.")
    return jsonify(l)

if __name__ == '__main__':
    app.run(debug=True)