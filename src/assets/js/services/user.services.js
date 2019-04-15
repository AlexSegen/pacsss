const Api = require("../api");
const toastme = require('toastmejs');
const serialize = require('form-serialize');
const User = require('../models/user.model');

const RESOURCE_NAME = '/users';
const myForm = document.getElementById('myForm');

let users = [];
let user = new User();

const getUsers = () => {
  document.querySelectorAll('[data-loading]')[0].removeAttribute("style");
  Api.getAll(RESOURCE_NAME).then(data => {
    users = data;
    listUsers(users);
    document.querySelectorAll('[data-loading]')[0].setAttribute("style", "display:none!important");
    return users;
  }).finally(() => {
    document.querySelectorAll('[data-loading]')[0].setAttribute("style", "display:none!important");
  });
}

const listUsers = users => {
  const userList = document.getElementById('userList');
  if(users.length > 0) {
    userList.innerHTML = '';
    users.forEach(user => {
      userList.innerHTML += `
        <li class="list-group-item  align-items-center border-0 rounded-0">
        <i class="icon ion-md-radio-button-on ${user.isActive ? 'text-success':'text-danger'}"></i> ${user.name}
        <div class="clearfix"></div>
        <button type="button" class="badge badge-info --btn-action" data-action="edit" data-userid="${user.id}"><i class="icon ion-md-search"></i> detalles</button>
        <button type="button" class="badge bg-light text-danger --btn-action" data-action="delete" data-userid="${user.id}"><i class="icon ion-md-trash"></i></button>
        </li>`});
  }

}

const setUser = payload => {

  document.querySelectorAll('[data-action="set"]')[0].setAttribute("disabled", true);
  document.querySelectorAll('[data-action="set"]')[0].innerHTML =`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;
  user = new User(payload.id, payload.name, payload.email, payload.phone, payload.city, payload.company, payload.isActive == 'on' ? true : false);

  if (payload.id > 0) {
    Api.update(RESOURCE_NAME, payload.id, user).then(data => {
      users.splice(users.findIndex(find => find.id == payload.id), 1, data);
      listUsers(users);
      toastme.info('User updated!');
    }).finally(()=> {
      document.querySelectorAll('[data-action="set"]')[0].removeAttribute("disabled");
      document.querySelectorAll('[data-action="set"]')[0].innerHTML =`<i class="icon ion-md-save"></i> Save info`;
    })
  } else {
    Api.create(RESOURCE_NAME, user).then(data => {
      users.push(data);
      listUsers(users);
      myForm.reset();
      user = new User();
      toastme.success('New user added!');
    }).finally(()=> {
      document.querySelectorAll('[data-action="set"]')[0].removeAttribute("disabled");
      document.querySelectorAll('[data-action="set"]')[0].innerHTML =`<i class="icon ion-md-save"></i> Save info`;
    })
  }
}


const getUser = (userId) => {
  let tmp = users.find(user => user.id == userId);
  document.getElementById('userId').value = userId;
  document.getElementById('name').value = tmp.name;
  document.getElementById('email').value = tmp.email;
  document.getElementById('phone').value = tmp.phone;
  document.getElementById('city').value = tmp.city;
  document.getElementById('company').value = tmp.company;
  document.querySelectorAll('[data-action="reset"]')[0].removeAttribute("style");
  tmp.isActive ? document.getElementById('isActive').setAttribute('checked', true) : document.getElementById('isActive').removeAttribute('checked');
}


const removeUser = userId => {
  Api.delete(RESOURCE_NAME, userId).then(() => {
    users.splice(users.findIndex(find => find.id == userId), 1);
    listUsers(users);
    toastme.warning('User deleted')
  })
}

const handleSubmit = user => {

  if (!user.name) {
    toastme.error('Name is required');
    return false
  }
  if (!user.email) {
    toastme.error('Email is required');
    return false
  }

  setUser(user)
}

const resetForm = () => {
  myForm.reset();
  user = new User();
  document.querySelectorAll('[data-reset]')[0].setAttribute("style", "display:none!important");
}

//ACTIONS
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('--btn-action')) {
    const identifier = e.target.getAttribute('data-userid');
    switch (e.target.getAttribute('data-action')) {
      case 'edit':
        getUser(identifier);
        break;
      case 'delete':
        removeUser(identifier);
        break;
        case 'reset':
        resetForm();
        break;
      default:
        break;
    }
  }
});

myForm.addEventListener('submit', function (e) {
  e.preventDefault();
  handleSubmit(serialize(myForm, {
    hash: true
  }));
});

getUsers();