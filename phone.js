

const searchBtn = () => {
    const parent = document.getElementById('main');

    document.getElementById('main').innerHTML="";
    document.getElementById('main1').innerHTML="";
    const input = document.getElementById('input-value');
    const inputValue = input.value;
   
    const errorElement = document.getElementById('error');
    if (inputValue == "") {
        errorElement.innerText = "Search Box Is Empty";
        errorElement.style.display = 'block';


    } else {
        errorElement.style.display = 'none';
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => showPhoneDetails(data.data));
        errorElement.innerHTML = "";

    }
}

const showPhoneDetails = phones =>{
    phones.forEach(phone => {
        const parent = document.getElementById('main')
        const div = document.createElement('div')
        div.classList.add("col-lg-4");
        div.classList.add("mb-5")
        div.innerHTML = `
        <div class="card mb-5" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top p-5" alt="..." >
                <div class="card-body">
                <h4 class="card-title">${phone.phone_name}</h4>
                <p class="card-text">${phone.brand}</p>
                <button onclick="detailes('${phone.slug}')" class="btn btn-primary">See details</button>
                </div>
        </div>
        `;
        parent.appendChild(div);
    });

    const messageTwo = document.getElementById('error2');
    messageTwo.innerText = '';

    console.log(parent.innerHTML)

    console.log(parent)

    if (parent.innerHTML == '') {
        messageTwo.innerText = "No Result Found";
        messageTwo.style.display = 'block';
    }
    else {
        messageTwo.style.display = 'none';
    }

      
}

const detailes=(info)=>{
    const url = `https://openapi.programming-hero.com/api/phone/${info}`;
    fetch(url)
    .then(res => res.json())
    .then(data => setDetailes(data.data));
}

const setDetailes = info => {
    document.getElementById('main1').innerHTML = `
    <div id="device-details" class="custom-width mx-auto mb-5">
    <div class="card">
    <img src="${info.image}" class="card-img-top mx-auto" alt="..." style="width: 40%;">
    <div class="card-spacing">
        <h4 class="card-title">${info.name}</h4>
    </div>

    <p class="card-spacing"><b>ReleaseDate:</b> ${info.releaseDate ? info.releaseDate:'Comming soon'}</p>
    
    <div class="card-spacing">

        <h6 class="fw-bold fs-5 ">Core Features</h6>
        <p class="lh-lg"><b>Chipset:</b> ${info.mainFeatures.chipSet}<br> <b>Memory:</b> ${info.mainFeatures.memory}<br><b>Storage:</b> ${info.mainFeatures.storage}<br><b>Display Size:</b> ${info.mainFeatures.displaySize}<br><b>Sensors:</b> ${info.mainFeatures.sensors}</p>

    </div>
    <div class="card-spacing">
        <h6 class="fw-bold fs-5">Other Features</h6>
        <p class="lh-lg"><b>Network:</b> ${info.others?.WLAN? info.others.WLAN:'no Found'}<br><b>GPS:</b> ${info.others?.GPS? info.others.GPS:'no found'}<br><b>Blutooth:</b> ${info.others?.Bluetooth? info.others.Bluetooth:'no found'}<br><b>USB:</b> ${info.others?.USB? info.others.USB:'no found'}<b><br>NFC:</b> ${info.others?.NFC? info.others.NFC:'no found'}<br><b>Radio:</b> ${info.others?.Radio? info.others.Radio:'no found'}</p>

    </div>
    </div>
    </div>
    `;
}