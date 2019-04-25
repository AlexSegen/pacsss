import "babel-polyfill";
import 'toastmejs/dist/css/toastme.css'
import '../scss/app.scss'

import './controllers/user.controller'

const setPageHeader = (title, description, identifier) => {
    document.getElementById(identifier).innerHTML = "";
    document.getElementById(identifier).innerHTML = `
    <div class="container">
        <h1>${title}</h1>
        <p>${description}</p>
    </div>`;
}

setPageHeader("MyApp", "User managment", "header");