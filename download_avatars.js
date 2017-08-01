var fs = require('fs');
var request = require('request');
var dotenv = require('dotenv').config();

//console.log('Welcome to the GitHub Avatar Downloader!');

// Gets the URL to pass into our request function
function getURL(){
  console.log(dotenv['parsed']['GITHUB_USER']);
  var requestURL = 'https://'+ dotenv['parsed']['GITHUB_USER'] + ':' + dotenv['parsed']['GITHUB_TOKEN'] + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
      url: requestURL,
        headers: {
              'User-Agent': 'hounslow'
      }
  };
  return options;
}


function getRepoContributors(repoOwner, repoName, cb) {
  request(getURL(), function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response.statusCode);
    var object = JSON.parse(body);
    object.forEach(function(user){
      cb(user.avatar_url, user.login);
      });
    });
}

function downloadImageByURL(url, filePath) {
  request.get(url).on('error', function (err) {
    throw err;
    })
  .on('response', function (response) {
    console.log('Response Status Code: ', response.statusCode);
    })
  .pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));
}

// This calls getRepoContributors, which will get the response, error and body and then call downloadImageByURL to save the images to the avatar folder
var callDownloader = function(){

  repoOwner = process.argv[2];
  repoName = process.argv[3];

// Log an error if owner and name aren't included in command line, this gets called when we run node downlad_avatars.js
  if (repoOwner && repoName){
    getRepoContributors(repoOwner, repoName, downloadImageByURL);
  } else {
    console.log("Missing an argument!");
    console.log("Please enter your request with following structure: node download_avatars.js <repoOwner> <repoName>");
  }
}();
