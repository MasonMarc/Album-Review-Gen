const inquirer = require('inquirer');
const fs = require('fs');
const config = require('./config');
const Album = require('./lib/Album');

let count = 10;


const apikey = config.apikey;
var getResult = function (artistName, albumName) {
    var apiUrl = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=' + apikey + '&artist=' + artistName + '&album=' + albumName + '&format=json'
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data.album.image[2]['#text']);
                    const album = new Album(data.album.name, data.album.artist, data.album.wiki.summary, data.album.image[2]['#text'], count)
                    fs.appendFile('./dist/album.html', album.albumHtml(data.album.name, data.album.artist, data.album.wiki.summary, data.album.image[2]['#text'], count), function (error) {
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
                count-- ;
                choosealbum();
            }
            else if (answer.select === 'no') {
                fs.appendFile('./dist/album.html', `</div>
                <footer class="text-center text-lg-start">
                  <div class="text-center p-5">
                   made with &#10084; by
                    <a class="text-dark" href="https://github.com/MasonMarc" target="_blank">MasonMarc</a>
                  </div>
                </footer><body><html>`, function (error) {
                    if (error) throw error;
                })
            }

        })
}

const startHtml = () => {
    fs.appendFile('./dist/album.html', `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Favorite Albums</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <link rel="icon" type="image/x-icon" href="./favicon.ico">
        <style>
            :root {
                --main: #68C0F5;
                --light: #F59973;
                --dark: #A86F58;
                --accent1: #A87125;
                --accent2: #F5B967;
            }
    
            body {
                background-color: var(--accent1);
                font-family: Georgia, 'Times New Roman', Times, serif;
            }
    
            .navbar {
                background-color: var(--accent2);
                display: flex;
                position: inherit;
            }
    
            .nav {
                display: flex;
                justify-content: center;
                align-items: center;
            }
    
            span {
                position: relative;
                top: 20px;
            }
    
            .card {
                background-color: var(--main);
                filter: drop-shadow(1px 1px 1px #ada9a9);
            }
    
            .card-header {
                background-color: var(--light);
    
            }
    
            li {
                padding: 0.5em;
                font-size: 18px;
            }
    
            em {
                font-size: 20px;
                background-color: var(--dark);
                color: antiquewhite;
                padding: 8px;
            }
    
            .main {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
            }
    
            .cardimg {
                width: 250px;
                margin: 5px;
                float: left;
                border-radius: 2px;
            }
    
            .cardtext {
                display: inline;
            }
    
            .textcont {
                padding: 15px;
                margin: 5px;
            }
            html {
                scroll-behavior: smooth;
              }
        </style>
    </head>
    
    <body>
    
        <nav class="navbar">
            <div class="container-fluid nav">
                <span class="m-5 h1 head">Favorite Albums</span>
            </div>
        </nav>
    
        <div class="container main">`, 
    function (error) {
        if (error) throw error;
    })
}
startHtml();
choosealbum();