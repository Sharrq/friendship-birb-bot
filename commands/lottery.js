const request = require("request");
const logger = require("winston");

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";

module.exports = {
  name: "lottery",
  description: "Make a birb drawing",
  execute(client, message, args) {
    drawWinner(message);
  }
};

function drawWinner(message) {
  request.post(
    "https://friendship-birb-api.herokuapp.com/api/lotteries.json",
    {
      auth: {
        bearer: process.env.elroy
      },
      form: {}
    },
    (error, response, body) => {
      logger.debug(response.statusCode);
      const json = JSON.parse(body);
      logger.debug(json);

      if (response.statusCode === 201) {
        const user = json.data.attributes;
        logger.debug(user);
        message.channel.send(
          `Congrats <@${user.discord_id}> (${user.wow_name} of ${
            user.wow_server
          }) is the winner! Follow directions to get your birb!`
        );
      } else if (response.statusCode === 422) {
        message.channel.send(`We have drawn all the birbs! Congrats fam!`);
      } else {
        message.channel.send(`Arf! Something went horribly wrong.`);
      }
    }
  );
}
