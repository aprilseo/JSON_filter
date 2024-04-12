document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    const btnInternational = document.querySelector('.country');
    const btnAward = document.querySelector('.award');

    async function fetchMovies() {
        const response = await fetch('./data.json');
        return await response.json();
    }

    async function populateGrid(filterFunction = () => true) {
        const movies = await fetchMovies();
        gridContainer.innerHTML = ''; // Clear existing grid
        movies.filter(filterFunction).forEach(movie => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            
            const img = document.createElement('img');
            img.src = movie.image;
            img.alt = movie.name;

            const name = document.createElement('p');
            name.textContent = movie.name;

            gridItem.appendChild(img);
            gridContainer.appendChild(gridItem);
        });
    }

    btnInternational.addEventListener('click', () => {
        populateGrid(movie => movie.international === "yes");
    });

    btnAward.addEventListener('click', () => {
        populateGrid(movie => movie.award === "yes");
    });

    populateGrid(); // Initial population of the grid
});