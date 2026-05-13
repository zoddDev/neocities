import { HTMLElement } from "../../scripts/lib/htmlElement.js";
import { AudioLoader } from "../../scripts/lib/musicLoader.js";

export class MemoriesPage {
  static SONG_URL =
    "https://github.com/zoddDev/neocities/raw/refs/heads/main/resources/audios/Yabujin%20-%20302_%20ionwan2go%20(piano%20version)%20loop%20best%20part.mp3";

  static PARAM_PAGE = "page";
  static PARAM_SIZE = "size";
  static PARAM_ORDER = "order";

  static DEFAULT_PAGE_SIZE = 3;
  static DEFAULT_PAGE = 0;
  static DEFAULT_ORDER = "desc";

  constructor() {
    this.page =
      new URLSearchParams(window.location.search).get(MemoriesPage.PARAM_PAGE) ??
      MemoriesPage.DEFAULT_PAGE;

    this.size =
      new URLSearchParams(window.location.search).get(MemoriesPage.PARAM_SIZE) ??
      MemoriesPage.DEFAULT_PAGE_SIZE;

    this.order =
      new URLSearchParams(window.location.search).get(MemoriesPage.PARAM_ORDER) ??
      MemoriesPage.DEFAULT_ORDER;

    this.totalElems = 0;

    this.entries = new HTMLElement("entries");
    this.pagination = new HTMLElement("pagination");
    this.sort = new HTMLElement("order");
    this.prevPageButton = new HTMLElement("prevPage");
    this.nextPageButton = new HTMLElement("nextPage");

    new AudioLoader(MemoriesPage.SONG_URL).play(true, 0.2);
  }

  init() {
    this.fetchData(this.page, this.size, this.order);
  }

  fetchData(page, size, order) {
    fetch("/resources/data/memories.json")
      .then((response) => response.json())
      .then((entries) => {
        if (order === "asc") {
          entries.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
          entries.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        return entries;
      })
      .then((entries) => {
        this.totalElems = entries.length;

        if (size) {
          const startIndex = page * size;
          const endIndex = startIndex + parseInt(size);

          entries = entries.slice(startIndex, endIndex);
        }

        return entries;
      })
      .then((entries) => {
        this.mountEntries(entries);
        this.insertPaginationButtons();
        this.insertOrderButtons();
      });
  }

  mountEntries(entries) {
    entries.forEach((entry) => {
      const entryElement = document.createElement("div");

      entryElement.classList.add("entry");
      entryElement.innerHTML = this.createEntry(entry);

      this.entries.get().appendChild(entryElement);
    });
  }

  createEntry(entry) {
    return `
      <div class="window">
        <div class="title-bar">
          <div class="title-bar-text">${entry.title}</div>

          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </div>

        <div class="window-body">
          <div class="section">
            <div>
              <div>${this.formatBodyText(entry.description)}</div>

              ${this.insertImages(entry.images)}
              ${this.insertLinks(entry.links)}
            </div>
          </div>
        </div>

        <div class="status-bar">
          <p class="status-bar-field text-center fw-bolder">
            ${entry.date}
          </p>
        </div>
      </div>
    `;
  }

  formatBodyText(text) {
    return text.replace(/\n/g, "<br />");
  }

  insertImages(images) {
    if (!images || images.length === 0) return "";

    return `
      <br />

      <div class="d-flex flex-wrap gap-4 justify-content-center">
        ${images
          .map(
            (image) => `
              <img
                class="mw-100"
                src="${image.url}"
                width="${image.wide ? "400px" : "200px"}"
              />
            `,
          )
          .join("")}
      </div>
    `;
  }

  insertLinks(links) {
    if (!links || links.length === 0) return "";

    return `
      <br />

      <div class="d-flex flex-wrap gap-2 justify-content-center">
        ${links
          .map(
            (link) => `
              <button
                class="default col-12 col-md-4 texture-link"
                onclick="window.location.href='${link.url}'"
              >
                ${link.text ? link.text : link.url}
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  insertPaginationButtons() {
    this.pagination.appendHTML(
      `
        <button
          id="prevPage"
          class="default texture-link w-auto"
          ${this.page <= 0 ? "disabled" : ""}
        >
          ◄
        </button>
      `,
    );

    this.prevPageButton.addClickListener(() => {
      this.page = parseInt(this.page) - 1;

      if (this.page < 0) {
        this.page = 0;
      }

      this.reset();
    });

    for (let i = 0; i < Math.ceil(this.totalElems / this.size); i++) {
      const idButton = `page-item-${i}`;
      const button = new HTMLElement(idButton);
      this.pagination.appendHTML(
        `
          <button
            id="${idButton}"
            class="default texture-link ${i == this.page ? "active" : ""}"
            style="width: 5px; padding: 0;"
          >
            ${i + 1}
          </button>
        `,
      );

      button.addClickListener(() => {
        this.page = i;
        this.reset();
      });
    }

    this.pagination.appendHTML(
      `
        <button
          id="nextPage"
          class="default texture-link w-auto"
          ${(this.page + 1) * this.size >= this.totalElems ? "disabled" : ""}
          >
          ►
        </button>
      `,
    );

    this.nextPageButton.addClickListener(() => {
      this.page = parseInt(this.page) + 1;
      this.reset();
    });
  }

  insertOrderButtons() {
    this.sort.appendHTML(
      `
        <button
          id="order-desc"
          class="default texture-link w-auto ${this.order === "desc" ? "active" : ""}"
        >
          Newest
        </button>
        <button
          id="order-asc"
          class="default texture-link w-auto ${this.order === "asc" ? "active" : ""}"
        >
          Oldest
        </button>
      `,
    );
    const orderAscButton = new HTMLElement("order-asc");
    const orderDescButton = new HTMLElement("order-desc");

    orderAscButton.addClickListener(() => {
      this.order = "asc";
      this.reset();
    });
    orderDescButton.addClickListener(() => {
      this.order = "desc";
      this.reset();
    });
  }

  updateUrlPagination() {
    const url = new URL(window.location);
    url.searchParams.set(MemoriesPage.PARAM_PAGE, this.page);
    url.searchParams.set(MemoriesPage.PARAM_SIZE, this.size);
    url.searchParams.set(MemoriesPage.PARAM_ORDER, this.order);

    window.history.pushState({}, "", url);
  }

  reset() {
    this.entries.destroy();
    this.pagination.destroy();
    this.sort.destroy();
    this.updateUrlPagination();

    this.init();
  }

  playSong() {
    const audio = new Audio(MemoriesPage.SONG_URL);

    audio.loop = true;
    audio.volume = 0.2;

    audio.play();
  }

  set page(value) {
    this._page = value;
  }

  get page() {
    return this._page;
  }

  set size(value) {
    this._size = value;
  }

  get size() {
    return this._size;
  }

  set order(value) {
    this._order = value;
  }

  get order() {
    return this._order;
  }
}

new MemoriesPage().init();
