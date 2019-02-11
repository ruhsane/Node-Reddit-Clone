const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("site", function() {
    //describe what you are testing
    it("Should have home page", function(done) {
        //describe what should happen
        //in this case we test that the home page loads
        chai
            .request(app)
            .get("/")
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                res.status.should.be.equal(200);
                return done(); // call done if the test completed successfully
            });
    });
});
