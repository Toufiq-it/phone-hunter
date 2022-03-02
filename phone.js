
const searchBtn = () => {
    const input = document.getElementById('input-value').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${input}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => showPhoneDetails(data.data));
   

    // if(isNaN(inputValue)){
    //     error.innerText = "No Result Found";
    //     input.value ="";
    // } else if(inputValue.length==0){
    //     error.innerText = "No Result Found";
    //     input.value= "";
    //     main.innerHTML="";
    // } else {
        
    // }
}
const showPhoneDetails = phones =>{
    for(const phone of phones){
        const parent = document.getElementById('main')
        const div = document.createElement('div')
        div.classList.add("col-lg-4");
        div.classList.add("mb-5")
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h4 class="card-title">${phone.phone_name}</h4>
                <p class="card-text">${phone.brand}</p>
                <button onclick="detailes('${phone.slug}')" class="btn btn-primary">See details</button>
                </div>
        </div>
        `;
        parent.appendChild(div);
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
    <div class="card custom-width mx-auto mb-5" style="width: 18rem;">
        <img src="${info.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h4 class="card-title">${info.name}</h4>
        <p class="card-text">${info.brand}</p>
        <h6 class="fw-bold fs-5">Core Features</h6>
        <div><p class="lh-lg"><b>Chipset:</b>${info.chipSet}<br>
        </div>
        </div>
    </div>
    `;
}