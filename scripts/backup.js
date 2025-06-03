import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';

// Load .env.local variables if not already loaded (e.g. by a tool like dotenv in a real project)
// For this environment, we assume process.env is populated by the execution context (e.g. npm scripts)
// or by pre-loading via `node -r dotenv/config scripts/backup.js`
// For simplicity, directly access process.env
const databaseUri = process.env.DATABASE_URI;
const backupDir = process.env.DATABASE_BACKUP_DIR;

if (!databaseUri || !backupDir) {
  console.error('Error: DATABASE_URI and DATABASE_BACKUP_DIR environment variables are required.');
  process.exit(1);
}

let dbFilePath;
if (databaseUri.startsWith('file:')) {
  dbFilePath = databaseUri.substring(5); // Remove 'file:' prefix
} else {
  console.error('Error: DATABASE_URI must be a file URI (e.g., file:./path/to/db.sqlite)');
  process.exit(1);
}

// Ensure the path is absolute or resolve relative to CWD
// In most npm script contexts, relative paths are fine from project root.
dbFilePath = path.resolve(dbFilePath);

const dbFileName = path.basename(dbFilePath);

// Ensure backup directory exists
try {
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log(`Created backup directory: ${backupDir}`);
  }
} catch (err) {
  console.error(`Error creating backup directory '${backupDir}':`, err);
  process.exit(1);
}

// Create timestamped backup file name
const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // YYYY-MM-DDTHH-MM-SS-mmmZ
const backupFileName = `backup-${timestamp}-${dbFileName}`; // e.g., backup-2024-06-03T10-00-00-000Z-backend-app.db
const uncompressedBackupPath = path.join(backupDir, backupFileName);
const compressedBackupPath = `${uncompressedBackupPath}.gz`;

async function main() {
  try {
    // 1. Copy the database file
    console.log(`Copying ${dbFilePath} to ${uncompressedBackupPath}...`);
    fs.copyFileSync(dbFilePath, uncompressedBackupPath);
    console.log('Database file copied successfully.');

    // 2. Compress the copied database file
    console.log(`Compressing ${uncompressedBackupPath} to ${compressedBackupPath}...`);
    const sourceStream = fs.createReadStream(uncompressedBackupPath);
    const destinationStream = fs.createWriteStream(compressedBackupPath);
    const gzip = zlib.createGzip();

    await pipeline(sourceStream, gzip, destinationStream);
    console.log('Backup file compressed successfully.');

    // 3. Remove the uncompressed copy
    console.log(`Removing uncompressed backup ${uncompressedBackupPath}...`);
    fs.unlinkSync(uncompressedBackupPath);
    console.log('Uncompressed backup removed.');

    console.log(`\nSuccessfully created backup: ${compressedBackupPath}`);
  } catch (err) {
    console.error('Backup process failed:', err);
    // Clean up potentially created files if error occurred mid-way
    if (fs.existsSync(uncompressedBackupPath)) {
      try {
        fs.unlinkSync(uncompressedBackupPath);
      } catch (cleanupErr) {
        console.error('Error cleaning up uncompressed backup file:', cleanupErr);
      }
    }
    if (fs.existsSync(compressedBackupPath)) {
       try {
        fs.unlinkSync(compressedBackupPath);
      } catch (cleanupErr) {
        console.error('Error cleaning up compressed backup file:', cleanupErr);
      }
    }
    process.exit(1);
  }
}

main();
