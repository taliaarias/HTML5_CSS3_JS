/*var button = document.getElementById("button");
console.log(button);

function showAlert() {
    alert("BOTON PULSADO");
}

button.addEventListener("click", showAlert); (no ponemos los paréntesis de la funcion en showAlert porque sino se ejecutaría nada más cargar la página.)
button.removeEventListener("click", showAlert); para eliminarla

los eventos son "onclick", "onmouseover"... pero se quita el "on" cuando estamos en javascript
los eventos no son camelcase
creo que los prefijos on se usan en jquery.
*/

/*para hacer el smooth scroll:*/
var navbarItems = document.getElementsByClassName("navbar-item");

for (var i = 0; i < navbarItems.length; i++) {
    navbarItems[i].addEventListener("click", function (event) {
        var sectionToGo = this.getElementsByTagName("a")[0].href.split("#");

        deleteActiveClass();
        this.classList.add("active");

        if(sectionToGo.length === 2) {/*para navegar a un sitio donde tenga dos elementos, lo que quiere decir que tiene # porque yo hice la división antes*/
            event.preventDefault();  /*cancelo el evento pero no la propagacion*/
            var goTo = sectionToGo[sectionToGo.length - 1];
            getElementByIdAndScroll(goTo);
        }
    });
}

function getElementByIdAndScroll(id) {
    var elem; //elemento al que vamos a querer navegar
    if (id === "") { //id vacío porque es la sección de inicio
        elem = document.getElementsByClassName("header")[0];
    } else {//si es cualquier otro...
        elem = document.getElementById(id);
    };
    scrollToElement(elem);
}

function scrollToElement (element) {
    var jump = parseInt(element.getBoundingClientRect().top * 0.3); //(nos quedamos con la top para saber a dónde tengo que saltar) funcion q nos da las coordenadas en las que se encuentra el elemento cliente (forma un rectángulo y calcula aprox)
                                                            //0.3 para que no baje de golpe, sino un tercio del valor total
    document.body.scrollTop += jump;

    if (!element.lastJump || element.lastJump > Math.abs(jump)) {//quiero el valor absoluto de jump, ya que hay valores negativos cuando estoy en una sección de abajo y tengo que subir
        setTimeout(function() {//nos llamamos a nosotros mismos
            element.lastJump = Math.abs(jump);
                scrollToElement(element);
        }, 40); //nos llamamos cada 40 milisegundos
    } else {
        element.lastJump = null;
    }
}

function deleteActiveClass() {
    for (var i = 0; i < navbarItems.length; i++) {
        navbarItems[i].classList.remove('active');
    }
}

var acumulativeOffset = function (element) {
    var top = 0;

    do {
        top += element.offsetTop || 0;
        element = element.offsetParent;
    } while (element);

    return top;
}
//offset es para calcular la distancia entre las secciones
var offsetQuienSoy = acumulativeOffset(document.getElementById('quien-soy')) - 50;//restamos 50 porq la barra tiene unas medidas fijas (fixed) y así ajustamos bien.
var offsetEquipo = acumulativeOffset(document.getElementById('equipo')) - 50;
var offsetTransporte = acumulativeOffset(document.getElementById('transporte')) - 50;
var navbar = document.getElementsByClassName('navbar')[0];

window.addEventListener('scroll', changeMenuStyle);

var previous;
function changeMenuStyle(event) {
    var pageOffset = window.pageYOffset;//window.pageYOffset te calcula en qué punto estás de la web.

    if (pageOffset >= 0 && pageOffset < offsetQuienSoy) {
        if (!previous || previous !== 1) {
            previous = 1;
        } else if (previous === 1){
            return false;
        }
        
        deleteActiveClass();//primero borra la clase activa que haya
        document.querySelector("a[href='#']").parentNode.classList.add("active"); //selecionas en la barra de navegacion la zona que debería estar activa, según la altura de la web a la que te encuentres
    } else if (pageOffset >= offsetQuienSoy && pageOffset < offsetEquipo) {
        if (!previous || previous !== 2) {
            previous = 2;
        } else if (previous === 2){
            return false;
        }
        
        deleteActiveClass();
        document.querySelector("a[href$='quien-soy']").parentNode.classList.add("active");
    } else if (pageOffset >= offsetEquipo &&  offsetQuienSoy < offsetTransporte) {
        if (!previous || previous !== 3) {
            previous = 3;
        } else if (previous === 3){
            return false;
        }

        deleteActiveClass();
        document.querySelector("a[href$='equipo']").parentNode.classList.add("active");
    }   
}