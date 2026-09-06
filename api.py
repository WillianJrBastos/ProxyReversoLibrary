from flask import Flask, jsonify, request
import psycopg2
import psycopg2.extras

app = Flask(__name__)

DB_CONFIG = {
    "host": "192.168.56.30",
    "dbname": "biblioteca",
    "user": "root",
    "password": "root123#",
    "port": 5432
}

def get_connection():
    return psycopg2.connect(**DB_CONFIG)

@app.route("/api/livros", methods=["GET"])
def listar_livros():
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute("SELECT * FROM livros ORDER BY id;")
    livros = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(livros)

@app.route("/api/livros/<int:livro_id>", methods=["GET"])
def obter_livro(livro_id):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute("SELECT * FROM livros WHERE id = %s;", (livro_id,))
    livro = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if livro is None:
        return jsonify({"erro": "Livro não encontrado"}), 404
    return jsonify(livro)