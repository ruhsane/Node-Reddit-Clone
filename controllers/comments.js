const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = function(app) {

//create comment
app.post("/posts/:postId/comments", (req, res) => {

    if (req.user) {
        //instantiate instance of model
        const comment = new Comment(req.body);
        comment.author = req.user._id;

        //save instance of Comment model to DB
        comment
            .save()
            .then(comment => {
                return Promise.all([
                  Post.findById(req.params.postId)
                ]);
            })
            .then(([post, user]) => {
                //unshift adds an element to the front of an array, while push adds it to the end
                post.comments.unshift(comment);
                return Promise.all([
                  post.save()
                ])
            })
            .then(post => {
                res.redirect(`/posts/${req.params.postId}`);

            })
            .catch(err => {
                console.log(err);
            });
    } else {
        return res.status(401).send({ message: "Unauthorized! Please log in first." });
    }
});

};
