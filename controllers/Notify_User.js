const db = require('../service');
const axios = require('axios');
const s = require('../config/OpenRoles')
module.exports = {
    get: (req, res) => {
        let sql = `SELECT * FROM notify_key`;
        db.query(sql, (err, rown, response) => {
            if (err) throw err
            res.json(rown);
        })
    },
    get_time_schedule: (req, res) => {
        let sql = `SELECT * FROM info_config WHERE id =2`;
        db.query(sql, (err, rown, response) => {
            if (err) throw err
            var conten_config = rown.map(x=>x.conten_config);
            s.Authorization = conten_config;
            res.json(conten_config);
        })
    },
    get_key_notify: (req, res) => {
        let on_key = req.body.on_key;
        let id_User = req.body.id_User;
        let data = {on_key: on_key, id_User: id_User}

        if (id_User && on_key != undefined || "") {
            let sql = `SELECT * FROM notify_key WHERE id_User = ${id_User} and on_key = "${on_key}"`;

            db.query(sql, [data], (err, rown, response) => {
                if (err) throw err
                if (rown != "") {
                    res.json({"status": "200", message: 'Notify key OK key !', data: rown});
                } else {
                    res.json({"status": "400", message: 'Notify No key !'});
                }
            })

        } else {
            res.json({"status": "400", message: 'Notify No key !'});
        }
    },
    store: (req, res) => {
        let on_key = req.body.on_key;
        let id_User = req.body.id_User;
        if (id_User != undefined && on_key != undefined) {
            if (id_User != "" && on_key != "") {
                let sql = `INSERT INTO notify_key SET ?`;
                console.log("123", sql)
                db.query(sql, [{id_User, on_key}], (err, rewn, response) => {
                    if (err) throw err
                    res.json({"status": "200", message: 'Notify key OK INSERT !'});
                })
            } else {
                res.json({"status": "400", message: 'Notify No INSERT !'});
            }
        } else {
            res.json({"status": "400", message: 'Notify No INSERT !'});
        }
    },
}
