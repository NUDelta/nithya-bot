const Botkit = require("botkit");

var t = "xoxb-327084990610-pQnq37AtCfVCR2zlYn6uN9NW"


// if (!process.env.token) {
// 	console.log("Error: Specify token in environment");
// 	process.exit(1);
// }

var controller = Botkit.slackbot({
	debug: true,
});

var bot = controller.spawn({
	// token: process.env.token
	token: t
}).startRTM();

controller.hears(["hi"], "direct_message,direct_mention,mention", function(bot, message) {
	bot.reply(message, "hello!");
});
