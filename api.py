from flask import Flask, jsonify, request
import psycopg2
import psycopg2.extras

app = Flask(__name__)