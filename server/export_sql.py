import sqlite3
import os
import sys

# Default paths
DB_PATH = os.path.join(os.path.dirname(__file__), 'llm_trumps.db')
EXPORT_PATH = os.path.join(os.path.dirname(__file__), 'backup.sql')

def export_database(db_file=DB_PATH, out_file=EXPORT_PATH):
    """Exports a SQLite database to a .sql file."""
    if not os.path.exists(db_file):
        print(f"❌ Error: Database file '{db_file}' not found.")
        print("Please ensure the database has been created (e.g., by running seed.py).")
        sys.exit(1)

    print(f"⏳ Exporting '{db_file}' to '{out_file}'...")
    
    try:
        con = sqlite3.connect(db_file)
        with open(out_file, 'w', encoding='utf-8') as f:
            # write schema and data using iterdump
            for line in con.iterdump():
                f.write(f"{line}\n")
        print(f"✅ Successfully exported to {out_file}")
    except sqlite3.Error as e:
        print(f"❌ SQLite error: {e}")
        sys.exit(1)
    except IOError as e:
        print(f"❌ File I/O error: {e}")
        sys.exit(1)
    finally:
        if 'con' in locals():
            con.close()

if __name__ == '__main__':
    # Optional override from command line arguments
    if len(sys.argv) > 1:
        DB_PATH = sys.argv[1]
    if len(sys.argv) > 2:
        EXPORT_PATH = sys.argv[2]
        
    export_database(DB_PATH, EXPORT_PATH)
