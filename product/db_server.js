const DBConnection = require('./db_connect')



class DbQuery {
    SQL_SELECT_ROUTES = "SELECT * FROM public.routes";
    constructor() {
        this.DBConn = new DBConnection()
    }

    async _getQuery(sql) {
        return await this.DBConn.queryDB(sql).then((data, err) => {
            return data.rows
        })
    }

    _createSelect(obj = null,table) {
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


    _createInsert(obj,table) {
        let sql = `INSERT INTO ${table} VALUES ()`
        const dataLength = Object.keys(obj).length
        if (dataLength > 0) {
            console.log(dataLength);
            Object.keys(obj).forEach((elem, index) => {
                if (index + 1 < dataLength) sql += ` ${this._normalizeElem(obj[elem])},`
                else sql += ` ${elem} = ${this._normalizeElem(obj[elem])};`;
            })
        }
        else {
            return new Error('Пустой объект') // Как адекватно обрабатывать и передавать ошибки?
        }
        return sql
    }

    _normalizeElem(el){
        if(typeof(el) == 'number'){
            return el
        }
        else{
            return new Error('Недопустимые данные в объекте') // Как адекватно обрабатывать и передавать ошибки?
        }
    }

    getRoutes(obj = null) {
        return this._getQuery(this._createSelect(obj,'public.routes'))
    }

    addRoutes(obj){
        return this._createInsert({},"public.routes");
    }


}

try{
const testDbQuery = new DbQuery();
testDbQuery.addRoutes()
}
catch(err){
    console.log(err);
}
