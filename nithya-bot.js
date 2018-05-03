const Botkit = require("botkit");
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 5000;
require('dotenv').config();

var monitor = require('./model/monitor')

//connect to MongoDB

MongoClient.connect(process.env.MONGO_URL, (err, client) => {
	if(err) {
		return console.log(err);
	}

	//post to database
	var db = client.db('nithya');
	var ts = Date.now();

	db.collection('issues').insertOne(
		{
			user: "testUser",
			message: "hi there",
			timestamp: ts
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


controller.setupWebserver(PORT, function(err, webserver) {
	controller.createWebhookEndpoints(controller.webserver);
});

//bot interactions
controller.hears(["hi"], "direct_message,direct_mention,mention", function(bot, message) {
	bot.reply(message, "hello!");
});

controller.hears(['nithya'], "ambient", function(bot, message) {
	bot.reply(message, "I heard my name! need anything?");

});

controller.hears(['hs4x risks'], "ambient", function(bot, message) {
	bot.reply(message, "`risks from canvas`: Tech implementation + Getting a working prototype in time for our planned study");

	bot.reply(message,
	{"attachments": [
        {
            "fallback": "Do your sprint stories focus on the biggest risk for your project?",
            "text": "Does your sprint focus on the biggest risk for your project?",
            "actions": [
                {
                    "text": "update risks",
										"type": "button",
                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit#gid=1488501448"
                },
								{
                    "text": "update sprint",
										"type": "button",
                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit#gid=1488501448"
                }
            ]
        }
    ]
	});

});

controller.hears(['hs4x takeaways'], "ambient", function(bot, message) {
	bot.reply(message, "`takeaways from SIG`: (1) Iterative testing -- we want to learn something about the design of our experience every week (2) Tech is more solid now -- focus on the design tree");

	bot.reply(message,
	{"attachments": [
        {
            "fallback": "How might you update your sprint stories + tasks based on your takeaways from SIG?",
            "text": "How might you update your sprint stories + tasks based on your takeaways from SIG?",
            "actions": [
                {
                    "text": "update sprint",
										"type": "button",
                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit#gid=1488501448"
                }
            ]
        }
    ]
	});
});

// controller.says(['nithya'], "ambient", function(bot, message) {
// 	bot.reply(message, "I heard my name! need anything?");
//
// });
