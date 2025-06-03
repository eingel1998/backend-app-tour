import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import readline from 'node:readline';

// --- Argument Parsing ---
let backupFileArg = '';
const args = process.argv.slice(2); // Skip node executable and script path
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--file' && i + 1 < args.length) {
    backupFileArg = args[i + 1];
    break;
  }
}

if (!backupFileArg) {
  console.error('Error: --file argument specifying the backup file name is required.');
  console.error('Usage: node scripts/restore.js --file <backup-filename.db.gz>');
  process.exit(1);
}

// --- Environment Variables ---
const databaseUri = process.env.DATABASE_URI;
const backupDir = process.env.DATABASE_BACKUP_DIR;

if (!databaseUri || !backupDir) {
  console.error('Error: DATABASE_URI and DATABASE_BACKUP_DIR environment variables are required.');
  process.exit(1);
}

let dbFilePath;
if (databaseUri.startsWith('file:')) {
  dbFilePath = path.resolve(databaseUri.substring(5));
} else {
  console.error('Error: DATABASE_URI must be a file URI (e.g., file:./path/to/db.sqlite)');
  process.exit(1);
}

const compressedBackupPath = path.resolve(backupDir, backupFileArg);

// --- Confirmation Prompt ---
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function confirmRestore() {
  return new Promise((resolve) => {
    console.warn(`\nWARNING: This will overwrite the current database at:`);
    console.warn(`  ${dbFilePath}`);
    console.warn(`with the backup file:`);
    console.warn(`  ${compressedBackupPath}\n`);
    rl.question('Are you sure you want to proceed? (yes/no): ', (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'yes');
    });
  });
}

// --- Main Restore Logic ---
async function main() {
  if (!fs.existsSync(compressedBackupPath)) {
    console.error(`Error: Backup file not found at ${compressedBackupPath}`);
    process.exit(1);
  }

  const confirmed = await confirmRestore();
  if (!confirmed) {
    console.log('Restore operation cancelled by user.');
    process.exit(0);
  }

  console.log(`Starting restore from ${compressedBackupPath} to ${dbFilePath}...`);

  // Create a temporary path for decompression to avoid corrupting the original on error
  const tempDecompressedPath = `${dbFilePath}.tmp-restore-${Date.now()}`;

  try {
    // 1. Decompress the backup file to a temporary location
    console.log(`Decompressing ${compressedBackupPath} to ${tempDecompressedPath}...`);
    const sourceStream = fs.createReadStream(compressedBackupPath);
    const destinationStream = fs.createWriteStream(tempDecompressedPath);
    const gunzip = zlib.createGunzip();

    await pipeline(sourceStream, gunzip, destinationStream);
    console.log('Backup file decompressed successfully to temporary location.');

    // 2. Replace the current database file with the decompressed backup
    // This should be an atomic operation if possible, but fs.rename is generally good.
    console.log(`Replacing ${dbFilePath} with ${tempDecompressedPath}...`);
    fs.renameSync(tempDecompressedPath, dbFilePath);
    console.log('Database file restored successfully.');

    console.log(`\nSuccessfully restored database from: ${backupFileArg}`);

  } catch (err) {
    console.error('Restore process failed:', err);
    // Clean up temporary file if it exists
    if (fs.existsSync(tempDecompressedPath)) {
      try {
        fs.unlinkSync(tempDecompressedPath);
        console.log('Cleaned up temporary decompressed file.');
      } catch (cleanupErr) {
        console.error('Error cleaning up temporary file:', cleanupErr);
      }
    }
    process.exit(1);
  }
}

main();
