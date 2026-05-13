export class AudioLoader {
  constructor(url) {
    this.url = url;
  }

  play(loop = false, volume = 0.2) {
    const audio = new Audio(this.url);
    audio.loop = loop;
    audio.volume = volume;

    audio.play();
  }
}
