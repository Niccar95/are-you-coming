# Database Commands

## Shell Aliases (`~/.zshrc`)

| Alias      | What it does                  |
| ---------- | ----------------------------- |
| `ayc-db`   | Connect to dev database       |
| `ayc-sync` | Sync dev schema to production |

**Full commands (what the aliases run under the hood):**

```bash
# ayc-db
psql "$DEV_DATABASE_URL"

# ayc-sync
pg_dump --schema-only "$DEV_DATABASE_URL" | psql "$PROD_DATABASE_URL"
```

> If a new alias doesn't work, run `source ~/.zshrc` to reload the shell config (open terminals don't auto-detect changes).

## Inside psql

| Command         | Description                     |
| --------------- | ------------------------------- |
| `\dt`           | List all tables                 |
| `\d table_name` | Describe a table (show columns) |
| `\q`            | Quit psql                       |

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

**Rename a column:**

```sql
ALTER TABLE events RENAME COLUMN old_name TO new_name;
```

**Drop a column:**

```sql
ALTER TABLE events DROP COLUMN column_name;
```

**Drop a table:**

```sql
DROP TABLE your_table_name;
```

## Database Endpoints

- Dev (pooler): `ep-shiny-frog-ablw3k4r-pooler.eu-west-2.aws.neon.tech`
- Prod (direct): `ep-proud-snow-ab9ekjo5.eu-west-2.aws.neon.tech`

> Production must use the direct (non-pooler) endpoint. The pooler strips `search_path` and won't find your tables.
