const {Pool} = require('pg');

const PSQL = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_USER_PWD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

export default PSQL;