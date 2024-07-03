const global = {
    currentPage :window.location.pathname,

};
//Show data for Movies
async function displayPopularMovies(){
    const result = await fetchAPIData('/movie/popular');
    //console.log(result);
    const res = result.results
    //console.log(res);
    res.forEach(movie => {
      
        const div = document.createElement("div");
        div.classList.add('card');

        div.innerHTML =`
          <a href="movie-details.html?id=${movie.id}">
           ${
          movie.poster_path ?   `<img
          src="https://image.tmdb.org/t/p/w500${
          movie.poster_path}"
          class="card-img-top"
          alt="${movie.title}"
          ` : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="Movie Title"`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">Movie Title</h5>
            <p class="card-text">
              <small class="text-muted" >${movie.release_date}</small>
            </p>
          </div>
        `;

        document.querySelector('#popular-movies').appendChild(div)
    })
    
   
}

//Show data for TV Shows

async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.name}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

async function displaymovieDetails(){

    const moveId = window.location.search.split('=')[1];
   
    const movie = await fetchAPIData(`movie/${moveId}`);
    
    displayBackgroundImage('movie',movie.backdrop_path);

    const div = document.createElement("div");
    
    div.innerHTML =`<div class="details-top">
          <div>
             ${
                movie.poster_path ?   `<img
          src="https://image.tmdb.org/t/p/w500${
            movie.poster_path}"
          class="card-img-top"
          alt="${movie.title}"
          ` : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="Movie Title"`
          }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
             ${movie.vote_average.toFixed(1)}/10
            </p>
            <p class="text-muted">${movie.release_date}</p>
            <p>
             ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
             ${movie.genres.map((genre)=>`<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${movie.budget}</li>
            <li><span class="text-secondary">Revenue:</span> $${movie.revenue}</li>
            <li><span class="text-secondary">Runtime:</span> ${Math.floor(movie.runtime/60)} Hour : ${(movie.runtime)%60} Minutes}</li>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${
            movie.production_companies.map((company)=> `<span>${company.name}</span>`).join(', ')
          }</div>
        </div>`;

        document.querySelector("#movie-details").appendChild(div)
}



async function displayshowDetails(){

  const showId = window.location.search.split('=')[1];
 
  const show = await fetchAPIData(`tv/${showId}`);
  // console.log(show);
  displayBackgroundImage('tv',show.backdrop_path);

  const div = document.createElement("div");
  
  div.innerHTML =`<div class="details-top">
        <div>
           ${
              show.poster_path ?   `<img
        src="https://image.tmdb.org/t/p/w500${
          show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
        ` : `<img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="show name"`
        }
        </div>
        <div>
          <h2>${show.name}</h2>
          <p>
            <i class="fas fa-star text-primary"></i>
           ${show.vote_average.toFixed(1)}/10
          </p>
          <p class="text-muted">${show.last_air_date}</p>
          <p>
           ${show.overview}
          </p>
          <h5>Genres</h5>
          <ul class="list-group">
           ${show.genres.map((genre)=>`<li>${genre.name}</li>`).join('')}
          </ul>
          <a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>
        </div>
      </div>
      <div class="details-bottom">
        <h2>show Info</h2>
        <ul>
          <li><span class="text-secondary">Number of episodes:</span> $${show.budget}</li>
          <li><span class="text-secondary">Last episode To Air:</span> $${show.last_episide_to_air}</li>
          <li><span class="text-secondary">Runtime:</span> ${Math.floor(show.runtime/60)} Hour : ${(show.runtime)%60} Minutes}</li>
          <li><span class="text-secondary">Status:</span> Released</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${
          show.production_companies.map((company)=> `<span>${company.name}</span>`).join(', ')
        }</div>
      </div>`;

      document.querySelector("#show-details").appendChild(div)
}

  // Display Backkdrop on details pages

  function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';
  
    if (type === 'movie') {
      document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
      document.querySelector('#show-details').appendChild(overlayDiv);
    }
  }
 
//display slider

async function displaySlider(){
  const {results} = await fetchAPIData(`movie/now_playing`)
  // console.log(results);
  results.forEach((movie)=>{

    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML =`

            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
    
                    
    `
    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  })
}

function initSwiper(){
  const swiper = new Swiper('.swiper', {
    slidesPerView : 1,
    spaceBetween : 30,
    freeMode : true,
    loop : true,
    autoplay : {
      delay : 4000,
      disableOnInteraction : false,
    },
    breakpoints : {
      500 : {
        slidesPerView : 2
      },
      700 : {
        slidesPerView : 3,
      },
      1200 : {
        slidesPerView :4,
      }
    }
    
  })
}


//fetch data from TMDP API

async function fetchAPIData(endpoint){
    const API_KEY = 'b7245e222a08e634587088e5a69e6041';

    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data =await response.json();
      // console.log(data);
    hideSpinner();
    return data;


}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

function highlightActiveLink(){
    const navLink = document.querySelectorAll(".nav-link");
    navLink.forEach((navLinkItem) => {

        if(navLinkItem.getAttribute("href") === global.currentPage){

            navLinkItem.classList.add('active')

        }
        // navLinkItem.addEventListener('mouseover', function(e){
        //     e.preventDefault();

        //     e.target.style.color = 'red';
        // })

        navLinkItem.addEventListener('mouseout', function(e){
            e.preventDefault();

            e.target.style.color= '';
        })
    })
        

    } 
   
    
    



function init(){
    switch(global.currentPage){
        case "/":
        case "index.html":
            displaySlider()
            displayPopularMovies();
            // console.log('home');
            break;

        case "/shows.html":
          displayPopularShows();
            
            break;

        case "/movie-details.html":
            displaymovieDetails();
           // console.log('movie details');
            break;
        
        case "/tv-details.html":
           displayshowDetails();
        break;

        case "/search.html":
            console.log('search');
            break;   
    }

    highlightActiveLink();
   
   
}
document.addEventListener("DOMContentLoaded", init);