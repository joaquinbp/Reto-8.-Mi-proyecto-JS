
var usuarios = [
    {
        usuario:'joaquin',
        password: 'admin1',
        admin: true
    },
    {
        usuario:'jose',
        password:'user1',
        admin: false
    },
    {
        usuario:'javi',
        password:'user2',
        admin: false
    }
]

var esAdmin=false;
var estaRegistrado=false;
var userName="";

function validaLogin(){
    let password=document.getElementById("pass").value;
    let user=document.getElementById("usuario").value;
    let esCorrecto=false;
    let userCorrecto=false;
    let i=0;
    esAdmin=false;

    while(!esCorrecto && i<usuarios.length){
        if(user == usuarios[i]['usuario']){
            userCorrecto=true;
            document.getElementById("errorUsu").innerHTML="";
            if(userCorrecto && password == usuarios[i]['password']){
                esCorrecto=true;
                document.getElementById("errorPass").innerHTML="";
                if(usuarios[i]['admin']){
                    esAdmin=true;
                }
                document.getElementById("simboloLogin").innerHTML=user;
                userName=user;
                estaRegistrado=true;
                inicio();

            } else{
                document.getElementById("errorPass").innerHTML="La contraseña no es válida";
            }  
        } else{
            document.getElementById("errorUsu").innerHTML="El usuario no es válido";
        }
        i++;
    }

    if(esAdmin){
        alert("Es admin");
    } else if(esCorrecto){
        alert("es user");
    }

    return esCorrecto;
     
}


function $(selector){
    return document.querySelector(selector);
}

function login(){

    if(!estaRegistrado){
    let login=document.getElementById("formulario");
    let slider=document.getElementById("slider");
    let menu=document.getElementById("compra");
    slider.style.display="none";
    login.style.display="block";
    menu.style.display="none";
    } else{
        alert("Ya estas registrado");
    }
}


function inicio(){
    let login=document.getElementById("formulario");
    let inicio=document.getElementById("slider");
    let menu=document.getElementById("compra");
    inicio.style.display="block";
    login.style.display="none";
    menu.style.display="none";
}

function compra(){
    muestraCarrito();
    let login=document.getElementById("formulario");
    let inicio=document.getElementById("slider");
    let menu=document.getElementById("compra");
    let btn=document.getElementById("añadePizza");
    inicio.style.display="none";
    login.style.display="none";
    menu.style.display="block";
    if(esAdmin){
        btn.style.display="block";
    } else{
        btn.style.display="none";
    }
}

function añadirPizza(){
    let nombre=document.getElementById("nombrePizza");
    let precio=document.getElementById("precioPizza");
    let btn=document.getElementById("creaPizza");
    let btn1=document.getElementById("añadePizza");
    nombre.style.display="block";
    precio.style.display="block";
    btn.style.display="block";
    btn1.style.display="none";

}

function creaPizza(){
    let nombrePizza=document.getElementById("nombrePizza");
    let precioPizza=document.getElementById("precioPizza");
    let btn=document.getElementById("creaPizza");
    let nombre=document.getElementById("nombre").value;
    let precio=document.getElementById("precio").value;
    precio=parseInt(precio);
    console.log(menu.length);
    menu.push({"id": menu.length+1, "nombre": nombre, "precio": precio});
    nombrePizza.style.display="none";
    precioPizza.style.display="none";
    btn.style.display="none";
    console.log(menu.length);
    muestraCarrito();
}

class pedido{
    constructor(name,productos,fecha,hora,total){
        this.name=name;
        this.productos=productos;
        this.total=total;
        this.fecha=fecha;
        this.hora=hora;
    }
}

function realizaPedido(){
    
}
var menu = [
    {
        id: 1,
        nombre: 'Margarita',
        precio: 3.50
    },
    {
        id: 2,
        nombre: 'York y queso',
        precio: 4.00
    },
    {
        id: 3,
        nombre: 'Barbacoa',
        precio: 4.95
    },
    {
        id: 4,
        nombre: 'Carbonara',
        precio: 4.95
    },
    {
        id: 5,
        nombre: 'Calzone',
        precio: 5.30
    },
    {
        id: 6,
        nombre: 'KebabPizza',
        precio: 6.30
    },
    {
        id: 7,
        nombre: 'Mexicana',
        precio: 6.30
    }

]  
    
    
    
    
    
    
function muestraCarrito() {
    //---------------------Compra--------------------------
    // Variables
    
    let $items = document.querySelector('#items');
    items.innerHTML="";
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    carrito.innerHTML="";
    total.innerHTML="";
    // Funciones
    function renderItems () {
        for (let info of menu) {
            // Estructura
            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info['nombre'];
            // Precio
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = info['precio'] + '€';
            // Boton 
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', anyadirCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $items.appendChild(miNodo);
        }
    }
    function anyadirCarrito () {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(this.getAttribute('marcador'))
        // Calculo el total
        calcularTotal();
        // Renderizamos el carrito 
        renderizarCarrito();

    }

    function renderizarCarrito () {
        // Vaciamos todo el html
        $carrito.textContent = '';
        // Generamos los Nodos a partir de carrito
        carrito.forEach(function (item, indice) {
            // Obtenemos el item que necesitamos de la variable base de datos
            let miItem = menu.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            // Creamos el nodo del item del carrito
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right');
            miNodo.textContent = `${miItem[0]['nombre']} - ${miItem[0]['precio']}€`;
            // Boton de borrar
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.setAttribute('posicion', indice);
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        })
    }

    function borrarItemCarrito () {
        // Obtenemos la posicion que hay en el boton pulsado
        let posicion = this.getAttribute('posicion');
        // Borramos la posicion que nos interesa
        carrito.splice(posicion, 1);
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
    }

    function calcularTotal () {
        // Limpiamos precio anterior
        total = 0;
        // Recorremos el array del carrito
        for (let item of carrito) {
            // De cada elemento obtenemos su precio
            let miItem = menu.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
        }
        // Formateamos el total para que solo tenga dos decimales
        let totalDosDecimales = total.toFixed(2);
        // Renderizamos el precio en el HTML
        $total.textContent = totalDosDecimales;
    }
    // Eventos

    // Inicio
    renderItems();
} 
