const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 27015;
const htmlData = require('./htmlPage');

let jsonData = require('./areaData.json');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.listen(port, ()=> console.log(`Listening to requests on port ${port}`))

app.get('/',(req,res)=> res.sendFile(__dirname+"/public/index.html"))

app.get(`/api/jsonData`,(req,res)=> res.send(jsonData) )

app.post("/api/InputValue", (req, res) => {
    const {body : data} = req
    jsonData.areaNames.push(data)
    const make = () => fs.writeFile("./areaData.json", JSON.stringify(jsonData, null, 2), (writeJSON = err => !err && res.send(true)));
    !fs.existsSync("./"+data.name+".html") ? make() : res.send(false)    
})

fs.watch('./areaData.json',(e , c) => c && makeFiles() )

const  makeFiles = () => {
  jsonData.areaNames.map(fname => {
    path = `./${fname.name}.html`;
    const make = () => fs.writeFile(path, htmlData(fname.name),() => null)
    app.get(`/${fname.name}`,(req,res)=> res.sendFile(__dirname+"/"+fname.name+".html")) 
    !fs.existsSync(fname) && make()
  })
}
makeFiles()