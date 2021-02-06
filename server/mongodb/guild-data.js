import mongoose from 'mongoose';

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
  characters: [CharacterSchema]
});

const GuildDataSchema = new Schema(
  {
    pageId: {
      type: String,
      unique: true
    },
    data: [TowerSchema],
    createdDate: Date
  },
);

const GuildData = mongoose.model("guilddata", GuildDataSchema);

export default GuildData;
