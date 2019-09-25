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

        let uid = JSON.parse(localStorage.getItem('user')).uid;

        _db.child('carts').child(uid).on('value', (cartSnap) => {
            let addCartButton = document.getElementById('add-remove-btn');
            let mobileDiv = document.querySelector('.mobile-div')
            let priceButton = document.querySelector('#price')
            let item = snap.val()
            let arr = [];

            for (let key in cartSnap.val()) {
                arr.push(cartSnap.val()[key])
            }

            arr.forEach((cartItem) => {
                if (cartItem.mobileId === item._id) {
                    item['carted'] = true
                    item['cartitemid'] = cartItem._id
                }
            })
            if (item.carted) {
                addCartButton.innerHTML = `<input data-cartitemid="${item.cartitemid}" type="button" class="btn btn-block" onclick="removeFromCart(this)" id="btn-color" value="Remove_from_cart">`

            } else {
                addCartButton.innerHTML = `<input type="button" class="btn btn-block" onclick="addToCart(this)" id="btn-color" value="Add_To_Cart">`
            }

            priceButton.innerHTML = "PKR " + item.price;
            mobileDiv.innerHTML = `
                <div class="pic-of-mobile" style="background-image: url(${item.image})">
                </div>
                <div class="mobile-name">
                <span class="mobile-n">${item.brand} ${item.name}</span>
                <span class="mobile-p">PKR ${item.price}</span>
                </div>
            `
        })
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


//  add to cart feature
function addToCart(e) {
    let params = new URLSearchParams(location.search)
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    let pushKey = _db.child(`carts/${uid}`).push().key;
    _db.child(`carts/${uid}/${pushKey}`).set({
        _id: pushKey,
        mobileId: params.get('id')
    })
}

function removeFromCart(e) {
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    // let pushKey = _db.child(`carts/${uid}`).push().key;
    _db.child(`carts/${uid}/${e.dataset.cartitemid}`).remove().catch((err) => console.log(err))
    // console.log(e.dataset)
}