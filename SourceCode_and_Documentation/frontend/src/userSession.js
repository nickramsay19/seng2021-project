function createUserSession(){
    let isLoggedIn = false;
    let username = "";
    let userId = -1;

    function logIn(name, user_id) {
        isLoggedIn = true;
        username = name;
        userId = user_id;
    }

    function logOut() {
        isLoggedIn = false;
        username = "";
        userId = -1;
    }

    return {logIn, logOut}
   }