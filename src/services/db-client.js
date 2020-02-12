const { Pool } = require('pg');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432
});

const getAllUsers = async () => {
    const results = await pool.query('SELECT * FROM users;');
    // console.log('db-client: got all users', results.rows);
    return results.rows;
};

const getUserById = async (id) => {
    const results = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    console.log(`db-client: got user ${results.rows[0].id} from db`);
    return results.rows[0];
};

const createUser = async ({ name, email }) => {
    const results = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email]);
    const userId = results.rows[0].id;
    console.log(`db-client: created user with id ${userId}`);
    return userId;
};

const updateUser = async (id, name, email) => {
    const results = await pool.query('UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING id', [name, email, id]);
    const userId = results.rows[0].id;
    return userId;
};

const deleteUser = async (id) => {
    const results = await pool.query('DELETE FROM users WHERE id=$1 RETURN id', [id]);
};

const testDb = async () => {
    await pool.query('SELECT NOW()', (err, res) => {
        console.log(err, res);
        pool.end();
    });
};

module.exports = {
    testDb,
    getUserById,
    createUser,
    getAllUsers,
    updateUser
};
