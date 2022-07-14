const { Pool, Client } = require('pg');
require('dotenv').config();


class BdConnection {
    connection = {
        user: process.env.BD_user,
        host: process.env.BD_host,
        database: process.env.BD_database,
        password: process.env.BD_password,
        port: Number(process.env.BD_port),
    }

    constructor() {
        
        this.pool = this._createPool(this.connection);
    }

    _createPool(dbSettings) {
        return new Pool(dbSettings)
    }

    async queryBd(sql) {
        return await this.pool.query(sql).then((data,err) => {
            this.pool.end();
            return data
        })
    }
}


testConnection = new BdConnection()


testConnection.queryBd('SELECT * FROM public.routes;').then((data) => {
    console.log(data.rows);
})



