import { Router } from 'express';
import Twit from 'twit';
import Twitter from 'node-twitter-api';
import AppConstants from '../constants/AppConstants';
import Session from '../core/Session';

const router = new Router();

//APIS for Authentication
var twitter = new Twitter({
	        consumerKey: AppConstants.CONSUMER_KEY,
	    	consumerSecret: AppConstants.CONSUMER_SECRET,
	    	callback: 'http://localhost:3000/api/twitter/access-token'
	    });
var _requestSecret;

router.get("/request-token", function(req, res) {
        twitter.getRequestToken(function(err, requestToken, requestSecret) {
            if (err)
                res.status(500).send(err);
            else {
                _requestSecret = requestSecret;
                res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
            }
        });
 });

router.get("/access-token", function(req, res) {
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


//APIs for getting Tweets
var T = new Twit({
  consumer_key:         AppConstants.CONSUMER_KEY,
  consumer_secret:      AppConstants.CONSUMER_SECRET,
  access_token:         AppConstants.ACCESS_TOKEN,
  access_token_secret:  AppConstants.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


console.log('twit config ', T);
router.get('/', (req, res) => {
	T.get('account/verify_credentials', { skip_status: true })
	  .catch(function (err) {
	   	res.send('caught error', err.stack)
	  })
	  .then(function (result) {
	  	console.log('result ',result);
	    res.redirect(AppConstants.WEB_APP_URL + '/auth');
	  })
});

router.get('/tweets', (req, res) => {
	var userAccessToken = req.query.accessToken;
	var userAccessTokenSecret = req.query.accessTokenSecret;
	var T = new Twit({
	  consumer_key:         AppConstants.CONSUMER_KEY,
	  consumer_secret:      AppConstants.CONSUMER_SECRET,
	  access_token:         userAccessToken ? userAccessToken : AppConstants.ACCESS_TOKEN,
	  access_token_secret:  userAccessTokenSecret ? userAccessTokenSecret : AppConstants.ACCESS_TOKEN_SECRET,
	  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
	})

	T.get('search/tweets', { q: req.query.q, count: 10 }, function(err, data, response) {
	  res.send({response: data})
	})

});


export default router