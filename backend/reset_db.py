import sqlite3
import os
from pathlib import Path

def reset_database():
    """Reset the database with new schema and data"""
    db_path = Path(__file__).parent / "travel_planner.db"
    
    # Remove existing database
    if db_path.exists():
        os.remove(db_path)
        print("Removed existing database")
    
    # Create new database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Read and execute schema
    schema_path = Path(__file__).parent / "database" / "schema.sql"
    with open(schema_path, 'r') as f:
        schema_sql = f.read()
    
    cursor.executescript(schema_sql)
    print("Created database schema")
    
    # Read and execute seed data
    seed_path = Path(__file__).parent / "database" / "seed.sql"
    with open(seed_path, 'r') as f:
        seed_sql = f.read()
    
    cursor.executescript(seed_sql)
    print("Populated database with tourist destinations")
    
    conn.commit()
    conn.close()
    print("Database reset complete!")

if __name__ == "__main__":
    reset_database()