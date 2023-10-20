window.addEventListener("load", () => {
  /*--------------page loader--------------------*/
  document.querySelector(".js-page-loader").classList.add("fade-out");

  setTimeout(() => {
    document.querySelector(".js-page-loader").style.display = "none";
  });
});

/*------testimonilas---------*/
function testimonials() {
  const carouselOne = document.getElementById("carouselOne");

  if (carouselOne) {
    carouselOne.addEventListener("slide.bs.carousel", function () {
      // do something...
      const activeItem = this.querySelector(".active");
      console.log(activeItem);
      document.querySelector(".js-testimonials-img").src =
        activeItem.getAttribute("data-js-textimonials-img");
    });
  }
}
testimonials();

/*------course preview---------*/
/*------Modal ---------*/
function coursePreviewvideo() {
  const coursePreviewModal = document.querySelector(".js-course-perveiw-modal");
  if (coursePreviewModal) {
    coursePreviewModal.addEventListener("show.bs.modal", function () {
      this.querySelector(".js-course-preview-video").play();
      this.querySelector(".js-course-preview-video").currentTime = 0;
    });
    coursePreviewModal.addEventListener("hide.bs.modal", function () {
      this.querySelector(".js-course-preview-video").pause();
    });
  }
}
coursePreviewvideo();

/*------style switcher---------*/
function styleSwitcherToggler() {
  const styleSwitcher = document.querySelector(".js-style-switcher"),
    styleSwitcherToggler = document.querySelector(".js-style-switcher-toggle");

  styleSwitcherToggler.addEventListener("click", function () {
    styleSwitcher.classList.toggle("open");
    this.querySelector("svg").classList.toggle("fa-x");
    this.querySelector("svg").classList.toggle("fa-gear");
  });
}
styleSwitcherToggler();

/*------theme colors---------*/
function themeColor() {
  const colorstyle = document.querySelector(".js-color-style"),
    themeColorsContainer = document.querySelector(".js-theme-colors");

  themeColorsContainer.addEventListener("click", ({ target }) => {
    if (target.classList.contains("js-theme-color-item")) {
      localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
      setColor();
    }
  });
  function setColor() {
    let path = colorstyle.getAttribute("href").split("/");
    path = path.slice(0, path.length - 1);
    colorstyle.setAttribute(
      "href",
      path.join("/") + "/" + localStorage.getItem("color") + ".css"
    );

    if (document.querySelector(".js-theme-color-item.active")) {
      document
        .querySelector(".js-theme-color-item.active ")
        .classList.remove("active");
    }
    document
      .querySelector(
        "[data-js-theme-color=" + localStorage.getItem("color") + "]"
      )
      .classList.add("active");
  }
  if (localStorage.getItem("color") !== null) {
    setColor();
  } else {
    const defaultColor = colorstyle
      .getAttribute("href")
      .split("/")
      .pop()
      .split(".")
      .shift();
    document
      .querySelector("[data-js-theme-color" + defaultColor + "]")
      .classList.add("active");
  }
}
themeColor();

/*------light / dark theme ---------*/
function themeLightDark() {
  const darkModeCheckBox = document.querySelector(".js-dark-mode");

  darkModeCheckBox.addEventListener("click", function () {
    if (this.checked) {
      localStorage.setItem("dark-theme", "true");
    } else {
      localStorage.setItem("dark-theme", "flase");
    }
    themeMode();
  });

  function themeMode() {
    if (localStorage.getItem("dark-theme") === "flase") {
      document.body.classList.remove("t-dark");
    } else {
      document.body.classList.add("t-dark");
    }
  }
  if (localStorage.getItem("dark-theme") !== null) {
    themeMode();
  }

  if (document.body.classList.contains("t-dark")) {
    darkModeCheckBox.checked = true;
  }
}
themeLightDark();

/*------Glass theme effect ---------*/
function themeGlassEffect() {
  const glassEffectCheckBox = document.querySelector(".js-glass-effect"),
    glassStyle = document.querySelector(".js-glass-style");

  glassEffectCheckBox.addEventListener("click", function () {
    if (this.checked) {
      localStorage.setItem("glass-effect", "true");
    } else {
      localStorage.setItem("glass-effect", "flase");
    }
    glass();
  });

  function glass() {
    if (localStorage.getItem("glass-effect") === "true") {
      glassStyle.removeAttribute("disabled");
    } else {
      glassStyle.disabled = true;
    }
  }
  if (localStorage.getItem("glass-effect") !== null) {
    glass();
  }
  if (!glassStyle.hasAttribute("disabled")) {
    glassEffectCheckBox.checked = true;
  }
}
themeGlassEffect();

/*------header menu ---------*/
function headerMenu() {
  const menu = document.querySelector(".js-header-menu"),
    backDrop = document.querySelector(".js-hesder-backdrop"),
    menuCollapseBreakpoint = 991;

  function toggleMenu() {
    menu.classList.toggle("open");
    backDrop.classList.toggle("active");
    document.body.classList.toggle("overflow-hidden");
  }

  document.querySelectorAll(".js-header-menu-toggler").forEach((item) => {
    item.addEventListener("click", toggleMenu);
  });

  //close the menu by clicking of it
  backDrop.addEventListener("click", toggleMenu);

  function collapse() {
    menu.querySelector(".active .js-sub-menu").removeAttribute("style");
    menu.querySelector(".active").classList.remove("active");
  }

  menu.addEventListener("click", (event) => {
    const { target } = event;
    console.log(target);
    if (
      target.classList.contains("js-toggler-sub-menu") &&
      window.innerWidth <= menuCollapseBreakpoint
    ) {
      event.preventDefault();

      // if menu item already expanded, collapse it ane exit
      if (target.parentElement.classList.contains("active")) {
        collapse();
        return;
      }

      if (menu.querySelector(".active")) {
        collapse();
      }

      //expand new menu item
      target.parentElement.classList.add("active");
      target.nextElementSibling.style.maxHeight =
        target.nextElementSibling.scrollHeight + "px";
    }
  });

  //when resizing window

  window.addEventListener("resize", function () {
    if (
      this.innerWidth > menuCollapseBreakpoint &&
      menu.classList.contains("open")
    ) {
      toggleMenu();
    }
    if (
      this.innerWidth > menuCollapseBreakpoint &&
      menu.querySelector("active")
    ) {
      collapse();
    }
  });
}
headerMenu();
