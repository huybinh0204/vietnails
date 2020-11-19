const db = require('../service');
const user_model = require('../models/User_model');
module.exports = function(app) {
    let token_config = require('../config/ConfigJwt');
    let UserCtrl = require('../controllers/User');
    let ServiceCtrl = require('../controllers/Service_shop');
    let ScheduleCtrl = require('../controllers/Schedule');
    let ShopCtrl = require('../controllers/Shop');
    let LoginCtrl = require('../controllers/Login');
    let NewsCtrl = require('../controllers/News_shop');
    let RolesCtrl = require('../controllers/Roles');

    app.route('/')
        .get(UserCtrl._get)
    // Login đăng nhập
    app.route('/api/login/')
        .post(LoginCtrl.login_user);
    //
    // //roles
    // app.route('/api/roles/')
    //     .get(token_config.checkToken,RolesCtrl.get);
    // app.route('/api/roles/')
    //     .post(token_config.checkToken,RolesCtrl.store);
    // app.route('/api/roles/edit/:rolesId')
    //     .put(token_config.checkToken,RolesCtrl.update);

    // api user quản lý user (hien thi tat ca user)
    app.route('/api/user/')
        .get(token_config.checkToken,UserCtrl.get);

    // khi dắng nhập lấy thôgn tin cá nhân
    app.route('/api/user/:userId')
        .get(token_config.checkToken,UserCtrl.detail);

    // thêm tài khoản
    app.route('/api/user/')
        .post(token_config.checkToken,UserCtrl.store);

    // sử thông tin tài kh
    app.route('/api/user/edit/:userId')
        .put(token_config.checkToken,UserCtrl.update);
    // doi mat khau
    app.route('/api/user/edit_password/:userId')
        .put(token_config.checkToken,UserCtrl.update_password);

    //Khoa tai khoản (xoá tài khoản)
    app.route('/api/user/delete/:userId')
        .delete(token_config.checkToken,UserCtrl.delete);

    //Mo tai khoản (Mo tài khoản), khoas tai khoan
    app.route('/api/user/open_active/:userId')
        .put(token_config.checkToken,UserCtrl.open_active);


    // api shop quản lý shop ( hien thi tat ca shop)
    app.route('/api/shop/')
        .get(token_config.checkToken,ShopCtrl.get);

    // api chi tiet tung shop
    app.route('/api/shop/:shopId')
        .get(token_config.checkToken,ShopCtrl.detail);

    // api Them shop
    app.route('/api/shop/')
        .post(token_config.checkToken,ShopCtrl.store);

    // api sua thong tin shop
    app.route('/api/shop/edit/:shopId')
        .put(token_config.checkToken,ShopCtrl.update);

    // api sua thong tin shop
    app.route('/api/shop/delete/:shopId')
        .delete(token_config.checkToken,ShopCtrl.delete);

    // api service dich vu
    app.route('/api/service/')
        .get(token_config.checkToken,ServiceCtrl.get);
    app.route('/api/service/')
        .post(token_config.checkToken,ServiceCtrl.store);
    app.route('/api/service/:serviceId')
        .get(token_config.checkToken,ServiceCtrl.detail);
    app.route('/api/service/edit/:serviceId')
        .put(token_config.checkToken,ServiceCtrl.update);
    app.route('/api/service/delete/:serviceId')
        .delete(token_config.checkToken,ServiceCtrl.delete);

    // api News shop bài
    app.route('/api/news_shop/')
        .get(token_config.checkToken,NewsCtrl.get);
    app.route('/api/news_shop/')
        .post(token_config.checkToken,NewsCtrl.store);
    app.route('/api/news_shop/:NewsShopId')
        .get(token_config.checkToken,NewsCtrl.detail);
    app.route('/api/news_shop/edit/:NewsShopId')
        .put(token_config.checkToken,NewsCtrl.update);
    app.route('/api/news_shop/delete/:NewsShopId')
        .delete(token_config.checkToken,NewsCtrl.delete);

    // api anh sách các loại quyền
    app.route('/api/roles/')
        .get(token_config.checkToken,RolesCtrl.get);

    //hoá đơn
    // api schedule taats car hoas ddown
    app.route('/api/schedule/')
        .get(token_config.checkToken,ScheduleCtrl.get);
    //list thoi gian dat licj
    app.route('/api/schedule/:start_time')
        .post(token_config.checkToken,ScheduleCtrl.Open_Schedule);
    //taoj hoas don
    app.route('/api/schedule/')
        .post(token_config.checkToken,ScheduleCtrl.store);
    //chi tiet hoas down
    app.route('/api/schedule/:scheduleId')
        .get(token_config.checkToken,ScheduleCtrl.detail);
    app.route('/api/schedule_list/:scheduleId')
        .get(token_config.checkToken,ScheduleCtrl.list_detail);


//    mã khuyến mại;
    app.route('/api/news_shop/')
        .get(token_config.checkToken,NewsCtrl.get);
    app.route('/api/news_shop/')
        .post(token_config.checkToken,NewsCtrl.store);
    app.route('/api/news_shop/:NewsShopId')
        .get(token_config.checkToken,NewsCtrl.detail);
    app.route('/api/news_shop/edit/:NewsShopId')
        .put(token_config.checkToken,NewsCtrl.update);
    app.route('/api/news_shop/delete/:NewsShopId')
        .delete(token_config.checkToken,NewsCtrl.delete);


};
