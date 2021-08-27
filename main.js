const API_KEY ='api_key=9926e615ef2e1c6b35eb33230bcb23b4';
const BASE_URL ='https://api.themoviedb.org/3';
const API_URL = BASE_URL+ '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');

const prev =document.getElementById('prev');
const current =document.getElementById('current');
const next=document.getElementById('next');

var currentPage =1;
var nextPage =2;
var prevPage=3;
var lastUrl='';
var totalPage=100;


getMovies(API_URL);
function getMovies(url) {
    lastUrl = url;
      fetch(url).then(res => res.json()).then(data => {
          console.log(data.results)
              showMovies(data.results);
              currentPage =data.page;
              nextPage=currentPage+1;
              prevPage=currentPage-1;
              totalPage=data.total_pages;

              current.innerText=currentPage;

              if(currentPage<=1){
                  prev.classList.add('disabled');
                  next.classList.remove('disabled');
              }else if(currentPage>=totalPage){
                prev.classList.remove('disabled');
                next.classList.add('disabled');
              }else{
                prev.classList.remove('disabled');
                next.classList.remove('disabled');
              }
      })
  
  }

function showMovies(data){
    main.innerHTML='';

    data.forEach(movie =>{
        const{title, poster_path, vote_average, overview} =movie;
        const movie1 = document.createElement('div');
        movie1.classList.add('movie');
        movie1.innerHTML=`
        <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
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

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }

})

prev.addEventListener('click',() =>{
    if(nextPage>0){
        pageCall(prevPage);
    }
})

next.addEventListener('click',() =>{
    if(nextPage<= totalPage){
        pageCall(nextPage);
    }
})

function pageCall(page){
    let urlsplit = lastUrl.split('?');
    let queryParams = urlsplit[1].split('&');
    let key =queryParams[queryParams.length-1].split('=');
    if(key[0] != 'page'){
        let url = lastUrl+'&page=' +page
        getMovies(url);
    }else{
        key[1]=page.toString();
        let a= key.join('=');
        queryParams[queryParams.length-1]=a;
        let b= queryParams.join('&');
        let url = urlsplit[0]+'?'+ b
        getMovies(url);
    }
}
