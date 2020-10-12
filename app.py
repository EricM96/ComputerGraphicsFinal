from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/', methods=['GET'])
def root_controller():
    return render_template(
        'index.html'
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)