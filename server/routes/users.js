const fs = require('fs');
const validator=require('validator');

// variables
const dataPath = './server/data/moviesData.json';

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                console.log(err);
            }
            if (!data) data="{}";
            callback(returnJson ? JSON.parse(data) : data);
       });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                console.log(err);
            }

            callback();
        });
    };


module.exports = {
    //READ
    getMovies: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else
                res.send(!data? JSON.parse("{}") : JSON.parse(data));
        });
    },
  
    // CREATE
   CreateMovie: function (req, res) {

        readFile(data => {
            if(data[req.body.id]){
                return res.status(400).send("the movie id is already exists");
            }else{
                if (!req.body.id) return res.sendStatus(500);   
                if (!req.body.name) return res.sendStatus(500);   
                if (!req.body.picture) return res.sendStatus(500);   
                if (!req.body.director) return res.sendStatus(500);   
                if (!req.body.date) return res.sendStatus(500);   
                if (!req.body.rating) return res.sendStatus(500);   
                if (req.body.isSeries!==false&&req.body.isSeries!==true ) return res.sendStatus(500);   
                if(req.body.isSeries===true){
                    if (!req.body.series_details) return res.sendStatus(500);
                }
                if (req.body.rating>5||req.body.rating<1) return res.sendStatus(500);   
                if(validator.isURL(req.body.picture)===false) return res.sendStatus(500); 
            }
        
            // add the new user
            
            data[req.body.id] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    },
    AddActorToMovie: function (req, res) {
        const mediaId = req.params["id"];
        const NmaeActor = req.params["name"];
        readFile(data => {
            // add the new user 
            for (let actors in data[mediaId].actors) {
                if (actors === NmaeActor) {
                  return res.status(400).send(`Actor with name ${NmaeActor} already exists!`);
                }
            }

            if (!req.body.name) return res.sendStatus(500);
            if (!req.body.picture) return res.sendStatus(500);
            if (!req.body.site) return res.sendStatus(500);
            if(validator.isURL(req.body.picture)===false) return res.sendStatus(500); 
            if(validator.isURL(req.body.site)===false) return res.sendStatus(500);
            
            data[mediaId].actors[NmaeActor]=req.body;
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new actor added');
            });
        },
            true);
    },
    getMovie: function (req, res) {

        readFile(data => {

            const mediaId = req.params["id"];
            if (!data[mediaId])
                return res.status(400).send("Movie Not Exists");

            res.status(200).send(data[mediaId]);
        },
            true);

    },

    // UPDATE
    updateMovie: function (req, res) {

        const arr = ["name", "picture", "director", "date", "rating", "isSeries", "series_details"];
        readFile(data => {

            // add the new user
            const movieId = req.params["id"];
            if(!data[req.body.id]){
                return res.status(400).send("the movie id is not exists");
            }else{
                if (!req.body.name) return res.sendStatus(500);   
                if (!req.body.picture) return res.sendStatus(500);   
                if (!req.body.director) return res.sendStatus(500);   
                if (!req.body.date) return res.sendStatus(500);   
                if (!req.body.rating) return res.sendStatus(500);   
                if (req.body.isSeries!==false&&req.body.isSeries!==true ) return res.sendStatus(500);   
                if(req.body.isSeries===true){
                    if (!req.body.series_details) return res.sendStatus(500);
                }
                if (req.body.rating>5||req.body.rating<1) return res.sendStatus(500);   
                if(validator.isURL(req.body.picture)===false) return res.sendStatus(500);
            }


            if (data[movieId]){
                let wantedKey = Object.keys(req.body);
                    
                wantedKey.forEach((key) => {

                    if(arr.includes(key)){

                        data[movieId][key] = req.body[key];
                    }

                });

            }else res.sendStatus(400);
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${movieId} updated`);
            });
        },
            true);

    },
    // DELETE
    deleteMovie: function (req, res) {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            if(!data[userId]){
                return res.status(400).send("the movie id is not exists");
            }
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    },
    deleteActorFromMovie: function (req, res) {
        const mediaId = req.params["id"];
        const NmaeActor = req.params["name"];

        readFile(data => {

            if(!data[mediaId].actors[NmaeActor]){
                return res.status(400).send("the actor name/movie id is not exists");
            }
            delete data[mediaId].actors[NmaeActor];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`actor name:${NmaeActor} removed`);
            });
        },
            true);
    }
};