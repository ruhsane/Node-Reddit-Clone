const Post = require('../models/post');
const User = require('../models/user');

module.exports = app => {

//INDEX. get posts in main page
  app.get('/', (req, res) => {
    var currentUser = req.user;
    console.log(req.cookies);
    Post.find().populate('author')
        .then(posts => {
            res.render("posts-index", { posts, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        })
  })

  //get new post form
  app.get("/posts/new", (req, res) => {
      var currentUser = req.user;

      res.render('posts-new', { currentUser });
  })

  // CREATE new post
  app.post("/posts/new", (req, res) => {

      if (req.user) {
          //INSTANTIATE INSTANCE OF POST MODEL
          const post = new Post(req.body);
          post.author = req.user._id;

          //SAVE INSTANCE OF POST MODEL TO DB
          post
            .save()
            .then(post => {
                return User.findById(req.user._id);
            })
            .then(user => {
                user.posts.unshift(post);
                user.save();
                //redirect to the new post
                res.redirect(`/posts/${post._id}`);

            })
            .catch( err => {
                console.log(err.message);
          });
      } else {
          return res.status(401).send({ message: "Unauthorized! Please log in first." });

      }
  });

//SHOW each post
  app.get("/posts/:id", function(req, res) {
      var currentUser = req.user;

      //LOOK UP THE Post
      Post.findById(req.params.id).populate({path: 'comments', populate: {path: 'author'}}).populate('author')
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

        Post.find({subreddit: req.params.subreddit}).populate('author')
            .then(posts => {
                res.render("posts-index", {posts, currentUser});
            })
            .catch(err => {
                console.log(err);
            });
    });

};
