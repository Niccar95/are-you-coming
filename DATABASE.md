# Database Commands

## Connect to PostgreSQL

**Quick way (alias):**

```bash
ayc-db
```

**Full command:**

```bash
psql $DATABASE_URL
```

> The alias is defined in `~/.zshrc`. Run `source ~/.zshrc` if it doesn't work.

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

## Sync Schema to Production

Copy all table structures from dev to production (schema only, no data):

```bash
pg_dump --schema-only "DEV_CONNECTION_STRING" | psql "PROD_CONNECTION_STRING"
```

**Important:** Use the direct (non-pooler) connection string for production. The pooler endpoint strips `search_path` and won't find your tables.

- Dev (pooler): `ep-shiny-frog-ablw3k4r-pooler.eu-west-2.aws.neon.tech`
- Prod (direct): `ep-proud-snow-ab9ekjo5.eu-west-2.aws.neon.tech`
