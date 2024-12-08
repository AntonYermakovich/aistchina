// Sliders
new Splide("#splide-partners", {
  perPage: 3,
  perMove: 1,
  rewind: true,
  pagination: true,
  arrows: true,
  type: "loop",
  gap: 10,
  padding: 5,
  breakpoints: {
    1024: {
      perPage: 2,
    },
    768: {
      perPage: 1,
      arrows: false,
    },
  },
  classes: {
    prev: "splide__arrow--prev custom-prev-btn",
    next: "splide__arrow--next custom-next-btn",
  },
}).mount();

new Splide("#sales-splide", {
  perPage: 4,
  perMove: 1,
  rewind: true,
  pagination: false,
  arrows: false,
  type: "loop",
  drag: "free",
  breakpoints: {
    1024: {
      perPage: 3,
    },
    768: {
      perPage: 2,
    },
  },
}).mount(window.splide.Extensions);

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

document.querySelectorAll(".consultation__btn").forEach((btn) =>
  btn.addEventListener("click", () => {
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
  })
);

// Open menu in mobile
const iconBurger = document.querySelector(".header__icon");
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");
const menuItems = document.querySelectorAll(".menu__item");

iconBurger.addEventListener("click", openMenu);

function openMenu() {
  if (this.classList.contains("header__icon_active")) {
    closeMenu();
  } else {
    this.classList.add("header__icon_active");
    menu.classList.add("menu_show");
    document.body.classList.add("hidden");
    overlay.classList.add("overlay_show");
  }

  overlay.addEventListener("click", () => closeMenu());
}

function closeMenu() {
  iconBurger.classList.remove("header__icon_active");
  menu.classList.remove("menu_show");
  document.body.classList.remove("hidden");
  overlay.classList.remove("overlay_show");
}

menuItems.forEach((item) => item.addEventListener("click", () => closeMenu()));

document.querySelectorAll(".socials__link-wechat").forEach((link) =>
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const modal = document.querySelector(".modal__socials-wechat");

    modal.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("modal_close") ||
        e.target.classList.contains("modal__overlay")
      ) {
        modal.classList.add("modal_hidden");
        document.body.classList.remove("hidden");
      }
    });

    if (modal.classList.contains("modal_hidden")) {
      modal.classList.remove("modal_hidden");
      document.body.classList.add("hidden");
    }
  })
);

// mask for number

const phones = document.querySelectorAll("input[type='phone']");
const maskOptions = {
  mask: "+{7}(000) 000-00-00",
  lazy: true,
};

phones.forEach((phone) => IMask(phone, maskOptions));

// Validate forms
let validatorCall;
let validatorDelivery;

document.querySelectorAll(".form__call").forEach((form) => {
  validatorCall = new JustValidate(form, {
    errorLabelCssClass: ["form__error-message"],
  });

  validatorCall
    .addField("#name", [
      {
        rule: "required",
        errorMessage: "Введите имя",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Минимальная длина имени 2 символа",
      },
    ])
    .addField("#phone", [
      {
        rule: "required",
        errorMessage: "Введите телефон",
      },
      {
        rule: "minLength",
        value: 17,
        errorMessage: "Неверный номер телефона",
      },
    ])
    .addField("#message", [
      {
        rule: "required",
        errorMessage: "Введите сообщение",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Минимальная длина имени 2 символа",
      },
    ]);
});

validatorDelivery = new JustValidate('.form__delivery', {
  errorLabelCssClass: ["form__error-message"],
});

validatorDelivery
  .addField("#fio", [
    {
      rule: "required",
      errorMessage: "Введите ваше имя/компанию",
    },
  ])
  .addField("#phone", [
    {
      rule: "required",
      errorMessage: "Введите телефон",
    },
    {
      rule: "minLength",
      value: 17,
      errorMessage: "Неверный номер телефона",
    },
  ])
  .addField("#email", [
    {
      rule: "required",
      errorMessage: "Введите email",
    },
    {
      rule: "email",
      errorMessage: "Некорректный e-mail",
    },
  ])
  .addField("#sendFrom", [
    {
      rule: "required",
      errorMessage: "Введите адрес отправителя",
    },
  ])
  .addField("#sendTo", [
    {
      rule: "required",
      errorMessage: "Введите адрес получателя",
    },
  ])
  .addField("#weight", [
    {
      rule: "required",
      errorMessage: "Введите вес товара",
    },
  ])
  .addField("#volume", [
    {
      rule: "required",
      errorMessage: "Введите объем товара",
    },
  ])
  .addField("#productDescription", [
    {
      rule: "required",
      errorMessage: "Введите описание товара",
    },
  ])
  .addField("#date", [
    {
      rule: "required",
      errorMessage: "Выберите дату",
    },
  ])
  // .addField("#method", [
  //   {
  //     rule: "required",
  //     errorMessage: "Выберите способ доставки",
  //   },
  // ])
  .addField("#comment", [
    {
      rule: "required",
      errorMessage: "Введите комментарий",
    },
  ]);

// Send forms
document
  .querySelectorAll(".form")
  .forEach((form) => form.addEventListener("submit", sendForm));

function sendForm() {
  const formData = {};

  if (validatorCall.isValid) {
    // Валидация обратного звонка
    const inputs = this.querySelectorAll("input, textarea");
    inputs.forEach((input) => (formData[input.name] = input.value));

    console.log(formData);
  } else if (validatorDelivery.isValid) {
    const inputs = this.querySelectorAll("input, textarea");
    inputs.forEach((input) => (formData[input.name] = input.value));

    console.log(formData);
  }

  // console.log(this)
}
