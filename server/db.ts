import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: 'Tatashe1',
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
});

export default pool;
