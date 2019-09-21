(function () {

    (function () {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return
        }
        else{
            location = './pages/signin-signup/signin.html'
        }
    })()
})()

function signout(){
    firebase.auth().signOut()
    .then(()=>{
        localStorage.removeItem('user')
        location = './pages/signin-signup/signin.html'
    }).catch((err)=>{
        alert(err)
    })
}