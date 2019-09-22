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

        // upload image to storage bucket





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
                        brand:brand.value ,
                        name:name.value ,
                        price:price.value ,
                        color:color.value ,
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

