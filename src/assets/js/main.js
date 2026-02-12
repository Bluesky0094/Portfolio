const nav = document.querySelector("#site-nav");
const toggle = document.querySelector(".nav-toggle");

if (nav && toggle) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    const isOpen = nav.classList.contains("nav-open");
    toggle.setAttribute("aria-label", isOpen ? "Chiudi menu" : "Apri menu");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

const openButtons = document.querySelectorAll("[data-modal-open]");
const closeButtons = document.querySelectorAll("[data-modal-close]");

openButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal-open");
    const modal = document.getElementById(`${modalId}-modal`);
    if (modal) {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
    }
  });
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal-close");
    const modal = document.getElementById(`${modalId}-modal`);
    if (modal) {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal.is-open").forEach((modal) => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    });
    document.body.classList.remove("modal-open");
  }
});

const ratioClassMap = [
  { className: "is-ratio-9-16", ratio: 9 / 16, tolerance: 0.06 },
  { className: "is-ratio-4-5", ratio: 4 / 5, tolerance: 0.06 },
  { className: "is-ratio-1-1", ratio: 1, tolerance: 0.06 },
  { className: "is-ratio-16-9", ratio: 16 / 9, tolerance: 0.06 },
];
const mediaSelectors = [
  ".project-thumb img",
  ".project-thumb video",
  ".asset-thumb img",
  ".asset-thumb video",
];

const applyMediaRatioClass = (mediaEl, width, height) => {
  if (!width || !height) return;
  const ratio = width / height;
  const thumb = mediaEl.closest(".project-thumb, .asset-thumb");
  if (!thumb) return;
  const card = mediaEl.closest(".project-card");
  const isEventFlyer = Boolean(mediaEl.closest(".event-flyer-page"));
  const match = ratioClassMap.find((item) => {
    return Math.abs(ratio - item.ratio) <= item.tolerance;
  });
  if (match) {
    thumb.classList.add(match.className);
    if (!isEventFlyer) {
      thumb.style.aspectRatio = match.ratio.toString();
    }
  }
  if (isEventFlyer) {
    thumb.style.removeProperty("aspect-ratio");
  }
  if (!card) return;
  card.classList.remove("media-shape-portrait", "media-shape-square", "media-shape-landscape");
  if (ratio < 0.9) {
    card.classList.add("media-shape-portrait");
    return;
  }
  if (ratio > 1.2) {
    card.classList.add("media-shape-landscape");
    return;
  }
  card.classList.add("media-shape-square");
};

const handleImage = (img) => {
  if (img.complete) {
    applyMediaRatioClass(img, img.naturalWidth, img.naturalHeight);
    return;
  }
  img.addEventListener("load", () => {
    applyMediaRatioClass(img, img.naturalWidth, img.naturalHeight);
  });
};

const handleVideo = (video) => {
  if (video.readyState >= 1) {
    applyMediaRatioClass(video, video.videoWidth, video.videoHeight);
    return;
  }
  video.addEventListener("loadedmetadata", () => {
    applyMediaRatioClass(video, video.videoWidth, video.videoHeight);
  });
};

document.querySelectorAll(mediaSelectors.join(", ")).forEach((mediaEl) => {
  if (mediaEl.tagName === "IMG") {
    handleImage(mediaEl);
    return;
  }
  if (mediaEl.tagName === "VIDEO") {
    handleVideo(mediaEl);
  }
});

