const Post = require('../models/post')

module.exports = app => {

//get posts in main page
  app.get('/', (req, res) => {
    var currentUser = req.user;

    Post.find({})
        .then(posts => {
            res.render("posts-index", { posts, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        })
  })

  //get form
  app.get("/posts/new", (req, res) => {
      var currentUser = req.user;

      res.render('posts-new', { currentUser });
  })

  // CREATE
  app.post("/posts/new", (req, res) => {

      if (req.user) {
          //INSTANTIATE INSTANCE OF POST MODEL
          const post = new Post(req.body);

          //SAVE INSTANCE OF POST MODEL TO DB
          post.save(function(err, post) {
              //REDIRECT TO THE ROOT
              return res.redirect('/');
          });
      } else {
          return res.status(401).send({ message: "Unauthorized! Please log in first." });

      }
  });

//each post
  app.get("/posts/:id", function(req, res) {
      var currentUser = req.user;

      //LOOK UP THE Post
      Post.findById(req.params.id).populate('comments')
        .then(post => {
            res.render("posts-show", { post, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
  });

//subreddit
    app.get("/n/:subreddit", function(req,res) {
        var currentUser = req.user;

        Post.find({subreddit: req.params.subreddit})
            .then(posts => {
                res.render("posts-index", {posts, currentUser});
            })
            .catch(err => {
                console.log(err);
            });
    });

};
