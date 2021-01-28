const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  team: Number,
  name: String,
  hp: Number,
  speed: Number,
  artifact: String,
  notes: String,
  immunity: Boolean,
  counter: Boolean,
  lifesteal: Boolean
});

const TowerSchema = new Schema({
  location: String,
  name: String,
  characters: [CharacterSchema]
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
