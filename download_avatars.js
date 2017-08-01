var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  request.get('https://api.github.com/repos/'+ repoOwner + '/' + repoName + '/contributors')
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
