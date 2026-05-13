"use strict";

const marquee = {
  // default speed in pixels per second
  pps: 142,

  // scroll
  animHoriz: (el) => {
    let pps = Number(el.parentElement.getAttribute("data-speed") || marquee.pps);

    let pWidth = el.parentElement.offsetWidth;
    let sWidth = el.offsetWidth;

    el.style.setProperty("--p-offset", pWidth + "px");
    el.style.setProperty("--s-offset", -sWidth + "px");
    el.style.setProperty("--duration", (pWidth + sWidth) / pps + "s");
  },
  animVert: (el) => {
    let pps = Number(el.parentElement.getAttribute("data-speed") || marquee.pps);

    let pHeight = el.parentElement.offsetHeight;
    let sHeight = el.offsetHeight;

    el.style.setProperty("--p-offset", pHeight + "px");
    el.style.setProperty("--s-offset", -sHeight + "px");
    el.style.setProperty("--duration", (pHeight + sHeight) / pps + "s");
  },

  // alternate
  animAltHoriz: (el) => {
    let pps = Number(el.parentElement.getAttribute("data-speed") || marquee.pps);

    let offset = el.parentElement.offsetWidth - el.offsetWidth - 20;

    el.style.setProperty("--s-offset", offset + "px");
    el.style.setProperty("--duration", Math.abs(offset / pps) + "s");
  },
  animAltVert: (el) => {
    let pps = Number(el.parentElement.getAttribute("data-speed") || marquee.pps);

    let offset = el.parentElement.offsetHeight - el.offsetHeight;

    el.style.setProperty("--s-offset", offset + "px");
    el.style.setProperty("--duration", Math.abs(offset / pps) + "s");
  },

  // slide
  animSlideHoriz: (el) => {
    let pps = Number(el.parentElement.getAttribute("data-speed") || marquee.pps);

    let pWidth = el.parentElement.offsetWidth;

    el.style.setProperty("--p-offset", pWidth + "px");
    el.style.setProperty("--s-offset", -pWidth + "px");
    el.style.setProperty("--duration", pWidth / pps + "s");
  },
  animSlideVert: (el) => {
    let pps = Number(el.parentElement.getAttribute("data-speed") || marquee.pps);

    let pHeight = el.parentElement.offsetHeight;

    el.style.setProperty("--p-offset", pHeight + "px");
    el.style.setProperty("--s-offset", -pHeight + "px");
    el.style.setProperty("--duration", pHeight / pps + "s");
  },

  /* LISTENERS */

  // redefine --*-offset on resize
  resize: () => {
    for (let k in marquee.elements) {
      marquee.elements[k].forEach((e) => {
        marquee[k](e);
      });
    }
  },

  // check if .marquee is onscreen before
  //  starting animation for the first time
  checkView: () => {
    document.querySelectorAll(".marquee-guts.pausit").forEach((e) => {
      let rect = e.parentElement.getBoundingClientRect();
      // fully in view
      if (rect.top > -1 && rect.bottom <= window.innerHeight) e.classList.remove("pausit");
    });

    if (!document.querySelector(".marquee-guts.pausit"))
      removeEventListener("scroll", marquee.checkView);
  },

  // call marquee.setup() at end of document
  // preferably BEFORE load event
  setup: () => {
    marquee.sty = document.createElement("style");
    marquee.sty.setAttribute("name", "marquee");
    marquee.sty.textContent = marquee.css;

    let head = document.querySelector("head");
    head.insertBefore(marquee.sty, head.firstChild);

    let o = {
      animHoriz: [],
      animVert: [],
      animAltHoriz: [],
      animAltVert: [],
      animSlideHoriz: [],
      animSlideVert: [],
    };

    document.querySelectorAll(".marquee").forEach((e) => {
      let div = document.createElement("div");
      div.setAttribute("class", "marquee-guts pausit");
      while (e.childNodes[0]) {
        div.append(e.childNodes[0]);
      }
      e.append(div);

      if (e.classList.contains("slide")) {
        if (checkVert(e)) return o.animSlideVert.push(div);
        else return o.animSlideHoriz.push(div);
      }

      if (e.classList.contains("alt")) {
        if (checkVert(e)) return o.animAltVert.push(div);
        else return o.animAltHoriz.push(div);
      }

      if (checkVert(e)) return o.animVert.push(div);
      else return o.animHoriz.push(div);
    });

    marquee.elements = o;

    addEventListener("resize", marquee.resize);
    addEventListener("scroll", marquee.checkView);

    marquee.resize();
    marquee.checkView();

    function checkVert(e) {
      return e.classList.contains("up") || e.classList.contains("down");
    }
  },

  css: `/* marquee */
.marquee {
  overflow: hidden;
  border:0;
  padding:0;
  
  /* default animations */
  --loop: infinite;
  --delay: 0s;
  --hover: paused;
}

.marquee:hover .marquee-guts {
  animation-play-state: var(--hover);
}

.marquee .marquee-guts.pausit {
  animation-play-state: paused;
}

/* scrollers */
.marquee > .marquee-guts
{
  display: block;
  width: fit-content;
  
  animation-fill-mode: both;
  animation-duration: var(--duration);
  animation-timing-function: linear;
  animation-iteration-count: var(--loop);
  animation-delay: var(--delay);
  
  /* default: .left */
  animation-name: scroll-left;
  white-space: nowrap;
}

/* animation name */
.marquee.up > .marquee-guts,
.marquee.down > .marquee-guts {
  animation-name: scroll-up;
  white-space: unset;
  width: 100%;
}

.marquee.alt > .marquee-guts {
  animation-name: alt-left;
  animation-direction: alternate;
}
.marquee.up.alt > .marquee-guts,
.marquee.down.alt > .marquee-guts {
  animation-name: alt-up;
}


.marquee.slide {
  --loop: 1;
}
.marquee.slide > .marquee-guts {
  animation-name: slide-left;
}
.marquee.slide.right > .marquee-guts {
  animation-name: slide-right;
  animation-direction: normal;
  float: right;
}
.marquee.slide.up > .marquee-guts {
  animation-name: slide-up;
}

/* to stay down */
.marquee.slide.down {
  display: flex;
  align-items: flex-end;
}
.marquee.slide.down > .marquee-guts {
  flex: none;
  animation-name: slide-down;
  animation-direction: normal;
}


/* direction */
.marquee.right > .marquee-guts,
.marquee.down > .marquee-guts {
  animation-direction: reverse;
}
.marquee.left.alt > .marquee-guts,
.marquee.up.alt > .marquee-guts {
  animation-direction: alternate;
}
.marquee.right.alt > .marquee-guts,
.marquee.down.alt > .marquee-guts {
  animation-direction: alternate-reverse;
}

.marquee-guts img {
  max-width: unset;
}


/* keyframes */
@keyframes scroll-left {
  0% {
    transform: translate( var(--p-offset) , 0);
  }
  100% {
    transform: translate( var(--s-offset) , 0);
  }
}
@keyframes scroll-up {
  0% {
    transform: translate(0, var(--p-offset) );
  }
  100% {
    transform: translate(0, var(--s-offset) );
  }
}

@keyframes alt-left {
  0% {
    transform: translate( var(--s-offset) ,0);
  }
  100% {
    transform: translate(0,0);
  }
}
@keyframes alt-up {
  0% {
    transform: translate(0, var(--s-offset) );
  }
  100% {
    transform: translate(0,0);
  }
}


@keyframes slide-left {
  0% {
    transform: translate( var(--p-offset) ,0);
  }
  100% {
    transform: translate(0,0);
  }
}
@keyframes slide-right {
  0% {
    transform: translate( var(--s-offset), 0);
  }
  100% {
    transform: translate(0,0);
  }
}

@keyframes slide-up {
  0% {
    transform: translate(0, var(--p-offset));
  }
  100% {
    transform: translate(0,0);
  }
}
@keyframes slide-down {
  0% {
    transform: translate(0, var(--s-offset));
  }
  100% {
    transform: translate(0,0);
  }
}`,
};
