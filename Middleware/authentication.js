
class Authentication {
    constructor() {
		this.userAuth = this.userAuth.bind(this);
        this.checkAccess = this.checkAccess.bind(this);
    }

    async userAuth(req, res, next) {
    }

}

module.exports = Authentication;