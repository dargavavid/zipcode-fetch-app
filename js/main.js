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
            //Show location info
            let output = "";
            data.places.forEach(place => {
                output += `
                    <article class="message is-primary">
                        <div class="message-header">
                            <p>Location Info</p>
                            <button class="delete"></button>
                        </div>
                        <div class="message-body">
                            <ul>
                                <li>
                                    <strong>City: </strong>${place["place name"]}
                                </li>
                                <li>
                                    <strong>State: </strong>${place["state"]}
                                </li>
                                <li>
                                    <strong>Longitude: </strong>${place["longitude"]}
                                </li>
                                <li>
                                    <strong>Latitude: </strong>${place["latitude"]}
                                </li>
                            </ul>
                        </div>
                    </article>
                `
            });
            //Insert into output div
            document.querySelector("#output").innerHTML = output;
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

function deleteLocation(evt) {
    if (evt.target.className === "delete") {
        document.querySelector(".message").remove();
        document.querySelector(".zip").value = "";
        document.querySelector(".icon-check").style = "none";
    }
}

//Listen for submit
document.querySelector("#zipForm").addEventListener("submit", getLocationInfo, false);

//Listen for delete
document.querySelector("body").addEventListener("click", deleteLocation, false);