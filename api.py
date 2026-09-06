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