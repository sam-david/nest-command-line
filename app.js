// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var port     = process.env.PORT || 8080;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Set the client credentials and the OAuth2 server
var credentials = {
  clientID: '92071627-20ea-45bf-bdb7-acf948241498',
  clientSecret: 'LYl1Vq0TJN0J5MvBgPbpg6pEm',
  site: 'https://home.nest.com/login',
  tokenPath: 'https://api.home.nest.com/oauth2/access_token?client_id=92071627-20ea-45bf-bdb7-acf948241498&code=AUTHORIZATION_CODE&client_secret=LYl1Vq0TJN0J5MvBgPbpg6pEm&grant_type=authorization_code',
  authorizationPath: '/oauth2'
};

var oauth2 = require('simple-oauth2')(credentials);

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: 'http://localhost:8080/callback',
  state: 'STATE'
});

// Initial page redirecting to Github
app.get('/auth', function (req, res) {
    console.log('authorize', authorization_uri)
    res.redirect(authorization_uri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', function (req, res) {
  console.log('callback')
  var code = req.query.code;
  var token;
  var errors = null;
  console.log('code', code)

  oauth2.authCode.getToken({
    code: code,
    redirect_uri: 'http://localhost:8080/callback'
  }, saveToken);

  function saveToken(error, result) {
    if (error) {
      console.log('Access Token Error', error.message);
      errors = error;
    }
    token = oauth2.accessToken.create(result.access_token);
  }

    console.log('token', token)
  res.render('index', {
    currentToken: true
  });
});


// set routes
app.get('/', function(req, res) {
  res.render('index', { currentToken: false });
});

// Set server port
app.listen(port);
console.log('server is running on port: ' + port);
