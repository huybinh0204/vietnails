const db = require('../service');
const axios = require('axios');
const is_OpenRoles = require('../config/OpenRoles')
var moment = require('moment-timezone');
module.exports = {
    // notify thu ngan
    get_time_schedule: (req, res) => {
        let sql = `SELECT on_key FROM user JOIN notify_key ON user.id = notify_key.id_User WHERE id_roles =4`;
        console.log("sql thu ngan",sql)
        db.query(sql, (err, rown, response) => {
            if (err) throw err
            if(rown != ''){
                var  registration_ids =[];
                for (var i = 0 ; i<rown.length;i++){
                    registration_ids.push(rown[i].on_key);
                }
                var urls = "https://fcm.googleapis.com/fcm/send";
                let priority = 'high';
                let notification = {
                    "title": "Chào bạn",
                    "text": "Bạn kiểm tra khách đến làm nalis hay chưa!"
                };
                let data = {
                    "title": "Firebase Notification Example",
                    "detail": "This firebase"
                };
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
                        console.log("notify thanh cong")
                    })
                    .catch(function (error) {
                        console.log("error",error)
                    });

            }else {
                console.log("NO User thtu ngan  push notify!");
            }
        })
    },
    get_notify_nv: (req, res) => {
        var check_time = moment().tz("Asia/Bangkok").format("YYYY-MM-DD hh:mmA");
        var  check_PM = check_time.slice(16,18);
        var  phut = check_time.slice(13,16);
        var  ngay = check_time.slice(0,11);
        var  gio = ngay + (Number(check_time.slice(11,13)) +12).toString() +phut;
        var check_time_schedule = check_PM == 'PM' ? (gio) : (check_time.slice(0,16));
        let sql = `SELECT notify_key.id_User , notify_key.on_key FROM schedule JOIN schedule_historical ON schedule.id = schedule_historical.id_schedule JOIN notify_key ON schedule_historical.id_User = notify_key.id_User WHERE start_time LIKE '${check_time_schedule}%' AND schedule_historical.is_status =1 GROUP BY schedule.id`;
        console.log("sql nhan vien ",sql)
        db.query(sql, (err, rown, response) => {
            if (err) throw err
            if(rown != ''){
                var  registration_ids =[];
                for (var i = 0 ; i<rown.length;i++){
                    registration_ids.push(rown[i].on_key);
                }
                var urls = "https://fcm.googleapis.com/fcm/send";
                let priority = 'high';
                let notification = {
                    "title": "Chào bạn",
                    "text": "Bạn đến lịch làm nails cho khách hàng!"
                };
                let data = {
                    "title": "Firebase Notification Example",
                    "detail": "This firebase"
                };
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
                        console.log("notify thanh cong")
                    })
                    .catch(function (error) {
                        console.log("error",error)
                    });

            }else {
                console.log("NO User nhan vien push notify!");
            }
        })
    },
    //ban notify khách hàng
    get_notify_kh: (req, res) => {
        var check_time = moment().tz("Asia/Bangkok").format("YYYY-MM-DD hh:mmA");
        var  check_PM = check_time.slice(16,18);
        var  phut = check_time.slice(13,16);
        var  ngay = check_time.slice(0,11);
        var  gio = ngay + (Number(check_time.slice(11,13)) +12).toString() +phut;
        var check_time_schedule = check_PM == 'PM' ? (gio) : (check_time.slice(0,16));
        let sql = `SELECT notify_key.id_User , notify_key.on_key FROM schedule JOIN schedule_details ON `+
        `schedule.id = schedule_details.id_Schedule JOIN notify_key ON schedule_details.id_User = notify_key.id_User `+
        `WHERE start_time LIKE '${check_time_schedule}%' GROUP BY schedule_details.id_Schedule`;
        console.log("sql khach hang",sql)
        db.query(sql, (err, rown, response) => {
            if (err) throw err
            if(rown != ''){
                var  registration_ids =[];
                for (var i = 0 ; i<rown.length;i++){
                    registration_ids.push(rown[i].on_key);
                }
                var urls = "https://fcm.googleapis.com/fcm/send";
                let priority = 'high';
                let notification = {
                    "title": "Chào bạn",
                    "text": "Chào bạn đến lịch làm nails của bạn!"
                };
                let data = {
                    "title": "Firebase Notification Example",
                    "detail": "This firebase"
                };
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
                        console.log("notify thanh cong")
                    })
                    .catch(function (error) {
                        console.log("error",error)
                    });

            }else {
                console.log("NO User khach hang push notify!");
            }
        })
    },
    get_key_notify: (req, res) => {
        var urls = "https://fcm.googleapis.com/fcm/send";
        let registration_ids = [
            "eKX70wKRQmGR0VB3K1U-1U:APA91bHtfIY3OujNqVEGu9azonTK_pbYNqrNx5xtet_ytlAgKUfT0L5VXN6RF0niWjsChK7bOv3_J-oW_hivLQu_bugeeUQUKVztDV4UaytHnSXqpWJOcJ2_J0q4JQoUav3N0soGJdVR"
        ];
        let priority = 'high';
        let notification = {
            "title": "Chào bạn",
            "text": "Chào bạn 15 phút nữa đến lịch làm nails của bạn!"
        };
        let data = {
            "title": "Firebase Notification Example",
            "detail": "This firebase"
        };
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
               console.log("notify thanh cong")
            })
            .catch(function (error) {
                console.log("error",error)
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
