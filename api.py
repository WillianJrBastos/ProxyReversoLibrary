from flask import Flask, jsonify, request
import psycopg2
import psycopg2.extras

print("Starting API...")