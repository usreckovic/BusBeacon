fetch("http://localhost:8080/api/station")
    .then(rsp => rsp.json())
    .then(data => {
        let list = document.getElementById('from')
        let list2 = document.getElementById('to')
        let content = '<option value="">---</option>'
        for (let city of data) {
            content += `
                    <option id="city" value="${city.city}">${city.city}</option>
                    `
        }
        list.innerHTML = content;
        list2.innerHTML = content;
    })

    fetch("http://localhost:8080/api/bus")
    .then(rsp => rsp.json())
    .then(data => {
        let list = document.getElementById('busParts')
        let content = ''
        for (let bus of data) {
            let hasAc = bus.ac ? 'Yes' : 'No';
            content += `
                    <div class="card mb-3" style="max-width: 1000px; border-radius: 30px; border: 5px solid #6abfff;">
                        <div class="row g-0">
                            <div class="col-md-4">
                            <img src="${bus.imagePath}" class="img-fluid rounded-start" alt="...">
                        </div>
                    <div class="col-md-8">
                <div class="card-body">
                    <h4 class="card-title">${bus.brand}</h4>
                    <h5 class="card-text"> ${bus.model}</h5>
                    <h6 class="card-text">Capacity ${bus.capacity} People.</h6>
                    <h6 class="card-text">Manufactured year ${bus.year}</h6>
                    <h6 class="card-text">Air Conditioning ${hasAc}</h6>
                        <p class="card-text"><small class="text-body-secondary">Last updated ${bus.updatedAt}</small></p>
                </div>
            </div>
            </div>
                </div>
                    `
        }

        list.innerHTML = content;
    })


function GeneratorOfQRCodes() {

    let qrCodeBox = document.getElementById("qrCodebox")
    let qrCodeImg = document.getElementById("qrCodeImg")
    let qrText = JSON.parse(localStorage.getItem('PurchaseTicketData')).stringify;

    console.log(JSON.parse(localStorage.getItem('PurchaseTicketData')));

}

function getFromDataStringAndRedirect() {
    window.location.href = "./ticket.html";
}

/* Provere za stvari za index.html */

function checkFrom() {
    let from = document.getElementById('from').value;

    if (from === "") {
        document.getElementById('errorFrom').style.display = 'inline';
        document.getElementById('errorFrom').textContent = "You have to choose the city!";
        return false;
    }

    else {
        document.getElementById('errorFrom').textContent = "";
        return true;
    }
}

function checkTo() {
    let to = document.getElementById('to').value;

    if (to === "") {
        document.getElementById('errorTo').style.display = 'inline';
        document.getElementById('errorTo').textContent = "You have to choose the city!";
        return false;
    }

    else {
        document.getElementById('errorTo').textContent = "";
        return true;
    }
}

function checkTrip() {
    let trip = document.querySelector('input[name="trip"]:checked')
    if (!trip) {
        document.getElementById('errorTrip').innerHTML = "You have to select type of travel!";
        return false;
    }
    else {
        document.getElementById('errorTrip').innerHTML = "";
        return true;
    }
}

function checkDate() {
    let dateStart = document.getElementById('dateStart').value;
    let dateEnd = document.getElementById('dateEnd').value;

    if (!dateStart) {
        document.getElementById('errorDate').innerHTML = "You have to select start date!";
        return false;
    }
    if (!dateEnd) {
        document.getElementById('errorDate').innerHTML = "You have to select end date!";
        return false;
    }

    let selectedStart = new Date(dateStart);
    let selectedEnd = new Date(dateEnd)
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedEnd < today) {
        document.getElementById('errorDate').innerHTML = "Your date can't be in the past!";
        return false;
    }

    if (selectedStart < today) {
        document.getElementById('errorDate').innerHTML = "Your date can't be in the past!";
        return false;
    }

    if (selectedStart > selectedEnd) {
        document.getElementById('errorDate').innerHTML = "Start date must be before end date!";
        return false;
    }

    document.getElementById('errorDate').innerHTML = "";
    return true;
}

function generalCheckUp() {
    let checkUpFrom = checkFrom();
    let checkUpTo = checkTo();
    let checkUpTrip = checkTrip();
    let checkUpDate = checkDate();

    let to = document.getElementById('to').value;
    let from = document.getElementById('from').value;

    if (to === from && from != "") {
        document.getElementById('errorTo').innerHTML = "You cant pick the same city!";
        return false;
    }


    if (checkUpDate && checkUpFrom && checkUpTo && checkUpTrip) {
        return true;
    }

    return false;
}

