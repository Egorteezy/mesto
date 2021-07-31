export default class UserInfo {
    constructor(usernameSelector, professionSelector, avatarSelector) {
        this._usernameElement = document.querySelector(usernameSelector)
        this._professionElement = document.querySelector(professionSelector)
        this._avatarElement = document.querySelector(avatarSelector)
    }

    getUserInfo() {
        this._userData = {
            username: this._usernameElement.textContent,
            profession: this._professionElement.textContent
        }
        return this._userData
    }

    setUserInfo({name, profession, id}) {
        this._usernameElement.textContent = name
        this._professionElement.textContent = profession
        this._id = id
    }

    setUserAvatar(avatar) {
        this._avatarElement.src = avatar
    }
}