const db = require('../service');
const axios = require('axios');
const is_OpenRoles = require('../config/OpenRoles')
var moment = require('moment-timezone');
module.exports = {
    // notify thu ngan
    get_time_schedule: (req, res) => {
        let sql = `SELECT id_User,on_key FROM user JOIN notify_key ON user.id = notify_key.id_User WHERE id_roles =4`;
        db.query(sql, (err, rown, response) => {
            if (err) throw err
            if (rown != '') {
                // var registration_ids = [];
                for (var i = 0; i < rown.length; i++) {
                    // registration_ids.push(rown[i].on_key);
                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: [rown[i].on_key],
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify,
                            data: is_OpenRoles.data_notify
                        },
                        {
                            headers: {
                                // Authorization: 'key=AAAAI03A8A0:APA91bGsIIK6IvC_0r_mkJo38wpIHuHZoNbGqNzM_17s5FSv7L8fxKCf4fLoB0t61RZb4_dbGYbBdeP2FPxTx8P2K0MAaUJcaTXde4IB00k85yvCKb8SyxnSXUKmvkyI7XjOqrGHgXAI',
                                Authorization: is_OpenRoles.Authorization_notify,
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                        .then(function (response) {
                            console.log("notify thanh cong")
                        })
                        .catch(function (error) {
                            console.log("error", error)
                        });

                    var id_User = rown[i].id_User;
                    let sql_select = `SELECT fullName FROM user WHERE id = ${id_User}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: is_OpenRoles.priority_notify,
                            id_User: id_User,
                            receiver: rowk[0].fullName,
                        }
                        let sql = `INSERT INTO notification SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                    });
                }
            } else {
                console.log("NO User thtu ngan  push notify!");
            }
        })
    },
    //ban notify khách hàng
    get_notify_kh: (req, res) => {
        var check_time = moment().tz("Asia/Bangkok").format("YYYY-MM-DD hh:mmA");
        var check_PM = check_time.slice(16, 18);
        var ngay = check_time.slice(0, 11);
        var gio = Number(check_time.slice(11, 13));
        var phut_ht = Number(check_time.slice(14, 16));
        var gio_ht = check_PM == "PM" ? (gio + 12) : gio;
        var is_gio_ht = check_PM == "PM" ? (gio + 13) : gio;
        // console.log("is_gio",is_gio)
        // console.log("gio",gio)
        // console.log("is_gio",check_PM)
        let sql = `SELECT notify_key.id_User as id_User, notify_key.on_key as on_key, schedule.start_time as start_time FROM schedule JOIN schedule_details ON schedule.id = schedule_details.id_Schedule JOIN notify_key ON schedule_details.id_User = notify_key.id_User WHERE start_time LIKE '${ngay}%' GROUP BY schedule_details.id_Schedule`;
        console.log("sql khach hang", sql)
        db.query(sql, (err, rown, response) => {
            if (err) throw err
            for (var i = 0; i < rown.length; i++) {
                var a = rown[i].start_time.toString();
                var gio_db = Number(a.slice(16, 18));
                var phut_db = Number(a.slice(19, 21));
                if (is_gio_ht == gio_db && phut_db == 0) {
                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: [rown[i].on_key],
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify,
                            data: is_OpenRoles.data_notify
                        },
                        {
                            headers: {
                                Authorization: is_OpenRoles.Authorization_notify,
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                        .then(function (response) {
                            console.log("notify thanh cong")
                        })
                        .catch(function (error) {
                            console.log("error", error)
                        });
                    var id_User = rown[i].id_User;

                    let sql_select = `SELECT fullName FROM user WHERE id = ${id_User}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: is_OpenRoles.priority_notify,
                            id_User: id_User,
                            receiver: rowk[0].fullName,
                        }
                        let sql = `INSERT INTO notification SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                    });
                } else if (gio_ht == gio_db && phut_db == 0 && phut_ht >= 0) {
                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: rown[i].on_key,
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify,
                            data: is_OpenRoles.data_notify
                        },
                        {
                            headers: {
                                Authorization: is_OpenRoles.Authorization_notify,
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                        .then(function (response) {
                            console.log("notify thanh cong")
                        })
                        .catch(function (error) {
                            console.log("error", error)
                        });

                    var id_User = rown[i].id_User;

                    let sql_select = `SELECT fullName FROM user WHERE id = ${id_User}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: is_OpenRoles.priority_notify,
                            id_User: id_User,
                            receiver: rowk[0].fullName,
                        }
                        let sql = `INSERT INTO notification SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                    });


                } else if (gio_ht == gio_db && phut_db == 0 && phut_ht <= 30) {

                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: rown[i].on_key,
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify,
                            data: is_OpenRoles.data_notify
                        },
                        {
                            headers: {
                                Authorization: is_OpenRoles.Authorization_notify,
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                        .then(function (response) {
                            console.log("notify thanh cong")
                        })
                        .catch(function (error) {
                            console.log("error", error)
                        });

                    var id_User = rown[i].id_User;
                    let sql_select = `SELECT fullName FROM user WHERE id = ${id_User}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: is_OpenRoles.priority_notify,
                            id_User: id_User,
                            receiver: rowk[0].fullName,
                        }
                        let sql = `INSERT INTO notification SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                    });
                }

                if (gio_ht == gio_db && phut_db == 30 && phut_ht >= 15) {

                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: rown[i].on_key,
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify,
                            data: is_OpenRoles.data_notify
                        },
                        {
                            headers: {
                                Authorization: is_OpenRoles.Authorization_notify,
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                        .then(function (response) {
                            console.log("notify thanh cong")
                        })
                        .catch(function (error) {
                            console.log("error", error)
                        });

                    var id_User = rown[i].id_User;
                    let sql_select = `SELECT fullName FROM user WHERE id = ${id_User}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: is_OpenRoles.priority_notify,
                            id_User: id_User,
                            receiver: rowk[0].fullName,
                        }
                        let sql = `INSERT INTO notification SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                    });
                } else if (gio_ht == gio_db && phut_db == 30 && phut_ht >= 30) {

                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: rown[i].on_key,
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify,
                            data: is_OpenRoles.data_notify
                        },
                        {
                            headers: {
                                Authorization: is_OpenRoles.Authorization_notify,
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                        .then(function (response) {
                            console.log("notify thanh cong")
                        })
                        .catch(function (error) {
                            console.log("error", error)
                        });

                    var id_User = rown[i].id_User;
                    let sql_select = `SELECT fullName FROM user WHERE id = ${id_User}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: is_OpenRoles.priority_notify,
                            id_User: id_User,
                            receiver: rowk[0].fullName,
                        }
                        let sql = `INSERT INTO notification SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                    });
                } else if (is_gio_ht == gio_db && phut_db == 30 && phut_ht >= 0) {

                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: rown[i].on_key,
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify,
                            data: is_OpenRoles.data_notify
                        },
                        {
                            headers: {
                                Authorization: is_OpenRoles.Authorization_notify,
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                        .then(function (response) {
                            console.log("notify thanh cong")
                        })
                        .catch(function (error) {
                            console.log("error", error)
                        });

                    var id_User = rown[i].id_User;
                    let sql_select = `SELECT fullName FROM user WHERE id = ${id_User}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: is_OpenRoles.priority_notify,
                            id_User: id_User,
                            receiver: rowk[0].fullName,
                        }
                        let sql = `INSERT INTO notification SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                    });

                }
            }

        })

        // res.json(rown);

