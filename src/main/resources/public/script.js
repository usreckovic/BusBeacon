// Nav bar ucitavanje na svakoj strani --------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    document.body.insertAdjacentHTML('afterbegin', `    <nav class="navbar navbar-expand-lg navbar-white bg-custom-color">
        <div class="container">
            <a class="navbar-brand" href="./index.html">
                Bus<i class="fa-solid fa-bus fa-l" style="color: rgb(255, 255, 255);"></i>Beacon</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></button>

            <ul class="navbar-nav me-auto mb-2 mb-lg-1">

                <div class="ikona">
                    <li class="nav-link">
                        <a class="nav-link" aria-current="page" href="./index.html"><i class="fa-solid fa-house"></i>
                            Home</a>
                    </li>
                </div>

                <div class="ikona">
                    <li class="nav-link">
                        <a class="nav-link" href="./buses.html"><i class="fa-solid fa-list"></i>
                            Buses</a>
                    </li>
                </div>

                <div class="ikona">
                    <li class="nav-link">
                        <a class="nav-link" href="./stations.html"><i class="fa-solid fa-location-dot"></i>
                            Stations</a>
                    </li>
                </div>

                <div class="ikona">
                    <li class="nav-link">
                        <a class="nav-link" href="./tickets.html"><i class="fa-solid fa-ticket-simple"></i>
                            Tickets</a>
                    </li>
                </div>

                <div class="ikona">
                    <li class="nav-link">
                        <a class="nav-link" href="./routes.html"><i class="fa-solid fa-diamond-turn-right"></i>
                            Routes</a>
                    </li>
                </div>

            </ul>
        </div>
        </div>
    </nav>`
    )
})
// Generalne funkcionalnosti --------------------------------------------------------------

function getUrlData(url, actionAfterDataArrives) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (databaseData) {
            actionAfterDataArrives(databaseData)
        });
}

function randomDigitsGenerator() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
}


function GeneratorOfQRCodes() {
    let data = localStorage.getItem('PurchaseTicketData');
    let qrImage = document.getElementById('qrImage');

    if (!data) {
        alert('No ticket data found. Please purchase a ticket first.');
        return;
    }

    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
}

// Funckionalnosti za Index.html --------------------------------------------------------------

function loadCities() {
    fetch("http://localhost:8080/api/station")
        .then(rsp => rsp.json())
        .then(data => {
            let list = document.getElementById('from')
            let list2 = document.getElementById('to')
            let content = '<option value="">---</option>'
            for (let city of data) {
                content += `
                    <option id="city" value="${city.stationId}">${city.city}</option>
                    `
            }
            list.innerHTML = content;
            list2.innerHTML = content;
        })
}

function loadTicketCities() {
    fetch("/api/station")
        .then(rsp => rsp.json())
        .then(data => {

            let from = document.getElementById('EditTicketFrom');
            let to = document.getElementById('EditTicketTo');

            let content = '<option value="">---</option>';

            for (let city of data) {
                content += `
                    <option value="${city.stationId}">
                        ${city.city}
                    </option>
                `;
            }

            from.innerHTML = content;
            to.innerHTML = content;
        });
}

// Provere za Index.html ticket --------------------------------------------------------------

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

        let fromSelect = document.getElementById('from');
        let toSelect = document.getElementById('to');
        let fromStationId = fromSelect.value;
        let toStationId = toSelect.value;
        let from = fromSelect.options[fromSelect.selectedIndex].text;
        let to = toSelect.options[toSelect.selectedIndex].text;

        let newId = randomDigitsGenerator();

        localStorage.setItem('ticketData', JSON.stringify({
            from, to, trip, dateStart, dateEnd, ticketId: newId, fromStationId, toStationId
        }));

        window.location.href = "./purchase.html?id=" + newId;

    } else {
        errorSubmit.innerHTML = "Error creating a ticket";
    }
}

// Funkcije za purchase.html ticket --------------------------------------------------------------

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

function loadPrice() {
    let data = JSON.parse(localStorage.getItem('ticketData'));
    if (!data || !data.fromStationId || !data.toStationId) {
        document.getElementById('ticketPrice').textContent = 'Price not available';
        return;
    }

    fetch(`/api/ticket/price?fromStationId=${data.fromStationId}&toStationId=${data.toStationId}&tripType=${data.trip}`)
        .then(response => {
            if (!response.ok) throw new Error('Error');
            return response.json();
        })
        .then(price => {
            document.getElementById('ticketPrice').textContent = price + ' RSD';
        })
        .catch(() => {
            document.getElementById('ticketPrice').textContent = 'Price not available';
        });
}

// Provere za purchase.html --------------------------------------------------------------
function conditionsCheck(event) {
    let conditions = document.getElementById('conditions');
    if (!conditions.checked) {
        document.getElementById('errorConditions').innerHTML = 'Please check the box to accept the Terms and Conditions before continuing.';
        document.getElementById('errorConditions').style.color = 'white';
        return false;
    } else {
        document.getElementById('errorConditions').innerHTML = '';
        return true;
    }
}

function purchaseGeneralCheck() {
    let ticketData = JSON.parse(localStorage.getItem('ticketData'));
    if (!ticketData || !ticketData.from || ticketData.from === "") return false;
    if (!ticketData.to || ticketData.to === "") return false;
    if (!ticketData.trip || ticketData.trip === "") return false;
    if (!ticketData.dateStart || ticketData.dateStart === "") return false;
    if (!ticketData.dateEnd || ticketData.dateEnd === "") return false;
    return true;
}

function finalPurchaseCheck(event) {
    let purchaseError = document.getElementById('purchaseError');
    let generalValid = purchaseGeneralCheck();
    let conditionsValid = conditionsCheck(event);

    if (generalValid && conditionsValid) {
        purchaseError.innerHTML = "Processing...";

        let ticketData = JSON.parse(localStorage.getItem('ticketData'));

        let formData = new URLSearchParams();
        formData.append('fromStationId', ticketData.fromStationId);
        formData.append('toStationId', ticketData.toStationId);
        formData.append('tripType', ticketData.trip);
        formData.append('travelDateStart', ticketData.dateStart);
        formData.append('travelDateEnd', ticketData.dateEnd || '');

        fetch('/api/ticket', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text); });
                }
                return response.json();
            })
            .then(ticket => {
                localStorage.setItem('PurchaseTicketData', JSON.stringify({
                    ticketId: ticket.ticketNumber,
                    from: ticketData.from,
                    to: ticketData.to,
                    trip: ticketData.trip,
                    dateStart: ticketData.dateStart,
                    dateEnd: ticketData.dateEnd,
                    price: ticket.price
                }));
                window.location.href = "./ticket.html?id=" + ticket.ticketNumber;
            })
            .catch(error => {
                console.error('Error:', error);
                purchaseError.innerHTML = "Error purchasing ticket: " + error.message;
            });
    } else {
        purchaseError.innerHTML = "Error purchasing a ticket. Please check all fields and accept terms.";
    }
}

// funckija za ucitavanje tiketa za ticket.html --------------------------------------------------------------

function loadPurchasedTicket() {
    let urlParams = new URLSearchParams(window.location.search);
    let urlTicketId = urlParams.get('id');

    let data = JSON.parse(localStorage.getItem('PurchaseTicketData'));

    if (!data && data.ticketId != urlTicketId) {
        window.location.href = "./index.html";
        return;
    }
    document.getElementById('ticketFrom').textContent = data.from;
    document.getElementById('ticketTo').textContent = data.to;
    document.getElementById('ticketTrip').textContent = data.trip;
    document.getElementById('ticketDateStart').textContent = data.dateStart;
    document.getElementById('ticketDateEnd').textContent = data.dateEnd;
}

function redirectToTicket(id) {
    window.location.href = "./ticket.html?id=" + randomDigitsGenerator();
}

// funkcije za bus --------------------------------------------------------------

function loadBuses() {
    fetch("http://localhost:8080/api/bus")
        .then(rsp => rsp.json())
        .then(data => {
            let list = document.getElementById('busParts')
            if (list) {
                let content = ''
                for (let Bus of data) {
                    let hasAc = Bus.ac ? 'Yes' : 'No';
                    content += `
                    <div class="card mb-3" style="max-width: 1000px; overflow: hidden; border-radius: 30px; border: 5px solid #6abfff;">
                        <div class="row g-0">
                            <div class="col-md-4">
                            <img src="${Bus.imagePath}" class="img-fluid rounded-start" id="busImages" alt="...">
                        </div>
                    <div class="col-md-8">
                <div class="card-body">
                    <h4 class="card-title">${Bus.brand}</h4>
                    <h5 class="card-text"> ${Bus.model}</h5>
                    <h6 class="card-text">Capacity: ${Bus.capacity} People</h6>
                    <h6 class="card-text">Manufactured year ${Bus.year}</h6>
                    <h6 class="card-text">Air Conditioning ${hasAc}</h6>
                        <p class="card-text"><small class="text-body-secondary">Last updated ${Bus.updatedAt}</small></p>
                </div>
            </div class="buttonForEach">
                <button id="editButtonBus" class="btn btn-sm btn-success" type="button" onclick="editBus(${Bus.busId})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>

                <button id="deleteButtonBus" class="btn btn-sm btn-danger" type="button" onclick="deleteBus(${Bus.busId})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
                </div>
            `;

                }
                list.innerHTML = content;
            } else {
                console.log("Not on the list")
            }

        })
}

function deleteBus(id) {
    if (window.confirm(`Delete bus ${id}?`)) {

        fetch(`/api/bus/${id}`, {
            method: 'DELETE'
        })
            .then(rsp => {
                if (rsp.ok) {
                    window.location.reload();
                }
            });
    }
}

function addBus() {
    window.location.href = "./add-bus.html";
}

function editBus(id) {
    window.location.href = "./edit-bus.html?id=" + id;
}

function addBusImage() {
    fetch("http://localhost:8080/api/bus")
        .then(rsp => rsp.json())
        .then(data => {
            let dataList = document.getElementById('imageSuggestions')

            if (dataList) {
                let diffrentImages = [];
                let optionsHTML = '';

                for (let Bus of data) {
                    if (Bus.imagePath && !diffrentImages.includes(Bus.imagePath)) {
                        diffrentImages.push(Bus.imagePath);
                        optionsHTML += `<option value="${Bus.imagePath}"></option>`;
                    }
                }

                dataList.innerHTML = optionsHTML;
            }
        });
}

function openBuses() {
    window.location.href = './buses.html'
}

// provere za bus --------------------------------------------------------------

function checkBrand() {
    let brand = document.getElementById('busBrand').value;

    if (brand === "") {
        document.getElementById('errorBusBrand').style.display = 'inline';
        document.getElementById('errorBusBrand').textContent = "You have to choose a Brand Name";
        return false;
    }

    if (/^\d+$/.test(brand)) {
        document.getElementById('errorBusBrand').textContent = "Brand cannot be only numbers";
        return false;
    }

    else {
        document.getElementById('errorBusBrand').textContent = "";
        return true;
    }
}

function checkCapacity() {
    let capacity = document.getElementById('busCapacity').value;

    if (capacity === "") {
        document.getElementById('errorBusCapacity').style.display = 'inline';
        document.getElementById('errorBusCapacity').textContent = "You have to type how many seats does the bus have.";
        return false;
    }

    else {
        document.getElementById('errorBusCapacity').textContent = "";
        return true;
    }
}

function checkYear() {
    let year = parseInt(document.getElementById('busYear').value);

    if (isNaN(year)) {
        document.getElementById('errorBusYear').style.display = 'inline';
        document.getElementById('errorBusYear').textContent = "You have to choose a Year";
        return false;
    }

    if (year >= 2155) {
        document.getElementById('errorBusYear').style.display = 'inline';
        document.getElementById('errorBusYear').textContent = "Year can't be larger or equal to 2155";
        return false;
    }

    if (year <= 1901) {
        document.getElementById('errorBusYear').style.display = 'inline';
        document.getElementById('errorBusYear').textContent = "Year can't be smaller or equal to 1901";
        return false;
    }

    else {
        document.getElementById('errorBusYear').textContent = "";
        return true;
    }
}

function finalBusCheckUp() {
    let checkUpYear = checkYear();
    let checkUpCapacity = checkCapacity();
    let checkUpBrand = checkBrand();

    if (checkUpYear && checkUpCapacity && checkUpBrand) {
        return true;
    }

    return false;
}

// funkcije za Station --------------------------------------------------------------

function loadStations() {
    fetch("http://localhost:8080/api/station")
        .then(rsp => rsp.json())
        .then(data => {
            let list = document.getElementById('stationBody')
            if (list) {
                let content = `<thead>
        <tr>
            <th scope="col" id="tableStationRow">ID</th>
            <th scope="col" id="tableStationRow">City</th>
            <th scope="col" id="tableStationRow">Address</th>
            <th scope="col" id="tableStationRow">Gates</th>
            <th scope="col" id="tableStationRow">Options</th>
        </tr>
            </thead>`
                for (let Station of data) {
                    content += `
            <tr>
                <th scope="row" id="tableStationRow">${Station.stationId}</th>
                <td id="tableStationRow">${Station.city}</td>
                <td id="tableStationRow">${Station.address}</td>
                <td id="tableStationRow">${Station.gates}</td>
                <td id="tableStationRow"><button id="editButtonStation" class="btn btn-sm btn-success" onclick="editStation(${Station.stationId})"
                style="background-color: #007BFF; border:none" type="button"">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>

                <button id="deleteButtonStation" class="btn btn-sm btn-danger" style="border:none" type="button" onclick="deleteStation(${Station.stationId})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                </td>
            </tr>
            `;

                }
                list.innerHTML = content;
            } else {
                console.log("Not on the list")
            }

        })
}

function deleteStation(id) {
    if (window.confirm(`Delete Station ${id}?`)) {

        fetch(`/api/station/${id}`, {
            method: 'DELETE'
        })
            .then(rsp => {
                if (rsp.ok) {
                    window.location.reload();
                }
            });
    }
}

function addStation() {
    window.location.href = "./add-station.html";
}

function editStation(id) {
    window.location.href = "./edit-station.html?id=" + id;
}

function openStations() {
    window.location.href = './stations.html';
}

// provere za Station --------------------------------------------------------------

function checkCity() {
    let city = document.getElementById('stationCity').value;

    if (city === "") {
        document.getElementById('errorStationCity').style.display = 'inline';
        document.getElementById('errorStationCity').textContent = "You have to insert City of the Station!";
        return false;
    }

    if (/^\d+$/.test(city)) {
        document.getElementById('errorStationCity').textContent = "City cannot be only numbers!";
        return false;
    }

    else {
        document.getElementById('errorStationCity').textContent = "";
        return true;
    }
}

function checkAddress() {
    let address = document.getElementById('stationAddress').value;

    if (address === "") {
        document.getElementById('errorStationAddress').style.display = 'inline';
        document.getElementById('errorStationAddress').textContent = "You have to insert Address of the Station!";
        return false;
    }

    if (/^\d+$/.test(address)) {
        document.getElementById('errorStationAddress').textContent = "Address cannot be only numbers!";
        return false;
    }

    else {
        document.getElementById('errorStationAddress').textContent = "";
        return true;
    }
}

function checkGates() {
    let gate = parseInt(document.getElementById('stationGates').value);

    if (isNaN(gate)) {
        document.getElementById('errorStationGate').style.display = 'inline';
        document.getElementById('errorStationGate').textContent = "You have to insert how many gates does the Station have!";
        return false;
    }

    else {
        document.getElementById('errorStationGate').textContent = "";
        return true;
    }
}

function finalStationCheckUp() {
    let checkUpCity = checkCity();
    let checkUpAddress = checkAddress();
    let checkUpGates = checkGates();

    if (checkUpCity && checkUpAddress && checkUpGates) {
        return true;
    }

    return false;
}

// funkcije za Route --------------------------------------------------------------

function loadRoutes() {
    fetch("http://localhost:8080/api/route")
        .then(rsp => rsp.json())
        .then(data => {
            let list = document.getElementById('routesBody')
            if (list) {
                let content = `<thead>
        <tr>
            <th scope="col" id="tableStationRow">ID</th>
            <th scope="col" id="tableStationRow">Bus Brand</th>
            <th scope="col" id="tableStationRow">Bus Model</th>
            <th scope="col" id="tableStationRow">Route Stops</th>
            <th scope="col" id="tableStationRow">Departure</th>
            <th scope="col" id="tableStationRow">Arival</th>
            <th scope="col" id="tableStationRow">Options</th>
        </tr>
            </thead>`
                for (let Route of data) {
                    content += `
            <tr>
                <th scope="row" id="tableStationRow">${Route.routeId}</th>
                <td id="tableStationRow">${Route.bus.brand}</td>
                <td id="tableStationRow">${Route.bus.model}</td>
                <td id="tableStationRow">${Route.name}</td>
                <td id="tableStationRow">${Route.arrivalTime}</td>
                <td id="tableStationRow">${Route.departureTime}</td>
                <td id="tableStationRow">

                <button id="deleteButtonStation" class="btn btn-sm btn-danger" style="border:none" type="button" onclick="deleteRoute(${Route.routeId})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button id="editButtonTicket" class="btn btn-sm btn-success"><i class="fa-solid fa-pen-to-square" onclick="editRoute(${Route.routeId})"></i></button>
                </td>
            </tr>
            `;

                }
                list.innerHTML = content;
            } else {
                console.log("Not on the list")
            }

        })
}

function addRoute() {
    window.location.href = "./add-route.html";
}

function editRoute(id) {
    window.location.href = "./edit-route.html?id=" + id;
}

function deleteRoute(id) {
    if (window.confirm(`Delete Route ${id}?`)) {
        fetch(`/api/route-station/route/${id}`, { method: 'DELETE' })
            .then(() => fetch(`/api/route/${id}`, { method: 'DELETE' }))
            .then(rsp => { if (rsp.ok) window.location.href = 'routes.html'; });
    }
}

function openRoutes() {
    window.location.href = "./routes.html";
}

function saveRoute() {
    let busId = document.getElementById('busSelect').value;
    let name = document.getElementById('routeName').value;
    let departure = document.getElementById('departureTime').value;
    let arrival = document.getElementById('arrivalTime').value;
    let stations = [
        document.getElementById('station1').value,
        document.getElementById('station2').value,
        document.getElementById('station3').value
    ].filter(v => v);

    if (!busId || !name || !departure || !arrival || stations.length < 2) {
        document.getElementById('msg').innerHTML = '<span style="color:red;">Fill everything and pick at least 2 stations.</span>';
        return;
    }

    fetch('/api/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bus: { busId: parseInt(busId) }, name, departureTime: departure, arrivalTime: arrival })
    })
        .then(rsp => rsp.json())
        .then(route => {
            let promises = stations.map((StationId, i) => {
                return fetch(`/api/route-station?routeId=${route.routeId}&stationId=${StationId}&stationOrder=${i + 1}`, {
                    method: 'POST'
                });
            });
            return Promise.all(promises);
        })
        .then(() => {
            window.location.href = "./routes.html";
        })
}

function updateRoute() {

    const routeId = new URLSearchParams(window.location.search).get("id");

    fetch("/api/route", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            routeId: routeId,
            name: document.getElementById("routeName").value,
            departureTime: document.getElementById("departureTime").value,
            arrivalTime: document.getElementById("arrivalTime").value,
            bus: {
                busId: document.getElementById("busSelect").value
            }
        })
    })


        .then(() => window.location.href = "routes.html");
}


function loadRouteData() {
    fetch('/api/bus')
        .then(rsp => rsp.json())
        .then(data => {
            let busSelect = document.getElementById('busSelect');

            data.forEach(bus => {
                busSelect.innerHTML +=
                    `<option value="${bus.busId}">
                        ${bus.brand} ${bus.model}
                    </option>`;
            });
        });

    fetch('/api/station')
        .then(rsp => rsp.json())
        .then(data => {
            ['station1', 'station2', 'station3'].forEach(id => {
                let sel = document.getElementById(id);

                data.forEach(station => {
                    sel.innerHTML +=
                        `<option value="${station.stationId}">
                            ${station.city}
                        </option>`;
                });
            });
        });

    fetch(`/api/route-station?routeId=${routeId}`)
        .then(rsp => rsp.json())
        .then(data => {

            if (data[0])
                document.getElementById("station1").value =
                    data[0].station.stationId;

            if (data[1])
                document.getElementById("station2").value =
                    data[1].station.stationId;

            if (data[2])
                document.getElementById("station3").value =
                    data[2].station.stationId;
        });
}


// funkcije za Ticket --------------------------------------------------------------

function loadTickets() {
    fetch("http://localhost:8080/api/ticket")
        .then(rsp => rsp.json())
        .then(data => {
            let list = document.getElementById('ticketsParts')
            if (list) {
                let content = ''
                for (let ticket of data) {
                    content += `
                    <div class="card" style="width: 18rem;" id="ticketMain">
                            <div id="ticketTop" class="card-header"> Ticket:${ticket.ticketNumber}
                        </div >
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item" id="ticketTicketsParts">${ticket.fromStation.city} - ${ticket.toStation.city}</li>
                                <li class="list-group-item" id="ticketTicketsParts">${ticket.price} din</li>
                                <li class="list-group-item" id="ticketTicketsParts">${ticket.tripType}</li>
                                <li class="list-group-item" id="ticketTicketsParts">Valid date from: ${ticket.travelDateStart}</li>
                                <li class="list-group-item" id="ticketTicketsParts">Valid date until: ${ticket.travelDateEnd}</li>
                                <li class="list-group-item" id="ticketTicketsParts"><button id="deleteButtonTicket" class="btn btn-sm btn-danger" style="border:none" type="button" onclick="deleteTicket(${ticket.ticketId})"><i class="fa-solid fa-trash-can"></i></button>
                                                                                    <button id="editButtonTicket" class="btn btn-sm btn-success"><i class="fa-solid fa-pen-to-square" onclick="editTicket(${ticket.ticketId})"></i></button>
                                                                                    </li>
                                <span id="ticketBottom">${ticket.createdAt}</span>
                            </ul>
                        </div>
            `;

                }
                list.innerHTML = content;
            } else {
                console.log("Not on the list")
            }

        })
}

function deleteTicket(id) {
    if (window.confirm(`Delete Ticket ${id}?`)) {
        fetch(`/api/ticket/${id}`, {
            method: 'DELETE'
        })
            .then(rsp => {
                if (rsp.ok) {
                    window.location.reload();
                }
            });
    }
}

function openTickets() {
    window.location.href = "./tickets.html"
}

function editTicket(id) {
    window.location.href = "./edit-ticket.html?id=" + id;
}



// provere za Ticket --------------------------------------------------------------

function checkTicketDate() {
    document.getElementById('errorTravelDateStart').innerHTML = "";
    document.getElementById('errorTravelDateEnd').innerHTML = "";

    let dateStart = document.getElementById('travelDateStart').value;
    let dateEnd = document.getElementById('travelDateEnd').value;

    if (!dateStart) {
        document.getElementById('errorTravelDateStart').innerHTML = "You have to select start date!";
        return false;
    }

    if (!dateEnd) {
        document.getElementById('errorTravelDateEnd').innerHTML = "You have to select end date!";
        return false;
    }

    let selectedStart = new Date(dateStart);
    let selectedEnd = new Date(dateEnd);

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedStart < today) {
        document.getElementById('errorTravelDateStart').innerHTML = "Your date can't be in the past!";
        return false;
    }

    if (selectedEnd < today) {
        document.getElementById('errorTravelDateEnd').innerHTML = "Your date can't be in the past!";
        return false;
    }

    if (selectedStart > selectedEnd) {
        document.getElementById('errorTravelDateEnd').innerHTML = "Start date must be before end date!";
        return false;
    }

    return true;
}

function checkTicketFrom() {
    let city = document.getElementById('EditTicketFrom').value;

    if (city === "") {
        document.getElementById('errorTicketFrom').style.display = 'inline';
        document.getElementById('errorTicketFrom').textContent = "You have to insert City of the Station!";
        return false;
    }
    else {
        document.getElementById('errorTicketFrom').textContent = "";
        return true;
    }
}

function checkTicketTo() {
    let city = document.getElementById('EditTicketTo').value;

    if (city === "") {
        document.getElementById('errorTicketTo').style.display = 'inline';
        document.getElementById('errorTicketTo').textContent = "You have to insert City of the Station!";
        return false;
    }
    else {
        document.getElementById('errorTicketTo').textContent = "";
        return true;
    }
}

function checkTripType() {
    let trip = document.getElementById('ticketTripType').value;

    if (trip == "" && trip == "NULL") {
        document.getElementById('errorTicketTrip').style.display = 'inline';
        document.getElementById('errorTicketTrip').textContent = "You have to select Type of Trip";
        return false;
    }
    else {
        document.getElementById('errorTicketTrip').textContent = "";
        return true;
    }
}

function finalTicketCheckUp() {
    let checkUpTicketDate = checkTicketDate();
    let checkUpTicketFrom = checkTicketFrom();
    let checkUpTicketTo = checkTicketTo();
    let checkUpTicketType = checkTripType();

    let from = document.getElementById("EditTicketFrom").value;
    let to = document.getElementById("EditTicketTo").value;

    if (from === to) {
        document.getElementById('errorTicketTo').style.display = 'inline';
        document.getElementById('errorTicketTo').textContent = "You can't choose same two cities";
        return false;
    }

    if (checkUpTicketDate && checkUpTicketFrom && checkUpTicketTo && checkUpTicketType) {
        return true;
    }

    return false;
}




