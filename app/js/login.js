const loginForm = document.querySelector('#login-form');

function getUsernameFromCache(){
    const username = localStorage.getItem('username');
    return username;
}

function setLoginVisibility(){
    const login = document.querySelector('#login');
    const main = document.querySelector('.main');

    const username = getUsernameFromCache();

    if(username){
        login.style.display = 'none';
        main.style.display = 'flex';
    } else {
        login.style.display = 'flex';
        main.style.display = 'none';
    }
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    if(!username){
        alert("Fill all fields");
        return;
    }

    localStorage.setItem('username', username);
    
    setLoginVisibility();
    socket.emit('welcome', { username });
});

setLoginVisibility();