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

// ***************** EXAMPLE PROJECT *********************** //

// projectname LEARNING, BEFORE SIG, END SPRINT

controller.hears(['projectname learning'], "ambient", function(bot, message) {

	bot.startConversation(message, function(err, convo){
		convo.say("`previous risks`: ");
		convo.say("`previous sprint focus`: ");
		convo.say("`what we learned`: ");
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Did your sprint stories help you address these risks in your project? What did you learn?",
		            "text": "Did your sprint stories help you address these risks in your project? What did you learn?",
		            "actions": [
										{
		                    "text": "update what we learned",
												"type": "button",
		                    "url": "URL"
		                }
		            ]
		        }
		    ]
			}
		);
	});

});

// projectname RISKS - BEFORE SIG, EVERY WEEK

controller.hears(['projectname risks'], "ambient", function(bot, message) {

	bot.startConversation(message, function(err, convo){
		convo.say("`current risks`: ");
		convo.say("`current sprint focus`: ");
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Do your sprint stories focus on the biggest risk for your project?",
		            "text": "Do your sprint stories focus on the biggest risk for your project?",
		            "actions": [
		                {
		                    "text": "update risks and focus",
												"type": "button",
		                    "url": "URL"
		                },
										{
		                    "text": "update sprint",
												"type": "button",
		                    "url": "URL"
		                }
		            ]
		        }
		    ]
			}
		);
	});
});

// projectname TAKEAWAYS - AFTER SIG, EVERY WEEK
controller.hears(['projectname takeaways'], "ambient", function(bot, message) {
	bot.startConversation(message, function(err, convo){
		convo.say("`current takeaways`: ");
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Have you updated your sprint stories + tasks based on your current takeaways?",
		            "text": "Have you updated your sprint stories + tasks based on your current takeaways?",
		            "actions": [
										{
												"text": "update takeaways",
												"type": "button",
												"url": "URL"
										},
										{
		                    "text": "update sprint",
												"type": "button",
		                    "url": "URL"
		                }
		            ]
		        }
		    ]
			}
		);
	});
});


// *************************************** BB ************************************ //

// ***************** CE API *********************** //

// CE API LEARNING, BEFORE SIG, END SPRINT

controller.hears(['ce api learning'], "ambient", function(bot, message) {

	bot.startConversation(message, function(err, convo){
		convo.say("`previous risks`: Don't have a clear understanding of the limitations and ramifications of our current API. Based on your findings, how will your system model change?");
		convo.say("`previous sprint focus`: Understanding the direction our architecture will take");
		convo.say("`what we learned`: empty");
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Did your sprint stories help you address these risks in your project? What did you learn?",
		            "text": "Did your sprint stories help you address these risks in your project? What did you learn?",
		            "actions": [
										{
		                    "text": "update what we learned",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=862574027"
		                }
		            ]
		        }
		    ]
			}
		);
	});

});

// CE API RISKS - BEFORE SIG, EVERY WEEK

controller.hears(['ce api risks'], "ambient", function(bot, message) {

	bot.startConversation(message, function(err, convo){
		convo.say("`current risks`: empty");
		convo.say("`current sprint focus`: empty");
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Do your sprint stories focus on the biggest risk for your project?",
		            "text": "Do your sprint stories focus on the biggest risk for your project?",
		            "actions": [
		                {
		                    "text": "update risks and focus",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=862574027"
		                },
										{
		                    "text": "update sprint",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=862574027"
		                }
		            ]
		        }
		    ]
			}
		);
	});
});

// CE API TAKEAWAYS - AFTER SIG, EVERY WEEK

controller.hears(['ce api takeaways'], "ambient", function(bot, message) {
	bot.startConversation(message, function(err, convo){
		convo.say("`current takeaways`: dont switch to a new problem bc we haven't solved our old one");
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Have you updated your sprint stories + tasks based on your current takeaways?",
		            "text": "Have you updated your sprint stories + tasks based on your current takeaways?",
		            "actions": [
										{
												"text": "update takeaways",
												"type": "button",
												"url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=862574027"
										},
										{
		                    "text": "update sprint",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=862574027"
		                }
		            ]
		        }
		    ]
			});
	});
});


// ***************** MCGONNAGAL *********************** //

// MCGONNAGAL LEARNING, BEFORE SIG, END SPRINT

controller.hears(['mcgonnagal learning'], "ambient", function(bot, message) {

	bot.startConversation(message, function(err, convo){
		convo.say("`previous risks`: Same as above (related work section and first half of paper), but now hopefully I'll be able to dedicate more time to actually writing and iterating");
		convo.say("`previous sprint focus`: Focus on improving paper + personal writing skills");
		convo.say("`what we learned`: empty");
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Did your sprint stories help you address these risks in your project? What did you learn?",
		            "text": "Did your sprint stories help you address these risks in your project? What did you learn?",
		            "actions": [
										{
		                    "text": "update what we learned",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=641611141"
		                }
		            ]
		        }
		    ]
			}
		);
	});

});

// MCGONNAGAL RISKS - BEFORE SIG, EVERY WEEK

