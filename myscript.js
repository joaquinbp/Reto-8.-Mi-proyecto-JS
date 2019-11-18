//Joaquín Bono Pineda


//usuarios y contraseñas logeados en nuestra web
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


var esAdmin=false;//Variable que nos indica si el usuario que se ha loogeado es admin o no
var estaRegistrado=false;//Variable que nos indica si se han logeado en nuestra web
var userName="";//Guarda el nombre del usuario que se ha logeado
var arrayPedidos=[];//Array que guarda los pedidos realizados
var pedidos=[];//Array que contiene los productos de un pedido
var precio=0;//Precio total del pedido
var cont=0;//Número de pedidos realizados por el usuario

//Función que valida que el usuario introducido y la contraseña coincida con nuestros usuarios registrados
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
                document.getElementById("errorPass").innerHTML="Usuario o contraseña incorrectos";
            }  
        } else{
            document.getElementById("errorPass").innerHTML="Usuario o contraseña incorrectos";
        }
        i++;
    }

    return esCorrecto;
     
}


function $(selector){
    return document.querySelector(selector);
}

//Función que nos muestra el formulario de login
function login(){

    if(!estaRegistrado){
    let login=document.getElementById("formulario");
    let slider=document.getElementById("slider");
    let menu=document.getElementById("compra");
    let contacto=document.getElementById("contacto");
    contacto.style.display="none";
    slider.style.display="none";
    login.style.display="block";
    menu.style.display="none";
    } else{
        alert("Ya estas registrado");
    }
}

//Función que nos muestra la pantalla de inicio
function inicio(){
    let login=document.getElementById("formulario");
    let inicio=document.getElementById("slider");
    let menu=document.getElementById("compra");
    let contenido= document.getElementById("pedidos");
    let contacto=document.getElementById("contacto");
    contacto.style.display="none";
    contenido.style.display="none";
    inicio.style.display="block";
    login.style.display="none";
    menu.style.display="none";
}

//Función que nos muestra el menu para realizar los pedidos
function compra(){
    muestraCarrito();
    let login=document.getElementById("formulario");
    let inicio=document.getElementById("slider");
    let menu=document.getElementById("compra");
    let btn=document.getElementById("añadePizza");
    let contenido= document.getElementById("pedidos");
    let contacto=document.getElementById("contacto");
    contacto.style.display="none";
    contenido.style.display="none";
    inicio.style.display="none";
    login.style.display="none";
    menu.style.display="block";
    if(esAdmin){
        btn.style.display="block";
    } else{
        btn.style.display="none";
    }
}

//Función que nos muestra un pequeño formulario para crear una nueva pizza en el menú
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

//Función que nos muestra el formulario de contacto
function contacto(){
    let login=document.getElementById("formulario");
    let inicio=document.getElementById("slider");
    let menu=document.getElementById("compra");
    let contenido= document.getElementById("pedidos");
    let contacto=document.getElementById("contacto");
    contacto.style.display="block";
    contenido.style.display="none";
    inicio.style.display="none";
    login.style.display="none";
    menu.style.display="none";
}

//Función que añade al menu una pizza obteniendo los datos de un formulario
function creaPizza(){
    let nombrePizza=document.getElementById("nombrePizza");
    let precioPizza=document.getElementById("precioPizza");
    let btn=document.getElementById("creaPizza");
    let btn1=document.getElementById("añadePizza");
    let nombre=document.getElementById("nombre").value;
    let precio=document.getElementById("precio").value;
    precio=parseFloat(precio);
    menu.push({"id": menu.length+1, "nombre": nombre, "precio": precio});
    nombrePizza.style.display="none";
    precioPizza.style.display="none";
    btn.style.display="none";
    muestraCarrito();
    btn1.style.display="block";

}

//Clase a partir de la cual creamos los objetos pedido
class pedido{
    constructor(name,productos,total,fecha,hora){
        this.name=name;
        this.productos=productos;
        this.total=total;
        this.fecha=fecha;
        this.hora=hora;
    }
}

//Función que crea un objeto pedido y lo introduce en un array
function realizaPedido(){
    let misPedidos=document.getElementById("misPedidos");
    if(estaRegistrado){
        if(precio>0){
        var hoy=new Date();
        var fecha=hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear();
        var hora= hoy.getHours()+':'+hoy.getMinutes();
        let p= new pedido(userName,pedidos,precio,fecha,hora);
        arrayPedidos[arrayPedidos.length]=p;
        misPedidos.style.display="block";
        alert("Gracias por realizar su pedido");
        } else{
            alert("El carrito está vacío");
        }
    } else{
        alert("No esta registrado");
    }
}

//Función que muestra los pedidos realizados por el usuario
function mostrarPedidos(){
    let login=document.getElementById("formulario");
    let inicio=document.getElementById("slider");
    let menu=document.getElementById("compra");
    let btn=document.getElementById("añadePizza");
    inicio.style.display="none";
    login.style.display="none";
    menu.style.display="none";
    let contenido= document.getElementById("pedidos");
    contenido.style.display="block";
    for(let i=cont;i<arrayPedidos.length;i++){
        let cadenaPedido="";
        let p=document.createElement("div");
        p.classList.add('card', 'col-sm-8','list-group-item');
        for(let j=0;j<arrayPedidos[i]['productos'].length;j++){
            if(j==arrayPedidos[i]['productos'].length-1){
                cadenaPedido=cadenaPedido+arrayPedidos[i].productos[j];
            } else{

            cadenaPedido=cadenaPedido+arrayPedidos[i].productos[j]+',';
            }
        }
        p.innerHTML='<b>Nombre:</b> '+arrayPedidos[i].name+'<br><b>Fecha:</b> '+arrayPedidos[i].fecha+'<br><b>Hora:</b> '+arrayPedidos[i].hora+'<br><b>Productos:</b> '+cadenaPedido+'<br><b>Precio total:</b> '+arrayPedidos[i].total+'€<br>';
        cont++;
        contenido.appendChild(p);
        
    }
}

//Función que envia los comentarios del formulario de contacto
function enviaComentario(){
    alert("Gracias por su comentario");
    inicio();
}

//Array que contiene los JSON pertenecientes a cada pizza del menú
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
    
    
    
    
    
//Función que muestra el carrito del menú , en el que se seleccionan los productos y calcula el precio total del pedido
function muestraCarrito() {
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
            // Obtenemos el item que necesitamos de la variable menu
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
        pedidos=carrito;
        precio=total;
    }
    // Eventos

    // Inicio
    renderItems();
} 
