module.exports = {
    randomString:(len, charSet) =>{
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        return randomString;
    }
}
module.exports.url = 'http://vietnails.cf'
// module.exports.url = 'http://localhost:8080';

module.exports.esms_url = 'http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get'
module.exports.ApiKey = 'F48260F00D837259291DA540B3270C';
module.exports.SecretKey = 'E98BC403500A84C321D11811EC34CC'
module.exports.Brandname = 'Verify';
module.exports.SmsType = 2;
