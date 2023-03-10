const pg = require('pg');
const pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'awesome_reads', 
    });

module.exports = pool;