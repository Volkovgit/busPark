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


    //get
    getRoutes(obj = null) {
        return this._getQuery(this._createSelect(obj, 'public.routes'))
    }

    getBus(obj = null) {
        return this._getQuery(this._createSelect(obj, 'public.bus'))
    }

    //add
    addRoutes(obj) {
        return this._getQuery(this._createInsert(obj, "public.routes"));
    }

    addBus(obj) {
        return this._getQuery(this._createInsert(obj, 'public.bus'))
    }

    //удалить автобус по номеру
    deleteBus(id) {
        if (typeof (id) == 'number') {
            const SQL = `DELETE FROM public.bus WHERE id = ${id}`
            return this._getQuery(SQL);
        }
        else {
            return new Error("Передан неправильный номер автобуса")
        }
    }


    //удалить автобус по номеру
    deleteBus(id) {
        if (typeof (id) == 'number') {
            const SQL = `DELETE FROM public.bus WHERE id = ${id}`
            return this._getQuery(SQL);
        }
        else {
            return new Error("Передан неправильный номер автобуса")
        }
    }

    //Удалить маршрут по номеру: принадлежащие ему автобусы должны сменить состояние на «простаивает» и номер маршрута на «свободен»
    deleteRout(id) {
        if (typeof (id) == 'number') {
            const SQL = `UPDATE public.bus SET status = 0 WHERE rout = ${id};DELETE FROM public.routes WHERE id = ${id};`
            return this._getQuery(SQL);
        }
        else {
            return new Error("Передан неправильный номер маршрута")
        }
    }


    //Сменить состояние автобуса.
    changeBusStatus(id, status_id) {
        if (typeof (id) == 'number' && typeof (status_id) == 'number') {
            const SQL = `UPDATE public.bus SET status = ${status_id} WHERE id = ${id} `
            return this._getQuery(SQL)
        }
        else {
            return new Error("Некорректные данные для смены статуса")
        }
    }

    //Переместить автобус между маршрутами
    changeBusRoute(id, route_id) {
        if (typeof (id) == 'number' && typeof (route_id) == 'number') {
            const SQL = `UPDATE public.bus SET rout = ${route_id} WHERE id = ${id} `
            return this._getQuery(SQL)
        }
        else {
            return new Error("Некорректные данные для смены маршрута")
        }
    }

    //По фамилии водителя найти, на каком маршруте он сейчас работает.
    selectRoutesByName(name) {
        const SQL = `SELECT DISTINCT routes.id FROM public.routes
        JOIN public.bus ON bus.rout = routes.id
        WHERE bus.driver = '${name}';`
        return this._getQuery(SQL)
    }

}


const testDbQuery = new DbQuery();

// testDbQuery.addRoutes({ stationcount: 3, long: 4 , buscount: 2});


testDbQuery.getBus().then(data => console.log(data))
