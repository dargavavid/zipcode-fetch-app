function getLocationInfo(evt) {
    //Get zip value from input
    const zip = document.querySelector(".zip").value;

    //Make request
    fetch(`http://api.zippopotam.us/us/${zip}`)
        .then(response => {
            if (response.status !== 200) {
                showIcon("remove");
                document.querySelector("#output").innerHTML =
                    `
                <article class="message is-danger">
                <div class="message-body">Invalid Zipcode, please try again</div></article>
                `;
                throw Error(response.statusText);
            } else {
                showIcon("check");
                return response.json();
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
    evt.preventDefault();
}

function showIcon(icon) {
    //Clear icons
    document.querySelector(".icon-remove").style.display = "none";
    document.querySelector(".icon-check").style.display = "none";

    //Show requested icon
    document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}

//Listen for submit
document.querySelector("#zipForm").addEventListener("submit", getLocationInfo, false);
