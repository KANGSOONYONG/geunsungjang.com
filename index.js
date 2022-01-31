const express = require('express')
const app = express()
const path = require('path');
const port = 8080;

const config = require('./config/key');
const cookieParser = require('cookie-parser');
const { User } = require("./models/User");
const { Items } = require("./models/Items");
const { SiteNames } = require("./models/SiteNames");
const { Youtubers } = require("./models/Youtubers");
const { Comments } = require("./models/Comments");

const { auth } = require("./middleware/auth");


app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(cookieParser());


const mongoose = require('mongoose')


mongoose.connect(config.mongoURI,)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.use(express.static(path.join(__dirname, 'project/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/project/build/index.html'));
});


app.post('/api/users/register', (req, res) => {

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success : false, err})
    return res.status(200).json({
      success : true
    })
  })
})

app.post('/api/users/sameEmailCheck', (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        canUseEmail: true,
        message: "사용 가능한 이메일 주소입니다."
      })
    } else  {
      return res.json({
        canUseEmail: false,
        message: "이미 존재하는 이메일이 있습니다."
      })
    }
  })
})

app.post('/api/users/login', (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    user.comparePassword(req.body.password , ( err, isMatch ) => {
    if(!isMatch)
      return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
    
    user.generateToken((err, user) => {
      if(err) return res.status(400).send(err);
      res.cookie("x_auth", user.token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id, userToken: user.token, userRole: user.role })
      })
    })
  })
})
app.get('/api/users/auth', auth , (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false: true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, 
    {token : ""}
    , (err, user) => {
      if(err) return res.json ({success : false, err});
      return res.status(200).send({
        success: true
      })
    })
})

app.get('/api/users', async (req, res) => {
  try{
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})


app.get('/api/youtubers', async (req, res) => {
  try{
    const youtubers = await Youtubers.find();
    res.json(youtubers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})


app.get('/api/sitenames', async (req, res) => {
  try{
    const siteNames = await SiteNames.find();
    res.json(siteNames);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

app.post('/api/youtubers/create', (req, res) => {

  const youtubers = new Youtubers(req.body)

  youtubers.save((err, youInfo) => {
    if(err) return res.json({ success : false, err})
    return res.status(200).json({
      success : true
    })
  })
})

app.get('/api/items/youtuber/:youtuber', async (req, res) => {
  try{
    const items = await Items.find( {youtuber: req.params.youtuber});
    res.json(items);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

app.post('/api/items/create', (req, res) => {
  const items = new Items(req.body)

  items.save((err, itemInfo) => {
    if(err) return res.json({ success : false, err})
    return res.status(200).json({
      success : true
    })
  })
})
const { ObjectId } = require('mongodb');

app.put('/api/items/:items_id', async (req, res) => {
  var id = req.params.items_id;
  await Items.updateOne( {_id : ObjectId(`${id}`) }, {$set: req.body})
  .then(result => res.json('수정완료'))
  .catch(err => res.json(err)); 
})


app.delete('/api/items/:items_id', async (req, res) => {
  var id = req.params.items_id;
  await Items.deleteOne({ _id : ObjectId(`${id}`)})
  .then(result => res.json(`${result.deletedCount}개의 항목 삭제완료`))
  .catch(err => res.json(err)); 
})

app.get('/api/comments', async (req, res) => {
  try{
    const comments = await Comments.find().sort( { "number": -1 } );
    res.json(comments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

app.post('/api/comments/create', (req, res) => {
  const comments = new Comments(req.body)

  comments.save((err, commentInfo) => {
    if(err) return res.json({ success : false, err})
    return res.status(200).json({
      success : true
    })
  })
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/project/build/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.json());
var cors = require('cors');
app.use(cors({
  "Access-Control-Allow-Origin": "*"
}));