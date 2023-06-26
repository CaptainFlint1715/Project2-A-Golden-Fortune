const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// routes to characterRoutes //
// const characterRoutes = require('./characterRoutes');

const routes = require('./controllers');
const images = require('./SceneData.json');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



<<<<<<< HEAD
=======
app.get("/",(req,res)=>{  
  res.render("login")
})
app.get('/images', (req, res) => {
  res.render('images', {
    multipleImages: images.multipleImages,
    singleImage: images.singleImage,
    singleImageWithNameSource:images.singleImageWithName[0].src,
    singleImageWithName:images.singleImageWithName[0].name,
  });
});


app.get("/homepage",(req,res)=>{
  res.render("homepage",{
    heading:"Golden fortune",
  })
})

>>>>>>> new-images
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// app.use(characterRoutes);

// Routes
app.use(routes);

// Run the sequelize connection
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
});
app.use(express.static(path.join(__dirname, 'public')));
