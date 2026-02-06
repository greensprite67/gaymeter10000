const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors())

app.use(express.json()); 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/message', (req, res) => {
  res.json({ message: 'fob peak lol ' });
});

app.get("/activateserver", (req, res) => {
  res.send("Server is active");
});

const gayArray = [
  { name: "straight", value: -20 },
  { name: "boi", value: 10 },
  { name: "master", value: 50 },  
  { name: "dev", value: 15 },
  { name: "gay", value: 100 },
  { name: "gamer", value: 40 },
  { name: "ibuslol", value: 67 },
  { name: "ry", value: 20 },
  { name: "XD", value: 20 },
  { name: ":3", value: 20 },
  { name: "uwu", value: 40 },
  { name: "femboy", value: 80 },
  { name: "chan", value:  40},
  { name: "kun", value: 20 },
  { name: "!!!", value: 20 },
  { name: "diddy", value: 40 },
  { name: "blud", value: 30 },
  { name: "lgbt", value: 100 },
  { name: "pride", value: 50 },
  { name: "rainbow", value: 30 },
  { name: "twink", value: 40 },
  { name: "queer", value: 60 },
  { name: "drag", value: 40 },
  { name: "emo", value: 20 },
  { name: "e-", value: 10 },
  { name: "japan", value: 20 },
  { name: "anime", value: 30 },
  { name: "otaku", value: 20 },
  { name: "kawaii", value: 40 },
  { name: "senpai", value: 30 },
  { name: "baka", value: 20 },
  { name: "nya", value: 20 },
  { name: "furry", value: 30 },
  { name: "sholkias", value: 99.67 },
];

const descriptionArray = [
  {min: -100, max: 0, description: "Bro is so straight he makes a line look curved."},
  {min: 0, max: 10, description: "Bro is straight as a ruler."},
  {min: 10, max: 20, description: "Bro is a little gay he starts acting like that too 🐎🐎🐎"},
  {min: 20, max: 30, description: "Bro is a bit gay even his gang noticed 😂🥀🗣️🔥😭😭🐎"},
  {min: 30, max: 40, description: "Bro is a bit more gaey he watches anime unironically 💀💀💀"},
  {min: 40, max: 50, description: "Bro is definitely gay enough to use the zesty voice🏳️‍🌈"},
  {min: 50, max: 60, description: "Bro is a bit too gay that he likes to wear skrits 🔥"},
  {min: 60, max: 70, description: "Bro is kinda gay and has no shame about it 🏳️‍🌈🔥"},
  {min: 70, max: 80, description: "Bro is gay and proud of it 🌈🏳️‍🌈"},
  {min: 80, max: 90, description: "Bro is very gay and loves it 🌈🏳️‍🌈💖"},
  {min: 90, max: 101, description: "Bro is the gayest of them all 🌈🏳️‍🌈💖👑"},
  {min: 101, max: 150, description: "MEGAGAY 🌈🏳️‍🌈💥💥💥"},
  {min: 150, max: 300, description: "ULTRAGAY 🏳️‍🌈🏳️‍🌈🏳️‍🌈💥💥💥"}
];

async function measureGayness(username) {
  const clmatch = require('closest-match');
  const WordsNinjaPack = require('wordsninja');
  const WordsNinja = new WordsNinjaPack();
  await WordsNinja.loadDictionary();
  for (let i = 0; i < gayArray.length; i++) {
    gayArray[i].name = gayArray[i].name.toLowerCase();
    WordsNinja.addWords([gayArray[i].name]);
  };  
  var gaypercent = 0;
  var description = "";
  const lname = username.toLowerCase();
  const charperc = lname.length / 10;
  const sname = WordsNinja.splitSentence(lname)
  console.log("sname: " + sname);
  for (let i = 0; i < sname.length; i++) {
    var simwords = clmatch.closestMatch(sname[i], gayArray.map(item => item.name), true);
    if (simwords.length === 0) {
      break;
    }
    if (simwords.length > 1) {
      for (let j = 0; j < simwords.length; j++) {
        var dist = clmatch.distance(sname[i], simwords[j]);
        if (dist < sname[i].length * 1.6) {
          var simperc = (1 - (dist / simwords[j].length * 0.5));
          gaypercent += ((gayArray.find(item => item.name === simwords[j]).value)/simwords.length)*simperc;
        };
      }
    }
    else {
      var dist = clmatch.distance(sname[i], simwords[0]);
      var simperc = (1 - (dist / simwords[0].length * 0.5));
      if (dist < sname[i].length * 1.6) {
        var val = gayArray.find(item => item.name === simwords[0]).value;
        gaypercent += val * simperc;
      };
    };
  };  

  for (let i = 0; i < descriptionArray.length; i++) {
    if (gaypercent >= descriptionArray[i].min && gaypercent <= descriptionArray[i].max) {
      console.log("Description: " + descriptionArray[i].description);
      description = descriptionArray[i].description;
    }
  };

  var multiplier = 1;
  if (charperc > 2) {
    multiplier = multiplier / charperc;
  };
  if (Number.isNaN(gaypercent)) {
    gaypercent = 0;
  }
  gaypercent = gaypercent * multiplier;
  return [gaypercent.toFixed(2), description];
};


app.post('/gaypercent', (req, res) => {
  const usname = req.body.username;
  measureGayness(usname).then((gayness) => {
    res.json({ percent: gayness[0], description: gayness[1] });
  });
});