// var  gio = ngay + (Number(check_time.slice(11,13)) +12).toString() +phut;
// var check_time_schedule = check_PM == 'PM' ? (gio) : (check_time.slice(0,16));
// let sql = `SELECT notify_key.id_User as id_User, notify_key.on_key as on_key FROM schedule JOIN schedule_details ON schedule.id = schedule_details.id_Schedule JOIN notify_key ON schedule_details.id_User = notify_key.id_User WHERE start_time LIKE '${check_time_schedule}%' GROUP BY schedule_details.id_Schedule`;
// console.log("sql khach hang",sql)
// db.query(sql, (err, rown, response) => {
//     if (err) throw err
//     if(rown != ''){
//         var  registration_ids =[];
//         for (var i = 0 ; i<rown.length;i++){
//             registration_ids.push(rown[i].on_key);
//         }
//         var urls = "https://fcm.googleapis.com/fcm/send";
//         let priority = 'high';
//         let notification = {
//             "title": "Chào bạn",
//             "text": "Chào bạn đến lịch làm nails của bạn!"
//         };
//         let data = {
//             "title": "Firebase Notification Example",
//             "detail": "This firebase"
//         };
//         axios.post(urls, {
//                 registration_ids: registration_ids,
//                 priority: priority,
//                 notification: notification,
//                 data: data
//             },
//             {
//                 headers:{
//                     Authorization: 'key=AAAAI03A8A0:APA91bGsIIK6IvC_0r_mkJo38wpIHuHZoNbGqNzM_17s5FSv7L8fxKCf4fLoB0t61RZb4_dbGYbBdeP2FPxTx8P2K0MAaUJcaTXde4IB00k85yvCKb8SyxnSXUKmvkyI7XjOqrGHgXAI',
//                     'Content-Type': 'application/json'
//                 }
//             }
//         )
//             .then(function (response) {
//                 console.log("notify thanh cong")
//             })
//             .catch(function (error) {
//                 console.log("error",error)
//             });
//
//     }else {
//         console.log("NO User khach hang push notify!");
//     }
// })
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
