const express = require('express');
const router = express.Router();
const isPalindrome = require('is-palindrome');
const qoutes = require('find-quote');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

router.use(bodyParser.json());

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

/* ----------------------------- Alternative 1 --------------------------------- */

router.get('/is-palindrome/:word', (req, res) => {    
    let answer = isPalindrome(req.params.word) ? "Yes, " + req.params.word + " is a palindrome" : "No, " + req.params.word + " is not a palindrome";

    fetch('https://httpbin.org/post', {
        method: 'POST',
        body:    JSON.stringify({ palindrome: answer }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => res.send(json.json));
});

/* ----------------------------- Alternative 2 --------------------------------- */

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

router.get('/user/add/:username/:firstname/:lastname', (req, res) => {    
    let user = { 
        username: req.params.username,
        firstname: req.params.firstname,
        lastname: req.params.lastname 
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