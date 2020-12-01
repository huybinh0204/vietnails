const db = require('../service');
const random_random = require("../config/OpenRoles");
const schedule_details_mode = require("../models/Schedule_details_model")
module.exports = {
    get: (req, res) => {
        let sql = `SELECT * FROM schedule`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrSchedule = {
                    id: rown[i].id,
                    code_schedule: rown[i].code_schedule,
                    start_time: rown[i].start_time,
                    moneys: rown[i].moneys,
                    minus_point: rown[i].minus_point,
                    phone_nv: rown[i].phone_nv,
                    status: rown[i].status,
                    Username: rown[i].Username,
                    content_schedule: rown[i].content_schedule,
                    created_schedule: rown[i].created_schedule,
                };
                obj.push(ArrSchedule);
            }
            var _ArrSchedule = JSON.stringify(obj);
            var ScheduleJson = JSON.parse(_ArrSchedule);
            var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
            res.json(ArrGetSchedule);
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM schedule JOIN schedule_details ON schedule_details.id_Schedule=schedule.id WHERE schedule.id = ?'
        db.query(sql, [req.params.scheduleId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrSchedule = {
                    id: rown[i].id,
                    code_schedule: rown[i].code_schedule,
                    start_time: rown[i].start_time,
                    moneys: rown[i].moneys,
                    minus_point: rown[i].minus_point,
                    phone_nv: rown[i].phone_nv,
                    status: rown[i].status,
                    Username: rown[i].Username,
                    content_schedule: rown[i].content_schedule,
                    created_schedule: rown[i].created_schedule,
                };
                obj.push(ArrSchedule);
            }
            var _ArrSchedule = JSON.stringify(obj);
            var ScheduleJson = JSON.parse(_ArrSchedule);
            var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
            res.json(ArrGetSchedule);
        })
    },
    list_detail: (req, res) => {
        let sql = `SELECT DISTINCT schedule.id, code_schedule,start_time,moneys,minus_point,phone_nv,content_schedule FROM schedule ` +
            `JOIN schedule_details ON schedule_details.id_Schedule = schedule.id WHERE schedule_details.id_User = ?`;
        db.query(sql, [req.params.scheduleId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrSchedule = {
                    id: rown[i].id,
                    code_schedule: rown[i].code_schedule,
                    start_time: rown[i].start_time,
                    moneys: rown[i].moneys,
                    minus_point: rown[i].minus_point,
                    phone_nv: rown[i].phone_nv,
                    id_Shop: rown[i].status,
                    id_promotion: rown[i].Username,
                    content_schedule: rown[i].content_schedule,
                };
                obj.push(ArrSchedule);
            }
            var _ArrSchedule = JSON.stringify(obj);
            var ScheduleJson = JSON.parse(_ArrSchedule);
            var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
            res.json(ArrGetSchedule);
        })
    },
    update: (req, res) => {
        let data = req.body;
        let scheduleId = req.params.scheduleId;
        let sql = 'UPDATE schedule SET ? WHERE id = ?'
        db.query(sql, [data, scheduleId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", schedule: 'Update success!'})
        })
    },
    store: (req, res) => {
        var code_schedule = random_random.randomString(10);
        let start_time = req.body.start_time;
        let end_time = req.body.end_time;
        let moneys = req.body.moneys;
        let id_Shop = req.body.id_Shop;
        let id_promotion = req.body.id_promotion;
        let content_schedule = req.body.content_schedule;
        let id_schedule_details = req.body.id_schedule_details;
        let phone_kh = req.body.phone_kh;
        let id_User = req.body.id_User;

        if (start_time && end_time && moneys && id_Shop && id_promotion && content_schedule != null) {
            let sql = `SELECT number FROM promotion WHERE id =${id_promotion}`;
            db.query(sql, (err, rows, response) => {
                if (err) throw err
                var number = rows.map(x => x.number);
                var is_number = number.toString();
                var minus_point = Math.ceil((moneys * is_number) / 100000);
                var data = {
                    code_schedule: code_schedule,
                    start_time: start_time,
                    end_time: end_time,
                    moneys: moneys,
                    minus_point: minus_point,
                    id_Shop: id_Shop,
                    id_promotion: id_promotion,
                    content_schedule: content_schedule,
                    status: 0
                }
                let sql = `INSERT INTO schedule SET ?`;
                db.query(sql, [data], (err, response) => {
                    if (err) throw err
                    let sqlSELECT = `SELECT MAX(id) as id FROM schedule`;
                    db.query(sqlSELECT, (err, rownM, fields) => {
                        if (err) throw err
                        const Idmap = rownM.map(x => x.id);
                        var ServiceJson = JSON.parse(Idmap);
                        let _sqlSELECT = 'SELECT * FROM schedule WHERE id = ?';
                        db.query(_sqlSELECT, [ServiceJson], (err, rown, fields) => {
                            if (err) throw err
                            var obj = [];
                            for (var i = 0; i < rown.length; i++) {
                                var ArrSchedule = {
                                    id: rown[i].id,
                                    code_schedule: rown[i].code_schedule,
                                    start_time: rown[i].start_time,
                                    end_time: rown[i].end_time,
                                    moneys: rown[i].moneys,
                                    minus_point: rown[i].minus_point,
                                    phone_nv: rown[i].phone_nv,
                                    status: rown[i].status,
                                    Username: rown[i].Username,
                                    content_schedule: rown[i].content_schedule,
                                    created_schedule: rown[i].created_schedule,
                                };
                                obj.push(ArrSchedule);
                            }
                            var _ArrSchedule = JSON.stringify(obj);
                            var ScheduleJson = JSON.parse(_ArrSchedule);
                            var ArrGetSchedule = [{
                                "status": "200",
                                message: 'Schedule INSERT Ok!',
                                "data": ScheduleJson
                            }]
                            res.json(ArrGetSchedule);
                        })
                    })
                    // INSERT INTO schedule_details
                    let sql_schedule_details = `SELECT id FROM schedule WHERE code_schedule ="${code_schedule}"`;
                    db.query(sql_schedule_details, (err, rowsk, response) => {
                        if (err) throw err
                        var id_Schedule = Number(rowsk.map(x => x.id).toString());
                        for (var k = 0; k < id_schedule_details.length; k++) {
                            var id_Service_shop = id_schedule_details[k].id_Service_shop;
                            var working_time = id_schedule_details[k].working_time;
                            var data_schedule_details = {
                                phone_kh: phone_kh,
                                id_User: id_User,
                                id_Schedule: id_Schedule,
                                id_Service_shop: id_Service_shop,
                                working_time: working_time,
                            }
                            let is_sql_schedule_details = 'INSERT INTO schedule_details SET ?';
                            db.query(is_sql_schedule_details, [data_schedule_details], (err, rown, fields) => {
                                if (err) throw err
                                console.log("Schedule_details INSERT OK")
                            })
                        }
                    })
                })
            });
        } else {
            res.json({"status": "400", message: 'schedule No INSERT !'});
        }

    },

    Open_Schedule: (req, res, next) => {
        // var d = new Date();
        // var _date = d.getDate();
        // var _dateN = d.getDate() + 1;
        // var _month = d.getMonth() + 1;
        // var _year = d.getFullYear();
        //
        // var _hours = d.getHours();
        // var _minutes = d.getMinutes();
        // var _seconds = d.getSeconds();
        // var hlj = _hours + ":" + _minutes + ":" + _seconds;
        // var amc = _year + "-" + _month + "-" + _date;
        // var _amc = _year + "-" + _month + "-" + _dateN;
        //-----------
        let start_time = req.body.start_time;
        let id_User = req.body.id_User;
        let sql = `SELECT end_time,start_time,status,working_time FROM schedule_details JOIN schedule `+
            `ON schedule_details.id_Schedule = schedule.id WHERE start_time LIKE '${start_time}%' and schedule.id_User = ${id_User}`;

        db.query(sql, [start_time, req.params.start_time], (err, rown, fields) => {
            if (err) throw err
            var derts = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
                "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
                "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

            var objN = [];
            var ArrSchedule;
            for (var i = 0; i < derts.length; i++) {
                var x = derts[i];
                if (rown.length > 0) {
                    for (var k = 0; k < rown.length; k++) {
                        var working_time = rown[k].working_time;
                        var status = rown[k].status;
                        var start_time = rown[k].start_time;
                        var end_time = rown[k].end_time;

                        if (x == working_time) {
                            ArrSchedule = {
                                working_time: working_time,
                                start_time: start_time,
                                end_time: end_time,
                                status: status,
                            };
                            ArrSchedule && objN.push(ArrSchedule)
                            break
                        } else {
                            if (k == (rown.length - 1)) {
                                ArrSchedule = {
                                    working_time: x,
                                    status: 3,
                                };
                                ArrSchedule && objN.push(ArrSchedule)
                            }
                        }

                    }
                } else {
                    ArrSchedule = {
                        working_time: x,
                        status: 3,
                    };
                    ArrSchedule && objN.push(ArrSchedule)
                }

            }
            // for (var i = 8; i < 22; i++) {
            //     var l = 0;
            //     while (l <= 30) {
            //         var x;
            //         if (i > 9) {
            //             x = l == 0 ? (i + ":" + l + 0) : (i + ":" + l);
            //         } else {
            //             x = l == 0 ? ("0" + i + ":" + l + 0) : ("0" + i + ":" + l);
            //         }
            //         for (var k = 0; k < rown.length; k++) {
            //             var working_time = rown[k].working_time;
            //             var status = rown[k].status;
            //             var start_time = rown[k].start_time;
            //             var end_time = rown[k].end_time;
            //             if (x == working_time) {
            //                 ArrSchedule = {
            //                     working_time: working_time,
            //                     start_time: start_time,
            //                     end_time: end_time,
            //                     status: status,
            //                 };
            //                 ArrSchedule && objN.push(ArrSchedule)
            //                 break
            //             } else {
            //                 if (k == (rown.length - 1)) {
            //                     ArrSchedule = {
            //                         working_time: x,
            //                         status: 3,
            //                     };
            //                     ArrSchedule && objN.push(ArrSchedule)
            //                 }
            //             }
            //
            //         }
            //         l = l + 30
            //     }
            // }
            res.json(objN);
        })
    },
    // store: (req, res) => {
    //     var code_schedule = random_random.randomString(10);
    //     let start_time = req.body.start_time;
    //     let end_time = req.body.end_time;
    //     let moneys = req.body.moneys;
    //     let id_Shop = req.body.id_Shop;
    //     let id_promotion = req.body.id_promotion;
    //     let content_schedule = req.body.content_schedule;
    //     let id_schedule_details = req.body.id_schedule_details;
    //
    //     if (start_time && end_time && moneys && id_Shop && id_promotion && content_schedule != null) {
    //         let sql = `SELECT number FROM promotion WHERE id =${id_promotion}`;
    //         db.query(sql, (err, rows, response) => {
    //             if (err) throw err
    //             var number = rows.map(x => x.number);
    //             var is_number = number.toString();
    //             var minus_point = Math.ceil((moneys * is_number) / 100000);
    //             var data = {
    //                 code_schedule: code_schedule,
    //                 start_time: start_time,
    //                 end_time: end_time,
    //                 moneys: moneys,
    //                 minus_point: minus_point,
    //                 id_Shop: id_Shop,
    //                 id_promotion: id_promotion,
    //                 content_schedule: content_schedule,
    //                 status: 0
    //             }
    //             let sql = `INSERT INTO schedule SET ?`;
    //             db.query(sql, [data], (err, response) => {
    //                 if (err) throw err
    //                 let sqlSELECT = `SELECT MAX(id) as id FROM schedule`;
    //                 db.query(sqlSELECT, (err, rownM, fields) => {
    //                     if (err) throw err
    //                     const Idmap = rownM.map(x => x.id);
    //                     var ServiceJson = JSON.parse(Idmap);
    //                     let _sqlSELECT = 'SELECT * FROM schedule WHERE id = ?';
    //                     db.query(_sqlSELECT, [ServiceJson], (err, rown, fields) => {
    //                         if (err) throw err
    //                         var obj = [];
    //                         for (var i = 0; i < rown.length; i++) {
    //                             var ArrSchedule = {
    //                                 id: rown[i].id,
    //                                 code_schedule: rown[i].code_schedule,
    //                                 start_time: rown[i].start_time,
    //                                 end_time: rown[i].end_time,
    //                                 moneys: rown[i].moneys,
    //                                 minus_point: rown[i].minus_point,
    //                                 phone_nv: rown[i].phone_nv,
    //                                 status: rown[i].status,
    //                                 Username: rown[i].Username,
    //                                 content_schedule: rown[i].content_schedule,
    //                                 created_schedule: rown[i].created_schedule,
    //                             };
    //                             obj.push(ArrSchedule);
    //                         }
    //                         var _ArrSchedule = JSON.stringify(obj);
    //                         var ScheduleJson = JSON.parse(_ArrSchedule);
    //                         var ArrGetSchedule = [{
    //                             "status": "200",
    //                             message: 'Schedule INSERT Ok!',
    //                             "data": ScheduleJson
    //                         }]
    //                         res.json(ArrGetSchedule);
    //                     })
    //                 })
    //                 // INSERT INTO schedule_details
    //                 let sql_schedule_details = `SELECT id FROM schedule WHERE code_schedule ="${code_schedule}"`;
    //                 db.query(sql_schedule_details, (err, rowsk, response) => {
    //                     if (err) throw err
    //                     var id_Schedule = Number(rowsk.map(x => x.id).toString());
    //                     var derts = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
    //                         "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
    //                         "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
    //
    //
    //                     for (var k = 0; k < id_schedule_details.length; k++) {
    //                         var phone_kh = id_schedule_details[k].phone_kh;
    //                         var id_Service_shop = id_schedule_details[k].id_Service_shop;
    //                         var id_User_kh = id_schedule_details[k].id_User;
    //                         var working_time = id_schedule_details[k].working_time;
    //                         // for (var j = 0; j < derts.length; j++) {
    //                         //     if (derts[j] >= is_start_time) {
    //                         //         if (derts[j] <= is_end_time) {
    //                         var data_schedule_details = {
    //                             phone_kh: phone_kh,
    //                             id_User: id_User_kh,
    //                             id_Schedule: id_Schedule,
    //                             id_Service_shop: id_Service_shop,
    //                             working_time: working_time,
    //                         }
    //                         // if (j == (id_schedule_details.length - 1)) {
    //                         let is_sql_schedule_details = 'INSERT INTO schedule_details SET ?';
    //                         db.query(is_sql_schedule_details, [data_schedule_details], (err, rown, fields) => {
    //                             if (err) throw err
    //                             console.log("Schedule_details INSERT OK")
    //                         })
    //                         // }
    //                     }
    //                     //         }
    //                     //     }
    //                     //
    //                     // }
    //                 })
    //             })
    //         });
    //     } else {
    //         res.json({"status": "400", message: 'schedule No INSERT !'});
    //     }
    //
    // },
}

