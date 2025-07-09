from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#第一个按钮
@app.route('/receive/<param>', methods=['GET'])
def receive_data(param):
    return jsonify({'message': f'Received GET parameter: {param}'}), 200

# 第二个按钮：POST 请求，接收 JSON 数据
@app.route('/postdata', methods=['POST'])
def receive_post_data():
    data = request.get_json()  # 获取 JSON 数据
    body_param = data.get('bodyParam', '')
    param_value = data.get('paramValue', '')

    return jsonify({'message': f'Received POST data: bodyParam={body_param}, paramValue={param_value}'}), 200

if __name__ == '__main__':
    app.run(debug=True)

