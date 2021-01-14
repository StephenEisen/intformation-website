const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: String,
  hp: Number,
  speed: Number,
  artifact: String,
  notes: String,
});

const IntelSchema =  new Schema({
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
    data: [IntelSchema]
  },
);

const GuildData = mongoose.model("guilddata", GuildDataSchema);

// const data = new GuildData(
//   {
//     pageID: "1212",
//     data: [
//       {
//         towerName: "stevie",
//         location: "bronze",
//         team1: [
//           {
//             name: "Achates",
//             hp: 10000,
//             speed: 200,
//             artifact: "Proof of Valor",
//             notes: "Shes got a really fat ass",
//           },
//         ],
//       }
//     ]
//   },
// );

// all of these are async

//Use this to delete the entire schema from db 
//mongoose.connection.collections.guilddatas.drop();

//.remove({ pp : thing})
//.findOneAndRemove({ pp : thing})

//.update({ pp : thing}, { pp : newThing})
//.findOneAndUpdate({ pp : thing}, { pp : newThing})

// async function saveData(){
//   await data.save();
//   GuildData.findOne({ "data.towerName": 'stevie' }, function(error, result) {
//     console.log(result);
//   });
// }

// saveData();

module.exports = GuildData;
