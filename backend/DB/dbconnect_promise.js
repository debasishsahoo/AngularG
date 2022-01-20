const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbuser = process.env.DBUSER;
const dbpassword = process.env.DBPASSWORD;
const dbname = process.env.DBNAME;

const url = `mongodb+srv://${dbuser}:${dbpassword}@cluster0.ulr44.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("NODEJS TO MongoDB Connection ESTABLISH.....");
  })
  .catch((err) => {
    console.log(err);
    console.log(
      "Error in DB connection : " + JSON.stringify(err, undefined, 2)
    );
    process.exit();
  });

module.exports = mongoose;
