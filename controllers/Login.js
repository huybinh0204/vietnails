const db = require('../service');
const jwt    = require('jsonwebtoken');
var md5 = require('md5');
const user_model = require('../models/User_model');
module.exports = {
    login_user: async (req, res) => {
        let phone = req.body.phone;
        let password = req.body.password;
        console.log("222",password);
        var sql = `SELECT * FROM user WHERE phone = "${phone}" and password = "${md5(password)}"`;
        db.query(sql, [phone,password], (err, rown, fields) => {
            if (err) throw err
            try {
                if (rown != "" && rown[0].is_active === 0) {
                    let payload = {
                        phone:phone,
                        password:password,
                        id_roles:rown[0].id_roles,
                        [user_model.email]: rown[0].email,
                        [user_model.fullName]: rown[0].fullName,
                        [user_model.id_roles]: rown[0].id_roles,
                        [user_model.avatar]: rown[0].avatar,
                        [user_model.address]: rown[0].address,
                        [user_model.birthday]: rown[0].birthday,
                        [user_model.gender]: rown[0].gender,
                        [user_model.is_active]: rown[0].is_active,
                        type:"access"
                    }
                    var sql_key = `SELECT * FROM info_config`;
                    db.query(sql_key, (err, rown_key, fields) => {
                        if (err) throw err
                        let token = jwt.sign(payload, rown_key[0].conten_config, {algorithm: 'HS256', expiresIn: 3600})
                        console.log("access")
                        res.json({"status": "200", "error": false, message: 'Login true!', "token": token});
                    });
                } else {
                    res.json({"status": "400", "error": true, message: 'Login false!'});
                }
            } catch (e) {
                console.log("err", e.toString())
            }

        })
    }
}

