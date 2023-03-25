import express from 'express';  //(https://expressjs.com/)
import bp from "body-parser";  //(https://www.npmjs.com/package/body-parser)
import morgan from "morgan";
const logevents = morgan("dev");

const port = 5100;
const app = express();
import sign from "../RidgeviewSign/RidgeviewSign.mjs";

app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
app.use(logevents)   //middleware that logs server events (https://www.npmjs.com/package/morgan)

app.get("/", (req, res) => {
    res.send("server listening, hello world");
   });

app.listen(port, () => {
    console.log("Express server listning on port " + port);
  });

//use nodemon app.js to start
//or use node app.js to start
