fetch("http://localhost:8080/api/station")
    .then(rsp => rsp.json())
    .then(data => {
        const list = document.getElementById('from')
        const list2 = document.getElementById('to')
        let content = '<option value="">---</option>'
        for (let city of data) {
            content += `
                    <option id="city" value="${city.city}">${city.city}</option>
                    `
        }
        list.innerHTML = content
        list2.innerHTML = content
    })


let qrCodeBox = document.getElementById("qrCodebox")
let qrCodeImg = document.getElementById("qrCodeImg")
let qrText = document.getElementById("form").toString()

function GeneratorOfQRCodes() {

}

function getFromDataStringAndRedirect() {
    window.location.href = "./ticket.html";
}



function checkFrom() {
    const from = document.getElementById('from').value;

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
    const to = document.getElementById('to').value;

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
    const trip = document.querySelector('input[name="trip"]:checked')
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
    const dateStart = document.getElementById('dateStart').value;
    const dateEnd = document.getElementById('dateEnd').value;

    if (!dateStart) {
        document.getElementById('errorDate').innerHTML = "You have to select start date!";
        return false;
    }
    if (!dateEnd){
        document.getElementById('errorDate').innerHTML = "You have to select end date!";
        return false;
    }

    const selectedStart = new Date(dateStart);
    const selectedEnd = new Date(dateEnd)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedEnd < today) {
        document.getElementById('errorDate').innerHTML = "Your date can't be in the past!";
        return false;
    }

    if (selectedStart < today) {
        document.getElementById('errorDate').innerHTML = "Your date can't be in the past!";
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

    const to = document.getElementById('to').value;
    const from = document.getElementById('from').value;

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
        let dateEnd = document.getElementById('dateStart').value;
        let trip = document.querySelector('input[name="trip"]:checked').value;
        let from = document.getElementById('from').value;
        let to = document.getElementById('to').value;

        localStorage.setItem('ticketData', JSON.stringify({ from, to, trip, dateStart, dateEnd }));

        window.location.href = "./ticket.html"
    }

    else {
        errorSubmit.innerHTML = "Error creating a ticket"
    }

}

function loadTicket() {
    const data = JSON.parse(localStorage.getItem('ticketData'));

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

