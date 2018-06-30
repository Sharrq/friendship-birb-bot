module.exports = {
  name: "raids",
  description: "ARD community raids",
  async execute(client, message, args) {
    const NORMAL_ILVL = "920";
    const HEROIC_ILVL = "930";
    const TITLE = "ARD Community Raids";
    const BODY = `ARD Community Raids
    🌟 **__ARD Community Raids__** 🌟
The only requirement we have for community raids is ilvl - You should be at ilvl ${NORMAL_ILVL} or higher for normal, and ilvl ${HEROIC_ILVL} or higher for heroic. All times are Eastern.

**Sunday, 8pm** FuT Beer Run (normal ABT)
**Monday, 8pm** Denny's (heroic ABT)
**Wednesday, 3:30pm** Normal ABT with Afternoon Delight
**Thursday, 3:30pm** Afternoon Delight (heroic ABT)
**Friday, 7pm** Pregame Raid (normal Gar>Agg>Argus)
**Friday, 10pm** The Drunk Raid (fun random shenanigans) aka "ARD After Dark" - attend at your own risk
**Saturday, 10:30pm** Normal ABT`;
    const fields = [
      { title: "Sunday, 8pm", value: "Fut Beer run (normal ABT)" }
    ];
    const embed = {
      color: 3447003,
      title: TITLE,
      description: BODY,
      fields: fields
    };
    await message.channel.send({ embed });
  }
};
