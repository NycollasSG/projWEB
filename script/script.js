//inilicializa userlist com a lista de usuario se ela ja tiver sido definida na localStorage, ou inicializa userList vazia
var userList = JSON.parse(localStorage.getItem('userList')) || [];
//Iniciliza o id com o id ja definido na localStorage ou inicializa id com o valor 0
var id = parseInt(localStorage.getItem('idUser')) || 0;
displayUserList();


search = document.getElementById("search");
//addEventListener para poder fazer a checagem da barra de pesquisa da lista de usuarios
search.addEventListener('input', () => {
    texto = search.value;
    if(texto == '' || texto == null){ //se a barra de pesquisa estiver vazia faz o display da lista de usuarios ja definida
        displayUserList();
    }else{
        //inicializa userUnorderedList com a tag html com id userlist e deixa o html interno dela vazio
        let userUnorderedList = document.getElementById('userlist');
        userUnorderedList.innerHTML = '';
        userList.forEach(function(user) {
            //Caso o texto digitado na caixa de pesquisa corresponda com o valor de algum usuario, faz o display apenas desse usuario
            if(user.id.toString() == texto || user.name.toLowerCase().includes(texto) || user.email.toLowerCase().includes(texto)){
                let listItem = document.createElement('li');
                listItem.classList.add('userListItem');
                listItem.innerHTML = 'Id: ' + user.id + ' Nome: ' + '<span class="user-name">' + user.name + '</span> Email: ' + user.email + ' <button class="insBtn" onclick="deleteUser(' + user.id + ')">Excluir</button>';
                userUnorderedList.appendChild(listItem);
            }
        });
    }
});

//função para adicionar usuario
function addUser(){
    let nome = document.getElementById('nome');
    let email = document.getElementById('email');
    let mail = /[@]/g; // essa variavel é para garantir que o email tenha um caractere @, a checagem é feita no else if
    if(nome.value.length == 0){
        alert('Informe um nome válido');
    }else if(email.value.length == 0 || !email.value.match(mail)){
        alert('Informe um email válido');
    }else{
        //inicia a variavel newUser com as chaves e valores do novo usuario e então adiciona como ultimo item da userList
        var newUser = {id: id++,name: nome.value, email: email.value};
        userList.push(newUser);
        localStorage.setItem('userList', JSON.stringify(userList));
        localStorage.setItem('idUser', id);
        displayUserList();
        alert('Usuario adicionado');
    }

}

//função para fazer o display da userList na lista não ordenada
function displayUserList() {
    let userUnorderedList = document.getElementById('userlist');
    userUnorderedList.innerHTML = ''; 
  
    userList.forEach(function (user) {
        let listItem = document.createElement('li');
        listItem.classList.add('userListItem');
        listItem.innerHTML = 'Id: ' + user.id + ' Nome: ' + '<span class="user-name">' + user.name + '</span> Email: ' + user.email + ' <button class="insBtn" onclick="deleteUser(' + user.id + ')">Excluir</button>';
        userUnorderedList.appendChild(listItem);
    });
}

//função para deletar o usuario
function deleteUser(userId) {
    var updatedUserList = userList.filter(function (user) {
      return user.id !== userId; 
    });
  
    if (updatedUserList.length < userList.length) { 
      userList = updatedUserList;
      localStorage.setItem('userList', JSON.stringify(userList)); 
      displayUserList();
    } else {
      alert('Usuário não encontrado.');
    }
  }

//função para limpar a lista
function clearList(){
    localStorage.clear();
    userList = [];
    id = 0;
    displayUserList();
}