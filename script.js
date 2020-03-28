// Navigation
const navMenu = document.querySelector(".menu_items");
navMenu.addEventListener("click", e => {
  if (e.target.className === "menu_item") {
    const elements = document.querySelectorAll(".menu_item");
    elements.forEach(e => {
      e.classList.remove("menu_item_active");
    });
    e.target.classList.add("menu_item_active");
  }
});

// Slide
const slide1 = document.querySelector(".slider_item1");
const slide2 = document.querySelector(".slider_item2");
const items = [slide1, slide2];
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function() {
    this.classList.remove("active", direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function() {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}

function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
}

function previousItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
}

document.querySelector(".control.left").addEventListener("click", function() {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector(".control.right").addEventListener("click", function() {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

const swipedetect = el => {
  const surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;

  surface.addEventListener(
    "mousedown",
    function(e) {
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    },
    false
  );

  surface.addEventListener(
    "mouseup",
    function(e) {
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          if (distX > 0) {
            if (isEnabled) {
              previousItem(currentItem);
            }
          } else {
            if (isEnabled) {
              nextItem(currentItem);
            }
          }
        }
      }
      e.preventDefault();
    },
    false
  );

  surface.addEventListener(
    "touchstart",
    function(e) {
      if (
        e.target.classList.contains("arrow") ||
        e.target.classList.contains("control")
      ) {
        if (e.target.classList.contains("left")) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
      let touchobj = e.changedTouches[0];
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    },
    false
  );

  surface.addEventListener(
    "touchmove",
    function(e) {
      e.preventDefault();
    },
    false
  );

  surface.addEventListener(
    "touchend",
    function(e) {
      let touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX;
      distY = touchobj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          if (distX > 0) {
            if (isEnabled) {
              previousItem(currentItem);
            }
          } else {
            if (isEnabled) {
              nextItem(currentItem);
            }
          }
        }
      }
      e.preventDefault();
    },
    false
  );
};

const el = document.querySelector(".slider");
swipedetect(el);

const blackPhoneVert = document.querySelector(".tel_vert");
const blackPhoneGor = document.querySelector(".tel_gor");
slide1.addEventListener("click", e => {
  if (e.target.className === "tel_vert") {
    blackPhoneVert.src =
      blackPhoneVert.src.indexOf("assets/phone-vertical-bl") !== -1
        ? "./assets/phone-vertical.png"
        : "./assets/phone-vertical-bl.png";
  }
  if (e.target.className === "tel_gor") {
    blackPhoneGor.src =
      blackPhoneGor.src.indexOf("assets/phone-horizontal-bl") !== -1
        ? "./assets/phone-horizontal.png"
        : "./assets/phone-horizontal-bl.png";
  }
});
// Portfolio

const portfolioImages = document.querySelector(".image_items");
portfolioImages.addEventListener("click", e => {
  const imegeItem = document.querySelectorAll(".image_item");
  imegeItem.forEach(el => {
    el.classList.remove("active_portfolio");
  });
  if (e.target.parentElement.className === "image_item") {
    if (e.target.parentElement.className.indexOf("active_portfolio") + 1) {
      e.target.parentElement.classList.remove("active_portfolio");
    } else {
      e.target.parentElement.classList.add("active_portfolio");
    }
    // поработать над убиранием рамки
  }
});

const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const indexImg = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34];
const arrImg = document.querySelectorAll(".portfolio_img");
const portfoliMenu = document.querySelector(".portfolio_menu");
portfoliMenu.addEventListener("click", e => {
  if (e.target.className === "portfolio_menu_item") {
    let index = 0;
    shuffle(indexImg);
    arrImg.forEach(el => {
      el.src = `assets/${indexImg[index]}.jpg`;
      index++;
    });
  }
  if (e.target.className === "portfolio_menu_item") {
    const elements = document.querySelectorAll(".portfolio_menu_item");
    elements.forEach(e => {
      e.classList.remove("portfolio_menu_active");
    });
    e.target.classList.add("portfolio_menu_active");
  }
});

// Form submit

const formContainer = document.querySelector(".form_container");
const modalWraper = document.querySelector(".modal_wraper");
const submitButton = document.querySelector(".submit");
const subjectForm = document.querySelector("#subject");
const describeForm = document.querySelector("#describe");
const modalMsg = document.querySelector(".modal_msg");
submitButton.addEventListener("click", e => {
  if (
    document.querySelector("#username").value &&
    document.querySelector("#email").value.indexOf("@") + 1
  ) {
    e.preventDefault();
    modalWraper.style.display = "flex";
    modalMsg.insertAdjacentHTML("beforeend", `<p>Письмо отправлено</p>`);
    let subjectValue = subjectForm.value || "Без темы";
    modalMsg.insertAdjacentHTML("beforeend", `<p>Тема: ${subjectValue}</p>`);
    let describeField = describeForm.value || "Без описания";
    modalMsg.insertAdjacentHTML(
      "beforeend",
      `<p>Описание: ${describeField}</p><button class="close-btn" type="button">OK</button>`
    );
    const hidenModal = document.querySelector(".close-btn");
    hidenModal.addEventListener("click", e => {
      e.preventDefault();
      modalWraper.style.display = "none";
      formContainer.reset();
      modalMsg.innerHTML = ``;
    });
  }
});

//respons
const navBurgerMenu = document.querySelector(".nav_menu");
const burgMenu = document.querySelector(".header_menu");
const navMenuItem = document.querySelectorAll(".menu_item");
burgMenu.addEventListener("click", () => {
  console.log(navMenuItem);
  if (burgMenu.classList[1] === "rot90") {
    burgMenu.classList.remove("rot90");
    navBurgerMenu.classList.remove("show-nav");
  } else {
    navBurgerMenu.classList.add("show-nav");
    burgMenu.classList.add("rot90");
  }
});
navMenuItem.forEach(el => {
  el.addEventListener("click", () => {
    if (burgMenu.classList[1] === "rot90") {
      burgMenu.classList.remove("rot90");
      navBurgerMenu.classList.remove("show-nav");
    } else {
      navBurgerMenu.classList.add("show-nav");
      burgMenu.classList.add("rot90");
    }
  });
});
