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
                    console.log(data.album.wiki.summary);
                    const album = new Album(data.album.name, data.album.artist, data.album.wiki.summary)
                    fs.appendFile('./dist/album.html', album.albumHtml(data.album.name, data.album.artist, data.album.wiki.summary), function (error) {
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
    console.log('Hello, welcome to the album reviewer. Please input your favorite albums in order')

    const prompt = inquirer.createPromptModule();
    prompt([
        {
            message: 'Please enter the name of the artist',
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
            if (answers.artistName === '' || typeof answers.artistName !== 'string') {
                console.log('--------------------------');
                console.log('please enter a vaid name');
                console.log('--------------------------');
                throw error;
            }
            if (answers.albumName === '' || typeof answers.albumName !== 'string') {
                console.log('--------------------------');
                console.log('please enter a vaid name');
                console.log('--------------------------');
                throw error;
            }
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