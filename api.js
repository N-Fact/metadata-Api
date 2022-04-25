const express = require('express');
const fs = require('fs')
const { getTotalSupply } = require('./contract')
const baseJsonPath = "./json/"
const baseImagePath = "/images/"
const app = express();

const port = 3000;

app.get('/:id', async  (req, res) => {
    res.set({
        'Content-Type': 'application/json'
    })

    const id = req.params.id
    const jsonPath = baseJsonPath+id+".json"
    var supply = await getTotalSupply()

    if (parseInt(id) <= parseInt(supply)) {
        try {
            if (req.params.id != 'favicon.ico') {
                fs.readFile(jsonPath, "utf8", (err, jsonString) => {
                    if (err) {
                        console.log("File read failed:", err);
                        return;
                    }
                    var jsonf = JSON.parse(jsonString)
                    res.json(jsonf);
                });
            }
        } catch (error) {
            res.status(404).send('Not found');
        }
        
    }else{
        res.status(404).send('Not found');
    }    
});

app.get('/image/:id', async(req, res) => {
    // res.set({
    //     'Content-Type': 'image/png'
    // })

    const id = req.params.id
    const filepath = baseImagePath+id+".png"
    var supply = await getTotalSupply()
    
    if (parseInt(id) <= parseInt(supply)) {
        try {
            if (req.params.id != 'favicon.ico') {
                res.sendFile(__dirname+ filepath);
            }
        } catch (error) {
            res.status(404).send('Not found');
        }
      
    }else{
        res.status(404).send('Not found');
    }
});


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
