require("dotenv").config();

const app = require("./app.js");
const port = process.env.PORT;


app.get("/", (req, res) => {
  res.send("Hello Worldrrr!");
});

app.listen(port || 6969, () => {
  console.log(`Example app listening on port ${port}`);
});
