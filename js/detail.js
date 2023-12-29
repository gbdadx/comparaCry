// Obtiene los datos almacenados en sessionStorage
var objeto = JSON.parse(localStorage.getItem('objeto'));

console.log(objeto);
console.log(typeof (objeto));

const card2Template = ` <div class="card card3">
    <div class="cardH">
        <h2>${objeto.name}</h2>
        <h5>${objeto.symbol}</h5>
    </div>
    <div class="cardB">
        <img src="${objeto.image}" alt="${objeto.id}">
    </div>
    <div class="cardF">
        <p><span class="negrita">current price:</span>&nbsp&nbsp$ ${objeto.current_price}</p>
        <p><span class="negrita">market cap:</span>&nbsp&nbsp ${objeto.market_cap}</p>
        <p><span class="negrita">total suply:</span>&nbsp&nbsp ${objeto.total_supply}</p>
        <p><span class="negrita">circulating supply:</span>&nbsp&nbsp ${objeto.circulating_supply}</p>
        <p><span class="negrita">max supply:</span>&nbsp&nbsp ${objeto.max_supply}</p>
        <p><span class="negrita">all time hight:</span>&nbsp&nbsp $ ${objeto.ath}</p>
         <p><span class="negrita">ath date:</span>&nbsp&nbsp ${objeto.atl_date}</p>
         <p><span class="negrita">high 24h:</span>&nbsp&nbsp$ ${objeto.high_24h}</p>
         <p><span class="negrita">low 24h:</span>&nbsp&nbsp$ ${objeto.ath}</p>

         <p><span class="negrita">price change 24h: </span>&nbsp&nbsp $ ${objeto.price_change_24h}</p>
         <p><span class="negrita">price change %-24h:</span>&nbsp&nbsp ${objeto.price_change_percentage_24h}%</o>
         <p><span class="negrita">last updated: </span>&nbsp&nbsp${objeto.last_updated}</p>
    </div>

</div>
`;




const card2 = document.querySelector('.card2');
card2.innerHTML = card2Template;



const btnD = document.querySelector('.btnDreturn');
btnD.addEventListener('click', () => {
    window.location.href = './index.html';
});
