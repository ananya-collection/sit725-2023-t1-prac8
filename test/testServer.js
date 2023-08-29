let request = require('request');
const {expect} = require('chai');
//url for GET  method
let url= "http://localhost:3000/api/cats"
//url for POST method
let url1= "http://localhost:3000/api/cat"
let id;
let cat = { Title: "cat 10",
            Subtitle: "cat 10",
            Path: "kitten1.jpg",
            Description: "cat 8"
          }

// Test case for GET API
describe('test GET api', ()=>{
    it('extracting data from db', (done)=>{
        // chai.request("http://localhost:3000")
        //     .get('/api/cats')
        //     done();
        request(url, function(req,res){
            let cat_body= JSON.parse(res["body"]);
            expect(cat_body.data).to.be.a("array");
            expect(res.statusCode).to.eql(200);
            done();
        })
    })      
})
// Test case for POST API
describe('POST cat image', ()=>{
    it('it should post cat-image with description details', (done)=>{
        // chai.request("http://localhost:3000")
        //     .post('/api/cat')
        request.post({url:url1, form:cat}, function(req,res){
            let cat_body = JSON.parse(res.body);
            expect(cat_body.message).to.contain("success");
            id = cat_body.data.insertedId;
            done();
        }
        )
   })
})

// The rolling back mechanism implies the DELETE method.Test case for DELETE API
 describe('delete cat along with its id', ()=>{
     it('it should delete cat given the id', (done) => {
        request.delete(`${url1}/${id}`, function(req,res){
            let cat_body = JSON.parse(res.body);
            expect(cat_body.message). to. contain("delete success");
            expect(res.statusCode).to.eql(200);
            done();
        })
    })
 })