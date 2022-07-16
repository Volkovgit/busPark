const DBConnection = require('./db_connect')



class DbQuery {
    constructor() {
        this.DBConn = new DBConnection()
    }

    async _getQuery(sql) {
        return await this.DBConn.queryDB(sql).then((data, err) => {
            return data.rows
        })
    }

    _createSelect(obj = null, table) {
        let sql = `SELECT * FROM ${table}`
        if (obj) {
            sql += " WHERE"
            const dataLength = Object.keys(obj).length
            Object.keys(obj).forEach((elem, index) => {
                if (index + 1 < dataLength) sql += ` ${elem} = ${this._normalizeElem(obj[elem])} AND `
                else sql += ` ${elem} = ${this._normalizeElem(obj[elem])};`;
            })
        }
        else {
            sql += ';';
        }
        return sql
    }


    _createInsert(obj, table) {
        let sql = `INSERT INTO ${table} `
        const dataLength = Object.keys(obj).length
        if (dataLength > 0) {
            let data_type = '('
            let value_elem = 'VALUES ('
            Object.keys(obj).forEach((elem, index) => {
                if (index + 1 < dataLength) {
                    value_elem += `${this._normalizeElem(obj[elem])},`;
                    data_type += `${elem},`
                }
                else {
                    value_elem += `${this._normalizeElem(obj[elem])});`
                    data_type += `${elem}) `
                };
            })
            sql += data_type + value_elem;
            return sql
        }
        else {
            return new Error('Пустой объект') // Как адекватно обрабатывать и передавать ошибки?
        }

    }

    _normalizeElem(el) {
        if (typeof (el) == 'number') {
            return el
        }
        else {
            new Error('Недопустимые данные в объекте') // Как адекватно обрабатывать и передавать ошибки?
        }
    }

    getRoutes(obj = null) {
        return this._getQuery(this._createSelect(obj, 'public.routes'))
    }

    addRoutes(obj) {
        return this._getQuery(this._createInsert(obj, "public.routes"));
    }


}


const testDbQuery = new DbQuery();

// testDbQuery.addRoutes({ stationcount: 3, long: 4 , buscount: 2});


testDbQuery.getRoutes().then(data=>console.log(data))
