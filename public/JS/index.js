var scrW=(window.innerWidth)
window.addEventListener("popstate", (event) => {
    const page = event.state?.page || location.pathname.replace("/", "");

    // Call the appropriate function
    switch (page) {
        case "products":
            toProducts();
            break;
        case "profile":
            toProfile();
            break;
        case "product":
            toProducts();
            break;
        case "offers":
            toProducts();
            break;
        case "cart":
            toCart();
            break;
        case "checkout":
            toCheckout();
            break;
        // Add more cases for other sections
        default:
            // Optional: maybe go to home or a default drawer
            toHome();
    }
});
window.toHome = function () {
    window.history.pushState({ page: "home" }, "", "/shop.html");

    if(scrW<=768){
        document.getElementById("shopMainMenu").style.left="-103%"
        document.getElementById("fidiShopOffer").style.top = "0.5vh";
        document.getElementById("catnSearchCont").style.top = "20vh";
        document.getElementById("shopProducts").style.top = "27vh";
        document.getElementById("shopProducts").style.height = "59vh";
        document.getElementById("drawerTitle").innerText = "Home";
        document.getElementById("actDrawerCart").style.right = "-103%";
        document.getElementById("actDrawerProfile").style.right = "-103%";
        document.getElementById("actDrawerProduct").style.right = "-103%";
        document.getElementById("checkoutPage").style.right = "-103%";
        document.getElementById("actDrawerSuccessCheck").style.right = "-103%";
        document.getElementById("actDrawerShop").style.right = "0%";
    }else{
        document.getElementById("shopMainMenu").style.left="-103%"
        document.getElementById("fidiShopOffer").style.top = "0vh";
        document.getElementById("catnSearchCont").style.top = "25vh";
        document.getElementById("shopProducts").style.top = "35vh";
        document.getElementById("shopProducts").style.height = "53vh";
        document.getElementById("drawerTitle").innerText = "Home";
        document.getElementById("mobPgLb").innerText = "Home";
        document.getElementById("actDrawerCart").style.right = "-103%";
        document.getElementById("actDrawerProfile").style.right = "-103%";
        document.getElementById("actDrawerProduct").style.right = "-103%";
        document.getElementById("checkoutPage").style.right = "-103%";
        document.getElementById("actDrawerSuccessCheck").style.right = "-103%";
        document.getElementById("actDrawerShop").style.right = "0%";
    }
   
};
function toProducts(){
    window.history.pushState({ page: "products" }, "", "/shop.html");
    if(scrW<=768){
        document.getElementById("shopMainMenu").style.left="-103%"
        document.getElementById("fidiShopOffer").style.top='-100vh'
        document.getElementById("catnSearchCont").style.top='.5vh'
        document.getElementById("shopProducts").style.top='8vh'
        document.getElementById("shopProducts").style.height='76vh'
        document.getElementById("drawerTitle").innerText='All Products'
        document.getElementById("mobPgLb").innerText='All Products'
        document.getElementById("actDrawerCart").style.right='-103%'
        document.getElementById("actDrawerProduct").style.right='-103%'
        document.getElementById("actDrawerProfile").style.right='-103%'
        document.getElementById("checkoutPage").style.right='-103%'
        document.getElementById("actDrawerSuccessCheck").style.right='-103%'
        document.getElementById("actDrawerShop").style.right='0%'
    }else{
        document.getElementById("shopMainMenu").style.left="-103%"
        document.getElementById("fidiShopOffer").style.top='-100vh'
        document.getElementById("catnSearchCont").style.top='0vh'
        document.getElementById("shopProducts").style.top='10vh'
        document.getElementById("shopProducts").style.height='78vh'
        document.getElementById("drawerTitle").innerText='All Products'
        document.getElementById("mobPgLb").innerText='All Products'
        document.getElementById("actDrawerCart").style.right='-103%'
        document.getElementById("actDrawerProduct").style.right='-103%'
        document.getElementById("actDrawerProfile").style.right='-103%'
        document.getElementById("checkoutPage").style.right='-103%'
        document.getElementById("actDrawerSuccessCheck").style.right='-103%'
        document.getElementById("actDrawerShop").style.right='0%'
    }
  

}
function showFonNav(){
    document.getElementById("shopMainMenu").style.left="0%"
}
function toOffers(){
    window.history.pushState({ page: "products" }, "", "/shop.html");
    if(scrW<=768){
        document.getElementById("shopMainMenu").style.left="-103%"
        document.getElementById("fidiShopOffer").style.top='-100vh'
        document.getElementById("catnSearchCont").style.top='.5vh'
        document.getElementById("shopProducts").style.top='8vh'
        document.getElementById("shopProducts").style.height='76vh'
        document.getElementById("drawerTitle").innerText='All Products'
        document.getElementById("mobPgLb").innerText='All Products'
        document.getElementById("actDrawerCart").style.right='-103%'
        document.getElementById("actDrawerProduct").style.right='-103%'
        document.getElementById("actDrawerProfile").style.right='-103%'
        document.getElementById("checkoutPage").style.right='-103%'
        document.getElementById("actDrawerSuccessCheck").style.right='-103%'
        document.getElementById("actDrawerShop").style.right='0%'
    }else{
        document.getElementById("shopMainMenu").style.left="-103%"
        document.getElementById("fidiShopOffer").style.top='-100vh'
        document.getElementById("catnSearchCont").style.top='0vh'
        document.getElementById("shopProducts").style.top='10vh'
        document.getElementById("shopProducts").style.height='78vh'
        document.getElementById("drawerTitle").innerText='All Products'
        document.getElementById("mobPgLb").innerText='All Products'
        document.getElementById("actDrawerCart").style.right='-103%'
        document.getElementById("actDrawerProduct").style.right='-103%'
        document.getElementById("actDrawerProfile").style.right='-103%'
        document.getElementById("checkoutPage").style.right='-103%'
        document.getElementById("actDrawerSuccessCheck").style.right='-103%'
        document.getElementById("actDrawerShop").style.right='0%'
    }
  

}
function toProduct(){
    window.history.pushState({ page: "product" }, "", "/shop.html");

    if(scrW<=768){
        document.getElementById("shopMainMenu").style.left="-103%"
        document.getElementById("fidiShopOffer").style.top='0vh'
        document.getElementById("catnSearchCont").style.top='35vh'
        document.getElementById("shopProducts").style.top='45vh'
        document.getElementById("drawerTitle").innerText='Product'
        document.getElementById("mobPgLb").innerText='Product'
        document.getElementById("actDrawerCart").style.right='-103%'
        document.getElementById("actDrawerProfile").style.right='-103%'
        document.getElementById("actDrawerShop").style.right='-103%'
        document.getElementById("checkoutPage").style.right='-103%'
        document.getElementById("actDrawerSuccessCheck").style.right='-103%'
        document.getElementById("actDrawerProduct").style.right='0%'
    }else{
        document.getElementById("shopMainMenu").style.left="-103%"
        document.getElementById("fidiShopOffer").style.top='0vh'
        document.getElementById("catnSearchCont").style.top='35vh'
        document.getElementById("shopProducts").style.top='45vh'
        document.getElementById("drawerTitle").innerText='Product'
        document.getElementById("mobPgLb").innerText='Product'
        document.getElementById("actDrawerCart").style.right='-103%'
        document.getElementById("actDrawerProfile").style.right='-103%'
        document.getElementById("actDrawerShop").style.right='-103%'
        document.getElementById("checkoutPage").style.right='-103%'
        document.getElementById("actDrawerSuccessCheck").style.right='-103%'
        document.getElementById("actDrawerProduct").style.right='0%'
    }
  
}
function openFonNav(){
document.getElementById("adminMenuNavId").style.left="0%"
}
let socket = new WebSocket("wss://official-backend-sunup-2003.onrender.com");
function connectWebSocket(){

socket.onopen = () => {
  console.log("Connected to backend WebSocket");
};

socket.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.type === "searchResults") {

    renderSearchResults(msg.data);
  }
};
socket.onclose = (error) =>{
    console.log(error)
}
}
connectWebSocket()
let searchTimeout;

