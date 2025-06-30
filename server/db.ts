import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Use environment variable if available, otherwise create a mock database connection
const databaseUrl = process.env.DATABASE_URL;

let pool: Pool;
let db: any;

if (databaseUrl) {
  pool = new Pool({ connectionString: databaseUrl });
  db = drizzle(pool, { schema });
} else {
  // For development without a database, create a mock connection
  console.warn("DATABASE_URL not set. Running in development mode without database connection.");
  console.warn("Some features may not work properly. Please provision a database for full functionality.");
  
  // Create a mock pool that doesn't actually connect
  pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    database: 'mock_db',
    user: 'mock_user',
    password: 'mock_password',
    max: 1,
    connectionTimeoutMillis: 1000,
  });
  
  db = drizzle(pool, { schema });
}

export { pool, db };