const enhancePdfThumbnails = () => {
  const useStaticPdfThumbs = document.body.classList.contains("no-pdf-preview");
  document.querySelectorAll("a.project-card").forEach((card) => {
    const href = card.getAttribute("href");
    if (!href || !href.match(/\.pdf$/i)) return;
    const placeholder = card.querySelector(".project-thumb--placeholder");
    if (!placeholder) return;
    if (placeholder.querySelector(".pdf-thumb-preview, .pdf-thumb-image")) return;

    if (useStaticPdfThumbs) {
      const thumbSrc = href.replace(/\.pdf$/i, ".png");
      const img = document.createElement("img");
      img.className = "pdf-thumb-image";
      img.alt = "Anteprima PDF";
      img.loading = "lazy";
      img.addEventListener("load", () => {
        placeholder.textContent = "";
        placeholder.classList.add("project-thumb--pdf");
        placeholder.appendChild(img);
      });
      img.src = thumbSrc;
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.className = "pdf-thumb-preview";
    iframe.src = `${href}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`;
    iframe.loading = "lazy";
    iframe.title = "Anteprima PDF";
    iframe.setAttribute("tabindex", "-1");

    placeholder.textContent = "";
    placeholder.classList.add("project-thumb--pdf");
    placeholder.appendChild(iframe);
  });
};

enhancePdfThumbnails();
document.addEventListener("DOMContentLoaded", enhancePdfThumbnails);
window.addEventListener("load", enhancePdfThumbnails);

const ensureMediaModal = () => {
  let modal = document.getElementById("media-modal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "media-modal";
  modal.className = "modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="modal-backdrop" data-media-close></div>
    <div class="modal-panel" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3 class="modal-title" id="media-modal-title">Anteprima</h3>
        <button class="modal-close" type="button" aria-label="Chiudi" data-media-close>&times;</button>
      </div>
      <div class="modal-body" id="media-modal-body"></div>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelectorAll("[data-media-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeMediaModal());
  });

  return modal;
};

const closeMediaModal = () => {
  const modal = document.getElementById("media-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  const body = modal.querySelector("#media-modal-body");
  if (body) body.innerHTML = "";
};

const openMediaModal = (href, titleText) => {
  const modal = ensureMediaModal();
  const body = modal.querySelector("#media-modal-body");
  const title = modal.querySelector("#media-modal-title");
  if (!body || !title) return;

  title.textContent = titleText || "Anteprima";
  body.innerHTML = "";

  if (href.match(/\.pdf$/i)) {
    const iframe = document.createElement("iframe");
    iframe.src = href;
    iframe.loading = "lazy";
    body.appendChild(iframe);
  } else if (href.match(/\.(mp4|webm|ogg)$/i)) {
    const video = document.createElement("video");
    video.src = href;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    body.appendChild(video);
  } else {
    const img = document.createElement("img");
    img.src = href;
    img.alt = titleText || "Anteprima";
    body.appendChild(img);
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

document.querySelectorAll("a.project-card").forEach((card) => {
  card.addEventListener("click", (event) => {
    const href = card.getAttribute("href");
    if (!href) return;
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }
    if (!href.match(/\.(png|jpe?g|webp|gif|svg|mp4|webm|ogg|pdf)$/i)) {
      return;
    }
    event.preventDefault();
    const titleEl = card.querySelector(".project-text");
    const titleText = titleEl ? titleEl.textContent.trim() : "Anteprima";
    openMediaModal(href, titleText);
  });
});

const ensureBackBubble = () => {
  let backBubble = document.querySelector(".back-bubble");
  if (backBubble) return backBubble;

  backBubble = document.createElement("button");
  backBubble.className = "back-bubble";
  backBubble.type = "button";
  backBubble.setAttribute("aria-label", "Torna su");
  backBubble.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 15l6-6 6 6"></path>
    </svg>
  `;
  document.body.appendChild(backBubble);

  backBubble.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  return backBubble;
};

const ensureProjectBackBubble = () => {
  const path = window.location.pathname.replace(/\\/g, "/");
  const isProjectDetailPage = path.includes("/pages/projects/");
  if (!isProjectDetailPage) return null;

  document.body.classList.add("has-project-back");
  let backToProjects = document.querySelector(".project-back-bubble");
  if (backToProjects) return backToProjects;

  backToProjects = document.createElement("a");
  backToProjects.className = "project-back-bubble";
  backToProjects.href = "../index.html";
  backToProjects.setAttribute("aria-label", "Torna ai progetti");
  backToProjects.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 6l-6 6 6 6"></path>
    </svg>
    <span class="project-back-bubble-label">Progetti</span>
  `;
  document.body.appendChild(backToProjects);
  return backToProjects;
};

const normalizeProjectFileLabels = () => {
  const extensionRegex = /\.(svg|png|jpe?g|webp|gif|pdf|mp4|webm|ogg)$/i;
  document.querySelectorAll(".project-grid.media-grid a.project-card .project-text").forEach((label) => {
    const text = label.textContent ? label.textContent.trim() : "";
    if (!text) return;
    if (!extensionRegex.test(text)) return;
    const normalized = text
      .replace(extensionRegex, "")
      .replace(/[_\s]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    label.textContent = normalized;
  });
};

normalizeProjectFileLabels();

const backBubble = ensureBackBubble();
const projectBackBubble = ensureProjectBackBubble();
const updateBackBubble = () => {
  const shouldShow = window.scrollY > 240;
  backBubble.classList.toggle("is-visible", shouldShow);
  if (projectBackBubble) {
    projectBackBubble.classList.toggle("is-visible", shouldShow);
  }
};

updateBackBubble();
window.addEventListener("scroll", updateBackBubble, { passive: true });
