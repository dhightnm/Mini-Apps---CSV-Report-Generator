const express = require('express');
const app = express();
const port = 8000;


app.get('/', (req, res) => {
    res.send('Hello World');
})
app.post('/submit-form', (req, res) => {
    res.send('Received')
    console.log('Got it');
});
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});