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
        var urls = "https://fcm.googleapis.com/fcm/send";
        let registration_ids = req.body.registration_ids
        let priority = req.body.priority;
        let notification = req.body.notification;
        let data = req.body.data;
        console.log("111ssss",s.Key_Notify);
        // console.log("registration_ids",)
        // console.log("priority",req.body.priority)
        // console.log("notification",req.body.notification)
        // console.log("data",req.body.data)
        axios.post(urls, {
            registration_ids: registration_ids,
            priority: priority,
            notification: notification,
            data: data
        },
            {
                headers:{
                    Authorization: 'key=AAAAI03A8A0:APA91bGsIIK6IvC_0r_mkJo38wpIHuHZoNbGqNzM_17s5FSv7L8fxKCf4fLoB0t61RZb4_dbGYbBdeP2FPxTx8P2K0MAaUJcaTXde4IB00k85yvCKb8SyxnSXUKmvkyI7XjOqrGHgXAI',
                    'Content-Type': 'application/json'
                }
            }
            )
            .then(function (response) {
                res.json({status: '200'});
            })
            .catch(function (error) {
                console.log("error",error)
                res.json( {status: "403"});
            });
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
