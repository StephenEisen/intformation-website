import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChangeLogSchema = new Schema({
  user: String,
  timestamp: Date,
  content: String
});

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

const CharactersUsed = new Schema({
  name: [String],
  wonBattle: Boolean
});

const TowerSchema = new Schema({
  location: String,
  name: String,
  characters: [CharacterSchema],
  charactersUsed: [CharactersUsed]
});

const TowerListSchema = new Schema({
  'Stronghold': [TowerSchema],
  'Bronze Fortress': [TowerSchema],
  'Silver Fortress': [TowerSchema],
  'Dalberg Fortress': [TowerSchema]
});

const GuildDataSchema = new Schema(
  {
    pageId: {
      type: String,
      unique: true
    },
    createdDate: Date,
    changelog: ChangeLogSchema,
    towerList: TowerListSchema
  },
);

const GuildData = mongoose.model("guilddata", GuildDataSchema);

export default GuildData;
