(
    function () {
        //get users from firebase
        let db = _db;
        db.child('users').on('value', (snap) => {
            let target = document.querySelector('.user-table tbody')
            let arr = []
            for (let key in snap.val()) {
                arr.push(snap.val()[key])
            }
            target.innerHTML = ""
            target.innerHTML = arr.map((element) => {
                return (
                    `<tr>
                        <th scope="row">${element.uid}</th>
                        <td>${element.email}</td>
                    </tr>`
                )
            }).join('')
        })

        db.child('mobiles').on('value', (snap) => {
            let target = document.querySelector('#mobile-list tbody')
            let arr = []
            for (let key in snap.val()) {
                arr.push(snap.val()[key])
            }
            console.log(arr)
            target.innerHTML = ""
            target.innerHTML = arr.map((e) => {
                console.log(e.color)
                return (
                    `<tr>
                        <th scope="row">${e._id}</th>
                        <td>${e.brand}</td>
                        <td>${e.name}</td>
                        <td>${e.color}</td>
                        <td>PKR ${e.price}</td>
                        <td><a id="data-kill" data-id="${e._id}" onclick="removeMobile(this);">&times;</a></td>
                    </tr>`
                )
            }).join('')
        })



    }
)()


// upload mobile item to storage bucket
function addMobile() {
    let brand = document.getElementById('brand');
    let name = document.getElementById('name');
    let price = document.getElementById('price');
    let color = document.getElementById('color');
    let image = document.getElementById('image');

    let pushKey = _db.child('mobiles').push().key
    _storage.child(pushKey)
        .put(image.files[0])
        .then((url) => {
            url.ref.getDownloadURL().then((success) => {
                _db.child(`mobiles/${pushKey}`)
                    .set({
                        _id: pushKey,
                        brand: brand.value,
                        name: name.value,
                        price: price.value,
                        color: color.value,
                        image: success
                    })
                    // clears the form on successfull submition
                    .then(() => {
                        brand.value = ""
                        name.value = ""
                        price.value = ""
                        color.value = ""
                        image.value = ""
                    })
            })
        })
}


function removeMobile(e){
    // console.log(e.dataset.id)
    _db.child(`mobiles/${e.dataset.id}`).remove()
}