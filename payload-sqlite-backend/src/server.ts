import express from 'express';
import payload from 'payload';
import path from 'path'; // Import path

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Load .env file from project root

const app = express();
const PORT = process.env.PORT || 3000;

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || 'supersecret', // Ensure PAYLOAD_SECRET is in .env
      express: app,
      onInit: async () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });

    app.listen(PORT, () => {
      payload.logger.info(`Server listening on port ${PORT}`);
    });
  } catch (e) {
    payload.logger.error(e);
    process.exit(1);
  }
};

start();
