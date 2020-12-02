const db = require('../service');
const shop_model = require('../models/Shop_model');
module.exports = {
    get: (req, res) => {
        let sql = `SELECT * FROM shop WHERE status_shop < 1`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrShop = {
                    [shop_model.id]: rown[i].id,
                    [shop_model.title]: rown[i].title,
                    [shop_model.content]: rown[i].content,
                    [shop_model.image]: rown[i].image,
                    [shop_model.address]: rown[i].address,
                    [shop_model.longitude]: rown[i].longitude,
                    [shop_model.latitude]: rown[i].latitude,
                    [shop_model.status_shop]: rown[i].status_shop,
                    [shop_model.created_sh]: rown[i].created_sh,
                };
                obj.push(ArrShop);
            }
            var _ArrShop = JSON.stringify(obj);
            var ShopJson = JSON.parse(_ArrShop);
            var ArrGetShop = [{"status": "200", "data": ShopJson}]
            res.json(ArrGetShop);
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM shop WHERE id = ?'
        db.query(sql, [req.params.shopId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrShop = {
                    [shop_model.id]: rown[i].id,
                    [shop_model.title]: rown[i].title,
                    [shop_model.content]: rown[i].content,
                    [shop_model.image]: rown[i].image,
                    [shop_model.address]: rown[i].address,
                    [shop_model.longitude]: rown[i].longitude,
                    [shop_model.latitude]: rown[i].latitude,
                    [shop_model.status_shop]: rown[i].status_shop,
                    [shop_model.created_sh]: rown[i].created_sh,
                };
                obj.push(ArrShop);
            }
            var _ArrShop = JSON.stringify(obj);
            var ShopJson = JSON.parse(_ArrShop);
            var ArrGetShop = [{"status": "200", "data": ShopJson}]
            res.json(ArrGetShop);
        })
    },
    update: (req, res) => {
        let data = req.body;
        let shopId = req.params.shopId;
        let sql = 'UPDATE shop SET ? WHERE id = ?'
        db.query(sql, [data, shopId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", shop: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        console.log("qqq", JSON.stringify(data))
        if (JSON.stringify(data) != '{}') {
            let sql = `INSERT INTO shop SET ?`;
            db.query(sql, [data], (err, response) => {
                if (err) throw err
                let _sqlSELECT = 'SELECT * FROM shop ORDER BY id DESC LIMIT 1'
                db.query(_sqlSELECT, (err, rown, fields) => {
                    if (err) throw err
                    var obj = [];
                    for (var i = 0; i < rown.length; i++) {
                        var ArrShop = {
                            [shop_model.id]: rown[i].id,
                            [shop_model.title]: rown[i].title,
                            [shop_model.content]: rown[i].content,
                            [shop_model.image]: rown[i].image,
                            [shop_model.address]: rown[i].address,
                            [shop_model.longitude]: rown[i].longitude,
                            [shop_model.latitude]: rown[i].latitude,
                            [shop_model.status_shop]: rown[i].status_shop,
                            [shop_model.created_sh]: rown[i].created_sh,
                        };
                        obj.push(ArrShop);
                    }
                    var _ArrShop = JSON.stringify(obj);
                    var ShopJson = JSON.parse(_ArrShop);
                    var ArrGetShop = [{"status": "200", message: 'Shop INSERT Ok!', "data": ShopJson}]
                    res.json(ArrGetShop);
                })
            })
        } else {
            res.json({"status": "400", message: 'Shop No INSERT !'});
        }
    },
    delete: (req, res) => {
        let sql = 'UPDATE shop SET status_shop = 1 WHERE id = ?'
        db.query(sql, [req.params.shopId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", shop: 'Delete Shop success!'})
        })
    }
}

