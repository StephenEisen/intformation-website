const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: String,
  hp: Number,
  speed: Number,
  artifact: String,
  notes: String,
});

const TowerSchema = new Schema({
  location: String,
  name: String,
  team1: [CharacterSchema],
  team2: [CharacterSchema],
});

const GuildDataSchema = new Schema(
  {
    pageId: {
      type: String,
      unique: true
    },
    data: [TowerSchema]
  },
);

const GuildData = mongoose.model("guilddata", GuildDataSchema);

module.exports = GuildData;
