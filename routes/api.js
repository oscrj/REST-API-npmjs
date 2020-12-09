const express = require('express');
const router = express.Router();
const qoutes = require('find-quote');

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

module.exports = router;