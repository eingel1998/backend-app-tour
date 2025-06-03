import type { Payload, SanitizedConfig } from 'payload';
import payload from 'payload'; // Import the payload instance
import { seedCategories } from './categories';
import { seedPlaces } from './places';

// Main seed function to run all individual seeders
async function runSeedOperations(payloadInstance: Payload): Promise<void> {
  payloadInstance.logger.info('Starting all seed operations from runSeedOperations...');

  // Seed categories first as places might depend on them
  await seedCategories(payloadInstance);

  // Then seed places
  await seedPlaces(payloadInstance);
  // Add calls to other seeders here as they are created

  payloadInstance.logger.info('All seed operations complete from runSeedOperations.');
}

// Script must define a "script" function export that accepts the sanitized config
export const script = async (config: SanitizedConfig): Promise<void> => {
  // Initialize Payload. This is necessary if you're running the script standalone.
  // If `payload seed` initializes Payload itself and then calls this script with an active Payload instance,
  // this init might be redundant or need adjustment. However, the example shows `payload.init`.
  // We need to ensure PAYLOAD_SECRET is available if init is called.
  // It's safer to assume `payload.init` is needed as per docs for custom bin scripts.
  if (!process.env.PAYLOAD_SECRET) {
    console.error('PAYLOAD_SECRET is not defined. Seeding script requires it.');
    process.exit(1); // Exit if secret is missing
  }

  await payload.init({ config }); // Use the passed config
  payload.logger.info('Payload initialized within seed script.');

  // Now call the main seeding logic with the initialized payload instance
  await runSeedOperations(payload);

  payload.logger.info('Custom seed script finished successfully.');
  process.exit(0); // Successfully exit the script
};

// If you want to run this script directly using `ts-node src/seeds/index.ts` (for testing, for example)
// you would need to load the config manually. But for `payload seed` via `bin`, the above is the pattern.
