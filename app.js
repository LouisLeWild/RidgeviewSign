const express = require('express')  //(https://expressjs.com/)
const bp = require("body-parser")  //(https://www.npmjs.com/package/body-parser)
const port = 5000
const app = express()

app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use(require("morgan")("dev"))   //middleware that logs server events (https://www.npmjs.com/package/morgan)

app.get("/", (req, res) => {
    res.send("server listening, hello world");
   });

app.listen(port, () => {
    console.log("Express server listning on port " + port);
  });

//use nodemon app.js to start
//or use node app.js to start
