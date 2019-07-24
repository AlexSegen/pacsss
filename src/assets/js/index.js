import 'pageable/dist/pageable.min.css'
import '../stylesheets/main.scss'

const Pageable = require('pageable')

const WOW = require('wow.js')

$(document).ready(() => {


  //new Pageable("#container");

  const wow = new WOW({
    boxClass: 'wow', // default
    animateClass: 'sr--anim', // default
    offset: 150, // default
    mobile: true, // default
    live: true // default
  })

  wow.init();

});