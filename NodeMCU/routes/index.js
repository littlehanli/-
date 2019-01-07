var express = require('express');
var router = express.Router();

// var five = require("johnny-five");
// var board = new five.Board();
let light = 0;
//
// board.on("ready", function(){
//     console.log("Arduino 連接成功");
//
//     this.pinMode(0, five.Pin.ANALOG);
//     this.pinMode(11, five.Pin.PWM);
//
//     this.analogRead(0, function(value) { // 持续读取A0 引脚值
//         light_force = value;
//         console.log(value);
//         this.analogWrite(11, value % 256);
//     });
//
// })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '小樹養成'});
});

router.get('/tree', function(req, res, next) {
    res.render('tree', { title: '小樹養成', light: light});
});

router.get("/light", function(req, res, next){
    // console.log(req.query.value);
    if(req.query.value) {
        light = parseInt(req.query.value) - 10;
    }

    res.json({
        status: "success",
        light: light
    })
});

module.exports = router;
