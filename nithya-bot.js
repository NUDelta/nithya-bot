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

// ***************** OTG *********************** //

// HS4X LEARNING, BEFORE SIG, END SPRINT

controller.hears(['hs4x learning'], "ambient", function(bot, message) {

	bot.startConversation(message, function(err, convo){
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Did your sprint stories help you address these risks in your project? What did you learn?",
		            "text": "Did your sprint stories help you address these risks in your project? What did you learn?",
		            "actions": [
										{
		                    "text": "update what we learned",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit#gid=1488501448"
		                }
		            ]
		        }
		    ]
			}
		);
		convo.say("`previous risks`: Tech implementation + Getting a working prototype in time for our planned study");
		convo.say("`previous sprint focus`: Preparing and pilot testing for study");
		convo.say("`what we learned`: Story boards -- understand design of experiences");
	});

});

// HS4X RISKS - BEFORE SIG, EVERY WEEK

controller.hears(['hs4x risks'], "ambient", function(bot, message) {

	bot.startConversation(message, function(err, convo){
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Do your sprint stories focus on the biggest risk for your project?",
		            "text": "Do your sprint stories focus on the biggest risk for your project?",
		            "actions": [
		                {
		                    "text": "update risks and focus",
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
			}
		);
		convo.say("`current risks`: Study design and tech testing");
		convo.say("`current sprint focus`: Preparing and pilot testing for study");
	});
});

// HS4X TAKEAWAYS - AFTER SIG, EVERY WEEK

controller.hears(['hs4x takeaways sprint2'], "ambient", function(bot, message) {
	bot.reply(message, "`takeaways from SIG`: (1) Iterative testing -- we want to learn something about the design of our experience every week (2) Tech is more solid now -- focus on the design tree");

	bot.reply(message,
	{"attachments": [
        {
            "fallback": "Have you updated your sprint stories + tasks based on your takeaways from SIG?",
            "text": "Have you updated your sprint stories + tasks based on your takeaways from SIG?",
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


// OTG DELIVERY LEARNING, BEFORE SIG, END SPRINT

controller.hears(['otg delivery learning'], "ambient", function(bot, message) {

	bot.startConversation(message, function(err, convo){
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Did your sprint stories help you address these risks in your project? What did you learn?",
		            "text": "Did your sprint stories help you address these risks in your project? What did you learn?",
		            "actions": [
										{
		                    "text": "update what we learned",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit#gid=1488501448"
		                }
		            ]
		        }
		    ]
			}
		);
		convo.say("`previous risks`: How we are going to conduct needfinding within DTR");
		convo.say("`previous sprint focus`: Conducting a study, updating interface and design arguments");
		convo.say("`what we learned`: Important themes to focus on: incentivization as entry point to app, trust and accountability of helper and requester, fallback plan");
	});

});


// OTG DELIVERY - BEFORE SIG, EVERY WEEK

controller.hears(['otg delivery risks'], "ambient", function(bot, message) {

	bot.startConversation(message, function(err, convo){
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Do your sprint stories focus on the biggest risk for your project?",
		            "text": "Do your sprint stories focus on the biggest risk for your project?",
		            "actions": [
		                {
		                    "text": "update risks",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit#gid=442748249"
		                },
										{
		                    "text": "update sprint",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit#gid=442748249"
		                }
		            ]
		        }
		    ]
			}
		);
		convo.say("`current risks`: Design arguments");
		convo.say("`current sprint focus`: Deploy our app and start preliminary study");
	});

});

// OTG DELIVERY TAKEAWAYS - AFTER SIG, EVERY WEEK

controller.hears(['otg delivery takeaways'], "ambient", function(bot, message) {
	bot.reply(message, "`takeaways from SIG`: (1) Status update - create 3 user stories of inconenience (2) Meet with Kapil - production certificates and pem files");

	bot.reply(message,
	{"attachments": [
        {
            "fallback": "Have you updated your sprint stories + tasks based on your takeaways from SIG?",
            "text": "Have you updated your sprint stories + tasks based on your takeaways from SIG?",
            "actions": [
                {
                    "text": "update sprint",
										"type": "button",
                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit#gid=442748249"
                }
            ]
        }
    ]
	});
});
