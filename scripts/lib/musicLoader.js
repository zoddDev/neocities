export class AudioLoader {
  static DEFAULT_VOLUME = 0.01;

  constructor(url) {
    this.url = url;
    this._ae_audio_was_enabled = false;

    //add triggers to function
    this._ae_interaction_events = [
      "auxclick",
      "click",
      "contextmenu",
      "dblclick",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "touchend",
      "touchstart",
      "pointerdown",
      "pointerup",
    ];
  }

  setup() {
    this.play(true, AudioLoader.DEFAULT_VOLUME);
  }

  playWithAnyFutureInteraction() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    console.log(audioContext);

    // Reanudar si estaba suspendido
    if (audioContext.state === "suspended") {
      this._ae_interaction_events.forEach((eventName) => {
        window.addEventListener(
          eventName,
          () => {
            this._ae_start_playback(eventName, this.url);
          },
          {
            capture: true,
            passive: true,
          },
        );
      });
    } else {
      this.play(true, AudioLoader.DEFAULT_VOLUME);
    }
  }

  play(loop = false, volume = AudioLoader.DEFAULT_VOLUME) {
    const audio = new Audio(this.url);
    audio.muted = true;
    audio.loop = loop;
    audio.volume = volume;
    audio.autoplay = true;

    audio.play();
    audio.muted = false;
  }

  _ae_start_playback(event, url) {
    console.log(event);

    if (this._ae_audio_was_enabled) return; //if this already triggered, do nothing
    this._ae_audio_was_enabled = true; //stop further plays

    const audio = new Audio(url);
    audio.muted = true;
    audio.loop = true;
    audio.volume = 0.2;
    audio.autoplay = true;

    let _ae_promise = audio.play();
    audio.muted = false;

    console.log("[H3AE] Starting playback of " + url);

    //check if successful. if not, try again
    _ae_promise
      .then(function () {
        console.log("[H3AE] Started " + url);
      })
      .catch((e) => {
        console.log(e);
        this._ae_audio_was_enabled = false;
        console.warn(
          "[H3AE] Autoplay failed for an " + url + " element.\nTrying again on next event.",
        );
      });
  }
}
