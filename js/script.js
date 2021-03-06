// error message block
document.getElementById("alert2").style.display = "none";
// input value clear & get input
const searchPhone = () => {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  searchInput.value = "";
  document.getElementById("alert2").style.display = "none";
  if (searchInput == "") {
    searchResult.innerHTML = "";
    document.getElementById("phone-details").innerHTML = "";
    document.getElementById("alert2").style.display = "block";
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((api) => displayPhoneResult(api.data));

    document.getElementById("phone-details").innerHTML = "";
  }
};

// Search Data show
const displayPhoneResult = (data) => {
  if (data.length == 0) {
    document.getElementById("alert2").style.display = "block";
  }
  const searchResult = document.getElementById("search-result");
  searchResult.innerHTML = "";
  data.splice(0, 20).forEach((datas) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card text-center rounded-3">
            <img src="${datas.image}" class="card-img-top w-50 h-75 mx-auto pt-3" alt="...">
            <div class="card-body">
                <h3 class="card-title">${datas.phone_name}</h3>
                <h4>Brand: ${datas.brand}</h4>
                <a href="#phone-details"><button onclick="loadDetails('${datas.slug}')" class="bg-primary text-white px-3 py-2 border-0 rounded-pill fw-bold" type="button">Explore now</button></a>
            </div>
        </div>
        `;
    searchResult.appendChild(div);
  });
};

// getting phone id
const loadDetails = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((main) => displayDetails(main.data));
};

// more details dynamically
const displayDetails = (phone) => {
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("row");
  div.innerHTML = `
    <div class="col-md-6 bg-white text-center py-3">
        <img src="${phone.image}" alt="#">
    </div>
    <div class="col-md-6 bg-white py-3">
        <h2>Phone Details</h2>
        <h4>Name: ${phone.name}</h4>
        <h4>Released Date: ${
          phone?.releaseDate ? phone?.releaseDate : `No release date found`
        }</h4>
        <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <b>Main Features</b>
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <p><b>Chipset: </b>${phone?.mainFeatures?.chipSet}</p> 
                      <p><b>Display Size: </b>${
                        phone?.mainFeatures?.displaySize
                      }</p>
                      <p><b>Memory: </b>${phone?.mainFeatures?.storage}</p>
                      <p><b>Sensors: </b>${phone?.mainFeatures?.sensors}</p>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <b>Others</b>
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    <p><b>Bluetooth: </b>${
                      phone?.others?.Bluetooth
                        ? phone?.others?.Bluetooth
                        : `no data found`
                    }</p> 
                    <p><b>GPS: </b>${
                      phone?.others?.GPS ? phone?.others?.GPS : `no data found`
                    }</p>
                    <p><b>NFC: </b>${
                      phone?.others?.NFC ? phone?.others?.NFC : `no data found`
                    }</p>
                    <p><b>Radio: </b>${
                      phone?.others?.Radio
                        ? phone?.others?.Radio
                        : `no data found`
                    }</p>
                    <p><b>USB: </b>${
                      phone?.others?.USB ? phone?.others?.USB : `no data found`
                    }</p>
                    <p><b>WLAN: </b>${
                      phone?.others?.WLAN
                        ? phone?.others?.WLAN
                        : `no data found`
                    }</p>
                    </div>
                  </div>
                </div>
              </div>
    </div>
    
    `;
  phoneDetails.appendChild(div);
};
