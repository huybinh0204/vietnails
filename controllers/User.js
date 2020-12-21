const db = require('../service');
const user_model = require('../models/User_model');
var md5 = require('md5');
var is_OFFSET = 0;
var is_LIMIT = 10;
var Eis_OFFSET;
const axios = require('axios');
const random_random = require("../config/OpenRoles");
var moment = require('moment-timezone');
var time = moment().format("YYYY-MM-DD");
module.exports = {
    _get: (req, res) => {
        res.render('index', {title: 'VietNails', Get_api: 'api'});
    },
    get: (req, res) => {
        is_OFFSET = is_OFFSET + is_LIMIT
        var sql = `SELECT * FROM user WHERE is_active < 2`;
        // if (is_OFFSET <= 10){
        //     sql = `SELECT * FROM user WHERE is_active < 2 LIMIT ${is_LIMIT} OFFSET 0 `;
        //     // console.log("3333",sql)
        // }else{
        //     Eis_OFFSET = is_OFFSET - is_LIMIT;
        //     sql = `SELECT * FROM user WHERE is_active < 2 LIMIT ${is_LIMIT} OFFSET ${Eis_OFFSET} `;
        // }
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrUser = {
                    [user_model.id]: rown[i].id,
                    [user_model.phone]: rown[i].phone,
                    [user_model.email]: rown[i].email,
                    [user_model.fullName]: rown[i].fullName,
                    [user_model.id_roles]: rown[i].id_roles,
                    [user_model.avatar]: rown[i].avatar,
                    [user_model.address]: rown[i].address,
                    [user_model.birthday]: rown[i].birthday,
                    [user_model.gender]: rown[i].gender,
                    [user_model.is_active]: rown[i].is_active,
                    [user_model.created_user]: rown[i].created_user
                };
                obj.push(ArrUser);
            }
            var _ArrUser = JSON.stringify(obj);
            var UserJson = JSON.parse(_ArrUser);
            var ArrGetUser = [{"status": "200", "data": UserJson}]
            res.json(ArrGetUser);
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM user WHERE id = ? '
        db.query(sql, [req.params.userId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrUser = {
                    [user_model.id]: rown[i].id,
                    [user_model.phone]: rown[i].phone,
                    [user_model.email]: rown[i].email,
                    [user_model.fullName]: rown[i].fullName,
                    [user_model.id_roles]: rown[i].id_roles,
                    [user_model.avatar]: rown[i].avatar,
                    [user_model.address]: rown[i].address,
                    [user_model.birthday]: rown[i].birthday,
                    [user_model.gender]: rown[i].gender,
                    [user_model.is_active]: rown[i].is_active,
                    [user_model.created_user]: rown[i].created_user
                };
                obj.push(ArrUser);
            }
            var _ArrUser = JSON.stringify(obj);
            var UserJson = JSON.parse(_ArrUser);
            var ArrGetUser = [{"status": "200", "data": UserJson}]
            res.json(ArrGetUser);
        })
    },
    update: (req, res) => {
        let data = req.body;
        let userId = req.params.userId;
        let sql = `UPDATE user SET ? WHERE id = ?`;
        db.query(sql, [data, userId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", "message": 'Update success!'})
        })
    },
    //check sddt
    check_phone: (req, res) => {
        let phone = req.body.phone;
        var check_time = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD hh:mm:ss");
        var date = new Date();
        var is_created_otp = date.getTime();
        let sql = `SELECT * FROM user WHERE phone = "${phone}"`;
        db.query(sql, [{phone}], (err, rown, response) => {
            if (err) throw err
            var obj = [];
            if (rown != '') {
                var otp = random_random.open_otp(6);
                var otp_status = "N";
                var id_User = rown[0].id;
                var url = `${random_random.esms_url}?Phone=${phone}&Content=${otp}&ApiKey=${random_random.ApiKey}&SecretKey=` +
                    `${random_random.SecretKey}&Brandname=${random_random.Brandname}&SmsType=${random_random.SmsType}`;
                axios.get(url)
                    .then(function (response) {
                        if (response.data.CodeResult == 100) {
                            let sql_otp = `INSERT INTO check_otp SET ?`;
                            console.log("222s", sql_otp)
                            let created_otp = is_created_otp;
                            let at_created = check_time;
                            db.query(sql_otp, [{otp, otp_status, id_User, created_otp, at_created}], (err, response) => {
                                if (err) throw err
                                for (var i = 0; i < rown.length; i++) {
                                    var ArrUser = {
                                        [user_model.id]: rown[i].id,
                                        [user_model.phone]: rown[i].phone,
                                        [user_model.email]: rown[i].email,
                                        [user_model.fullName]: rown[i].fullName,
                                        [user_model.id_roles]: rown[i].id_roles,
                                        [user_model.avatar]: rown[i].avatar,
                                        [user_model.address]: rown[i].address,
                                        [user_model.birthday]: rown[i].birthday,
                                        [user_model.gender]: rown[i].gender,
                                        [user_model.is_active]: rown[i].is_active,
                                        [user_model.created_user]: rown[i].created_user
                                    };
                                    obj.push(ArrUser);
                                }
                                var _ArrUser = JSON.stringify(obj);
                                var UserJson = JSON.parse(_ArrUser);
                                var ArrGetUser = [{
                                    "status": "200",
                                    "message": 'Check phone success!',
                                    "data": UserJson
                                }]
                                res.json(ArrGetUser);
                            })
                        } else {
                            res.json({"status": "400", "message": 'Phone not valid:', "data": response.data})
                        }
                    })
                    .catch(function (error) {
                        console.log("err11")
                    });
            } else {
                res.json({"status": "400", "message": 'Check phone on!',});
            }
        })
    },
    // đỗi password
    update_password: (req, res) => {
        let password = md5(req.body.password);
        let userId = req.params.userId;
        let sql = `UPDATE user SET ? WHERE id = ?`;
        db.query(sql, [{password}, userId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", "message": 'Update Password Ok success!'})
        })
    },
    // check otp
    check_otp: (req, res) => {
        let id_User = req.body.id_User;
        let otp = req.body.on_key;
        let sql = `SELECT * FROM check_otp WHERE id_User = ${id_User} AND at_created LIKE "${time}%" ORDER BY id DESC LIMIT 1`;
        // console.log("sql check otp", sql)
        if (id_User != undefined && otp != '') {
            db.query(sql, (err, rown, response) => {
                if (err) throw err
                if (rown != '') {
                    let sql_otp = `SELECT * FROM check_otp WHERE otp_status = "N" AND otp="${otp}"`;
                    // console.log("sql_otp check max", sql_otp)
                    db.query(sql_otp, (err, rowns, response) => {
                        if (err) throw err
                        if (rowns != '') {
                            var id_User = rowns[0].id_User;
                            var is_created = Number(rowns[0].created_otp);
                            var check_created_otp = is_created + 120000;
                            var datetody = new Date();
                            var check_date_otpt = datetody.getTime();
                            console.log("check_created_otp", check_created_otp +">=" + check_date_otpt)
                            // luon db >= time
                            let otp_status = "Y";
                            let id = rowns[0].id;
                            let is_active = 0;
                            let is_sql_otp = `UPDATE check_otp SET ? WHERE id = ${id}`;
                            // console.log("is_sql_otp",is_sql_otp)
                            let user_sql = `UPDATE user SET ? WHERE id = ${id_User}`;
                            // console.log("user_sql",user_sql)
                            if (check_created_otp >= check_date_otpt) {
                                db.query(is_sql_otp, [{otp_status}], (err, response) => {
                                    if (err) throw err
                                    res.json({"status": "200", "message": 'User otp ok'})
                                })
                                db.query(user_sql, [{is_active}], (err, response) => {
                                    if (err) throw err
                                    console.log("check max otp thanh cong")
                                })
                            } else {
                                res.json({"status": "400", "message": 'User otp no'})
                            }
                        } else {
                            res.json({"status": "400", "message": 'User otp no'})
                        }
                    })
                } else {
                    res.json({"status": "400", "message": 'User otp no'})
                }

            })
        } else {
            res.json({"status": "400", "message": 'User otp no'})
        }
    },

    store: (req, res) => {
        var otp = random_random.open_otp(6);
        var otp_status = "N";
        var check_time = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD hh:mm:ss");
        var date = new Date();
        var is_created_otp = date.getTime();
        let sql_check = `SELECT id , phone , is_status ,is_active FROM user WHERE phone =(${req.body.phone})`;
        // console.log("sql_check",sql_check)
        db.query(sql_check, (err, rown, fields) => {
            if (err) throw err
            let phone = req.body.phone;
            var url = `${random_random.esms_url}?Phone=${phone}&Content=${otp}&ApiKey=${random_random.ApiKey}&SecretKey=` +
                `${random_random.SecretKey}&Brandname=${random_random.Brandname}&SmsType=${random_random.SmsType}`;
            let data = req.body.id_roles;

            if (rown == "" && data != undefined) {
                let password = md5(req.body.password);
                let fullName = req.body.fullName;
                let id_roles = req.body.id_roles;
                let id_Shop = req.body.id_Shop;
                let email = req.body.email;
                let is_status = 1;
                let is_active = 2;
                axios.get(url)
                    .then(function (response) {
                        if (response.data.CodeResult == 100) {
                            let sql = `INSERT INTO user SET ?`;
                            console.log("sql_user", sql)
                            db.query(sql, [{
                                phone,
                                password,
                                fullName,
                                id_roles,
                                id_Shop,
                                email,
                                is_status, is_active
                            }], (err, response) => {
                                if (err) throw err
                                let sql_SELECT = 'SELECT * FROM user WHERE phone = ?'
                                console.log("sql_SELECT", sql_SELECT)
                                db.query(sql_SELECT, [phone, password], (err, rown, fields) => {
                                    if (err) throw err
                                    var id_User = rown[0].id;
                                    let sql_otp = `INSERT INTO check_otp SET ?`;
                                    console.log("sql_otp", sql_otp)
                                    let created_otp = is_created_otp;
                                    let at_created = check_time;
                                    db.query(sql_otp, [{
                                        otp,
                                        otp_status,
                                        id_User,
                                        created_otp,
                                        at_created
                                    }], (err, response) => {
                                        if (err) throw err
                                        console.log("111",)
                                    })
                                    var obj = [];
                                    for (var i = 0; i < rown.length; i++) {
                                        var INSERTUser = {
                                            [user_model.id]: rown[i].id,
                                            [user_model.phone]: rown[i].phone,
                                            [user_model.email]: rown[i].email,
                                            [user_model.fullName]: rown[i].fullName,
                                            [user_model.id_roles]: rown[i].id_roles,
                                            [user_model.avatar]: rown[i].avatar,
                                            [user_model.address]: rown[i].address,
                                            [user_model.birthday]: rown[i].birthday,
                                            [user_model.gender]: rown[i].gender,
                                            [user_model.is_active]: rown[i].is_active,
                                            [user_model.created_user]: rown[i].created_user
                                        };
                                        obj.push(INSERTUser);
                                    }
                                    var _INSERTUser = JSON.stringify(obj);
                                    var INSERTUserJson = JSON.parse(_INSERTUser);
                                    res.json({"status": "200", "message": 'User INSERT Ok!', "data": INSERTUserJson})
                                })
                            })
                        } else {
                            res.json({"status": "400", "message": 'Phone not valid:', "data": response.data})
                        }

                    })
                    .catch(function (error) {
                        console.log("err1")
                    });
            } else if (rown[0].is_active == 2) {

                var id_User = rown[0].id;
                //check max otp trtong ngay
                let sql = `SELECT id FROM check_otp WHERE id_User = ${id_User} AND at_created LIKE "${time}%"`;
                db.query(sql, (err, rowns, response) => {
                    if (err) throw err
                    if (rowns.length < 3) {
                        axios.get(url)
                            .then(function (response) {
                                if (response.data.CodeResult == 100) {
                                let sql_otp = `INSERT INTO check_otp SET ?`;
                                let created_otp = is_created_otp;
                                let at_created = check_time;
                                console.log("sql_otp_co tronh db",sql_otp)
                                db.query(sql_otp, [{otp, otp_status, id_User, created_otp, at_created}], (err, response) => {
                                    if (err) throw err
                                    var obj = [];
                                    for (var i = 0; i < rown.length; i++) {
                                        var INSERTUser = {
                                            [user_model.id]: rown[i].id,
                                            [user_model.phone]: rown[i].phone,
                                            [user_model.created_user]: rown[i].created_user
                                        };
                                        obj.push(INSERTUser);
                                    }
                                    var _INSERTUser = JSON.stringify(obj);
                                    var INSERTUserJson = JSON.parse(_INSERTUser);
                                    res.json({"status": "200", "message": 'tao taoi khoan thanh cong!', "data": INSERTUserJson})
                                })
                                } else {
                                    res.json({"status": "400", "message": 'Phone not valid:', "data": response.data})
                                }
                            })
                            .catch(function (error) {
                                console.log("err11")
                            });
                    } else {
                        res.json({"status": "400", "message": 'quá 3 lần check otp!'})
                    }
                })
            } else {
                res.json({"status": "400", "message": 'Đã tồn tại !'})
            }
        })
    },
    delete: (req, res) => {
        let userId = req.params.userId;
        let sql = `SELECT id_roles  FROM user WHERE id = ${userId}`;
        db.query(sql, [userId], (err, rown, response) => {
            if (err) throw err
            if (rown[0].id_roles != 1) {
                let DE_sql = `UPDATE user SET is_active = 2 WHERE id = ?`
                db.query(DE_sql, [userId], (err, response) => {
                    if (err) throw err
                    res.json({"status": "200", "message": 'DELETE  success!'})
                })
            } else {
                res.json({"status": "400", "message": 'User No delete!'})
            }

        })
    },

    open_active: (req, res) => {
        let userId = req.params.userId;
        let is_active = req.body.is_active;
        let sql = `SELECT id_roles , is_active  FROM user WHERE id = ${userId}`;
        db.query(sql, (err, rown, response) => {
            if (err) throw err
            if (rown[0].id_roles != 1 && is_active <= 1) {

                let UP_sql = `UPDATE user SET ? WHERE id = ?`;
                db.query(UP_sql, [{is_active}, userId], (err, response) => {
                    if (err) throw err
                    res.json({"status": "200", "message": 'Open  success!'})
                })
            } else {
                res.json({"status": "400", "message": 'NO Success !'})
            }

        })

    }
    // store: (req, res) => {
    //     let sql_check = `SELECT phone  FROM user WHERE phone =(${req.body.phone})`;
    //     db.query(sql_check, (err, rown, fields) => {
    //         if (err) throw err
    //         let data =req.body.id_roles;
    //         if (rown == "" && data != undefined) {
    //             // if ( data <= 5 ) {
    //             let phone = req.body.phone;
    //             let password = md5(req.body.password);
    //             let fullName = req.body.fullName;
    //             let id_roles = req.body.id_roles;
    //             let id_Shop = req.body.id_Shop;
    //             let email = req.body.email;
    //             let sql = `INSERT INTO user SET ?`;
    //             db.query(sql, [{phone,password,fullName,id_roles,id_Shop,email}], (err, response) => {
    //                 if (err) throw err
    //                 let sql = 'SELECT * FROM user WHERE phone = ?'
    //                 db.query(sql, [phone,password], (err, rown, fields) => {
    //                     if (err) throw err
    //                     var obj = [];
    //                     for (var i = 0; i < rown.length; i++) {
    //                         var INSERTUser = {
    //                             [user_model.id]: rown[i].id,
    //                             [user_model.phone]: rown[i].phone,
    //                             [user_model.email]: rown[i].email,
    //                             [user_model.fullName]: rown[i].fullName,
    //                             [user_model.id_roles]: rown[i].id_roles,
    //                             [user_model.avatar]: rown[i].avatar,
    //                             [user_model.address]: rown[i].address,
    //                             [user_model.birthday]: rown[i].birthday,
    //                             [user_model.gender]: rown[i].gender,
    //                             [user_model.is_active]: rown[i].is_active,
    //                             [user_model.created_user]: rown[i].created_user
    //                         };
    //                         obj.push(INSERTUser);
    //                     }
    //                     var _INSERTUser = JSON.stringify(obj);
    //                     var INSERTUserJson = JSON.parse(_INSERTUser);
    //                     res.json({"status": "200", "message": 'User INSERT Ok!', "data": INSERTUserJson})
    //                 })
    //             })
    //             // }else {
    //             //     res.json({"status": "400", "message": 'User On INSERT Table lever Wrong !'})
    //             // }
    //         } else {
    //             res.json({"status": "400", "message": 'User On INSERT !'})
    //         }
    //     })
    // },
}

