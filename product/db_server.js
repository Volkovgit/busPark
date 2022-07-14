const DBConnection = require('./db_connect')


const DBConn = new DBConnection();

DBConn.queryDB('SELECT * FROM public.routes').then((data) => {
    console.log(data.rows);
});


class DbQuery{
    
    constructor(){

    }

    _createSQL(data,sql){

    }
}