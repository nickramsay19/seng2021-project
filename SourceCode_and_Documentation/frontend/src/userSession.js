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
    
    function logIn(name, password, _callback) {

        let req = `http://127.0.0.1:5050/auth/login?username=${name}&password=${password}`;
        console.log(req);
        fetch(req, {method: 'post'})
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res?.data != -1) {
                    isLoggedIn = true;
                    username = name;
                    userId = res.data;

                    // set cookies
                    updateCookies();

                    // update
                    callUpdate();

                    // return true
                    _callback();
                    return true;
                } else {
                    return false;
                }
            });
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