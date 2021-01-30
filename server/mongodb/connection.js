const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = global.Promise;

function connect() {
  mongoose.connect("mongodb://localhost/testdata", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  mongoose.connection
    .once("open", function () {
      console.log("Connection has been made.");
    })
    .on("error", function (error) {
      console.log("Connection error:", error);
    });
}

module.exports = { connect };
