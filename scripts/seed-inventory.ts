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
