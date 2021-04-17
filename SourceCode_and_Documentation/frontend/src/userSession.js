import Cookies from 'js-cookie'

function createUserSession(update){

    // attempt to get userSession data from cookies, otherwise set default values
    let usernameCookie = Cookies.get('username');
    let userIdCookie = Cookies.get('userId');

    // assign values from cookies or give default values
    let isLoggedIn = false;
    let username = "";
    let userId = -1;
    if (usernameCookie != undefined && userIdCookie != undefined && usernameCookie != "" && userIdCookie != -1) {
        isLoggedIn = true;
        username = usernameCookie;
        userId = userIdCookie;
    }

    function callUpdate() {
        update();
    }

    // private method
    function updateCookies() {
        Cookies.set('username', username, { expires: 7});
        Cookies.set('userId', userId, { expires: 7});
    }
    
    function logIn(name, password) {

        // check if log in is valid
        if (name == "nick" && password == "123") {
            isLoggedIn = true;
            username = name;
            userId = 0;

            // set cookies
            updateCookies();

            // update
            callUpdate();

            return true;
        } else {
            return false;
        }
    }

    function logOut() {
        isLoggedIn = false;
        username = "";
        userId = -1;

        // update cookies
        updateCookies();

        // update
        callUpdate();
    }

    function getIsLoggedIn() {
        return isLoggedIn;
    }

    return {logIn, logOut, getIsLoggedIn}
}

export default createUserSession