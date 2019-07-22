import './assets/css/material-design-iconic-font.css'
import './assets/stylesheets/main.scss'
import './assets/js/scripts';

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav--action')) {
    document.querySelectorAll('.pacsss_section').forEach(function (item) {
      item.style.display = "none";
    });
    document.getElementById(e.target.dataset.action).style.display = "block";
  }
})