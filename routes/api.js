const express = require('express');
const router = express.Router();
const qoutes = require('find-quote');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { json } = require('body-parser');

router.use(bodyParser.json());

router.get('/', (req,res) => {
    //res.sendFile('quotes.html',{root: __dirname})
    res.send('<section style="margin: 200px;"><div style="width:100%; margin 100px; text-align: center;"><h1>Quotes</h1></div> </section>');
});

router.get('/quotes/:quote', (req,res) => {
    let quoteFound = qoutes.getQuote(req.params.quote);
    let isFound = quoteFound === "" ? 'No quotes were found with the word ' + req.params.quote : quoteFound
    
    res.send(
        `<section style="margin: 200px;">
            <div style="width:100%; margin 100px; text-align: center;">
                <h2>`+ isFound +`</h2>
            </div>
        </section>`
    );
});

router.get('/user', (req, res) => {    
    res.send('User');
});


router.post('/user/add/:name', (req, res) => {
    
    let name = req.params.name;
    //let age = req.params.age;
    // // let userId = req.params.userId;
    // res.status(200).json({
    //     name
    // })

    let body = { 
        name: name,
        age: age
    };

    fetch('https://httpbin.org/post', {
            method: 'POST',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => res.send(json.json));
});


module.exports = router;