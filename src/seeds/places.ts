import type { Payload } from 'payload';

// Define the Places data (with placeholder category IDs)
// In a real scenario, category IDs would be fetched after categories are seeded.
const placesData = [
  {
    name: 'Muelle Turístico de Riohacha',
    description: 'Un icónico muelle perfecto para caminatas al atardecer y disfrutar de la brisa marina. Ofrece vistas panorámicas de la costa.',
    // category: 'ID_OF_PLAYAS_Y_COSTAS_CATEGORY', // Placeholder
    address: 'Calle 1 con Avenida La Marina, Riohacha, La Guajira',
    latitude: 11.5569,
    longitude: -72.9076,
  },
  {
    name: 'Catedral Nuestra Señora de los Remedios',
    description: 'Una joya arquitectónica e histórica en el corazón de Riohacha, patrona de la ciudad.',
    // category: 'ID_OF_SITIOS_CULTURALES_CATEGORY', // Placeholder
    address: 'Calle 2 # 7-13, Riohacha, La Guajira',
    latitude: 11.554,
    longitude: -72.9064,
  },
  {
    name: 'Valle de los Cangrejos',
    description: 'Un ecosistema de manglar único, hogar de diversas especies de cangrejos y aves. Ideal para el ecoturismo.',
    // category: 'ID_OF_NATURALEZA_Y_PAISAJES_CATEGORY', // Placeholder
    address: 'Corregimiento de Camarones, Riohacha, La Guajira', // Approx. location
    latitude: 11.4165,
    longitude: -73.0609,
  },
  {
    name: 'Santuario de Fauna y Flora Los Flamencos',
    description: 'Hogar de una gran población de flamencos rosados y otras aves migratorias. Un espectáculo natural imperdible.',
    // category: 'ID_OF_NATURALEZA_Y_PAISAJES_CATEGORY', // Placeholder
    address: 'Carretera Riohacha - Santa Marta, km 20 aprox., La Guajira',
    latitude: 11.4236,
    longitude: -73.1238,
  },
];

export async function seedPlaces(payload: Payload): Promise<void> {
  payload.logger.info('Seeding Tourist Places...');

  try {
    // Preemptive check for 'places' and 'categories' collections
    const collections = await payload.find({ collection: 'payload-collections' as any, limit: 0 });
    const placeCollectionExists = collections.docs.some((col: any) => col.slug === 'places');
    const categoryCollectionExists = collections.docs.some((col: any) => col.slug === 'categories');

    if (!placeCollectionExists) {
      payload.logger.warn('Places collection does not exist yet. Skipping places seeding.');
      return;
    }
    if (!categoryCollectionExists) {
      payload.logger.warn('Categories collection does not exist yet. Cannot link places to categories. Skipping places seeding.');
      return;
    }

    // In a real seeder, you'd fetch actual category documents to get their IDs
    // For example:
    // const playasCategory = await payload.find({ collection: 'categories', where: { name: { equals: 'Playas y Costas' }}, limit: 1 });
    // const playasCatId = playasCategory.docs[0]?.id;

    for (const place of placesData) {
      const dataToCreate: any = { ...place };

      // Placeholder logic for category linking:
      // if (place.name === 'Muelle Turístico de Riohacha' && playasCatId) {
      //   dataToCreate.category = playasCatId;
      // } // etc.
      // For now, we are not setting the category due to its dynamic nature and dependency on Task 03.
      // When the 'category' field is set up as a relationship, this part will need to be implemented correctly.
      payload.logger.info(`Note: Category linking for "${place.name}" is currently a placeholder.`);


      try {
        await payload.create({
          collection: 'places', // Collection slug
          data: dataToCreate,
        });
        payload.logger.info(`Successfully seeded place: ${place.name}`);
      } catch (error) {
        if (error.message.includes('validation')) {
             payload.logger.warn(`Could not seed place "${place.name}" due to validation error. It might already exist or have invalid data. Details: ${error.errors}`);
        } else {
            payload.logger.error(`Error seeding place "${place.name}": ${error.message}`);
        }
      }
    }
    payload.logger.info('Tourist Places seeding complete (without actual category linking).');
  } catch (e) {
    payload.logger.error(`Error during places seeding process: ${e.message}`);
  }
}
