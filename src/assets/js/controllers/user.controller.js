import Api  from "../api";
import utils from '../helpers/utils';
import toastme from 'toastmejs';
import User  from '../models/user.model';

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
  user = new User(payload.id, payload.name, payload.email, payload.phone, payload.city, payload.company, payload.isActive);

  if (payload.id != 0) {
    user.updatedAt = new Date();
    Api.update(RESOURCE_NAME, payload.id, user).then(data => {
      users.splice(users.findIndex(find => find.id == payload.id), 1, data);
      data.updatedAt ? document.querySelectorAll('.--updatedAt')[0].innerHTML = `Updated <br> ${utils.formatDate(data.updatedAt)}` : document.querySelectorAll('.--updatedAt')[0].innerHTML = '';
      listUsers(users);
      toastme.info('User updated!');
      editMode(false);
    }).finally(()=> {
      document.querySelectorAll('[data-action="set"]')[0].removeAttribute("disabled");
      document.querySelectorAll('[data-action="set"]')[0].innerHTML =`<i class="icon ion-md-save"></i> Save info`;
      editMode(false);
    })
  } else {
    Api.create(RESOURCE_NAME, user).then(data => {
      users.push(data);
      listUsers(users);
      editMode(false);
      myForm.reset();
      user = new User();
      toastme.success('New user added!');
    }).finally(()=> {
      document.querySelectorAll('[data-action="set"]')[0].removeAttribute("disabled");
      document.querySelectorAll('[data-action="set"]')[0].innerHTML =`<i class="icon ion-md-save"></i> Save info`;
      editMode(false);
    })
  }
}


const getUser = userId => {
  
  let tmp = users.find(user => user.id == userId);

  for (let [key, value] of Object.entries(tmp)) {
    if(key ==  'isActive') {
      document.getElementById('isActive').checked = tmp.isActive;
    }
    if(key ==  'id') {
      document.getElementById('userId').value = tmp.id;
    }
    document.getElementById(key) ? document.getElementById(key).value = value : false;
  }
  
  tmp.updatedAt ? document.querySelectorAll('.--updatedAt')[0].innerHTML = `Updated<br> ${utils.formatDate(tmp.updatedAt)}` : document.querySelectorAll('.--updatedAt')[0].innerHTML = '';
  document.querySelectorAll('[data-action="reset"]')[0].removeAttribute("style");
  
  editMode(true);
}

const editMode = param => {
  if(param) {
    userList.querySelectorAll('[data-action="delete"]').forEach(item => {
      item.setAttribute('disabled', 'disabled');
    });
  } else {
    userList.querySelectorAll('[data-action="delete"]').forEach(item => {
      item.removeAttribute('disabled');
    });
  }
}


const removeUser = userId => {
  Api.remove(RESOURCE_NAME, userId).then(() => {
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

  if(!utils.validateEmail(user.email)) {
    toastme.error('Email is not valid');
    return false
  }

  setUser(user)
}

const resetForm = () => {
  myForm.reset();
  user = new User();
  document.querySelectorAll('.--updatedAt')[0].innerHTML = ''
  document.querySelectorAll('[data-action="reset"]')[0].setAttribute("style", "display:none!important");
  editMode(false);
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
      toastme.yesNoDialog({ 
        title: "Warning!",
        text: "Do you want to delete this user?",
        textConfirm: "Confirm",
        textCancel: "Cancel",
        showCancel: true, // true or false
        //type: "danger"  // 'success', 'danger', 'warning', 'info' or 'question' 
        }).then((value) =>  { 
          if (value) {
            removeUser(identifier);
          }
        });
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

  let obj = {};

  myForm.querySelectorAll('.form-control').forEach(item => {
    obj[item.name] = item.value
  });
  
  obj.isActive = document.getElementById('isActive').checked == true ? true : false;
  
  handleSubmit(obj);
});

getUsers();