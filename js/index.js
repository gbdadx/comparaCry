
// Variables
const contenedor = document.querySelector('#cardsContainer');
const coinA = document.querySelector('#coinA');
const coinB = document.querySelector('#coinB');
const boton = document.querySelector('.boton');
const answer = document.querySelector('.answer');
const carouselInner = document.querySelector('.carouselInner');
const reset = document.querySelector('.reset');

let item = '';
let card = '';
let opcionesA = [];
let opcionesB = [];

let objetosSeleccionados = {
    seleccionA: null,
    seleccionB: null
};

/******************   api fetch   */
// funcionan ambas, pero mejor la realmente dinamica creo
let datos = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en';
//let datos=`./response_1694896935000.json`;
fetch(datos)
    .then(response => response.json())
    .then(data => {
        let objetos = data; // Asigna los datos a la variable objetos

        // Función para llenar el select con opciones y aplicar Select2
        function fillSelect(coinSelect, opcionesArray) {
            const select = document.getElementById(coinSelect);

            for (let e of objetos) {
                opcionesArray.push(e.name);

                var option = document.createElement("option");

                option.value = e.name;
                option.text = e.name;

                select.appendChild(option);
            }

            // Aplica Select2 al select
            $(document).ready(function () {
                $("#" + coinSelect).select2();
            });
        }

        // Llamada a la función para llenar y aplicar Select2 en ambos selects
        fillSelect("coinA", opcionesA);
        fillSelect("coinB", opcionesB);


        // Evento para el botón "Reset"
        reset.addEventListener('click', () => {
            fillSelect();
            contenedor.innerHTML = '';
            answer.innerHTML = '';
        });

        // Evento para el botón "Averiguar"
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            const seleccionA = coinA.value;
            const seleccionB = coinB.value;

            // Borrar tarjetas existentes
            contenedor.innerHTML = '';

            if (seleccionA !== seleccionB) {
                let obSelA = objetos.find(objeto => objeto.name == seleccionA);
                let obSelB = objetos.find(objeto => objeto.name == seleccionB);
                let arregloAux = [obSelA, obSelB];

                if (obSelA && obSelB) {
                    let market_capA = obSelA.market_cap;
                    let market_capB = obSelB.market_cap;
                    let priceA = obSelA.current_price;
                    let aux = market_capB / market_capA * priceA;
                    aux = aux.toFixed(6);
                    answer.innerHTML = `El valor de ${obSelA.name}, si llegara a tener el marketcap de ${obSelB.name} sería de $ ${aux}`;
                    renderCards(arregloAux);
                    renderWidget(arregloAux);

                } else {
                    console.log('Por favor, selecciona dos monedas diferentes.');
                }
            } else {
                console.log('Por favor, selecciona dos monedas diferentes.');
            }
        });

        // Función para renderizar los elementos del carrusel
        function renderItemsCarousel(arreglo) {
            // Limpia el contenido del carrusel
            carouselInner.innerHTML = '';

            for (let e of arreglo) {
                const item = document.createElement('div');
                item.classList.add('carousel-item');

                const image = document.createElement('img');
                image.src = e.image;
                image.classList.add('d-block', 'w-100');
                image.alt = e.id;

                item.appendChild(image);
                carouselInner.appendChild(item);
            }

            // Establece la primera imagen como activa
            if (carouselInner.firstElementChild) {
                carouselInner.firstElementChild.classList.add('active');
            }
        }

        // Llama a la función para agregar las imágenes al carrusel
        renderItemsCarousel(objetos);

        // Función para renderizar las tarjetas (cards)
        function renderCards(arreglo) {
            for (let e of arreglo) {
                card = `<div class="card" id="card_${e.id}">
                            <div class="cardHeader">
                                <h2>${e.symbol}</h2>
                                <p>${e.name}</p>
                            </div>
                            <div class="cardBody">
                                <img src="${e.image}" alt="${e.id}">
                            </div>
                            <div class="cardFooter">
                                <span>$ ${e.current_price}</span>
                            </div>
                        </div>`;
                contenedor.insertAdjacentHTML('beforeend', card);
            }
            agregarEventoACard();
        }

        /**WIDGET GRAFICO */
        // Función para renderizar el widget
        function renderWidget(arreglo) {
            let moneda1 = arreglo[0].id.replaceAll(' ', '-');
            let moneda2 = arreglo[1].id.replaceAll(' ', '-');
            console.log(`moneda1 ${moneda1}  y moneda2 ${moneda2}`);

            // Limpia el contenido del contenedor de widgets
            document.getElementById('widgetContainer').innerHTML = '';

            // Crea un elemento de script
            const scriptElement = document.createElement('script');
            scriptElement.src = 'https://widgets.coingecko.com/coingecko-coin-compare-chart-widget.js';

            // Adjunta el script al contenedor del widget
            document.getElementById('widgetContainer').appendChild(scriptElement);

            // Configura el evento onload para el script
            scriptElement.onload = function () {
                const widget = document.createElement('coingecko-coin-compare-chart-widget');
                widget.setAttribute('coin-ids', `${moneda1},${moneda2}`);
                widget.setAttribute('currency', 'usd');
                widget.setAttribute('locale', 'en');
                widget.setAttribute('width', 'auto');

                // Adjunta el widget al contenedor del widget
                widget.setAttribute('class', 'cardw')
                document.getElementById('widgetContainer').appendChild(widget);
            };
        }

        // Función para agregar eventos a las tarjetas
        function agregarEventoACard() {
            const tarjetas = document.getElementsByClassName('card');
            Array.from(tarjetas).forEach(tarjeta => {
                tarjeta.addEventListener('click', () => {
                    let id = tarjeta.id;
                    let idS = id.slice(5);
                    let newObjeto = objetos.find(objeto => objeto.id == idS);
                    localStorage.setItem("objeto", JSON.stringify(newObjeto));
                    window.location.href = './detail.html';
                });
            });
        }

        // Llama a la función para llenar los select (coinA y coinB) con opciones
        fillSelect();
    })
    .catch(error => console.error('Error:', error));




