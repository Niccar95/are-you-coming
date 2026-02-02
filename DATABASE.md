# Database Commands

## Connect to PostgreSQL

**Quick way (alias):**

```bash
ayc-db
```

**Full command:**

```bash
psql "postgresql://neondb_owner:npg_nMe8ulWJa5gV@ep-shiny-frog-ablw3k4r-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
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

**Drop a table:**

```sql
DROP TABLE your_table_name;
```
