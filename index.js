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
  "Nostalgiacore",
  "Linux",
  "Animals",
  "Reptiles",
  "Spiders (especially tarantulas)",
  "Chilling with friends",
  "Videogames",
  "Movies & Series",
  "Computers",
  "Anime",
  "Rock/Metal music",
];
document.getElementById("general").innerHTML = general.sort().join(", ");

// Music
const music = [
  "Powerwolf",
  "Iron Maiden",
  "Mago de Oz",
  "Megadeth",
  "Metallica",
  "Lady Gaga",
  "Deftones",
  "Pantera",
  "Muse",
  "David Guetta",
  "Avenged Sevenfold",
  "Linkin Park",
  "Michael Jackson",
  "TOOL",
  "Modern Talking",
  "The Cranberries",
  "Arctic Monkeys",
  "Alice In Chains",
  "Creed",
  "Pearl Jam",
  "Gary Moore",
  "Backstreet Boys",
  "Black Eyed Peas",
  "Evanescence",
  "Nightwish",
  "Three Days Grace",
  "Extremoduro",
  "Crystal Castles",
  "Nightcore",
  "Limp Bizkit",
  "Slipknot",
  "Pignoise",
  "Michael Jackson",
  "Simple Plan",
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
  "Dark Souls",
  "Elden Ring",
  "Fallout New Vegas",
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
  "Call of Duty",
  "Battlefield",
  "Balatro",
  "No, I'm not a Human",
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
  "Interstellar",
  "In Time",
];
document.getElementById("movies").innerHTML = movies.sort().join(", ");

// TV Series
const series = [
  "Game of Thrones",
  "Breaking Bad",
  "How I met your mother",
  "LOST",
  "From",
  "Vikings",
  "The Walking Dead",
  "Narcos",
  "Dark",
  "Black Mirror",
  "Peaky Blinders",
  "The Boys",
];
document.getElementById("series").innerHTML = series.sort().join(", ");
