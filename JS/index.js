
function toHome(){

    document.getElementById("fidiShopOffer").style.top='0vh'
    document.getElementById("catnSearchCont").style.top='35vh'
    document.getElementById("shopProducts").style.top='45vh'
    document.getElementById("drawerTitle").innerText='Home'
    document.getElementById("actDrawerCart").style.right='-101%'
    document.getElementById("actDrawerProfile").style.right='-101%'
    document.getElementById("actDrawerProduct").style.right='-101%'
    document.getElementById("checkoutPage").style.right='-101%'
    document.getElementById("actDrawerSuccessCheck").style.right='-101%'
    document.getElementById("actDrawerShop").style.right='0%'

}

function toProducts(){
   
    document.getElementById("fidiShopOffer").style.top='-100vh'
    document.getElementById("catnSearchCont").style.top='0vh'
    document.getElementById("shopProducts").style.top='10vh'
    document.getElementById("shopProducts").style.height='78vh'
    document.getElementById("drawerTitle").innerText='All Products'
    document.getElementById("actDrawerCart").style.right='-101%'
    document.getElementById("actDrawerProduct").style.right='-101%'
    document.getElementById("actDrawerProfile").style.right='-101%'
    document.getElementById("checkoutPage").style.right='-101%'
    document.getElementById("actDrawerSuccessCheck").style.right='-101%'
    document.getElementById("actDrawerShop").style.right='0%'

}

function toOffers(){

    document.getElementById("fidiShopOffer").style.top='-100vh'
    document.getElementById("catnSearchCont").style.top='0vh'
    document.getElementById("shopProducts").style.top='10vh'
    document.getElementById("shopProducts").style.height='78vh'
    document.getElementById("drawerTitle").innerText='On Offer'
    document.getElementById("actDrawerProduct").style.right='-101%'
    document.getElementById("actDrawerCart").style.right='-101%'
    document.getElementById("actDrawerProfile").style.right='-101%'
    document.getElementById("checkoutPage").style.right='-101%'
    document.getElementById("actDrawerSuccessCheck").style.right='-101%'
    document.getElementById("actDrawerShop").style.right='0%'

}

function toCart(){

    document.getElementById("drawerTitle").innerText='My Cart'
    document.getElementById("actDrawerProfile").style.right='-101%'
    document.getElementById("actDrawerProduct").style.right='-101%'
    document.getElementById("actDrawerShop").style.right='-101%'
    document.getElementById("checkoutPage").style.right='-101%'
    document.getElementById("actDrawerSuccessCheck").style.right='-101%'
    document.getElementById("actDrawerCart").style.right='0%'
}

function toProfile(){

    document.getElementById("drawerTitle").innerText='Profile Settings'
    document.getElementById("actDrawerShop").style.right='-101%'
    document.getElementById("actDrawerProduct").style.right='-101%'
    document.getElementById("actDrawerCart").style.right='-101%'
    document.getElementById("checkoutPage").style.right='-101%'
    document.getElementById("actDrawerSuccessCheck").style.right='-101%'
    document.getElementById("actDrawerProfile").style.right='0'

}

function toProduct(){

    document.getElementById("fidiShopOffer").style.top='0vh'
    document.getElementById("catnSearchCont").style.top='35vh'
    document.getElementById("shopProducts").style.top='45vh'
    document.getElementById("drawerTitle").innerText='Product'
    document.getElementById("actDrawerCart").style.right='-101%'
    document.getElementById("actDrawerProfile").style.right='-101%'
    document.getElementById("actDrawerShop").style.right='-101%'
    document.getElementById("checkoutPage").style.right='-101%'
    document.getElementById("actDrawerSuccessCheck").style.right='-101%'
    document.getElementById("actDrawerProduct").style.right='0%'
}

function toCheckout(){
   
    document.getElementById("fidiShopOffer").style.top='0vh'
    document.getElementById("catnSearchCont").style.top='35vh'
    document.getElementById("shopProducts").style.top='45vh'
    document.getElementById("drawerTitle").innerText='Product'
    document.getElementById("actDrawerCart").style.right='-101%'
    document.getElementById("actDrawerProfile").style.right='-101%'
    document.getElementById("actDrawerShop").style.right='-101%'
    document.getElementById("actDrawerProduct").style.right='-101%'
    document.getElementById("actDrawerSuccessCheck").style.right='-101%'
    document.getElementById("checkoutPage").style.right='0%'
}

function toSuccess(){
   
    document.getElementById("fidiShopOffer").style.top='0vh'
    document.getElementById("catnSearchCont").style.top='35vh'
    document.getElementById("shopProducts").style.top='45vh'
    document.getElementById("drawerTitle").innerText='Product'
    document.getElementById("actDrawerCart").style.right='-101%'
    document.getElementById("actDrawerProfile").style.right='-101%'
    document.getElementById("actDrawerShop").style.right='-101%'
    document.getElementById("actDrawerProduct").style.right='-101%'
    document.getElementById("checkoutPage").style.right='-101%'
    document.getElementById("actDrawerSuccessCheck").style.right='0%'

}

function toSignUp(){
    document.getElementById("authLog").style.top="-100%"
    document.getElementById("authSign").style.top="0"
    document.getElementById("authRightH3").innerText="Everything You Need, All in One Place!"

}

function toLogIn(){

    document.getElementById("authLog").style.top="0%"
    document.getElementById("authSign").style.top="100%" 
    document.getElementById("authRightH3").innerText="Can’t get enough? Shop some more!"

}

function openFonNav(){
    document.getElementById("adminMenuNavId").style.left="0%"
}
function toDashboard(){
    document.getElementById("adminMenuNavId").style.left="-101%"
    document.getElementById("allOrders").style.top="60%"
    document.getElementById("AllProducts").style.right="-105%"
    document.querySelector(".adminDashboardBottom").style.height="40%"
    document.querySelector(".adminDashRecentOrdersWrap").style.height="32vh"
    document.getElementById("adminDashboard").style.right="0%"
    document.getElementById("actDash").style.top="0%"



}
 function toOrders(){

    document.getElementById("adminMenuNavId").style.left="-101%"
    document.getElementById("actDash").style.top="-100%"
    document.getElementById("allOrders").style.top="0%"
    document.getElementById("AllProducts").style.right="-105%"
    document.querySelector(".adminDashboardBottom").style.height="100%"
    document.querySelector(".adminDashRecentOrdersWrap").style.height="92vh"



 }


 function toProducts(){
    document.getElementById("adminMenuNavId").style.left="-101%"
    document.getElementById("adminDashboard").style.right="-105%"
    document.getElementById("AllProducts").style.right="0%"
 }