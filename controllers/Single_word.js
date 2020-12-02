const db = require('../service');
const single_word_model = require('../models/Single_word_model');
const user_model = require("../models/User_model");
var is_OFFSET = 0;
var is_LIMIT = 10;
var Eis_OFFSET;
module.exports = {
    get_list: (req, res) => {
        // is_OFFSET = is_OFFSET + is_LIMIT;
        var sql = `SELECT * FROM single_word  ORDER BY id DESC`;
        // if (is_OFFSET <= 10) {
        //     sql = `SELECT * FROM single_word  ORDER BY id DESC LIMIT ${is_LIMIT} OFFSET  0 `;
        // } else {
        //     Eis_OFFSET = is_OFFSET - is_LIMIT;
        //     sql = `SELECT * FROM single_word ORDER BY id DESC LIMIT ${is_LIMIT} OFFSET ${Eis_OFFSET} `;
        // }
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var Arrsingle_word = {
                    [single_word_model.id]: rown[i].id,
                    [single_word_model.content]: rown[i].content,
                    [single_word_model.is_types]: rown[i].is_types,
                    [single_word_model.begin_date]: rown[i].begin_date,
                    [single_word_model.end_date]: rown[i].end_date,
                    [single_word_model.is_status]: rown[i].is_status,
                    [single_word_model.id_User]: rown[i].id_User,
                    [single_word_model.created_single]: rown[i].created_single,

                };
                obj.push(Arrsingle_word);
            }
            var _Arrsingle_word = JSON.stringify(obj);
            var single_wordJson = JSON.parse(_Arrsingle_word);
            var ArrGetsingle_word = [{"status": "200", "data": single_wordJson}]
            res.json(ArrGetsingle_word);
        })
    },
    get: (req, res) => {
        // is_OFFSET = is_OFFSET + is_LIMIT;
        var sql = `SELECT * FROM single_word WHERE id_User = ? ORDER BY id DESC`;
        // if (is_OFFSET <= 10) {
        //     sql = `SELECT * FROM single_word WHERE id_User = ? ORDER BY id DESC LIMIT ${is_LIMIT} OFFSET  0 `;
        // } else {
        //     Eis_OFFSET = is_OFFSET - is_LIMIT;
        //     sql = `SELECT * FROM single_word WHERE id_User = ? ORDER BY id DESC LIMIT ${is_LIMIT} OFFSET ${Eis_OFFSET} `;
        // }
        db.query(sql, [req.params.single_UserId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var Arrsingle_word = {
                    [single_word_model.id]: rown[i].id,
                    [single_word_model.content]: rown[i].content,
                    [single_word_model.is_types]: rown[i].is_types,
                    [single_word_model.begin_date]: rown[i].begin_date,
                    [single_word_model.end_date]: rown[i].end_date,
                    [single_word_model.is_status]: rown[i].is_status,
                    [single_word_model.id_User]: rown[i].id_User,
                    [single_word_model.created_single]: rown[i].created_single,

                };
                obj.push(Arrsingle_word);
            }
            var _Arrsingle_word = JSON.stringify(obj);
            var single_wordJson = JSON.parse(_Arrsingle_word);
            var ArrGetsingle_word = [{"status": "200", "message": 'Single_word list !', "data": single_wordJson}]
            res.json(ArrGetsingle_word);
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM single_word WHERE id = ?'
        db.query(sql, [req.params.single_wordId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var Arrsingle_word = {
                    [single_word_model.id]: rown[i].id,
                    [single_word_model.content]: rown[i].content,
                    [single_word_model.is_types]: rown[i].is_types,
                    [single_word_model.begin_date]: rown[i].begin_date,
                    [single_word_model.end_date]: rown[i].end_date,
                    [single_word_model.is_status]: rown[i].is_status,
                    [single_word_model.id_User]: rown[i].id_User,
                    [single_word_model.created_single]: rown[i].created_single,

                };
                obj.push(Arrsingle_word);
            }
            var _Arrsingle_word = JSON.stringify(obj);
            var single_wordJson = JSON.parse(_Arrsingle_word);
            var ArrGetsingle_word = [{"status": "200", "message": 'Single_word detail !', "data": single_wordJson}]
            res.json(ArrGetsingle_word);
        })
    },
    list_mployees: (req, res) => {
        var begin_date = req.body.begin_date;
        let sql =``;
        if(begin_date == undefined || begin_date == ""){
            var a = new Date();
            begin_date_ = a.getFullYear()+"-"+(a.getMonth()+1)+"-"+(a.getDay()-1);
            sql = `SELECT * FROM user WHERE id NOT IN (SELECT id_User FROM single_word WHERE ` +
                `single_word.end_date >= "${begin_date_}%" and single_word.begin_date <= "${begin_date_}%") and id_roles = 2 and is_active =0`;
        }else {
            sql = `SELECT * FROM user WHERE id NOT IN (SELECT id_User FROM single_word WHERE ` +
                `single_word.end_date >= "${begin_date}%" and single_word.begin_date <= "${begin_date}%") and id_roles = 2 and is_active =0`;
        }
        db.query(sql, [req.params.single_wordId], (err, rown, fields) => {
                if (err) throw err

                //     let difference = a.filter(x => !b.includes(x));
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
                var ArrGetUser = [{"status": "200", "message": 'User mployees go to work!', "data": UserJson}]
                res.json(ArrGetUser);

            }
        )
    },
    update: (req, res) => {
        let data = req.body;
        let single_wordId = req.params.single_wordId;
        let sql = `UPDATE single_word SET ? WHERE id = ?`;
        db.query(sql, [data, single_wordId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", "message": 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        console.log("qqq", JSON.stringify(data))
        if (JSON.stringify(data) != '{}') {
            let sql = `INSERT INTO single_word SET ?`;
            db.query(sql, [data], (err, response) => {
                if (err) throw err
                let sqlSELECT = `SELECT MAX(id) as id FROM single_word`;
                db.query(sqlSELECT, (err, rownM, fields) => {
                    if (err) throw err
                    const Idmap = rownM.map(x => x.id);
                    var ShopJson = JSON.parse(Idmap);
                    let _sqlSELECT = 'SELECT * FROM single_word WHERE id = ?'
                    db.query(_sqlSELECT, [ShopJson], (err, rown, fields) => {
                        if (err) throw err
                        var obj = [];
                        for (var i = 0; i < rown.length; i++) {
                            var Arrsingle_word = {
                                [single_word_model.id]: rown[i].id,
                                [single_word_model.content]: rown[i].content,
                                [single_word_model.is_types]: rown[i].is_types,
                                [single_word_model.begin_date]: rown[i].begin_date,
                                [single_word_model.end_date]: rown[i].end_date,
                                [single_word_model.is_status]: rown[i].is_status,
                                [single_word_model.id_User]: rown[i].id_User,
                                [single_word_model.created_single]: rown[i].created_single,

                            };
                            obj.push(Arrsingle_word);
                        }
                        var _Arrsingle_word = JSON.stringify(obj);
                        var single_wordJson = JSON.parse(_Arrsingle_word);
                        var ArrGetsingle_word = [{
                            "status": "200",
                            message: 'Single_word INSERT Ok!',
                            "data": single_wordJson
                        }]
                        res.json(ArrGetsingle_word);
                    })
                })
            })
        } else {
            res.json({"status": "400", message: 'Single_word No INSERT !'});
        }
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM single_word WHERE id = ?'
        db.query(sql, [req.params.single_wordId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", shop: 'Delete single_word success!'})
        })
    }
}

