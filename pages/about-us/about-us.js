(function () {

    (function () {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return
        }
        else{
            location = './../signin-signup/signin.html'
        }
    })()
})()

function signout(){
    firebase.auth().signOut()
    .then(()=>{
        localStorage.removeItem('user')
        location = './../signin-signup/signin.html'
    }).catch((err)=>{
        alert(err)
    })
}