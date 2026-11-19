import sqlite3


def get_connection():

    conn = sqlite3.connect("ambulance.db")

    conn.row_factory = sqlite3.Row

    return conn


def create_table():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS ambulance_requests (

            request_id TEXT PRIMARY KEY,

            pickup TEXT NOT NULL,

            destination TEXT NOT NULL,

            category TEXT NOT NULL,

            name TEXT NOT NULL,

            phone TEXT NOT NULL,

            notes TEXT,

            status TEXT DEFAULT 'REQUEST_RECEIVED',

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        )
    """)

    conn.commit()

    conn.close()
