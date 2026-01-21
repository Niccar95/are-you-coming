# Database Commands

## Connect to PostgreSQL

```bash
psql "$(grep DATABASE_URL .env | cut -d '=' -f2-)"
```

Or copy your `DATABASE_URL` from `.env` and run:

```bash
psql "your_connection_string_here"
```

## Inside psql

| Command | Description |
|---------|-------------|
| `\dt` | List all tables |
| `\d table_name` | Describe a table (show columns) |
| `\q` | Quit psql |

## Common SQL Commands

**Create a new table:**

```sql
CREATE TABLE your_table_name (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Alter an existing table:**

```sql
ALTER TABLE your_table ADD COLUMN new_column VARCHAR(255);
```

**View all rows in a table:**

```sql
SELECT * FROM your_table_name;
```

**Drop a table:**

```sql
DROP TABLE your_table_name;
```
