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
      
       
        <p>current price: ${objeto.current_price}</p>
        <p>market cap: ${objeto.market_cap}</p>
        <p>total suply: ${objeto.total_supply}</p>
        <p>circulating supply: ${objeto.circulating_supply}</p>
        <p>max supply: ${objeto.max_supply}</p>
        <p>all time hight: ${objeto.ath}</p>
         <p>ath date: ${objeto.atl_date}</p>
         <p>high 24h: ${objeto.high_24h}</p>
         <p>low 24h: ${objeto.ath}</p>

         <p>price change 24h: ${objeto.price_change_24h}</p>
         <p>price change %-24h: ${objeto.price_change_percentage_24h}</o>
        
         <p>last updated: ${objeto.last_updated}</p>
 
    </div>
</div>
`;




const card2 = document.querySelector('.card2');
card2.innerHTML = card2Template;



const btnD = document.querySelector('.btnDreturn');
btnD.addEventListener('click', () => {
    window.location.href = './index.html';
});
