import mongoose from 'mongoose';

mongoose.set("debug", process.env.IS_DEV);
mongoose.Promise = global.Promise;

export const connectToDatabase = () => {
  mongoose.connect("mongodb://localhost/intel", {
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
