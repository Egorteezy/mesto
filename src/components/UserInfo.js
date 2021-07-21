export default class UserInfo {
    constructor(usernameSelector, professionSelector) {
        this._usernameElement = document.querySelector(usernameSelector)
        this._professionElement = document.querySelector(professionSelector)
    }

    getUserInfo() {
        this._userData = {
            username: this._usernameElement.textContent,
            profession: this._professionElement.textContent
        }
        return this._userData
    }

    setUserInfo(username, profession) {
        this._usernameElement.textContent = username
        this._professionElement.textContent = profession
    }
}