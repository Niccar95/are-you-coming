# Database Commands

## Shell Aliases (`~/.zshrc`)

| Alias      | What it does             |
| ---------- | ------------------------ |
| `ayc-db`   | Connect to dev database  |
| `ayc-prod` | Connect to prod database |

**Full commands (what the aliases run under the hood):**

```bash
# ayc-db
psql "$DEV_DATABASE_URL"

# ayc-prod
psql "$PROD_DATABASE_URL"
```

> If a new alias doesn't work, run `source ~/.zshrc` to reload the shell config (open terminals don't auto-detect changes).

## Inside psql

| Command               | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `\dt`                 | List all tables                                               |
| `\d table_name`       | Describe a table (show columns)                               |
| `\i path/to/file.sql` | Run all the SQL in a file (see [Migrations](#migrations))     |
| `\! command`          | Run a normal terminal command from inside psql, e.g. `\! pwd` |
| `\q`                  | Quit psql                                                     |
| `\r`                  | Clear an unfinished statement (see the prompt)                |

`\i` and `\!` are psql commands, not SQL. `\i` means "include": psql reads the file and runs it as if you had pasted it.

### How to read the psql prompt

The prompt tells you what psql is waiting for. Look at the character after the database name.

| Prompt     | Meaning                                            |
| ---------- | -------------------------------------------------- |
| `neondb=>` | Ready for a new command                            |
| `neondb->` | In the middle of a statement, waiting for the rest |
| `neondb'>` | An open quote `'` was never closed                 |
| `neondb(>` | An open parenthesis `(` was never closed           |

If the prompt is anything other than `=>`, an earlier statement is unfinished (usually a missing `;` at the end). Anything typed as SQL gets glued onto it and causes confusing errors.

**Fix:** type `\r` to clear the unfinished statement. The prompt should go back to `neondb=>`. Do this before running a migration.

Backslash commands (`\i`, `\d`, `\dt`) still work while a statement is unfinished.

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

**Change column property:**

```sql
UPDATE events SET event_location = '' WHERE event_location IS NULL;
ALTER TABLE events ALTER COLUMN event_location SET NOT NULL;
```

## Migrations

A migration is a `.sql` file with one database change in it. Every change to the database gets its own numbered file, so there is a history of what was changed and in what order.

### Where the files are

Currently in `app/migrations/`:

```
app/
  migrations/
    001_add_timezone_to_events.sql
```

> `app/` is for Next.js pages and components, so the folder would fit better in the project root next to `package.json`. Nothing breaks if it stays where it is. If it's moved, the `\i` path below changes too.

### Rules

1. **One change per file**, numbered in order: `001_...`, `002_...`, `003_...`.
2. **Never edit a migration after it has been run.** Add a new numbered file instead.
3. **Commit the files to git** together with the code that needs them.
4. **Run it on dev first**, check it, then run it on prod.
5. **Don't run the same file twice.** The second run usually fails, e.g. "column already exists". Adding `IF NOT EXISTS` makes a file safe to repeat:
   ```sql
   ALTER TABLE events ADD COLUMN IF NOT EXISTS location TEXT;
   ```

### How to write one

```sql
-- 001_add_timezone_to_events.sql
-- Stores which timezone each event's clock time refers to.
-- Existing events are labelled Europe/Stockholm; new events must supply their own.

BEGIN;

ALTER TABLE events ADD COLUMN timezone TEXT NOT NULL DEFAULT 'Europe/Stockholm';
ALTER TABLE events ALTER COLUMN timezone DROP DEFAULT;

COMMIT;
```

`BEGIN` and `COMMIT` are optional. They wrap several statements so that either all of them run or none do. If line 2 fails, line 1 is undone as well, so the database is never left half-changed. A file with a single statement doesn't need them.

### How to run one

1. Start psql **from the project root**: `ayc-db` (dev) or `ayc-prod` (prod).
2. Check where psql is and that it can see the file:
   ```
   \! pwd
   \! ls migrations
   ```
3. Run it:
   ```
   \i migrations/001_add_timezone_to_events.sql
   ```
   Success looks like `BEGIN`, `ALTER TABLE`, `ALTER TABLE`, `COMMIT`.
4. Check the result, e.g. `\d events` or a `SELECT`.

The path in `\i` is relative to the folder where psql was started. If it says `No such file or directory`, the path is wrong: use `\! pwd` and `\! ls` to find the file, or give the full path.

Pasting the SQL straight into psql does the same thing as `\i`. Still save the file, so the change is recorded.

### Migration log

Which migrations have been run on dev and prod is listed in `MIGRATIONS.md`.

## Database Endpoints

- Dev (pooler): `ep-shiny-frog-ablw3k4r-pooler.eu-west-2.aws.neon.tech`
- Prod (direct): `ep-proud-snow-ab9ekjo5.eu-west-2.aws.neon.tech`

> Production must use the direct (non-pooler) endpoint. The pooler strips `search_path` and won't find your tables.
