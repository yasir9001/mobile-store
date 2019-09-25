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

    let uid = JSON.parse(localStorage.getItem('user')).uid;


    _db.child('carts').child(uid).on('value', (snap) => {
        let cartItems = []
        let target = document.querySelector('#cart-items tbody')
        // console.log(target)
        for (let key in snap.val()) {
            cartItems.push(snap.val()[key])
        }
        _db.child('mobiles').on('value', (mobileSnap) => {
            let arr = []
            let mobiles = []
            for (let key in mobileSnap.val()) {
                mobiles.push(mobileSnap.val()[key])
            }
            cartItems.forEach((cartItem, cartIndex) => {
                mobiles.forEach((mobile, mobileIndex) => {
                    if (cartItem.mobileId === mobile._id) {
                        arr.push(
                            {
                                ...mobile,
                                cartitemid:cartItem._id
                            }
                        )
                    }
                })
            })


            target.innerHTML = ""
            target.innerHTML = arr.map((e) => {
                return (
                    `
                <tr>
                    <th scope="row">1</th>
                    <td>${e.name}</td>
                    <td>PKR ${e.price}</td>
                    <td><a id="data-kill" data-cartitemid="${e.cartitemid}" onclick="removeFromCart(this);">&times;</a></td>
                </tr>
                `
                )
            }).join('')
        })//inner on closed

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


function removeFromCart(e) {
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    // let pushKey = _db.child(`carts/${uid}`).push().key;
    _db.child(`carts/${uid}/${e.dataset.cartitemid}`).remove().catch((err) => console.log(err))
    console.log(e.dataset)
}


function checkOut(e){
    console.log(e)
    location = './../checkout/checkout.html'
}