function getLocationInfo(evt) {
    //Get zip value from input
    const zip = document.querySelector(".zip").value;

    //Make request
    fetch(`http://api.zippopotam.us/us/${zip}`)
        .then(response => {
            if (response.status !== 200) {
                document.querySelector("#output").innerHTML =
                    `
                <article class="message is-danger">
                <div class="message-body">Invalid Zipcode, please try again</div></article>
                `;
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
    evt.preventDefault();
}