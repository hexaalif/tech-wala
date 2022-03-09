const searchPhone = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    // console.log(searchText);
    searchInput.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(api => displayPhoneResult(api.data))
}

const displayPhoneResult = data => {
    const searchResult = document.getElementById('search-result');
    data.forEach(datas => {
        console.log(datas);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML= `
        <div class="card text-center rounded-3">
            <img src="${datas.image}" class="card-img-top w-50 h-75 mx-auto pt-3" alt="...">
            <div class="card-body">
                <h3 class="card-title">${datas.phone_name}</h3>
                <h4>Brand: ${datas.brand}</h4>
                <button onclick="" class="bg-primary text-white px-3 py-2 border-0 rounded-pill fw-bold">Explore now</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div)
    })
}

const exploreNow = mealId