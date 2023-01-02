const inquirer = require('inquirer');
const fs = require('fs');
const config = require('./config');
const Album = require('./lib/Album');



const apikey = config.apikey;
var getResult = function (artistName, albumName) {
    var apiUrl = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=' + apikey + '&artist=' + artistName + '&album=' + albumName + '&format=json'
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data.album.artist + ' hey');
                    console.log(data.album.name);
                    console.log(data.album.tags.tag[0].name);
                    const album = new Album(data.album.name, data.album.artist, data.album.tags.tag[0].name)
                    fs.appendFile('./dist/album.html', album.albumHtml(data.album.name, data.album.artist, data.album.tags.tag[0].name), function (error) {
                        if (error) {
                            throw error;
                        }
                    });
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
            addMore();
        }

        )
};


const addMore = () => {
    const prompt = inquirer.createPromptModule();
    prompt([
        {
            type: 'list',
            message: 'Would you like to add another album?',
            choices: ['yes', 'no'],
            name: 'select'
        }])
        .then((answer) => {
            if (answer.select === 'yes') {
                choosealbum();
            }
            else if (answer.select === 'no') {
                fs.appendFile('./dist/album.html', `<body><html>`, function (error) {
                    if (error) throw error;
                })
            }

        })
}


choosealbum();