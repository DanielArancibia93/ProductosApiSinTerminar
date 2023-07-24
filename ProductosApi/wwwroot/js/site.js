const uri = 'api/ProductosItems';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNombreTextbox = document.getElementById('add-nombre');
    const addDescripcionTextbox = document.getElementById('add-descripcion');
    const addCantidadIniTextbox = document.getElementById('add-cantidadIni');
    const addPrecioTextbox = document.getElementById('add-precio');

    const item = {
        
        nombre: addNombreTextbox.value.trim(),
        descripcion: addDescripcionTextbox.value.trim(),
        cantidadIni: addCantidadIniTextbox.value.trim(),
        precio: addPrecioTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNombreTextbox.value = '';
            addDescripcionTextbox.value = '';
            addCantidadIniTextbox.value = '';
            addPrecioTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = productos.find(item => item.id === id);

    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-nombre').value = item.nombre;
    
    document.getElementById('edit-descripcion').value = item.descripcion;
    document.getElementById('edit-cantidadIni').value = item.cantidadIni;
    document.getElementById('edit-precio').value = item.precio;

    
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        
        nombre: document.getElementById('edit-nombre').value.trim(),
        descripcion: document.getElementById('edit-descripcion').value.trim(),
        cantidadIni: document.getElementById('edit-cantidadIni').value.trim(),
        precio: document.getElementById('edit-precio').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none'; 
}

function _displayCount(itemCount) {
    const nombre = (itemCount === 1) ? 'Producto' : 'Productos';

    document.getElementById('counter').innerText = `${itemCount} ${nombre}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('productos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(item.nombre);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNode2 = document.createTextNode(item.descripcion);
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(2);
        let textNode3 = document.createTextNode(item.cantidadIni);
        td3.appendChild(textNode3);

        let td4 = tr.insertCell(3);
        let textNode4 = document.createTextNode(item.precio);
        td4.appendChild(textNode4);

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);
    });

    productos = data;
}