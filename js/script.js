/* QUERY SELECTORS ************************************************** */
const h1 = document.querySelector('h1');

const link = document.querySelector('a');

const searchInput = document.querySelector('.search-input');

const countryCount = document.querySelector('.country-count');

const countriesWrapper = document.querySelector('.countries-wrapper');

const urlApi = 'https://restcountries.eu/rest/v2/all';
fetch(urlApi)
    .then(response => response.json())
    .then(countries => {
        /* VARIABLES ******************************************************** */

        let H = Math.round(Math.random() * 360);
        let S = Math.round(Math.random() * 100);

        let mediumL = 25;
        let mediumHSL = `hsl(${H}, ${S}%, ${mediumL}%)`

        let darkL = 5;
        let darkHSL = `hsl(${H}, ${S}%, ${darkL}%)`

        let shownCountries;



        /* STYLES ***************************************************************** */
        searchInput.style.background = mediumHSL;
        searchInput.style.border = `2px solid ${mediumHSL}`;

        searchInput.addEventListener('mouseover', function() {
            searchInput.style.background = 'white';
            searchInput.style.color = mediumHSL;

        });

        searchInput.addEventListener('mouseout', function() {
            searchInput.style.background = mediumHSL;
            searchInput.style.color = 'white';

        });

        searchInput.addEventListener('focus', function() {
            searchInput.style.background = 'white';
            searchInput.style.color = mediumHSL;

        });

        searchInput.addEventListener('blur', function() {
            searchInput.style.background = mediumHSL;
            searchInput.style.color = 'white';
        });

        countryCount.style.color = mediumHSL;




        /* FUNCTIONS *************************************************************** */
        function createCountryDivInnerHtml(object) {
            const {name, capital, languages, population, flag} = object;
            const languageNames = languages.map(lang => lang.name);
            console.log(languageNames);

            countryDivInnerHtml =
            `<div class="country-div">
                <div class="flag-div">
                    <img class="flag-img" src="${flag}" />
                </div>

                <div class="properties-div">
                    <p class="name-p">${name}</p>
                    <p class="capital-p"><span class="property-name">Capital:</span> ${capital}</p>
                    <p class="population-p"><span class="property-name">Population:</span> ${population.toLocaleString()}</p>
                    <p class="languages-p"><span class="property-name">Languages:</span> ${languageNames.join(', ')}</p>
                </div>
            </div>`

            return countryDivInnerHtml;
        };

        function generateCountryDivColor() {
            const countryDivs = document.querySelectorAll('.country-div');
            for (i = 0; i < countryDivs.length; i++) {
                let L = Math.round(Math.random() * (90 - 60) + 60);
                let hsl = `hsl(${H}, ${S}%, ${L}%)`;

                countryDivs[i].style.background = hsl;
                countryDivs[i].style.color = darkHSL;
            }
        }



        function showCountries(array) {
            countryDivInnerHtml = '';
            countriesWrapper.innerHTML = '';

            for (i = 0; i < array.length; i++) {
                countryDivInnerHtml += createCountryDivInnerHtml(array[i]);
            };

            countriesWrapper.innerHTML = countryDivInnerHtml;

            generateCountryDivColor();

        };



        function filterCountries(array, search) {
            const filteredCountries = array.filter(country => {
                let {name, capital, languages} = country;
                let isName = name.toLowerCase().includes(search);
                let isCapital = capital.toLowerCase().includes(search);
                let isLanguages = languages.join(', ').toLowerCase().includes(search);

                return isName || isCapital || isLanguages;
            });

            return filteredCountries;
        };



        function showFilteredCountries(event) {
            countriesWrapper.innerHTML = '';
            let searchTerm = event.target.value.toLowerCase();
            shownCountries = showCountries(filterCountries(countries, searchTerm));
            return shownCountries;
        };



        /* EXECUTION *************************************************************** */

        h1.style.color = mediumHSL;
        link.style.color = mediumHSL;

        countryCount.textContent = `showing ${countries.length} countries`;
        showCountries(countries);
        searchInput.addEventListener('input', showFilteredCountries);
    })
    .catch(error => {
        console.log(error)
    });