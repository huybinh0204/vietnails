const db = require('../service');
const promotion_model = require('../models/Promotion_model');
module.exports = {
    get: (req, res) => {
        let sql = `SELECT * FROM promotion`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var Arrpromotion = {
                    [promotion_model.id]: rown[i].id,
                    [promotion_model.title]: rown[i].title,
                    [promotion_model.number]: rown[i].number,
                    [promotion_model.date_favorable]: rown[i].date_favorable,
                    [promotion_model.come_date]: rown[i].come_date,
                    [promotion_model.created_special]: rown[i].created_special,
                };
                obj.push(Arrpromotion);
            }
            var _Arrpromotion = JSON.stringify(obj);
            var promotionJson = JSON.parse(_Arrpromotion);
            var ArrGetpromotion = [{"status": "200", "data": promotionJson}]
            res.json(ArrGetpromotion);
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM promotion WHERE id = ?'
        db.query(sql, [req.params.promotionID], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var Arrpromotion = {
                    [promotion_model.id]: rown[i].id,
                    [promotion_model.title]: rown[i].title,
                    [promotion_model.number]: rown[i].number,
                    [promotion_model.date_favorable]: rown[i].date_favorable,
                    [promotion_model.come_date]: rown[i].come_date,
                    [promotion_model.created_special]: rown[i].created_special,
                };
                obj.push(Arrpromotion);
            }
            var _Arrpromotion = JSON.stringify(obj);
            var promotionJson = JSON.parse(_Arrpromotion);
            var ArrGetpromotion = [{"status": "200", "data": promotionJson}]
            res.json(ArrGetpromotion);
        })
    },
    update: (req, res) => {
        let data = req.body;
        let promotionID = req.params.promotionID;
        let sql =`UPDATE promotion SET ? WHERE id = ?`;
        db.query(sql, [data, promotionID], (err, response) => {
            if (err) throw err
            res.json({"status": "200", "message": 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        console.log("qqq",JSON.stringify(data))
        if (JSON.stringify(data) != '{}'){
            let sql = `INSERT INTO promotion SET ?`;
            db.query(sql, [data], (err, response) => {
                if (err) throw err
                let sqlSELECT = `SELECT MAX(id) as id FROM promotion`;
                db.query(sqlSELECT, (err, rownM, fields) => {
                    if (err) throw err

                    const Idmap = rownM.map(x => x.id);
                    var ShopJson = JSON.parse(Idmap);

                    let _sqlSELECT = 'SELECT * FROM promotion WHERE id = ?'
                    db.query(_sqlSELECT, [ShopJson], (err, rown, fields) => {
                        if (err) throw err
                        var obj = [];
                        for (var i = 0; i < rown.length; i++) {
                            var Arrpromotion = {
                                [promotion_model.id]: rown[i].id,
                                [promotion_model.title]: rown[i].title,
                                [promotion_model.number]: rown[i].number,
                                [promotion_model.date_favorable]: rown[i].date_favorable,
                                [promotion_model.come_date]: rown[i].come_date,
                                [promotion_model.created_special]: rown[i].created_special,
                            };
                            obj.push(Arrpromotion);
                        }
                        var _Arrpromotion = JSON.stringify(obj);
                        var promotionJson = JSON.parse(_Arrpromotion);
                        var ArrGetpromotion = [{"status": "200", message: 'Promotion INSERT Ok!', "data": promotionJson}]
                        res.json(ArrGetpromotion);
                    })
                })
            })
        }else {
            res.json({"status": "400", message: 'Promotion No INSERT !'});
        }
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM promotion WHERE id = ?'
        db.query(sql, [req.params.promotionID], (err, response) => {
            if (err) throw err
            res.json({"status": "200", message: 'Delete success!'})
        })
    }
}