function finalCheckUp() {
    let errorSubmit = document.getElementById('errorSubmit');

    if (generalCheckUp()) {
        errorSubmit.innerHTML = "Ticket Created Redirecting"

        let dateStart = document.getElementById('dateStart').value;
        let dateEnd = document.getElementById('dateEnd').value;
        let trip = document.querySelector('input[name="trip"]:checked').value;
        let from = document.getElementById('from').value;
        let to = document.getElementById('to').value;

        localStorage.setItem('ticketData', JSON.stringify({ from, to, trip, dateStart, dateEnd }));

        window.location.href = "./purchase.html";
    }

    else {
        errorSubmit.innerHTML = "Error creating a ticket";
    }

}

/* funkcija za purchase.html ucitavanje fajlova datih sa index.html */

function loadTicket() {
    let data = JSON.parse(localStorage.getItem('ticketData'));

    if (!data) {
        window.location.href = "./index.html";
        return;
    }

    document.getElementById('ticketFrom').textContent = data.from;
    document.getElementById('ticketTo').textContent = data.to;
    document.getElementById('ticketTrip').textContent = data.trip;
    document.getElementById('ticketDateStart').textContent = data.dateStart;
    document.getElementById('ticketDateEnd').textContent = data.dateEnd;
}

/* Purchase.html */

function emailCheck(event) {
    let email = document.getElementById('email').value;

    if (!email.match(/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/i)) {
        document.getElementById('errorEmail').innerHTML = 'Email Adress is not valid'
        document.getElementById('errorEmail').style.color = 'white'
        return false;
    }
    else {
        document.getElementById('errorEmail').innerHTML = ''
        return true;
    }
}

function conditionsCheck(event) {
    let conditions = document.getElementById('conditions');

    if (!conditions.checked) {
        document.getElementById('errorConditions').innerHTML = 'Please check the box to accept the Terms and Conditions before continuing.';
        document.getElementById('errorConditions').style.color = 'white';
        return false;
    }
    else {
        document.getElementById('errorConditions').innerHTML = '';
        return true;
    }
}

function purchaseCheck() {
    let purchaseEmail = emailCheck();
    let purchaseConditions = conditionsCheck();

    if (purchaseEmail && purchaseConditions) {
        return true;
    }

    return false;
}

function purchaseGeneralCheck() {
    let ticketData = JSON.parse(localStorage.getItem('ticketData'));

    if (!ticketData || !ticketData.from || ticketData.from === "") {
        return false;
    }
    if (!ticketData.to || ticketData.to === "") {
        return false;
    }
    if (!ticketData.trip || ticketData.trip === "") {
        return false;
    }
    if (!ticketData.dateStart || ticketData.dateStart === "") {
        return false;
    }
    if (!ticketData.dateEnd || ticketData.dateEnd === "") {
        return false;
    }

    return true;
}

function finalPurchaseCheck() {
    let purchaseError = document.getElementById('purchaseError');

    let generalValid = purchaseGeneralCheck();
    let generalPurchase = purchaseCheck();

    if (generalPurchase && generalValid) {
        purchaseError.innerHTML = "Purchase Completed Redirecting"

        let ticketData = JSON.parse(localStorage.getItem('ticketData'));
        let email = document.getElementById('email').value;
        let conditions = document.getElementById('conditions').checked;

        localStorage.setItem('PurchaseTicketData', JSON.stringify({
            from: ticketData.from,
            to: ticketData.to,
            trip: ticketData.trip,
            dateStart: ticketData.dateStart,
            dateEnd: ticketData.dateEnd,
            email
        }));

        window.location.href = "./ticket.html";
    }

    else {
        purchaseError.innerHTML = "Error Purchasing a ticket";
    }

}

function loadPurchasedTicket() {
    let data = JSON.parse(localStorage.getItem('PurchaseTicketData'));

    if (!data) {
        window.location.href = "./index.html";
        return;
    }

    document.getElementById('ticketFrom').textContent = data.from;
    document.getElementById('ticketTo').textContent = data.to;
    document.getElementById('ticketTrip').textContent = data.trip;
    document.getElementById('ticketDateStart').textContent = data.dateStart;
    document.getElementById('ticketDateEnd').textContent = data.dateEnd;
    document.getElementById('email').textContent = data.email;
}


