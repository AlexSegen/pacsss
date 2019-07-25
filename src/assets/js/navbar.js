//Mobile Menu
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("nav-toggle")) {
    const _this = e.target;
    const navMenu = document.getElementById("nav-menu");
    const body = document.getElementsByTagName("BODY")[0];

    if (navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      body.classList.remove("navbar-open");
      _this.classList.remove("active");
    } else {
      navMenu.classList.add("open");
      body.classList.add("navbar-open");
      _this.classList.add("active");
    }
  }
});
