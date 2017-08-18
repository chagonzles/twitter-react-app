import { Router } from 'express';
import http from 'superagent';
import Twit from 'twit';
import AppConstants from '../constants/AppConstants';

const router = new Router();

var T = new Twit({
  consumer_key:         AppConstants.CONSUMER_KEY,
  consumer_secret:      AppConstants.CONSUMER_SECRET,
  access_token:         AppConstants.ACCESS_TOKEN,
  access_token_secret:  AppConstants.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

router.get('/', (req, res) => {
	T.get('account/verify_credentials', { skip_status: true })
	  .catch(function (err) {
	   	res.send('caught error', err.stack)
	  })
	  .then(function (result) {
	    res.send({response: result.data});
	  })
});

export default router