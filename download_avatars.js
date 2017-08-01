var request = require('request');
var GITHUB_USER = "hounslow";
var GITHUB_TOKEN = "1de2a7211489836dfc3111d0eba924c24b396abd";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

request.get(requestURL)
  .on('error', function (err) {
             throw err;
              })
  .on('response', function (response) {
          console.log('Response Status Code: ', response.statusCode);
          });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
