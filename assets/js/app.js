// Sliders
new Splide("#splide-partners", {
  perPage: 5,
  rewind: true,
  pagination: false,
  arrows: false,
  type: "loop",
  drag: "free",
  autoScroll: {
    speed: 1,
  },
  breakpoints: {
		1024: {
			perPage: 4,
		},
    768: {
      perPage:3,
    }
  }
}).mount(window.splide.Extensions);

new Splide("#portfolio-splide", {
  perPage: 3,
  perMove: 1,
  rewind: true,
  pagination: true,
  arrows: false,
  gap: 20,
  breakpoints: {
		1024: {
			perPage: 2,
		},
    768: {
      perPage:1,
      padding: {left: 40, right: 40},
      type: 'loop'
    }
  }
}).mount();

// Changing the class when scrolling
window.addEventListener("scroll", () => {
  let scrollDistance = window.scrollY;
  const header = document.querySelector(".header");

  document.querySelectorAll(".section").forEach((el, i) => {
    if (el.offsetTop - header.clientHeight <= scrollDistance) {
      document.querySelectorAll(".menu__link").forEach((link) => {
        if (link.classList.contains("menu__link_active")) {
          link.classList.remove("menu__link_active");
        }
      });

      document
        .querySelectorAll(".menu__link")
        [i].classList.add("menu__link_active");
    }
  });

  scrollDistance >= 1
    ? header.classList.add("header_sticky")
    : header.classList.remove("header_sticky");
});

// forms
document
  .querySelectorAll("form")
  .forEach((form) =>
    form.addEventListener("submit", (e) => e.preventDefault())
  );

// Open the modal
const modals = document.querySelectorAll(".modal-delivery");
document
  .querySelectorAll(".btn_more")
  .forEach((btn) => btn.addEventListener("click", openModal));

function openModal() {
  const currentModal = modals[this.dataset.delivery];
  document.body.classList.add("hidden");
  currentModal.classList.remove("modal_hidden");

  currentModal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal_close") ||
      e.target.classList.contains("modal__overlay")
    ) {
      document.body.classList.remove("hidden");
      currentModal.classList.add("modal_hidden");
    }
    return;
  });
}

document.querySelector(".consultation__btn").addEventListener("click", () => {
  const modalConsultation = document.querySelector(".modal__consultation");

  document.body.classList.add("hidden");
  modalConsultation.classList.remove("modal_hidden");

  modalConsultation.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal_close") ||
      e.target.classList.contains("modal__overlay")
    ) {
      document.body.classList.remove("hidden");
      modalConsultation.classList.add("modal_hidden");
    }
    return;
  });
});
