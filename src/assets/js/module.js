import SmoothScroll from "smooth-scroll";
/*----------------------------------------------------------------*/
/*-------------------------- SMOOTH SCROLL -----------------------*/
/*----------------------------------------------------------------*/

let selector = "[data-scroll]",
  fixedHeader = "[data-scroll-header]",
  scroll = new SmoothScroll(selector, {
    speed: 800,
    speedAsDuration: true,
    offset: (anchor, toggle) => {
      return toggle.dataset.scrollOffset || 40;
    },
    header: fixedHeader,
    updateURL: false,
  });

const scrollTop = () => {
  let element = document.querySelector(".btn-scroll-top"),
    scrollOffset = 600;

  if (element == null) return;

  let offsetFromTop = parseInt(scrollOffset, 10);

  window.addEventListener("scroll", (e) => {
    if (e.currentTarget.pageYOffset > offsetFromTop) {
      element.classList.add("show");
    } else {
      element.classList.remove("show");
    }
  });
};

const stickyNavbar = () => {
  let navbar = document.querySelector(".navbar-sticky");

  if (navbar == null) return;

  let navbarClass = navbar.classList,
    navbarH = navbar.offsetHeight,
    scrollOffset = 500;

  if (navbarClass.contains("position-absolute")) {
    window.addEventListener("scroll", (e) => {
      if (e.currentTarget.pageYOffset > scrollOffset) {
        navbar.classList.add("navbar-stuck");
      } else {
        navbar.classList.remove("navbar-stuck");
      }
    });
  } else {
    window.addEventListener("scroll", (e) => {
      if (e.currentTarget.pageYOffset > scrollOffset) {
        document.body.style.paddingTop = navbarH + "px";
        navbar.classList.add("navbar-stuck");
      } else {
        document.body.style.paddingTop = "";
        navbar.classList.remove("navbar-stuck");
      }
    });
  }
};

const themeModeSwitch = () => {
  let mode = window.localStorage.getItem("mode"),
    root = document.getElementsByTagName("html")[0];

  if (mode !== null && mode === "dark") {
    root.classList.add("dark-mode");
  } else {
    root.classList.remove("dark-mode");
  }

  let modeSwitch = document.querySelector('[data-bs-toggle="mode"]');
  if (modeSwitch === null) return;
  let checkbox = modeSwitch.querySelector(".form-check-input");

  if (mode === "dark") {
    root.classList.add("dark-mode");
    checkbox.checked = true;
  } else {
    root.classList.remove("dark-mode");
    checkbox.checked = false;
  }

  modeSwitch.addEventListener("click", (e) => {
    if (checkbox.checked) {
      root.classList.add("dark-mode");
      window.localStorage.setItem("mode", "dark");
    } else {
      root.classList.remove("dark-mode");
      window.localStorage.setItem("mode", "light");
    }
  });
};

export default () => {
  stickyNavbar();
  themeModeSwitch();
  scrollTop();
};

// export default load;
// export { stickyNavbar, themeModeSwitch, scrollTop };
