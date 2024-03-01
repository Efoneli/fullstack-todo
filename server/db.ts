import { Pool } from 'pg';

// Create a new Pool instance
const pool = new Pool({
    user: 'postgres',
    password: 'Tatashe1',
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
});

// Export the pool for use in other modules
export default pool;
