const Botkit = require("botkit");


if (!process.env.token) {
	console.log("Error: Specify token in environment");
	process.exit(1);
}

var controller = Botkit.slackbot({
	debug: true,
});

var bot = controller.spawn({
	token: process.env.token
}).startRTM();

controller.hears(["hi"], "direct_message,direct_mention,mention", function(bot, message) {
	bot.reply(message, "hello!");
});
