const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = function(app) {

//create comment
app.post("/posts/:postId/comments", function(req, res) {
    //instantiate instance of model
    const comment = new Comment(req.body);

    //save instance of Comment model to DB
    comment
        .save()
        .then(comment => {
            return Post.findById(req.params.postId);
        })
        .then(post => {
            //unshift adds an element to the front of an array, while push adds it to the end
            post.comments.unshift(comment);
            return post.save();
        })
        .then(post => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
});

};
