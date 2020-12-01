const db = require('../service');
const user_model = require('../models/User_model');
var md5 = require('md5');
var is_OFFSET = 0;
var is_LIMIT = 10;
var Eis_OFFSET;
module.exports = {
    _get: (req, res) => {
        res.render('index', {title: 'VietNails', Get_api: 'api'});
    },
    get: (req, res) => {
        is_OFFSET = is_OFFSET + is_LIMIT
        var sql='';
        if (is_OFFSET <= 10){
            sql = `SELECT * FROM user WHERE is_active < 2 LIMIT ${is_LIMIT} OFFSET 0 `;
            console.log("3333",sql)
        }else{
            Eis_OFFSET = is_OFFSET - is_LIMIT;
            sql = `SELECT * FROM user WHERE is_active < 2 LIMIT ${is_LIMIT} OFFSET ${Eis_OFFSET} `;
            console.log("222",sql)
        }

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
        let sql =`UPDATE user SET ? WHERE id = ?`;
        db.query(sql, [data, userId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", "message": 'Update success!'})
        })
    },
    //Update Password Ok success!
    update_password: (req, res) => {
        let password = md5(req.body.password);
        let userId = req.params.userId;
        let sql =`UPDATE user SET ? WHERE id = ?`;
        db.query(sql, [{password}, userId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", "message": 'Update Password Ok success!'})
        })
    },
    store: (req, res) => {
        let sql_check = `SELECT phone  FROM user WHERE phone =(${req.body.phone})`;
        db.query(sql_check, (err, rown, fields) => {
            if (err) throw err
            let data =req.body.id_roles;
            if (rown == "" && data != undefined) {
                // if ( data <= 5 ) {
                    let phone = req.body.phone;
                    let password = md5(req.body.password);
                    let fullName = req.body.fullName;
                    let id_roles = req.body.id_roles;
                    let id_Shop = req.body.id_Shop;
                    let email = req.body.email;
                    let is_status = 1;
                    let sql = `INSERT INTO user SET ?`;
                    db.query(sql, [{phone,password,fullName,id_roles,id_Shop,email,is_status}], (err, response) => {
                        if (err) throw err
                        let sql = 'SELECT * FROM user WHERE phone = ?'
                        db.query(sql, [phone,password], (err, rown, fields) => {
                            if (err) throw err
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
                // }else {
                //     res.json({"status": "400", "message": 'User On INSERT Table lever Wrong !'})
                // }
            } else {
                res.json({"status": "400", "message": 'User On INSERT !'})
            }
        })
    },
    delete: (req, res) => {
        let userId = req.params.userId;
        let sql = `SELECT id_roles  FROM user WHERE id = ${userId}`;
        db.query(sql,[userId], (err,rown, response) => {
            if (err) throw err
            if(rown[0].id_roles != 1 ){
                let DE_sql =`UPDATE user SET is_active = 2 WHERE id = ?`
                db.query(DE_sql, [userId], (err, response) => {
                    if (err) throw err
                    res.json({"status": "200", "message": 'DELETE  success!'})
                })
            }else {
                res.json({"status": "400", "message": 'User No delete!'})
            }

        })
    },

    open_active: (req, res) => {
        let userId = req.params.userId;
        let is_active = req.body.is_active;
        let sql = `SELECT id_roles , is_active  FROM user WHERE id = ${userId}`;
        db.query(sql, (err,rown, response) => {
            if (err) throw err
            if(rown[0].id_roles != 1 && is_active <= 1){

                let UP_sql =`UPDATE user SET ? WHERE id = ?`;
                db.query(UP_sql, [{is_active}, userId], (err, response) => {
                    if (err) throw err
                    res.json({"status": "200", "message": 'Open  success!'})
                })
            }else {
                res.json({"status": "400", "message": 'NO Success !'})
            }

        })

    }
}

