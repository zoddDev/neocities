// Shuffle songs
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

const tracks = [
  {
    metaData: {
      title: "aquatic ambience",
      artist: "scizzie",
    },

    url: "https://cdn.jsdelivr.net/gh/zoddDev/neocities@main/resources/audios/music/aquatic_ambience.mp3",
    duration: 125,
  },
  {
    metaData: {
      title: "I Still Love You",
      artist: "Doki Doki Literature Club",
    },

    url: "https://cdn.jsdelivr.net/gh/zoddDev/neocities@main/resources/audios/music/dokidoki_i_still_love_you.mp3",
    duration: 125,
  },
  {
    metaData: {
      title: "TheLegitimateBusinessmansSocialClub",
      artist: "01-11",
    },

    url: "https://cdn.jsdelivr.net/gh/zoddDev/neocities@main/resources/audios/music/legitimatebusinessmansocialclub.wav",
    duration: 130,
  },
  {
    metaData: {
      title: "frutiger aero",
      artist: "temcandoanything ",
    },

    url: "https://cdn.jsdelivr.net/gh/zoddDev/neocities@main/resources/audios/music/frutigeraero1.mp3",
    duration: 98,
  },
  {
    metaData: {
      title: "x.mp3",
      artist: "milk cassette",
    },

    url: "https://cdn.jsdelivr.net/gh/zoddDev/neocities@main/resources/audios/music/milk_cassette.mp3",
    duration: 150,
  },
];

shuffle(tracks);

let webamp;
// once WebAmp script is loaded, do this.
function startWebAmp() {
  const Webamp = window.Webamp;
  webamp = new Webamp({
    // initialSkin: {
    //   url: "https://files.catbox.moe/sizcxp.wsz",
    //   // url: "https://file.garden/ZRW0B_KULjLI59Tb/webamp/TSWNN_ver_2.wsz",
    // },
    availableSkins: [
      // {
      //   url: "https://files.catbox.moe/sizcxp.wsz",
      //   name: "Make me sad",
      // },
    ],
    initialTracks: tracks,
    windowLayout: {
      main: {
        position: { top: 0, left: 0 },
        shadeMode: false,
        closed: false,
      },
      equalizer: {
        position: { top: 110, left: 0 },
        shadeMode: false,
        closed: false,
      },
      playlist: {
        position: { top: 228, left: 0 },
        shadeMode: false,
        closed: false,
      },
    },
  });

  // Returns a promise indicating when it's done loading.
  webamp.renderWhenReady(document.getElementById("webamp"));
}

// Load the WebAmp script and run the above function
// method where it loads the script in here. can't impo rt so create the element.
var script = document.createElement("script");
script.type = "text/javascript";
script.async = true;
script.onload = function () {
  // once script loaded
  startWebAmp();

  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "styles/webamp-skins/webamp.css";
  document.head.appendChild(link);

  webamp.play();
};
script.src = "https://unpkg.com/webamp@1.4.2/built/webamp.bundle.min.js";
document.head.appendChild(script);
