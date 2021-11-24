var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, { cors: { origin: "*" } });
var loginmember='2134234';

app.get('/', function (_req, res) {
    res.send('<h1>안녕하세요 "/" 경로 입니다.</h1>');
});

io.on('connection', function (socket) {
    socket.on('newuser', function(nick){
        var newUser = nick;
        console.log('한명의 유저가 접속을 했습니다.');

        socket.on('disconnect', function () {
            console.log('1//0//'+newUser);
            io.emit('send_msg', '1//0//'+newUser);
        });
        socket.on('send_msg', function (msg) {
            //콘솔로 출력을 한다
            console.log(msg);
            //다시, 소켓을 통해 이벤트를 전송한다.
            io.emit('send_msg', msg);
        });
    });
});

http.listen(80, function () {
    console.log('listening on *:80');
});
