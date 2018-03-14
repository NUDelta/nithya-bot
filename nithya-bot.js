const Botkit = require("botkit");
const MongoClient = require('mongodb').MongoClient;
var t = "xoxb-327084990610-pQnq37AtCfVCR2zlYn6uN9NW" //slack token
const MONGO_URL =  'mongodb://moliri:regulation@ds215019.mlab.com:15019/nithya';


//connect to MongoDB

MongoClient.connect(MONGO_URL, (err, client) => {
	if(err) {
		return console.log(err);
	}

	//post to database
	var db = client.db('nithya');

	db.collection('interactionLogs').insertOne(
		{
			user: "testUser",
			message: "hi there"
		}, 

		function (err, res) {
			if(err) {
				client.close();
				return console.log(err);
			}
			//success
			client.close();
		}
	)
});


// if (!process.env.token) {
// 	console.log("Error: Specify token in environment");
// 	process.exit(1);
// }

//set up bot
var controller = Botkit.slackbot({
	debug: true,
});

var bot = controller.spawn({
	// token: process.env.token
	token: t
}).startRTM();


//bot interactions
controller.hears(["hi"], "direct_message,direct_mention,mention", function(bot, message) {
	bot.reply(message, "hello!");
});
