require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Pusher = require('pusher');

app.use(cors());
app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const storage = {
    contexts : {
      1: {
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD",
        title: "How do I run a Server in chrome extension? - Quora",
        url: "https://www.quora.com/How-do-I-run-a-Server-in-chrome-extension",
      },
      2: {
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD",
        title: "webpack bundle.js not found - Stack Overflow",
        url: "https://stackoverflow.com/questions/33502987/webpack-bundle-js-not-found"
      }
    }
};



const pusher = new Pusher({
  appId: '675319',
  key: '7183f00f7d1dd7d82761',
  secret: process.env.PUSHER_SECRET,
  cluster: 'eu',
  encrypted: true
});

function getContext(){
    return storage.contexts;
}

function getStudentById(studentId){
    return storage.contexts[studentId];
}

app.get('/', function(req, res){
  res.render('index');
});

app.get('/context', function(req, res){
  const contexts = getContext();
  res.json(contexts);
});

app.post('/api/context', (req, res) => {
  res.json(req.body);
  console.log(req.body);
  pusher.trigger('context', 'update-context', {
    "message": req.body
  });
})

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
