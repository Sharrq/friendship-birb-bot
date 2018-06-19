const blizz = require("blizzard.js").initialize({ apikey: process.env.BLIZZ });
const logger = require("winston");
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = "debug";
const REALM_NOT_FOUND = "Realm not found.";
const CHARACTER_NOT_FOUND = "Character not found.";

module.exports = {
  name: "birbme",
  description: "Add me to the list motherlover",
  async execute(client, message, args) {
    let fields;
    message.react("🤔");

    if (args.length === 2) {
      const [charName, serverName] = args;
      const charTuple = doTheRequest(charName, serverName);

      if (charTuple[0] === "ok") {
        fields = [
          {
            name: "✅ Server",
            value: "I found your server"
          },
          {
            name: "✅ Character",
            value: "I found your character"
          },
          {
            name: "✅ Birb status",
            value: "You do not currently have the friendship birb"
          },
          {
            name: "✅ All set",
            value:
              "You are good to go buddy! Hang out and wait for the lottery."
          }
        ];
      } else {
        if (charTuple[1] === REALM_NOT_FOUND) {
          fields = [
            {
              name: "	❌ Server",
              value: `I did not find ${serverName}. Is it spelled right?`
            }
          ];
        } else if (charTuple[1] === CHARACTER_NOT_FOUND) {
          fields = [
            {
              name: "✅ Server",
              value: "I found your server"
            },
            {
              name: "❌ Character",
              value: `I did not find ${charName}. Is it spelled right?`
            }
          ];
        }
      }

      const embed = {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        description: "Friendship Birb Check!!!!!!",
        fields: [
          {
            name: "✅ Server",
            value: "I found your server"
          },
          {
            name: "✅ Character",
            value: "I found your character"
          },
          {
            name: "✅ Birb status",
            value: "You do not currently have the friendship birb"
          },
          {
            name: "✅ All set",
            value:
              "You are good to go buddy! Hang out and wait for the lottery."
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "woof I am dog"
        }
      };
      message.reply({ embed });
    } else {
      message.channel.send(
        `I need you to send me your character name, then server name in dash-case, ie bleeding-hollow not Bleeding Hollow`,
        { reply: message }
      );
    }
  }
};

async function doTheRequest(charName, serverName) {
  try {
    const char = await blizz.wow.character(["profile"], {
      origin: "us",
      realm: serverName,
      name: charName
    });
    return ["ok"];
  } catch (error) {
    const reason = error.response.reason;
    return ["not_ok", reason];
  }
}
