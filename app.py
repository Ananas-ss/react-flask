from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='Xss040316',
        database='test'
    )


print("准备测试数据库连接...")
try:
    conn = get_db_connection()
    print("数据库连接成功")
    conn.close()
except Exception as e:
    print("数据库连接失败:", str(e))

@app.route('/api/sales-data')
def get_sales_data():
    try:
        print("正在访问 /api/sales-data...")
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT category AS product,value AS sales FROM sales_data ORDER BY value DESC"
            cursor.execute(sql)
            results = cursor.fetchall()
            print("查询结果:", results)
        return jsonify(results)
    except Exception as e:
        print("发生错误:", str(e))
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()

@app.route('/api/user-data')
def get_user_data():
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT month, users FROM user_data ORDER BY month"
            cursor.execute(sql)
            results = cursor.fetchall()
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()


if __name__ == '__main__':
    app.run(debug=True, port=5001)
