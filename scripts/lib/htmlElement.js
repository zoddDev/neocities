export class HTMLElement {
  constructor(id, idType = "id", options = {}) {
    this.id = id;
    this.idType = idType;
    this.options = options;
  }

  get() {
    return document.getElementById(this.id);
  }

  addClickListener(callback) {
    this.addEventListener("click", callback);
  }

  addEventListener(event, callback) {
    this.get().addEventListener(event, callback);
  }

  appendHTML(html) {
    this.get().insertAdjacentHTML("beforeend", html);
  }

  destroy() {
    this.get().innerHTML = "";
  }
}
