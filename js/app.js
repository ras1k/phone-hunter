// phone search
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('error-message').style.display='none';

// all phone API
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res=> res.json())
        .then(data => displaySearchResult(data?.data.slice(0,20)))
}

// search result
const displaySearchResult = data =>{
    const searchResult = document.getElementById('search-result');
    searchResult.textContent='';

// error message
    if (data.length === 0){
        document.getElementById('error-message').style.display='block';
    }

// Show Phones
    data.forEach(phone =>  {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="col">
            <div class="card w-75 p-4 rounded-3 mx-auto">
                <img src="${phone?.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${phone?.phone_name}</h4>
                    <h5 class="card-title">${phone?.brand}</h5>
                    <a href="#top" onclick="loadPhoneDetail('${phone?.slug}')" class="btn btn-primary">View Details</a>
                </div>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

// specific phone API
const loadPhoneDetail = phoneId =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then (res => res.json())
        .then(data => displayPhoneDetail(data?.data))     
}

// Display details
const displayPhoneDetail = phone =>{
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent='';

    // let rlDate = phone.releaseDate? phone.releaseDate: 'date not found' ;
    // if(phone.releaseDate){
    //     rlDate = phone.releaseDate;
    //     console.log(rlDate);
    // }
    // else
    // {rlDate = 'date not found'}

    const features = phone?.mainFeatures;
    const others = phone?.others;
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="p-3 row g-0">
        <div class="col-md-4">
            <img src="${phone?.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h6 class="card-title">${phone?.name}</h6>
            <h6 class="card-title">Brand : ${phone?.brand}</h6>
            <h5 class="text-info card-title">Main features :</h5>
            <h6 class="card-title">Storage : ${features?.storage}</h6>
            <h6 class="card-title">Display : ${features?.displaySize}</h6>
            <h6 class="card-title">Chipset : ${features?.chipSet}</h6>
            <h6 class="card-title">Memory : ${features?.memory}</h6>
            <h6 class="card-title">Sensors : ${features?.sensors}</h6>
            <h5 class="text-info card-title">Other features :</h5>
            <h6 class="card-title">WLAN : ${others?.WLAN? others.WLAN : 'not found'}</h6>
            <h6 class="card-title">Bluetooth : ${others?.Bluetooth? others.Bluetooth : 'not found'}</h6>
            <h6 class="card-title">GPS : ${others?.GPS? others.GPS :'not found'}</h6>
            <h6 class="card-title">NFC : ${others?.NFC? others.NFC: 'not found'}</h6>
            <h6 class="card-title">Radio : ${others?.Radio? others.Radio: 'not found'}</h6>
            <h6 class="card-title">USB : ${others?.USB? others.USB : 'not found'}</h6>
            <h6 class="card-title">Release Date : ${phone.releaseDate? phone.releaseDate: 'date not found'}</h6>
            
        </div>
    </div>
  </div>
    `;
    phoneDetails.appendChild(div);
}