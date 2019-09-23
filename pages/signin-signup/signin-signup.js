
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    } else {
    }
});

let db = _db;

function register(theForm) {
    var inputUsername = document.querySelector("#username").value;
    var inputPassword = document.querySelector("#password").value;
    var confirmPassword = document.querySelector("#cnf-password").value;

    if (inputPassword == confirmPassword) {
        firebase.auth().createUserWithEmailAndPassword(inputUsername, inputPassword)
            .then(e => {
                var cube = document.querySelector('.mydiv');
                cube.classList.toggle('styler');
                document.querySelector('.login input[type=email]').value = "";
                document.querySelector('.login input[type=password]').value = "";
                document.querySelector('#cnf-password').value = "";
                localStorage.setItem('user', JSON.stringify(e.user))
                db.child(`users/${e.user.uid}`)
                    .set({
                        email: inputUsername,
                        uid: e.user.uid
                    })
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage, errorCode);
            });
    } else {
        var x = document.querySelector("#cnf-password").value = '';
        x.placeholder = 'Password Mismatched'
        x.style.placeholder.color = 'red';
    }

}



function login(theForm) {
    var inputUsername = document.querySelector("#username1").value;
    var inputPassword = document.querySelector("#password1").value;
    firebase.auth().signInWithEmailAndPassword(inputUsername, inputPassword)
        .then(e => {
            _db.child(`users/${e.user.uid}`).once('value', (snap) => {

                // if user data is present in the database then route to home page else notify the user and delete him.
                if (snap.val()) {
                    localStorage.setItem('user', JSON.stringify(e.user))
                    location.replace('./../../index.html');
                } else {
                    const user = firebase.auth().currentUser;
                    user.delete().then(function () {
                        // User deleted.
                    }).catch(function (error) {
                        // An error happened.
                        alert(error)
                    });
                    alert('Your accout has been deleted by the admin, Register with a new Account')
                }
            })

        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage, errorCode);
        });


    return false;
}