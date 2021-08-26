const API_KEY ='api_key=9926e615ef2e1c6b35eb33230bcb23b4';
const BASE_URL ='https://api.themoviedb.org/3';
const API_URL = BASE_URL+ '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main=document.getElementById('main');
getMovies(API_URL);
function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data);
        showMovies(data.results);
    })
}

function showMovies(data){
    main.innerHTML='';

    data.forEach(movie =>{
        const{title, poster_path, vote_average, overview} =movie;
        const movie1 = document.createElement('div');
        movie1.classList.add('movie');
        movie1.innerHTML=`
        <div class="movie-info">
        <div>
        <center><img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}"></center>
        </div>
        <br/>
        <div style="display:flex;">
        <div style="width:80%">${title}</div>
        <div>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        </div>
        </div>
        
        <div class="overview">
            <h3>Overview</h3>
            ${overview};
        </div>
        
        `

        main.appendChild(movie1);
    })

}
 
function getColor(vote){
    if(vote>= 8){
        return 'green';
    }else if(vote>=5){
        return 'orange';
    }else{
        return 'red';
    }
}
