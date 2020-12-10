const express = require('express');
const router = express.Router();
const qoutes = require('find-quote');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

router.use(bodyParser.json());

router.get('/', (req,res) => {
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
    
    // Om du vill se resultatet i json-format. 
    // let body = {
    //     quote: isFound
    // }
    // res.json(body)
});

router.get('/user/add/:username/:firstname/:lastname', (req, res) => {
    let username = req.params.username;
    let firstname = req.params.firstname;
    let lastname = req.params.lastname;
    
    let user = { 
        username: username,
        firstname: firstname,
        lastname: lastname 
    };

    fetch('https://httpbin.org/post', {
            method: 'POST',
            body:    JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => res.send(json.json));
});

module.exports = router;