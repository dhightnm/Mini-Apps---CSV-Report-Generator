const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/index.html'));
// })
// app.use('/', (req, res, next) => {
//     res.json(req.body);
//     next()
// })
app.post('/submit-form', (req, res) => {
    var body = JSON.parse(req.body.textarea)
    var returnObj = {};
    var titles = Object.keys(body);

    for (let i = 0; i < titles.length; i++) {
        if (titles[i] !== 'children') {
        returnObj[titles[i]] = []
        }
    }
    let recurseInfo = (object) => {

        for (let i = 0; i < titles.length; i ++){
            if (titles[i] !== 'children') {
            returnObj[titles[i]].push(object[titles[i]]);
            }
        }
        if (object.children.length > 0){
            for (let i = 0; i < object.children.length; i++) {
                recurseInfo(object.children[i]);
            }
        }
    }
    recurseInfo(body);
    console.log(typeof returnObj);
    returnObj['csv'] = csvMaker(returnObj);
    res.status(201).send(returnObj)
});
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});

//===================CSV HELPER FUNCTIONS==================

let csvMaker = (body) => {
    var csv = [];
    var items = Object.keys(body);
        for (let i = 0; i < body.length; i++) {
            if (body[i] !== 'children') {
            var current = [];
            for (let j = 0; j < items.length; j++) {
                current.push(body[items[j]][i]);
            }
            csv.push(current);
            }
        }
        csv = csv.join('\n');
        return csv;

}