var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// var pusher = new Pusher({ appId: APP_ID, key: APP_KEY, secret:  APP_SECRET, cluster: eu });
var pusher = new Pusher({
  appId: "314073",
  key: "da857397f8eec3092630",
  secret:  "657d91ad4a1473b3014e",
  cluster: "eu"
});

app.post('/message', function(req, res) {
  var username = req.body.username;
  var message = req.body.message;
  pusher.trigger( 'public-chat', 'message-added', { username: username, message: message });
  res.sendStatus(200);
});

app.get('/',function(req,res){      
     res.sendFile('/public/index.html', {root: __dirname });
});

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`app listening on port ${port}!`)
});