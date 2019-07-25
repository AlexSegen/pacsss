import "font-awesome/css/font-awesome.css";
import "../stylesheets/main.scss";

import "./smooth";
import "./navbar";

const WOW = require("wow.js");

$(document).ready(() => {
  const wow = new WOW({
    boxClass: "wow", // default
    animateClass: "sr--anim", // default
    offset: 150, // default
    mobile: true, // default
    live: true // default
  });

  wow.init();
});
