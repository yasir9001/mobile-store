(function () {

    (function () {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return
        }
        else {
            location = './../signin-signup/signin.html'
        }
    })()

    //get query params from link and get mobile item from firebase database
    let params = new URLSearchParams(location.search)
    _db.child('mobiles').child(params.get('id')).once('value', (snap) => {
        let item = snap.val()
        let mobileDiv = document.querySelector('.mobile-div')
        let priceButton = document.querySelector('#price')
        price.innerHTML = "PKR " + item.price;
        mobileDiv.innerHTML = `
                <div class="pic-of-mobile" style="background-image: url(${item.image})">
                </div>
                <div class="mobile-name">
                <span class="mobile-n">${item.brand} ${item.name}</span>
                <span class="mobile-p">PKR ${item.price}</span>
                </div>
            `
    })


})()

function signout() {
    firebase.auth().signOut()
        .then(() => {
            localStorage.removeItem('user')
            location = './../signin-signup/signin.html'
        }).catch((err) => {
            alert(err)
        })
}