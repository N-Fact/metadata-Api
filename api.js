const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs')
const { getTotalSupply } = require('./contract')
const baseUrl = 'https://dwarfknights.s3.eu-central-1.amazonaws.com/nft/';
const request = require('request');
const baseImagePath = "/images/"

const app = express();

const port = 3000;

app.get('/:id', async  (req, res) => {
    res.set({
        'Content-Type': 'application/json'
    })

    const id = req.params.id
    const jsonPath = baseUrl+id+".json"
    var supply = await getTotalSupply()

    if (parseInt(id) <= parseInt(supply)) {
        try {
            if (req.params.id != 'favicon.ico') {
                fetch(jsonPath)
                    .then(response => response.json())
                    .then(json => res.json(json))
                    .catch(err =>  res.status(404).send('Not found'));
            }
        } catch (error) {
            res.status(404).send('Not found');
        }
        
    }else{
        res.status(404).send('Not found');
    }    
});

app.get('/image/:id', async(req, res) => {

    const id = req.params.id
    const filepath = baseUrl+id+".png"
    const imgpath =__dirname+ baseImagePath+id+".png"
    var supply = await getTotalSupply()
    
    if (parseInt(id) <= parseInt(supply)) {
        try {
            if (req.params.id != 'favicon.ico') {
                download(filepath, imgpath, function(){
                    res.sendFile(imgpath)
                    // fs.unlink(imgpath, function (err) {
                    //     console.log('File deleted!');
                    // });
                  });
            }
        } catch (error) {
            res.status(404).send('Not found');
        }
    }else{
        res.status(404).send('Not found');
    }
});

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);
  
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
