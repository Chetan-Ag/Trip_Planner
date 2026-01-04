import sqlite3
import os
from pathlib import Path

# Create database directory if it doesn't exist
db_path = Path("travel_planner.db")

# Connect to SQLite database (creates if doesn't exist)
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Read and execute schema
with open("database/schema.sql", "r") as f:
    schema_sql = f.read()
    
# Convert PostgreSQL syntax to SQLite
schema_sql = schema_sql.replace("SERIAL PRIMARY KEY", "INTEGER PRIMARY KEY AUTOINCREMENT")
schema_sql = schema_sql.replace("DECIMAL(10,8)", "REAL")
schema_sql = schema_sql.replace("DECIMAL(11,8)", "REAL")
schema_sql = schema_sql.replace("DECIMAL(10,2)", "REAL")
schema_sql = schema_sql.replace("DECIMAL(8,2)", "REAL")
schema_sql = schema_sql.replace("DECIMAL(3,2)", "REAL")
schema_sql = schema_sql.replace("TIMESTAMP DEFAULT CURRENT_TIMESTAMP", "DATETIME DEFAULT CURRENT_TIMESTAMP")

# Execute schema
for statement in schema_sql.split(';'):
    if statement.strip():
        try:
            cursor.execute(statement)
        except sqlite3.Error as e:
            print(f"Error executing: {statement[:50]}... - {e}")

# Read and execute seed data
with open("database/seed.sql", "r") as f:
    seed_sql = f.read()

# Execute seed data
for statement in seed_sql.split(';'):
    if statement.strip():
        try:
            cursor.execute(statement)
        except sqlite3.Error as e:
            print(f"Error executing seed: {statement[:50]}... - {e}")

conn.commit()
conn.close()

print("Database setup complete!")
print(f"Database created at: {db_path.absolute()}")