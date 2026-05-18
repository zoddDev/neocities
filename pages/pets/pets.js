import { AudioLoader } from "../../scripts/lib/musicLoader.js";

export class Pets {
  constructor() {
    new AudioLoader(
      "https://cdn.jsdelivr.net/gh/zoddDev/neocities@main/resources/audios/music/internet_checkpoint.mp3",
    ).setup();
  }

  init() {}
}

new Pets().init();
