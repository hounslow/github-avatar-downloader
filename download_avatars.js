var fs = require('fs');
var request = require('request');
var GITHUB_USER = "hounslow";
var GITHUB_TOKEN = "1de2a7211489836dfc3111d0eba924c24b396abd";

//console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

var options = {
    url: requestURL,
      headers: {
            'User-Agent': 'hounslow'
    }
};

request(options, function (error, response, body) {
  console.log('error:', error);
  console.log('statusCode:', response.statusCode);
  var object = JSON.parse(body);
  object.forEach(function(user){
    cb(user.avatar_url, user.login);
    });
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
                throw err;
                })
        .on('response', function (response) {
          console.log('Response Status Code: ', response.statusCode);
          })
        .pipe(fs.createWriteStream('./' + filePath + '.jpg'));
}

var owner = process.argv[2];
var name = process.argv[3];
if (owner && name){
  getRepoContributors(owner, name, downloadImageByURL);
} else {
  console.log("Missing an argument!");
  console.log("Please enter your request with following structure: node download_avatars.js <repoOwner> <repoName>");
}
