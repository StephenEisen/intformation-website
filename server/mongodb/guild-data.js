const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  team: Number,
  name: String,
  hp: Number,
  minSpeed: Number,
  maxSpeed: Number,
  artifact: String,
  notes: String,
  immunity: Boolean,
  counter: Boolean,
  lifesteal: Boolean
});

const TowerSchema = new Schema({
  location: String,
  name: String,
  characters: [CharacterSchema],
  image1: String,
  image2: String
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
