import './assets/css/material-design-iconic-font.css'
import './assets/stylesheets/main.scss'
import './assets/js/scripts';


function showSection(param) {

  document.querySelectorAll('.pacsss_section').forEach(function (item) {
    item.style.display = "none";
  });

  switch (param) {
    case 'intro':
      document.getElementById('intro').style.display = "block";
      break;
    case 'buttons':
      document.getElementById('buttons').style.display = "block";
      break;
    case 'grids':
      document.getElementById('grids').style.display = "block";
      break;

    default:
      document.getElementById('intro').style.display = "block";
      break;
  }

}


document.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav--action')) {
    showSection(e.target.dataset.action)
  }
})