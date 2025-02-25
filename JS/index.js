function toHome(){
    document.getElementById("fidiShopOffer").style.top='0vh'
    document.getElementById("catnSearchCont").style.top='35vh'
    document.getElementById("shopProducts").style.top='45vh'
    document.getElementById("drawerTitle").innerText='Home'
}

function toProducts(){
    document.getElementById("fidiShopOffer").style.top='-100vh'
    document.getElementById("catnSearchCont").style.top='0vh'
    document.getElementById("shopProducts").style.top='10vh'
    document.getElementById("shopProducts").style.height='78vh'
    document.getElementById("drawerTitle").innerText='All Products'

}

function toOffers(){
    document.getElementById("fidiShopOffer").style.top='-100vh'
    document.getElementById("catnSearchCont").style.top='0vh'
    document.getElementById("shopProducts").style.top='10vh'
    document.getElementById("shopProducts").style.height='78vh'
    document.getElementById("drawerTitle").innerText='On Offer'

}