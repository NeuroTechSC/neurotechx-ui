import time
import random
from random import randrange
from datetime import datetime
import csv
import pandas as pd

from flask import Flask
import sqlite3


app = Flask(__name__)



@app.route('/question', methods=['POST', 'GET'])
def get_random_question():
    ran = ['Do you believe in ghosts?',
                'Have you ever seen a UFO?',
                'Can cats jump six times their length?',
                'Do you like chocolate milkshakes?',
                'Were you in the swamp yesterday?',
                'Did you see Bigfoot?',
                'Can you see the moon?',
                'Do you know how to swim?',
                'Can you play poker?',
                'Do you have a twin?',
                'Were you born in the summer?',
                'Do you believe in Santa Claus?',
                'Can you make yourself disappear?',
                'Were you on Survivor last year?',
                'Do you know the Schrödinger equation of quantum theory?',
                'Do mice really eat cheese?',
                'Is your shoe size 14?',
                'Can you see out the back of your head?',
                'Are Martians really green?',
                'Have elves always live at the North Pole?']

                # https://teens.lovetoknow.com/teen-activities-things-do/100-random-unexpected-yes-no-questions

    random.shuffle(ran)
    randQuestion = randrange(20)
    question = ran[randQuestion]

    values = (time.time(),     # Exact Current Time
                str(question), # Question generated
                1,             # Model Response
                1)             # Actual Response

    conn = sqlite3.connect('database.db', isolation_level=None, detect_types=sqlite3.PARSE_COLNAMES)
    conn.execute("""CREATE TABLE IF NOT EXISTS ModelResponse (
                    id Integer,
                    ques TEXT,
                    resp INTEGER,
                    truth INTEGER
                    )""")
    conn.execute("""INSERT INTO ModelResponse VALUES (?, ?, ?, ?)""", values)
    r = conn.execute("""SELECT * FROM ModelResponse""")
    r.fetchall()

    return {'question': question}

@app.route('/convertData')
def convert_db():
    conn = sqlite3.connect('database.db', isolation_level=None, detect_types=sqlite3.PARSE_COLNAMES)
    conn.execute("""CREATE TABLE IF NOT EXISTS ModelResponse (
                    id Integer,
                    ques TEXT,
                    resp INTEGER,
                    truth INTEGER
                    )""")
    db_df = pd.read_sql_query("SELECT * FROM ModelResponse", conn)
    db_df.to_csv('database.csv', index=False)




@app.route('/time')
def get_current_time():
    return {'time': time.time()}


# if __name__ == "__main__":
#     app.run
