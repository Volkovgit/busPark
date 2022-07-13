const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'busApplication',
    password: 'admin',
    port: 5432,
});

pool.query('SELECT * FROM public.routes;').then((res, err) => {
    console.log(res.rows);
    pool.end();
});

