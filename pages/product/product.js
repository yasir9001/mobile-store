(
    function () {
        const target = document.querySelector('.display-components');

        _db.child('mobiles').on('value', (snap) => {
            let arr = []
            for (let key in snap.val()) {
                arr.push(snap.val()[key])
            }
            console.log(arr)
            target.innerHTML = "";
            target.innerHTML =  arr.map((e) => {
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
                            <a href="#" style="color:wheat" id="text-a">More Details..</a>
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
          console.log(arr)  
        })
    }
)()



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