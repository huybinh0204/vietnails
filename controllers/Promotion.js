const db = require('../service');
const promotion_model = require('../models/Promotion_model');
const random_random = require("../config/OpenRoles");
// mã khuyến mại
module.exports = {
    get: (req, res) => {
        let sql = `SELECT * FROM promotion`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var Arrpromotion = {
                    [promotion_model.id]: rown[i].id,
                    [promotion_model.end_code]: rown[i].end_code,
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
        db.query(sql, [req.params.promotionId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var Arrpromotion = {
                    [promotion_model.id]: rown[i].id,
                    [promotion_model.end_code]: rown[i].end_code,
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
        let promotionId = req.params.promotionId;
        let sql = `UPDATE promotion SET ? WHERE id = ?`;
        db.query(sql, [data, promotionId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", "message": 'Update success!'})
        })
    },
    store: (req, res) => {
        var end_code = random_random.randomString(8);
        let title = req.body.title;
        let number = req.body.number;
        let date_favorable = req.body.date_favorable;
        let come_date = req.body.come_date;
        var data = {
            end_code: end_code,
            title: title,
            number: number,
            date_favorable: date_favorable,
            come_date: come_date
        }
        console.log("qqq", JSON.stringify(data))
        if (JSON.stringify(data) != '{}') {
            let sql = `INSERT INTO promotion SET ?`;
            db.query(sql, [data], (err, response) => {
                if (err) throw err
                let _sqlSELECT = 'SELECT * FROM promotion ORDER BY id DESC LIMIT 1'
                db.query(_sqlSELECT, (err, rown, fields) => {
                    if (err) throw err
                    var obj = [];
                    for (var i = 0; i < rown.length; i++) {
                        var Arrpromotion = {
                            [promotion_model.id]: rown[i].id,
                            [promotion_model.end_code]: rown[i].end_code,
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
                    var ArrGetpromotion = [{
                        "status": "200",
                        message: 'Promotion INSERT Ok!',
                        "data": promotionJson
                    }]
                    res.json(ArrGetpromotion);
                })
            })
        } else {
            res.json({"status": "400", message: 'Promotion No INSERT !'});
        }
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM promotion WHERE id = ?'
        db.query(sql, [req.params.promotionId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", shop: 'Delete promotion success!'})
        })
    }
}

