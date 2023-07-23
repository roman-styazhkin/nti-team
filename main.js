const swiper = new Swiper(".swiper", {
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
  },
});

// input mask for phone

function maskPhone(selector, masked = "+7 (___) ___-__-__") {
  const elems = document.querySelectorAll(selector);

  function mask(event) {
    const keyCode = event.keyCode;
    const template = masked,
      def = template.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    console.log(template);
    let i = 0,
      newValue = template.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf("_");
    if (i !== -1) {
      newValue = newValue.slice(0, i);
    }
    let reg = template
      .substr(0, this.value.length)
      .replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      })
      .replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (
      !reg.test(this.value) ||
      this.value.length < 5 ||
      (keyCode > 47 && keyCode < 58)
    ) {
      this.value = newValue;
    }
    if (event.type === "blur" && this.value.length < 5) {
      this.value = "";
    }
  }

  for (const elem of elems) {
    elem.addEventListener("input", mask);
    elem.addEventListener("focus", mask);
    elem.addEventListener("blur", mask);
  }
}

maskPhone(".contacts__input--tel");

const personButton = document.querySelector(".header__link--person");
const headerLinks = document.querySelectorAll(".header__link");
const modal = document.querySelector(".modal");

headerLinks.forEach((link) =>
  link.addEventListener("mouseenter", () => {
    const needToCloseModal =
      !link.classList.contains("header__link--person") &&
      modal.style.display === "block";

    if (needToCloseModal) {
      console.log(1);
      modal.style.display = "none";
    }
  })
);

personButton.addEventListener("mouseenter", () => {
  modal.style.display = "block";
});

modal.addEventListener("mouseleave", () => {
  modal.style.display = "none";
});

// burger

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", (e) => {
  e.target.classList.toggle("close");
  menu.classList.toggle("open");
});
