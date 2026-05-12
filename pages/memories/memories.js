const url = "https://files.catbox.moe/yd2dpi.mp3";
const audio = new Audio(url);
audio.loop = true;
audio.volume = 0.2; // 20% volume
audio.play();

fetch("/resources/data/memories.json")
  .then((response) => response.json())
  .then((entries) => {
    console.log(entries);

    mountEntries(entries);
  });

function mountEntries(entries) {
  const container = document.getElementById("entries");
  entries.forEach((entry) => {
    console.log("ENTRY", entry);

    const entryElement = document.createElement("div");
    entryElement.classList.add("entry");
    entryElement.innerHTML = createEntry(entry);
    container.appendChild(entryElement);
  });
}

function createEntry(entry) {
  const template = `
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
                  <div>${formatBodyText(entry.description)}</div>
                  ${insertImages(entry.images)}
                  ${insertLinks(entry.links)}
                </div>
              </div>
            </div>
            <div class="status-bar">
              <p class="status-bar-field text-center fw-bolder">${entry.date}</p>
            </div>
        </div>
    `;
  return template;
}

function formatBodyText(text) {
  return text.replace(/\n/g, "<br />");
}

function insertImages(images) {
  if (!images || images.length === 0) return "";

  return `
        <br />
        <div class="d-flex flex-wrap gap-4 justify-content-center">
            ${images.map((image) => `<img class="mw-100" src="${image.url}" width="${image.wide ? "400px" : "200px"}" />`).join("")}
        </div>
    `;
}

function insertLinks(links) {
  if (!links || links.length === 0) return "";

  return `
        <br />
        <div class="d-flex flex-wrap gap-2 justify-content-center">
            ${links.map((link) => `<button class="default col-12 col-md-4 texture-link" onclick="window.location.href='${link.url}'">${link.text ? link.text : link.url}</button>`).join("")}
        </div>
    `;
}
