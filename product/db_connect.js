const { Pool, Client } = require('pg');
require('dotenv').config();


module.exports = class DBConnection {
    connection = {
        user: process.env.DB_user,
        host: process.env.DB_host,
        database: process.env.DB_database,
        password: process.env.DB_password,
        port: Number(process.env.DB_port),
    }

    constructor() {
        this.pool = this._createPool(this.connection);
    }

    _createPool(dbSettings) {
        return new Pool(dbSettings)
    }

    async queryDB(sql) {
        return await this.pool.query(sql).then((data, err) => {
            this.pool.end();
            if(err) return err
            return data
        })
    }
}



