// Your code here


// define the BASE_URL

const BASE_URL = "http://localhost:3000";

// creating a function using async and await which returns the body an array of films

async function getAllFilms(){

const filmsResponse = await fetch(`${BASE_URL}/films`);
const films = await filmsResponse.json();

return films;

}


// function that create films html list
function filmsList(film){
    const li = document.createElement("li");
    li.innerText = film.title;
    li.addEventListener("click", () =>{
        // const filmInfo = document.getElementById("showing");
        populateFilmInfo(film);
        // console.log(film);
    });
    return li;

}

// function that populate the films into the nav bar

function populateFilmInfo(film){
    let a = parseInt(`${film.capacity}`);
    let b = parseInt(`${film.tickets_sold}`);
    let remainTickets = a-b;

    document.getElementById("poster").src = film.poster;
    document.getElementById("title").innerText = film.title;
    document.getElementById("runtime").innerHTML = `<div id="runtime" class="meta">${film.runtime} minutes</div>`;
    document.getElementById("descript").innerHTML = `              <div class="description">
    <div id="film-info">${film.description}</div>
    <span id="showtime" class="ui label">${film.showtime}</span>
    <span id="ticket-num">${remainTickets}</span> remaining tickets
  </div>`;

  //update a json element object by decreasing it

  document.querySelector("#buy-ticket").addEventListener("click", () =>{
    film.tickets_sold += 1
    let remainTickets = parseInt(`${film.capacity}`) - parseInt(`${film.tickets_sold}`);

    if (remainTickets >= 0){
        document.getElementById("ticket-num").innerHTML = `<span id="ticket-num">${remainTickets}</span>`;
    // console.log(remainTickets);
    } else {
        alert("Sold Out")
    }
    

  })


}

// event listeners


// listeninng to the html unorderedlist that populate the films

const filmListNav = document.getElementById("films");

// fetch the films from the database

getAllFilms().then((films)=>{
    films.map((film)=>{
        // render the content to the browser
        const li = filmsList(film);
        filmListNav.appendChild(li);
    });
});