const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const agent = chai.request.agent(app);

//import the post model from our models folder so we can use it in our tests
const Post = require('../models/post');
const User = require('../models/user');

chai.should();
chai.use(chaiHttp);

describe('Posts', function() {
    const agent = chai.request.agent(app);

    //post that we'll use for testing purposes
    const newPost = {
        title: 'post title',
        url: 'https://www.google.com',
        summary: 'post summary',
        subreddit: 'hh'
    };
    const user = {
        username: 'posttest',
        password: 'testposts'
    };

    before(function(done) {
        agent
            .post('/sign-up')
            .set("content-type", "application/x-www-form-urlencoded")
            .send(user)
            .then(function (res) {
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

    it("Should create with valid attributes at POST /posts/new", function(done) {
        //checks how many posts there are now
        Post.estimatedDocumentCount()
            .then(function (initialDocCount) {
                agent
                    .post("/posts/new")
                    //this line fakes a form post
                    // since we're not actually filling out a form
                    .set("content-type", "application/x-www-form-urlencoded")
                    //make a reqyest to create another
                    .send(newPost)
                    .then(function (res) {
                        Post.estimatedDocumentCount()
                            .then(function (newDocCount) {
                                //check that the response is successful
                                expect(res).to.have.status(200);
                                //check that the databse has one more post in it
                                expect(newDocCount).to.be.equal(initialDocCount + 1)
                                done();
                            })
                            .catch(function (err) {
                                done(err);
                            });
                    })
                    .catch(function (err) {
                        done(err);
                    });
            })
            .catch(function (err) {
                done(err);
            });
    });

//make sure we delete this post after we run the test
    after(function (done) {
        Post.findOneAndDelete(newPost)
        .then(function (res) {
            agent.close();

            User.findOneAndDelete({
                username: user.username
            })
                .then(function (res) {
                    done()
                })
                .catch(function (err) {
                    done(err);
                });
        })
        .catch(function (err) {
            done(err);
        });
    });
});
