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
  sign.resetCharacterManager();
  res.send(tableMake([req.body.L1, req.body.L2, req.body.L3], [req.body.L4, req.body.L5, req.body.L6]));
});

app.listen(port, () => {
    console.log("Express server listning on port " + port);
  });

function tableMake(face1, face2){
    let t = ''
    t += faceMake(face1);
    t += tr(undefined, '<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>' );
    t += faceMake(face2);
    return tbl('', t);
}


function faceMake(face){
  let t = '';
  
  for(let l of face){
    t += rowMake(l);
  }
  return t;
}

function rowMake(l){
  let t = ''
  
  let leadingSpaces = Math.floor((20 - l.length)/2);
  let trailingspaces = 20 - (leadingSpaces + l.length);
  console.log("leading", leadingSpaces);
  console.log("trailing", trailingspaces);

  for(let s = 0; s < leadingSpaces; s++){
    let remaining = sign.characterManagerUse(' ');
    let cls = classify(' ');
    cls = remaining >=0 ? cls : "depleated";
    t += td(cls, " ");
  }
  for(let c of l){
    let remaining = sign.characterManagerUse(c);
    let cls = classify(c);
    cls = remaining >=0 ? cls : "depleated";
    t += td(cls, c.toUpperCase());
  }
  for(let s = 0; s < trailingspaces; s++){
    let remaining = sign.characterManagerUse(' ');
    let cls = classify(' ');
    cls = remaining >=0 ? cls : "depleated";
    t += td(cls, " ");
  }
  t = tr('', t);
  return t;
}

function td(cls, innerHtml){
  return `<td class='${cls || ''}'>${innerHtml}</td>`;
}

function tr(cls, innerHtml){
  return `<tr class='${cls || ''}'>${innerHtml}</tr>`;
}

function tbl(cls, innerHtml){
  return `<table class='${cls || ''}'>${innerHtml}</table>`;
}

function classify(character){
  return character == ' ' ? 'justaspace' : 'fulfilled';
}

//use nodemon app.js to start
//or use node app.js to start





