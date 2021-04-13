function createUserSession(){
    let isLoggedIn = false;
    let username = "";
    let userId = -1;

    function logIn(name, password) {

        if (name == "nick" && password == "123") {
            isLoggedIn = true;
            username = name;
            userId = 0;

            return true;
        } else {
            return false;
        }
    }

    function logOut() {
        isLoggedIn = false;
        username = "";
        userId = -1;
    }

    function getIsLoggedIn() {
        return isLoggedIn;
    }

    return {logIn, logOut, getIsLoggedIn}
}

module.exports = createUserSession