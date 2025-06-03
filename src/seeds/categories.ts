import type { Payload } from 'payload';

// Define the Categories data
const categoriesData = [
  { name: 'Playas y Costas', icon: 'beach_access', color: '#4FC3F7', description: 'Disfruta del sol, la arena y el mar en las hermosas costas de La Guajira.' },
  { name: 'Sitios Culturales', icon: 'account_balance', color: '#8D6E63', description: 'Explora la rica herencia cultural Wayuu y la historia de la región.' },
  { name: 'Aventura y Deportes', icon: 'hiking', color: '#FF7043', description: 'Para los amantes de la adrenalina: kitesurf, sandboarding y más.' },
  { name: 'Gastronomía Local', icon: 'restaurant', color: '#FFEE58', description: 'Degusta los sabores únicos de la cocina guajira.' },
  { name: 'Naturaleza y Paisajes', icon: 'landscape', color: '#66BB6A', description: 'Descubre desiertos, santuarios de flora y fauna, y paisajes impresionantes.' },
  { name: 'Artesanías y Compras', icon: 'shopping_basket', color: '#BA68C8', description: 'Encuentra mochilas wayuu auténticas y otras artesanías locales.' },
];

export async function seedCategories(payload: Payload): Promise<void> {
  payload.logger.info('Seeding Categories...');

  try {
    // Check if categories collection exists
    // This is a preemptive check; actual collection creation is in Task 03
    const collections = await payload.find({ collection: 'payload-collections' as any, limit: 0 });
    const categoryCollectionExists = collections.docs.some((col: any) => col.slug === 'categories');

    if (!categoryCollectionExists) {
      payload.logger.warn('Categories collection does not exist yet. Skipping categories seeding.');
      // Optionally, could throw an error or attempt to create the collection if that was desired
      // For now, just log and skip as per task constraints.
      return;
    }

    for (const category of categoriesData) {
      try {
        await payload.create({
          collection: 'categories', // Collection slug
          data: category,
        });
        payload.logger.info(`Successfully seeded category: ${category.name}`);
      } catch (error) {
        // Handle potential error if a specific category already exists (e.g., if seeding is run multiple times)
        // or other creation errors. A more robust check would be findOne first.
        if (error.message.includes('validation')) { // Example check, specific error handling might be needed
             payload.logger.warn(`Could not seed category "${category.name}" due to validation error. It might already exist or have invalid data. Details: ${error.errors}`);
        } else {
            payload.logger.error(`Error seeding category "${category.name}": ${error.message}`);
        }
      }
    }
    payload.logger.info('Categories seeding complete.');
  } catch (e) {
    payload.logger.error(`Error during categories seeding process: ${e.message}`);
  }
}
