import { Router } from 'express';
import Twit from 'twit';
import Twitter from 'node-twitter-api';
import AppConstants from '../constants/AppConstants';

const router = new Router();

//=========================================
//TWITTER OAuth APIs
//=========================================
//Config for Twitter OAuth
var twitter = new Twitter({
	        consumerKey: AppConstants.CONSUMER_KEY,
	    	consumerSecret: AppConstants.CONSUMER_SECRET,
	    	callback: 'http://localhost:3000/api/twitter/access-token'
});
var _requestSecret;

//-----------------------------------------
// GET request_token
//-----------------------------------------
router.get("/request-token", (req, res) => {
        twitter.getRequestToken(function(err, requestToken, requestSecret) {
            if (err)
                res.status(500).send(err);
            else {
                _requestSecret = requestSecret;
                res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
            }
        });
 });

//-----------------------------------------
// GET access_token
//-----------------------------------------
router.get("/access-token", (req, res) => {
        var requestToken = req.query.oauth_token,verifier = req.query.oauth_verifier;
        twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
            if (err)
                res.status(500).send(err);
            else
                twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
                    if (err)
                        res.status(500).send(err);
                    else {
                        res.redirect(AppConstants.WEB_APP_URL + '/auth/' + accessToken + '/' + accessSecret);
                    }
                });
        });
});

//=========================================
//TWITTER REST APIS
//=========================================
//Config for Twitter REST APIs
var T = new Twit({
	  consumer_key:         AppConstants.CONSUMER_KEY,
	  consumer_secret:      AppConstants.CONSUMER_SECRET,
	  access_token:         AppConstants.ACCESS_TOKEN,
	  access_token_secret:  AppConstants.ACCESS_TOKEN_SECRET,
	  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//-----------------------------------------
// GET account/verify_credentials
//-----------------------------------------
router.get('/account/verify_credentials', (req, res) => {
	var userAccessToken = req.query.accessToken;
	var userAccessTokenSecret = req.query.accessTokenSecret;
	var tokens = T.getAuth();
	tokens.access_token = userAccessToken ? userAccessToken : AppConstants.ACCESS_TOKEN;
	tokens.access_token_secret = userAccessTokenSecret ? userAccessTokenSecret : AppConstants.ACCESS_TOKEN_SECRET;
	T.setAuth(tokens);
	T.get('account/verify_credentials', { skip_status: true })
	 	.catch(function (err) {
	    	console.log('caught error', err.stack)
	  	})
	  	.then(function (result) {
	    res.json({response: result.data});
	})
});

//-----------------------------------------
// GET search/tweets
//-----------------------------------------
router.get('/tweets', (req, res) => {
	var userAccessToken = req.query.accessToken;
	var userAccessTokenSecret = req.query.accessTokenSecret;
	var tokens = T.getAuth();
	tokens.access_token = userAccessToken ? userAccessToken : AppConstants.ACCESS_TOKEN;
	tokens.access_token_secret = userAccessTokenSecret ? userAccessTokenSecret : AppConstants.ACCESS_TOKEN_SECRET;
	T.setAuth(tokens);
	T.get('search/tweets', { q: req.query.q, count: 10}, function(err, data, response) {
	  res.send({response: data})
	})
});


//-----------------------------------------
// GET statuses/home_timeline
//-----------------------------------------
router.get('/home_timeline', (req, res) => {
	var userAccessToken = req.query.accessToken;
	var userAccessTokenSecret = req.query.accessTokenSecret;
	var tokens = T.getAuth();
	tokens.access_token = userAccessToken;
	tokens.access_token_secret = userAccessTokenSecret;
	T.setAuth(tokens);
	T.get('statuses/home_timeline', function(err, data, response) {
	  res.json({response: data})
	})
});

//-----------------------------------------
// GET statuses/user_timeline
//-----------------------------------------
router.get('/user_timeline', (req, res) => {
	var userAccessToken = req.query.accessToken;
	var userAccessTokenSecret = req.query.accessTokenSecret;
	var tokens = T.getAuth();
	tokens.access_token = userAccessToken ? userAccessToken : AppConstants.ACCESS_TOKEN;
	tokens.access_token_secret = userAccessTokenSecret ? userAccessTokenSecret : AppConstants.ACCESS_TOKEN_SECRET;
	T.setAuth(tokens);
	T.get('statuses/user_timeline', function(err, data, response) {
	  res.json({response: data})
	})
});

//-----------------------------------------
// POST statuses/update
//-----------------------------------------
router.get('/statuses/update', (req, res) => {
	var userAccessToken = req.query.accessToken;
	var userAccessTokenSecret = req.query.accessTokenSecret;
	var status = req.query.status;
	var tokens = T.getAuth();
	tokens.access_token = userAccessToken ? userAccessToken : AppConstants.ACCESS_TOKEN;
	tokens.access_token_secret = userAccessTokenSecret ? userAccessTokenSecret : AppConstants.ACCESS_TOKEN_SECRET;
	T.setAuth(tokens);
	T.post('statuses/update', { status: status }, function(err, data, response) {
	  console.log(data);
	})
});



export default router