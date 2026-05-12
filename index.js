// Age display
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const age = document.getElementById("age");
const birthDate = new Date("2000-12-16");
const currentAge = getAge(birthDate);
age.innerHTML = currentAge;

// -------- Interests --------
// General
const general = [
  "Nature",
  "2000's vibes",
  "Nostalgia",
  "Linux",
  "Animals",
  "Reptiles",
  "Chilling with friends",
  "Videogames",
  "Movies & Series",
  "Computers",
  "Anime",
];
document.getElementById("general").innerHTML = general.sort().join(", ");

// Music
const music = [
  "Powerwolf",
  "Iron Maiden",
  "Mago de Oz",
  "Rihanna",
  "Lady Gaga",
  "Charli XCX",
  "David Guetta",
  "Avenged Sevenfold",
  "Linkin Park",
  "Michael Jackson",
  "TOOL",
  "Modern Talking",
  "The Cranberries",
  "Arctic Monkeys",
  "Backstreet Boys",
  "Black Eyed Peas",
  "Evanescense",
  "Nightwish",
  "Queen",
  "David Bowie",
  "Crystal Castles",
  "Nightcore",
  "sauzzZe",
];
document.getElementById("music").innerHTML = music.sort().join(", ");

// Games
const games = [
  "Zelda",
  "Red Dead Redemption",
  "Pokémon",
  "Minecraft",
  "Resident Evil",
  "Spore",
  "Dwarf Fortress",
  "Dark souls",
  "The Sims",
  "Nintendogs",
  "Animal Crossing",
  "Habbo",
  "ArcheAge",
  "Black Desert",
  "Diablo",
  "Starbound",
  "Stardew Valley",
  "Granblue Fantasy",
  "Undertale",
  "Terraria",
];
document.getElementById("games").innerHTML = games.sort().join(", ");

// Movies
const movies = [
  "Schindler's List",
  "American History X",
  "The Pianist",
  "Midsommar",
  "Hereditary",
  "Lord of The Rings",
  "Pirates  Of The Caribbean",
  "Gladiator",
  "It Follows",
  "A Bronx Tale",
  "Gran Torino",
];
document.getElementById("movies").innerHTML = movies.sort().join(", ");

// TV Series
const series = [
  "Game of Thrones",
  "Breaking Bad",
  "How I met your mother",
  "Lost",
  "From",
  "Vikings",
];
document.getElementById("series").innerHTML = series.sort().join(", ");
