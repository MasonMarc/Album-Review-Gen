const inquirer = require('inquirer');
const fs = require('fs');
const config = require('./config');



const apikey = config.apikey;
var getResult = function (artistName, albumName) {
    var apiUrl = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=' + apikey + '&artist=' + artistName + '&album=' + albumName + '&format=json'
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect');

        });
}


const choosealbum = () => {

    const prompt = inquirer.createPromptModule();
    prompt([
        {
            message: 'Please enter artist name',
            name: 'artistName',
        },
        {
            message: 'Please enter album name',
            name: 'albumName',
        }
    ])
    .then((answers) => {
        getResult(answers.artistName, answers.albumName)
    }

)};

choosealbum();