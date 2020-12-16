const db = require('../service');
// loại quyền
module.exports = {
    // list dich vu làm theo tháng
    get_statistic: (req, res) => {
        let start_time = req.body.start_time ;
        let sql = `SELECT id_Service_shop, COUNT(*) as sum_Service , title , start_time FROM schedule JOIN schedule_details ON `+
        `schedule.id = schedule_details.id_Schedule JOIN service_shop ON service_shop.id = schedule_details.id_Service_shop `+
        `WHERE schedule.start_time LIKE '${start_time}%' GROUP BY id_Service_shop`;
        db.query(sql,[{start_time}], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            console.log("111",rown)
            for (var i = 0; i < rown.length; i++) {
                var Arrstatistic = {
                    id: i+1,
                    id_Service_shop: rown[i].id_Service_shop,
                    sum_Service: rown[i].sum_Service,
                    title: rown[i].title,
                    start_time: rown[i].start_time,
                };
                obj.push(Arrstatistic);
            }
            var _Arrstatistic = JSON.stringify(obj);
            var statisticJson = JSON.parse(_Arrstatistic);
            var ArrGetstatistic = [{"status": "200", message: 'thống kê số dịch vụ được đặt trong tháng', "data": statisticJson}]
            res.json(ArrGetstatistic);
        })
    },
    // thống kê nhân viên làm đơn huỷ đơn theo tháng
    get_list_statistic: (req, res) => {
        let start_time = req.body.start_time ;
        let id_User= req.body.id_User ;
        let sql = `SELECT schedule_historical.is_status as is_status ,COUNT(*) as sum_schedule_user_nv , user.id , user.phone, user.fullName`+
        `,start_time FROM schedule_historical JOIN user ON user.id = schedule_historical.id_User JOIN schedule on `+
        `schedule_historical.id_schedule = schedule.id WHERE schedule.start_time LIKE '${start_time}%' and `+
        `schedule_historical.id_User = ${id_User} GROUP BY schedule_historical.is_status`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var Arrstatistic = {
                    id: i+1,
                    id_User: rown[i].id,
                    is_status: rown[i].is_status,
                    sum_schedule_user_nv: rown[i].sum_schedule_user_nv,
                    phone: rown[i].phone,
                    fullName: rown[i].fullName,
                    start_time: rown[i].start_time,
                };
                obj.push(Arrstatistic);
            }
            var _Arrstatistic = JSON.stringify(obj);
            var statisticJson = JSON.parse(_Arrstatistic);
            var ArrGetstatistic = [{"status": "200", message: 'thống kê đơn theo User nhân viên nhận huỷ theo tháng', "data": statisticJson}]
            res.json(ArrGetstatistic);
        })
    },
    // thống kê các loại hoá đơn theo trạng thái theo tháng
    statistic_schedule: (req, res) => {
        let start_time = req.body.start_time ;
        let sql = `SELECT start_time,status,COUNT(*) AS sum_schedule , SUM(moneys) as sum_moneys,  created_schedule FROM schedule `+
        `WHERE schedule.start_time LIKE '${start_time}%' GROUP BY schedule.status`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var Arrstatistic = {
                    id: i+1,
                    start_time: rown[i].start_time,
                    sum_schedule: rown[i].sum_schedule,
                    sum_moneys: rown[i].sum_moneys,
                    created_schedule: rown[i].created_schedule,
                };
                obj.push(Arrstatistic);
            }
            var _Arrstatistic = JSON.stringify(obj);
            var statisticJson = JSON.parse(_Arrstatistic);
            var ArrGetstatistic = [{"status": "200", message: 'thống kê các loại đơn theo trạng thái, tiền khắc hàng đặt theo tháng', "data": statisticJson}]
            res.json(ArrGetstatistic);
        })
    },
    statistic_SUM: (req, res) => {
        let todoy = new Date();
        let month = todoy.getMonth()
        var obj = [];
        for (var i=0 ; i < 12 ; i++){
            var l =i+1;
            console.log("1111",l)
            let sql = `SELECT SUM(moneys) as sum_moneys FROM schedule WHERE schedule.start_time LIKE '2020-${l}%'`;
            var as = [];
            db.query(sql, (err, rown, fields) => {
                if (err) throw err
                console.log("rown",rown)
                console.log("sum_moneys",rown[0].sum_moneys)
                var maas = {
                    sum_moneys:rown[0].sum_moneys,
                    month:l
                }
                as.push(maas)
            })
            console.log("22",as)

        }
        console.log("1231231231223",obj)
        // var _Arrstatistic = JSON.stringify(obj);
        // var statisticJson = JSON.parse(_Arrstatistic);
        // var ArrGetstatistic = [{"status": "200", message: 'thống kê các loại đơn theo trạng thái, tiền khắc hàng đặt theo tháng', "data": statisticJson}]
        // res.json(ArrGetstatistic);
    }
}