function pullSearched(e) {
  let searchInput = e.value.trim().toLowerCase();

  clearTimeout(searchTimeout); // reset timer each time the user types
  searchTimeout = setTimeout(() => {
    if (searchInput) {
      socket.send(JSON.stringify({
        type: "search",
        query: searchInput
      }));
    } else {
      renderProducts(); // fallback
    }
  }, 400); // wait 400ms after last keystroke
}


function renderSearchResults(products) {
        document.getElementById("shopProductsWrapper").innerHTML = "";
        console.log(products)

  let productCard = '';

  if (products.length === 0) {
    productCard = `
      <div class="noSuchProduct">
        <i class="fa-brands fa-dropbox"></i>
        <p>Oops, we don't have what you are looking for.</p>
      </div>
    `;
  } else {
    products.forEach(shopitem => {
      // Build product HTML (reuse your old logic)
      let pname = shopitem.productName;
      let ppricel = parseInt(shopitem.productPrice).toLocaleString();
      let pprice = parseInt(shopitem.productPrice);
      let pid = shopitem.productDocId;
      let pimg = shopitem.productUrl;
      let pcat = shopitem.productCat;
      let pdesc = shopitem.productDesc;
      let pdisc = shopitem.productDiscount;
      let isMulti = shopitem.isMulti;
      let extraImageUrls = shopitem.extraIamgeUrls || [];
      const imageString = JSON.stringify(extraImageUrls).replace(/"/g, '&quot;');
      let pdi = parseInt(shopitem.discountPercentage);
                  let priceHTML = `<p class="newPrice">Ksh. ${ppricel}</p>`;


      if (pdi > 0) {
        let rperc = 100 - pdi;
        let newPrice = (Math.ceil((rperc * pprice) / 100)).toLocaleString();
        productCard += `
          <div class="shopProduct">
            <div class="spTop"><img src="${pimg}"></div>
            <div class="spBottom">
              <h4>${pname}</h4>
              <div class="ProdPrices">
                <p class="oldPrice">Ksh. ${ppricel}</p>
                <p class="newPrice">Ksh. ${newPrice}</p>
              </div>
            </div>
          </div>
        `;
      } else {
     productCard += `
                <div class="shopProduct" >
                    <div class="spTop" 
                                onclick="handleBuyClick(this)"
                                data-id="${pid}"
                                data-price="${pprice}"
                                data-desc="${encodeURIComponent(pdesc)}"
                                data-img="${pimg}"
                                data-name="${pname}"
                                data-cat="${pcat}"
                                data-disc="${pdisc}"
                                data-pdi="${pdi}"
                                data-multi="${isMulti}"
                                data-extra='${encodeURIComponent(imageString)}'                    >
                        <img width="10px" src="${pimg}" alt="">
                    </div>
                    <div class="spBottom">
                        <p>${pname}</p>
                        <div class="ProdPrices">${priceHTML}</div>
                        <div class="buyandCart">
                            <button 
                                class="buyshopBtn" 
                                onclick="handleBuyClick(this)"
                                data-id="${pid}"
                                data-price="${pprice}"
                                data-desc="${encodeURIComponent(pdesc)}"
                                data-img="${pimg}"
                                data-name="${pname}"
                                data-cat="${pcat}"
                                data-disc="${pdisc}"
                                data-pdi="${pdi}"
                                data-multi="${isMulti}"
                                data-extra='${encodeURIComponent(imageString)}'
                            >Buy</button>
                          <button 
                            class="tocartShopBtn" 
                            onclick="handleAddToCartClick(this)"
                            data-id="${pid}"
                            data-price="${pprice}"
                            data-desc="${encodeURIComponent(pdesc)}"
                            data-img="${pimg}"
                            data-name="${pname}"
                            data-cat="${pcat}"
                            data-disc="${pdisc}"
                            >
                            <i class="icofont-cart-alt"></i>
                            </button>

                        </div>
                    </div>
                </div>
            `;
      }
    });
  }

  document.getElementById("shopProductsWrapper").innerHTML = productCard;
}

function opsEnt(){
document.querySelector(".shopSearch").classList.add("opsSearch")
}
function opsLeave(){
document.querySelector(".shopSearch").classList.remove("opsSearch")
}

function toAdminpanel(){
    window.location.href="adminpanel.html"
}
function cmpltPurchase(){
    window.location.href="index.html"
}
async function strtBackend() {
    try {
        console.log("Rasta got soul...");
        const url = "https://official-backend-sunup-2003.onrender.com/Alooo";
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();  // Expecting a JSON response
        console.log(result.message);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

strtBackend();

function toWhatsapp() {
    const phoneNumber = "254700249623"; // Replace with the recipient's phone number (use international format without `+`)
    const message = encodeURIComponent("Hello SunUp Collections,"); // Custom message

    window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
}

function toWeb(){
    window.location.href="index.html"
}

