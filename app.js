const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extented:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const city = req.body.cityname;
  const unit = "metric";
  const appkey = "b417d3609535a1fd32d532419cdd2d27";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+appkey+"&units="+unit+"&q="+city;
  https.get(url,function(responce){
    responce.on("data",function(data){
      const wdata = JSON.parse(data);
      const temp = wdata.main.temp;
      const img  = wdata.weather[0].icon;
      const wdisc = wdata.weather[0].description;
      var string = "<h1>The temperature in "+city+" is "+temp+" degrees celcius.</h1>";
      var string2 = "<p>The Weather is currently "+wdisc+"</p>";
      const urlimg = "http://openweathermap.org/img/wn/"+img+"@2x.png";
      var imgs = "<img src="+urlimg+">"
      res.send(string2+"<br>"+string+imgs);
  });
 });  
});








app.listen(3000,function(){
  console.log("The server is running at Port : 3000");
});
