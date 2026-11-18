# Database Seeding

## Inventory Catalog

The inventory catalog is shared across all events and stored in the `inventory_items` table.

The catalog is defined in `app/data/inventory.ts` and inserted into the database using `seedInventory()` in `app/services/inventoryService.ts`.

### How to seed

Run the following command from the project root:

```bash
npx tsx scripts/seed-inventory.ts
```

### Environment Variables

The standalone seed script must load environment variables from `.env.local` before importing the inventory service.

The inventory service imports `db.ts`, which initializes the PostgreSQL connection pool using `DATABASE_URL`.

Static imports are evaluated before the rest of the script executes. Therefore, importing the inventory service before calling `loadEnvConfig()` can initialize the database pool before the environment variables are available.

Use `loadEnvConfig()` first, then dynamically import the service:

```ts
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const seed = async () => {
  try {
    const { seedInventory } = await import("@/app/services/inventoryService");

    await seedInventory();
    console.log("Inventory catalog seeded successfully");
  } catch (error) {
    console.error("Failed to seed inventory:", error);
    process.exitCode = 1;
  }
};

seed();
```

### When to run

- After applying the inventory database migration.
- Whenever new catalog items are added.

The seed operation uses `ON CONFLICT DO NOTHING` to avoid inserting duplicate item names.
