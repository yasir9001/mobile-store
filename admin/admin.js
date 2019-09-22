(
    function () {
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
    }
)()