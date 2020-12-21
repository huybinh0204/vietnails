var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var shortid = require('shortid');
var multer = require('multer');
router.use(bodyParser.json());
const db = require('../service');
var moment = require('moment-timezone');
let token_config = require('../config/ConfigJwt');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/Image');

    }, filename: function (req, file, cb) {
        var sample_str = file.originalname.split(" ").join("_");
        var a = shortid.generate() + "00" + sample_str;
        var _LowerCase = (a.slice(0, 100)).toLowerCase();
        try {
            if (_LowerCase.endsWith(".raw") || _LowerCase.endsWith(".flv")
                || _LowerCase.endsWith(".jpeg") || _LowerCase.endsWith(".png") || _LowerCase.endsWith(".gif")
                || _LowerCase.endsWith(".wmv") || _LowerCase.endsWith(".mp3") || _LowerCase.endsWith(".jpg")
                || _LowerCase.endsWith(".psd") || _LowerCase.endsWith(".mp4") || _LowerCase.endsWith(".mov")
                || _LowerCase.endsWith(".docx") || _LowerCase.endsWith(".txt") || _LowerCase.endsWith(".pdf") == true) {
                cb(null, shortid.generate() + "00" + file.originalname)
            } else {
                cb(null, "aa.png")
            }
        } catch (e) {
            console.log("err", e.toString())
        }
    }
});
var upload = multer({storage: storage});
var cron = require('node-cron');
const axios = require("axios");
module.exports = function (app) {
    let UserCtrl = require('../controllers/User');
    let ServiceCtrl = require('../controllers/Service_shop');
    let ScheduleCtrl = require('../controllers/Schedule');
    let ShopCtrl = require('../controllers/Shop');
    let LoginCtrl = require('../controllers/Login');
    let NewsCtrl = require('../controllers/News_shop');
    let RolesCtrl = require('../controllers/Roles');
    let PromotionCtrl = require('../controllers/Promotion');
    let Single_wordCtrl = require('../controllers/Single_word');
    let Schedule_historicalCtrl = require('../controllers/Schedule_historical');
    let Notify_UserCtrl = require('../controllers/Notify_User');
    let StatisticCtrl = require('../controllers/Statistic_Sch');
    app.route('/')
        .get(UserCtrl._get)
    // Login đăng nhập
    app.route('/api/login/')
        .post(LoginCtrl.login_user);


    //
    // //roles

    // app.route('/api/roles/')
    //     .post(token_config.checkToken,RolesCtrl.store);
    // app.route('/api/roles/edit/:rolesId')
    //     .put(token_config.checkToken,RolesCtrl.update);

    app.route('/api/roles/')
        .get(token_config.checkToken, RolesCtrl.get);

    // api user quản lý user (hien thi tat ca user)
    app.route('/api/upload_file/')
        .post(upload.single('image_file'), LoginCtrl.upload_file);

    // api user quản lý user (hien thi tat ca user)
    app.route('/api/user/')
        .get(token_config.checkToken, UserCtrl.get);

    // khi dắng nhập lấy thôgn tin cá nhân
    app.route('/api/user/:userId')
        .get(token_config.checkToken, UserCtrl.detail);

    // thêm tài khoản
    app.route('/api/user/')
        .post(UserCtrl.store);

    // sử thông tin tài kh
    app.route('/api/user/edit/:userId')
        .put(token_config.checkToken, UserCtrl.update);
    // doi mat khau
    app.route('/api/user/edit_password/:userId')
        .put(token_config.checkToken, UserCtrl.update_password);

    //Khoa tai khoản (xoá tài khoản)
    app.route('/api/user/delete/:userId')
        .delete(token_config.checkToken, UserCtrl.delete);

    //Mo tai khoản (Mo tài khoản), khoas tai khoan
    app.route('/api/user/open_active/:userId')
        .put(token_config.checkToken, UserCtrl.open_active);


    // api shop quản lý shop ( hien thi tat ca shop)
    app.route('/api/shop/')
        .get(token_config.checkToken, ShopCtrl.get);

    // api chi tiet tung shop
    app.route('/api/shop/:shopId')
        .get(token_config.checkToken, ShopCtrl.detail);

    // api Them shop
    app.route('/api/shop/')
        .post(token_config.checkToken, ShopCtrl.store);

    // api sua thong tin shop
    app.route('/api/shop/edit/:shopId')
        .put(token_config.checkToken, ShopCtrl.update);

    // api sua thong tin shop
    app.route('/api/shop/delete/:shopId')
        .delete(token_config.checkToken, ShopCtrl.delete);

    // api service dich vu
    app.route('/api/service/')
        .get(token_config.checkToken, ServiceCtrl.get);
    app.route('/api/service/')
        .post(token_config.checkToken, ServiceCtrl.store);
    app.route('/api/service/:serviceId')
        .get(token_config.checkToken, ServiceCtrl.detail);
    app.route('/api/service/edit/:serviceId')
        .put(token_config.checkToken, ServiceCtrl.update);
    app.route('/api/service/delete/:serviceId')
        .delete(token_config.checkToken, ServiceCtrl.delete);

    // api News shop bài
    app.route('/api/news_shop/')
        .get(token_config.checkToken, NewsCtrl.get);
    app.route('/api/news_shop/')
        .post(token_config.checkToken, NewsCtrl.store);
    app.route('/api/news_shop/:NewsShopId')
        .get(token_config.checkToken, NewsCtrl.detail);
    app.route('/api/news_shop/edit/:NewsShopId')
        .put(token_config.checkToken, NewsCtrl.update);
    app.route('/api/news_shop/delete/:NewsShopId')
        .delete(token_config.checkToken, NewsCtrl.delete);

    // api anh sách các loại quyền
    app.route('/api/roles/')
        .get(token_config.checkToken, RolesCtrl.get);

    //hoá đơn
    // api schedule taats car hoas ddown
    app.route('/api/schedule/')
        .get(token_config.checkToken, ScheduleCtrl.get);

    app.route('/api/schedule/get_date_time/')
        .get(token_config.checkToken, ScheduleCtrl.get_date_time);

    app.route('/api/schedule/get_schedule_nv/')
        .post(token_config.checkToken, ScheduleCtrl.get_nv);
    //list thoi gian dat licj
    app.route('/api/schedule/:start_time')
        .post(token_config.checkToken, ScheduleCtrl.Open_Schedule);

    //taoj hoas don
    app.route('/api/schedule/history/:start_time')
        .post(token_config.checkToken, ScheduleCtrl.Get_Open_Schedule);

    //taoj hoas don
    app.route('/api/schedule/')
        .post(token_config.checkToken, ScheduleCtrl.store);

    //chi tiet hoas down
    app.route('/api/schedule/:scheduleId')
        .get(token_config.checkToken, ScheduleCtrl.detail);

    app.route('/api/schedule_list/:scheduleId')
        .get(token_config.checkToken, ScheduleCtrl.list_detail);

//    nhân viên nhận đơn làm nails
//     app.route('/api/schedule_historical/:schedule_historicalID')
//         .post(token_config.checkToken, Schedule_historicalCtrl.store);
    //    status 0 , 1 ,2 , 3 , 4
    app.route('/api/schedule_historical/:schedule_historicalID')
        .post(token_config.checkToken, Schedule_historicalCtrl.store);
    //    lịch sử làm nhân viên làm nails
    app.route('/api/schedule_historical/user/:schedule_historicalID')
        .get(token_config.checkToken, Schedule_historicalCtrl.get);


//    mã khuyến mại;
    app.route('/api/promotion/')
        .get(token_config.checkToken, PromotionCtrl.get);
    app.route('/api/promotion/')
        .post(token_config.checkToken, PromotionCtrl.store);
    app.route('/api/promotion/:promotionId')
        .get(token_config.checkToken, PromotionCtrl.detail);
    app.route('/api/promotion/edit/:promotionId')
        .put(token_config.checkToken, PromotionCtrl.update);
    app.route('/api/promotion/delete/:promotionId')
        .delete(token_config.checkToken, PromotionCtrl.delete);

    //    đơn từ nghỉ phép;
    app.route('/api/single_word/')
        .get(token_config.checkToken, Single_wordCtrl.get_list);
    // nhân viên đi làm
    app.route('/api/user_mployees/')
        .post(token_config.checkToken, Single_wordCtrl.list_mployees);

    app.route('/api/single_word/user/:single_UserId')
        .get(token_config.checkToken, Single_wordCtrl.get);

    // thoi gian
    app.route('/api/get_list_time/')
        .get(Schedule_historicalCtrl.get_list_time);


    app.route('/api/single_word/')
        .post(token_config.checkToken, Single_wordCtrl.store);
    app.route('/api/single_word/:single_wordId')
        .get(token_config.checkToken, Single_wordCtrl.detail);
    //admin duyet + nhan vien sưa đơn từ
    app.route('/api/single_word/edit/:single_wordId')
        .put(token_config.checkToken, Single_wordCtrl.update);
    app.route('/api/single_word/delete/:single_wordId')
        .delete(token_config.checkToken, Single_wordCtrl.delete);


    app.route('/api/notify_userkey/')
        .post(Notify_UserCtrl.store);


    // app.route('/api/get_time_schedule/')
    //     .get(Notify_UserCtrl.get_notify_nv);


    cron.schedule('*/1 * * * *', () => {
        var check_time = moment().tz("Asia/Bangkok").format("YYYY-MM-DD hh:mmA");
        var check_PM = check_time.slice(16, 18);
        var phut = check_time.slice(13, 16);
        var ngay = check_time.slice(0, 11);
        var gio = ngay + (Number(check_time.slice(11, 13)) + 12).toString() + phut;
        var check_time_schedule = check_PM == 'PM' ? (gio) : (check_time.slice(0, 16));
        let sql = `SELECT notify_key.id_User as id_User, notify_key.on_key as on_key FROM schedule JOIN 
        schedule_historical ON schedule.id = schedule_historical.id_schedule JOIN notify_key ON
         schedule_historical.id_User = notify_key.id_User WHERE start_time LIKE '${check_time_schedule}%' 
         AND schedule_historical.is_status =1 GROUP BY schedule.id`;
        console.log("sql nhan vien ", sql)
        db.query(sql, (err, rown, response) => {
            if (err) throw err
            if (rown != '') {
                console.log(" ok vao")
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

            } else {
                console.log("NO User nhan vien push notify!");
            }
        })
        // app.get(Notify_UserCtrl.get_time_schedule())
        // app.get(Notify_UserCtrl.get_notify_nv())
        // app.get(Notify_UserCtrl.get_notify_kh())
    }, {
        scheduled: true,
        timezone: "Asia/Bangkok"
    });

    app.route('/api/check_phone/')
        .post(UserCtrl.check_phone);

    app.route('/api/check_otp/')
        .post(UserCtrl.check_otp);

//    thong ke
    app.route('/api/statistic/')
        .post(StatisticCtrl.get_statistic);

    app.route('/api/statistic/get_statistic/')
        .post(StatisticCtrl.get_list_statistic);

    app.route('/api/statistic/statistic_schedule/')
        .post(StatisticCtrl.statistic_schedule);

    app.route('/api/statistic/statistic_sum/')
        .get(StatisticCtrl.statistic_SUM);


};
