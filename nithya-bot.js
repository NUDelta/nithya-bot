const Botkit = require("botkit");
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

console.log(process.env.MONGO_URL);

//connect to MongoDB

MongoClient.connect(process.env.MONGO_URL, (err, client) => {
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


if (!process.env.SLACK_TOKEN) {
	console.log("Error: Specify token in environment");
	process.exit(1);
}

//set up bot
var controller = Botkit.slackbot({
	debug: true,
});

var bot = controller.spawn({
	token: process.env.SLACK_TOKEN
}).startRTM();


//bot interactions
controller.hears(["hi"], "direct_message,direct_mention,mention", function(bot, message) {
	bot.reply(message, "hello!");
});
