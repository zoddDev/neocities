import { AudioLoader } from "../../../../scripts/lib/musicLoader.js";

export class Names {
  static SONG_URL =
    "https://cdn.jsdelivr.net/gh/zoddDev/neocities@main/resources/audios/music/white_noise.mp3";

  constructor() {
    new AudioLoader(Names.SONG_URL).play(true, 0.2);
  }

  init() {}
}

new Names().init();