controller.hears(['mcgonnagal risks'], "ambient", function(bot, message) {

	bot.startConversation(message, function(err, convo){
		convo.say("`current risks`: empty");
		convo.say("`current sprint focus`: empty");
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Do your sprint stories focus on the biggest risk for your project?",
		            "text": "Do your sprint stories focus on the biggest risk for your project?",
		            "actions": [
		                {
		                    "text": "update risks and focus",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=641611141"
		                },
										{
		                    "text": "update sprint",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=641611141"
		                }
		            ]
		        }
		    ]
			}
		);
	});
});

// MCGONNAGAL TAKEAWAYS - AFTER SIG, EVERY WEEK

controller.hears(['mcgonnagal takeaways'], "ambient", function(bot, message) {
	bot.startConversation(message, function(err, convo){
		convo.say("`current takeaways`: (1) office hours	(2) feedback is essentail when writing (3) send draft on monday	(4) send ryan nopte asking for feedback on status update");
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Have you updated your sprint stories + tasks based on your current takeaways?",
		            "text": "Have you updated your sprint stories + tasks based on your current takeaways?",
		            "actions": [
										{
												"text": "update takeaways",
												"type": "button",
												"url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=641611141"
										},
										{
		                    "text": "update sprint",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=641611141"
		                }
		            ]
		        }
		    ]
		});
	});
});

// ***************** CN *********************** //

// CN LEARNING, BEFORE SIG, END SPRINT

controller.hears(['cn learning'], "ambient", function(bot, message) {

	bot.startConversation(message, function(err, convo){
		convo.say("`previous risks`: We want to nail down a solid interface model and system model for our system");
		convo.say("`previous sprint focus`: We want to test out the feasibility of different types of abstractions more, also, ways to use the current CE API architecture to write different types in full length including a running UI");
		convo.say("`what we learned`: empty");
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Did your sprint stories help you address these risks in your project? What did you learn?",
		            "text": "Did your sprint stories help you address these risks in your project? What did you learn?",
		            "actions": [
										{
		                    "text": "update what we learned",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=2088211444"
		                }
		            ]
		        }
		    ]
			}
		);
	});

});

// CN RISKS - BEFORE SIG, EVERY WEEK

controller.hears(['cn risks'], "ambient", function(bot, message) {

	bot.startConversation(message, function(err, convo){
		convo.say("`current risks`: empty");
		convo.say("`current sprint focus`: empty");
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Do your sprint stories focus on the biggest risk for your project?",
		            "text": "Do your sprint stories focus on the biggest risk for your project?",
		            "actions": [
		                {
		                    "text": "update risks and focus",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=2088211444"
		                },
										{
		                    "text": "update sprint",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=2088211444"
		                }
		            ]
		        }
		    ]
			}
		);
	});
});

// CN TAKEAWAYS - AFTER SIG, EVERY WEEK

controller.hears(['cn takeaways'], "ambient", function(bot, message) {
	bot.startConversation(message, function(err, convo){
		convo.say("`current takeaways`: (1) Our goal is to identify inconveniences that come from trying to create narratives in the CE api (2) Our goal is to think of all the discomforts in terms of narrative, such as plot and timeline");
		convo.say(
			{"attachments": [
		        {
		            "fallback": "Have you updated your sprint stories + tasks based on your current takeaways?",
		            "text": "Have you updated your sprint stories + tasks based on your current takeaways?",
		            "actions": [
										{
												"text": "update takeaways",
												"type": "button",
												"url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=2088211444"
										},
										{
		                    "text": "update sprint",
												"type": "button",
		                    "url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=2088211444"
		                }
		            ]
		        }
		    ]
			});
	});
});


// *************************************** OTG ************************************ //

// ***************** HS4X *********************** //

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

controller.hears(['hs4x takeaways'], "ambient", function(bot, message) {
	bot.reply(message, "`current takeaways`: (1) Iterative testing -- we want to learn something about the design of our experience every week (2) Tech is more solid now -- focus on the design tree");

	bot.reply(message,
	{"attachments": [
        {
            "fallback": "Have you updated your sprint stories + tasks based on your current takeaways?",
            "text": "Have you updated your sprint stories + tasks based on your current takeaways?",
            "actions": [
								{
										"text": "update takeaways",
										"type": "button",
										"url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=862574027"
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

// ***************** OTG DELIVERY *********************** //

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
	bot.reply(message, "`current takeaways`: (1) Status update - create 3 user stories of inconenience (2) Meet with Kapil - production certificates and pem files");

	bot.reply(message,
	{"attachments": [
        {
            "fallback": "Have you updated your sprint stories + tasks based on your current takeaways?",
            "text": "Have you updated your sprint stories + tasks based on your current takeaways?",
            "actions": [
								{
										"text": "update takeaways",
										"type": "button",
										"url": "https://docs.google.com/spreadsheets/d/1y8jGAnF5QVylwvAaz8P-RnQ0VQxrsvj5YnMTUysfoKM/edit?pli=1#gid=862574027"
								},
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
