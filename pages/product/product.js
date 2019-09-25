let __mobileDataArray;
(
  function () {


    // get user from localstorage then route
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
    }
    else {
      location = './../signin-signup/signin.html'
    }

    _db.child('mobiles').on('value', (snap) => {

      const target = document.querySelector('.display-components');
      let uid = JSON.parse(localStorage.getItem('user')).uid;
      _db.child(`carts/${uid}`).on('value', (cartSnap) => {
        let cart = []
        let mobiles = []

        for (let key in snap.val()) {
          mobiles.push(snap.val()[key])
        }

        for (let key in cartSnap.val()) {
          cart.push(cartSnap.val()[key])
        }
        mobiles.forEach((mobile, index) => {
          cart.forEach((cart) => {
            if (mobile._id === cart.mobileId) {
              mobiles[index].cartitemid = cart._id
              mobiles[index].carted = true
            }
          })//inner for each closed
        })

        __mobileDataArray = mobiles;
        target.innerHTML = "";
        target.innerHTML = mobiles.map((e) => {
          if (e.carted) {
            return (
              `<div class="product-position">
                          <div class="product-list">
                            <div class="product-spec-front">
                              <div class="mobile-pic" style="background-image:url(${e.image})">
                                <h5>${e.brand} ${e.name}</h5>
                              </div>
                            </div>
                            <div class="product-price-back">
                              <div class="text-group">
                                <h4>${e.brand} ${e.name}</h4>
                                <p>PKR ${e.price}</p>
                                <div class="btn-style">
                                  <a href="./../mobile-detail/mobile-detail.html?id=${e._id}" style="color:wheat" id="text-a">More Details..</a>
                                  <div class="product-button">
                                    <button data-cartitemid="${e.cartitemid}" onclick="removeFromCart(this)">Remove_from_cart</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>`
            )
          }
          else {
            return (
              `<div class="product-position">
                          <div class="product-list">
                            <div class="product-spec-front">
                              <div class="mobile-pic" style="background-image:url(${e.image})">
                                <h5>${e.brand} ${e.name}</h5>
                              </div>
                            </div>
                            <div class="product-price-back">
                              <div class="text-group">
                                <h4>${e.brand} ${e.name}</h4>
                                <p>PKR ${e.price}</p>
                                <div class="btn-style">
                                  <a href="./../mobile-detail/mobile-detail.html?id=${e._id}" style="color:wheat" id="text-a">More Details..</a>
                                  <div class="product-button">
                                    <button data-id="${e._id}" onclick="addToCart(this)">Add_to_cart</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>`
            )
          }
        }).join('');
      })
    })
  }
)()



function renderMobiles(snap) {
  const target = document.querySelector('.display-components');
  target.innerHTML = "";
  target.innerHTML = snap.map((e) => {
    if (e.carted) {
      return (
        `<div class="product-position">
                    <div class="product-list">
                      <div class="product-spec-front">
                        <div class="mobile-pic" style="background-image:url(${e.image})">
                          <h5>${e.brand} ${e.name}</h5>
                        </div>
                      </div>
                      <div class="product-price-back">
                        <div class="text-group">
                          <h4>${e.brand} ${e.name}</h4>
                          <p>PKR ${e.price}</p>
                          <div class="btn-style">
                            <a href="./../mobile-detail/mobile-detail.html?id=${e._id}" style="color:wheat" id="text-a">More Details..</a>
                            <div class="product-button">
                              <button data-cartitemid="${e.cartitemid}" onclick="removeFromCart(this)">Remove_from_cart</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`
      )
    }
    else {
      return (
        `<div class="product-position">
                    <div class="product-list">
                      <div class="product-spec-front">
                        <div class="mobile-pic" style="background-image:url(${e.image})">
                          <h5>${e.brand} ${e.name}</h5>
                        </div>
                      </div>
                      <div class="product-price-back">
                        <div class="text-group">
                          <h4>${e.brand} ${e.name}</h4>
                          <p>PKR ${e.price}</p>
                          <div class="btn-style">
                            <a href="./../mobile-detail/mobile-detail.html?id=${e._id}" style="color:wheat" id="text-a">More Details..</a>
                            <div class="product-button">
                              <button data-id="${e._id}" onclick="addToCart(this)">Add_to_cart</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`
      )
    }
  }).join('');
}

//filter mobiles based on the search input
function filterMobiles(input) {
  let value = input.value.toLowerCase()
  if (value === "") {
    renderMobiles(__mobileDataArray)
    return
  }
  let arr = __mobileDataArray.filter((e) => {
    return e.name.toLowerCase().includes(value) || e.brand.toLowerCase().includes(value)
  })
  renderMobiles(arr)
}

function filterBrands(input) {
  if (input === 'all') {
    renderMobiles(__mobileDataArray)
    return
  }

  let arr = __mobileDataArray.filter((e) => {
    return e.brand.toLowerCase().includes(input)
  })
  renderMobiles(arr)
}

function signout() {
  firebase.auth().signOut()
    .then(() => {
      localStorage.removeItem('user')
      location = './../signin-signup/signin.html'
    }).catch((err) => {
      alert(err)
    })
}

// add to cart feature
function addToCart(e) {
  let uid = JSON.parse(localStorage.getItem('user')).uid;
  let pushKey = _db.child(`carts/${uid}`).push().key;
  _db.child(`carts/${uid}/${pushKey}`).set({
    _id: pushKey,
    mobileId: e.dataset.id
  })
}

function removeFromCart(e){
  let uid = JSON.parse(localStorage.getItem('user')).uid;
  // let pushKey = _db.child(`carts/${uid}`).push().key;
  _db.child(`carts/${uid}/${e.dataset.cartitemid}`).remove().catch((err)=>console.log(err))
  console.log(e.dataset)
}