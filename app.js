const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.listen(process.env.PORT || 3000, function(){
  console.log("server start at port:3000");
});
app.get('/', function(req,res){
  res.sendFile(__dirname + "/signup.html");
})
app.post('/', function(req,res){
  const first = req.body.firstname;
  const second = req.body.lastname;
  const email = req.body.email;
  const data = {
    members:[{
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: first,
        LNAME: second
      }
    }]
  };
  const jsondata = JSON.stringify(data);
  const url = "https://us19.api.mailchimp.com/3.0/lists/1daa228ca0";
  const options = {
    method: "POST",
    auth: "bhuvan:278ac3397760de52bc6f0b4546831b10-us19"
  }
  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
      response.on("data",function(data){
        console.log(JSON.parse(data));
      })
  })
  request.write(jsondata);
  request.end();
})
app.post('/success', function(req,res){
  res.redirect("/");
})







//api key 278ac3397760de52bc6f0b4546831b10-us19
//listid 1daa228ca0
