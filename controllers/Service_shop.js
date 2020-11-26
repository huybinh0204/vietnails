const db = require('../service');
var is_OFFSET = 0;
var is_LIMIT = 10;
var Eis_OFFSET;
module.exports = {
    get: (req, res) => {
        is_OFFSET = is_OFFSET + is_LIMIT
        var sql='';
        if (is_OFFSET <= 10){
            sql = `SELECT * FROM service_shop LIMIT ${is_LIMIT} OFFSET 0 `;
        }else{
            Eis_OFFSET = is_OFFSET - is_LIMIT;
            sql = `SELECT * FROM service_shop LIMIT ${is_LIMIT} OFFSET ${Eis_OFFSET} `;
        }
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrService = {
                    id: rown[i].id,
                    title: rown[i].title,
                    content: rown[i].content,
                    moneys_ser: rown[i].moneys_ser,
                    image: rown[i].image,
                    created_at: rown[i].created_at,
                    created_translate: rown[i].created_translate,
                };
                obj.push(ArrService);
            }
            var _ArrService = JSON.stringify(obj);
            var ServiceJson = JSON.parse(_ArrService);
            var ArrGetService = [{"status": "200", "data": ServiceJson}]
            res.json(ArrGetService);
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM service_shop WHERE id = ?'
        db.query(sql, [req.params.serviceId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrService = {
                    id: rown[i].id,
                    title: rown[i].title,
                    content: rown[i].content,
                    moneys_ser: rown[i].moneys_ser,
                    image: rown[i].image,
                    created_at: rown[i].created_at,
                    created_translate: rown[i].created_translate,
                };
                obj.push(ArrService);
            }
            var _ArrService = JSON.stringify(obj);
            var ServiceJson = JSON.parse(_ArrService);
            var ArrGetService = [{"status": "200", "data": ServiceJson}]
            res.json(ArrGetService);
        })
    },
    update: (req, res) => {
        let data = req.body;
        let serviceId = req.params.serviceId;
        let sql = 'UPDATE service_shop SET ? WHERE id = ?'
        db.query(sql, [data, serviceId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", message: 'Update service shop success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        if (JSON.stringify(data) != '{}') {
            let sql = `INSERT INTO service_shop SET ?`;
            db.query(sql, [data], (err, response) => {
                if (err) throw err
                let sqlSELECT = `SELECT MAX(id) as id FROM service_shop`;

                db.query(sqlSELECT, (err, rownM, fields) => {
                    if (err) throw err
                    const Idmap = rownM.map(x => x.id);
                    var ServiceJson = JSON.parse(Idmap);
                    let _sqlSELECT = 'SELECT * FROM service_shop WHERE id = ?';

                    db.query(_sqlSELECT, [ServiceJson], (err, rown, fields) => {
                        if (err) throw err
                        var obj = [];
                        for (var i = 0; i < rown.length; i++) {
                            var ArrService = {
                                id: rown[i].id,
                                title: rown[i].title,
                                content: rown[i].content,
                                moneys_ser: rown[i].moneys_ser,
                                image: rown[i].image,
                                created_at: rown[i].created_at,
                                created_translate: rown[i].created_translate,
                            };
                            obj.push(ArrService);
                        }
                        var _ArrService = JSON.stringify(obj);
                        var ServiceJson = JSON.parse(_ArrService);
                        var ArrGetService = [{"status": "200", message: 'Service_shop INSERT Ok!', "data": ServiceJson}]
                        res.json(ArrGetService);
                    })
                })
            })
        } else {
            res.json({"status": "400", message: 'Service_shop No INSERT !'});
        }
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM service_shop WHERE id = ?'
        db.query(sql, [req.params.serviceId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", message: 'Delete success!'})
        })
    }
}

