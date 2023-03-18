const loadPhones = async(text, l) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${text}`)
    const data = await res.json();
    displayPhones(data.data, l)
};
// loadPhones();

const displayPhones = (phones, l) => {
    // console.log(phones);
    
    const pCon = document.getElementById('p-con');
    pCon.textContent = '';
    const showAll = document.getElementById('show-all');
    
    if(l && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    };

    const massageCon = document.getElementById('massage');
    if(phones.length === 0) {
        massageCon.classList.remove('d-none');
    }
    else{
        massageCon.classList.add('d-none');
    };

    phones.forEach(p => {
        const pDiv = document.createElement('div');
        pDiv.classList.add('col');
        pDiv.innerHTML = `
        <div class="card p-4">
        <img src="${p.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${p.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${p.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phone-details">Details</button>
            </div>
        </div>
        `;
        pCon.appendChild(pDiv);
    });
    toggleSpi(false);
};

const processSearch = (limit) => {
    toggleSpi(true);
    const searchValue = document.getElementById('search-inp').value;
    loadPhones(searchValue, limit);

};

document.getElementById('btn-search').addEventListener('click', function() {
    processSearch(10);

});

document.getElementById('search-inp').addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        processSearch(10);
    }
})

const toggleSpi = isLoading => {
    const loaderSpi = document.getElementById('loader');
    if(isLoading) {
        loaderSpi.classList.remove('d-none');
    }
    else {
        loaderSpi.classList.add('d-none');
    };

};

document.getElementById('btn-show-all').addEventListener('click', function() {
    processSearch();
});

const loadPhoneDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
};

const displayPhoneDetails = p => {
    console.log(p);
    const modalTitle = document.getElementById('phone-detailsLabel');
    modalTitle.innerText = p.name;
    const phoneDetailModal = document.getElementById('phone-details-modail');
    phoneDetailModal.innerHTML = `
        <p>Release Date: ${p.releaseDate}</p>
        <p>ChipSet: ${p.mainFeatures ? p.mainFeatures.chipSet : 'no found'}</p>
    `;
};
