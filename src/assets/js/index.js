import '../icons/icons.css'
import '../scss/app.scss'

var leadsList = document.getElementById('leads-list');
var replyArea = document.getElementById('lead-reply-area');
var leadName = document.getElementById('lead-reply-name');
var leadEmail = document.getElementById('lead-reply-email');
var leadForm = document.getElementById('lead-form');

function getLeadDetails (id) {
  var lead = document.getElementById('lead-id-' + id);
  var fields = lead.querySelectorAll('.data-field');
  var obj = {}
  fields.forEach((value, key, index) => {
    obj[value.dataset.field] = value.innerHTML;
  });
  return obj
}


function handleSubmitLead() {
  var message = document.getElementById('message').value;
  if(message.toString().trim().length < 1) {
    alert('Campo requerido');
    return false
  }


  replyArea.querySelectorAll('.form-loader')[0].style.display = 'flex';

  setTimeout(() => {
    leadForm.submit();
  }, 2000);
} 


leadForm.addEventListener('submit', function(e){
  e.preventDefault();
  console.log('enviado');
  
})

document.addEventListener('click', function(e) {

  if(e.target.classList.contains('--data-action')) {
      var ele = e.target;
      switch (ele.dataset.action) {
        case 'details':
            ele.parentNode.parentNode.getElementsByClassName('lead-details')[0].style.display = 'block';
          break;
        case 'close':
          ele.parentNode.parentNode.style.display = 'none';
        break;
        case 'reply':
          leadsList.style.display = "none";
          replyArea.style.display = "block";
          leadName.innerHTML = getLeadDetails(ele.dataset.identifier).name;
          leadEmail.innerHTML = getLeadDetails(ele.dataset.identifier).email;
          break;
        case 'goback':
          replyArea.style.display = "none";
          leadsList.style.display = "block";
          break;
        case 'sendreply':
        handleSubmitLead();
          break;
        default:
          break;
      }
    
  }
});