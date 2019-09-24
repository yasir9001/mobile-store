let __mobileDataArray;
(
  function () {


    // get user from locastorage then route
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
    }
    else {
      location = './../signin-signup/signin.html'
    }

    _db.child('mobiles').on('value', (snap) => {
      const target = document.querySelector('.display-components');

      let arr = []
      for (let key in snap.val()) {
        arr.push(snap.val()[key])
      }
      __mobileDataArray = arr;
      target.innerHTML = "";
      target.innerHTML = arr.map((e) => {
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
                                  <button>Add_to_cart</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>`
        )
      }).join('');
    })

  }
)()



function renderMobiles(snap) {
  const target = document.querySelector('.display-components');

  let arr = []
  for (let key in snap) {
    arr.push(snap[key])
  }
  target.innerHTML = "";
  target.innerHTML = arr.map((e) => {
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
                              <button>Add_to_cart</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`
    )
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
