class Session {

	constructor() {
		this.user = '';
		this.accessToken = '';
		this.accessTokenSecret = '';
	}
	

	getUser(){
		if (typeof localStorage !== 'undefined'){
			return localStorage.getItem("user");
		}
	}
	
	setUser(user) {
		if (typeof localStorage !== 'undefined'){
			localStorage.setItem("user", user);
		}
	}

	getAccessToken(){
		if (typeof localStorage !== 'undefined'){
			return localStorage.getItem("accessToken");
		}
	}
	
	setAccessToken(accessToken) {
		if (typeof localStorage !== 'undefined'){
			localStorage.setItem("accessToken", accessToken);
		}
	}

	getAccessTokenSecret(){
		if (typeof localStorage !== 'undefined'){
			return localStorage.getItem("accessTokenSecret");
		}
	}
	
	setAccessTokenSecret(accessTokenSecret) {
		if (typeof localStorage !== 'undefined'){
			localStorage.setItem("accessTokenSecret", accessTokenSecret);
		}
	}
	
	
	
	clear() {
		if (typeof localStorage !== 'undefined'){
			localStorage.clear(); // this will delete all localstorage on the site;
		}

	}

}

export default new Session();