
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    } else {
    }
});


const db = firebase.database();

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
    // console.log(inputUsername,inputPassword);
    // console.log(inputUsername.value,inputPassword.value)

    firebase.auth().signInWithEmailAndPassword(inputUsername, inputPassword)
        .then(e => {
            localStorage.setItem('user', JSON.stringify(e.user))
            location.replace('./../../index.html');
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage, errorCode);
        });


    return false;
}