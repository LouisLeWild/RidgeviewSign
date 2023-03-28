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
    res.sendFile("C:\\Users\\Paul\\JSNoodling\\RidgeviewSignExpress\\html\\index.html")
   });

app.get("/css", (req, res) => {
  res.sendFile("C:\\Users\\Paul\\JSNoodling\\RidgeviewSignExpress\\css\\default.css")
});

app.get("/script", (req, res) => {
  res.sendFile("C:\\Users\\Paul\\JSNoodling\\RidgeviewSignExpress\\scripts\\index.js")
});

app.post("/verify", (req, res) => {
  console.log("L1", [req.body.L1, req.body.L2, req.body.L3], [req.body.L4, req.body.L5, req.body.L6]);
  sign.initSign([[req.body.L1, req.body.L2, req.body.L3], [req.body.L4, req.body.L5, req.body.L6]]);
  let lengthVerify = sign.validateLineLengths();
  let lettersVerify = sign.validateLettersAvailable();
  res.send({"length": lengthVerify, "letters": lettersVerify})
});

app.listen(port, () => {
    console.log("Express server listning on port " + port);
  });

//use nodemon app.js to start
//or use node app.js to start





