window.toHome = function () {
    document.getElementById("fidiShopOffer").style.top = "0vh";
    document.getElementById("catnSearchCont").style.top = "35vh";
    document.getElementById("shopProducts").style.top = "45vh";
    document.getElementById("shopProducts").style.height = "43vh";

    document.getElementById("drawerTitle").innerText = "Home";
    document.getElementById("actDrawerCart").style.right = "-101%";
    document.getElementById("actDrawerProfile").style.right = "-101%";
    document.getElementById("actDrawerProduct").style.right = "-101%";
    document.getElementById("checkoutPage").style.right = "-101%";
    document.getElementById("actDrawerSuccessCheck").style.right = "-101%";
    document.getElementById("actDrawerShop").style.right = "0%";
};
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
function toSignUp(){
    document.getElementById("authLog").style.top="-100%"
    document.getElementById("authSign").style.top="0"
    document.getElementById("authRightH3").innerText="Everything You Need, All in One Place!"
    document.getElementById("authRightp").innerText="Welcome to Sun Up Collections"

}

function toLogIn(){

    document.getElementById("authLog").style.top="0%"
    document.getElementById("authSign").style.top="100%" 
    document.getElementById("authRightH3").innerText="Can’t get enough? Shop some more!"
    document.getElementById("authRightp").innerText="Fill in your credentials to access your account"

}

function openFonNav(){
    document.getElementById("adminMenuNavId").style.left="0%"
}
function toDashboard(){
    document.getElementById("adminMenuNavId").style.left="-101%"
    document.getElementById("allOrders").style.top="60%"
    document.getElementById("AllProducts").style.right="-105%"
    document.getElementById("UploadLocation").style.right="-105%"

    document.getElementById("UploadProduct").style.right="-105%"
    document.querySelector(".adminDashboardBottom").style.height="40%"
    document.querySelector(".adminDashRecentOrdersWrap").style.height="32vh"
    document.getElementById("adminDashboard").style.right="0%"
    document.getElementById("actDash").style.top="0%"



}
 function toOrders(){

    document.getElementById("adminMenuNavId").style.left="-101%"
    document.getElementById("actDash").style.top="-100%"
    document.getElementById("allOrders").style.top="0%"
    document.getElementById("adminDashboard").style.right="0%"
    document.getElementById("AllProducts").style.right="-105%"
    document.getElementById("UploadProduct").style.right="-105%"
    document.getElementById("UploadLocation").style.right="-105%"
    document.querySelector(".adminDashboardBottom").style.height="100%"
    document.querySelector(".adminDashRecentOrdersWrap").style.height="92vh"

 }

 function toCategory(e){
    var catName=e.querySelector("p").innerText;
    var catNameLower=catName.toLowerCase();
    document.querySelectorAll(".catDiv").forEach(div => div.classList.remove("catDivActive"));
    e.classList.add("catDivActive")
    if(catName=="All"){
        renderProducts()
    }else{
        dbFirestore.collection("Products").where('productCat','>=', catName ).where('productCat', '<=', catName + '~').get().then((shopItems)=>{
            var productCard='';
            if(shopItems.empty){
                productCard =`
                <div class="noSuchProduct">
                    <i class="fa-brands fa-dropbox"></i>
                    <p>Sorry  we don't have ${catName.toLowerCase()} items yet</p>
                </div>
                `
            }else{

            shopItems.forEach(shopitem => {
             var pname=shopitem.data().productName;
             var pprice=shopitem.data().productPrice;
             var pid=shopitem.data().productDocId;
             var pimg=shopitem.data().productUrl;
             var pcat=shopitem.data().productCat;
             var pdesc=shopitem.data().productDesc;
             var pdisc=shopitem.data().productDiscount;
     
     
             productCard+=
             `
             <div class="shopProduct">
                                 <div class="spTop">
                                     <img width="10px" src=${pimg} alt="">
                                 </div>
                                 <div class="spBottom">
                                     <h4>${pname}</h4>
                                     <p>Ksh. ${pprice}</p>
                                   <div class="buyandCart">
                                     <button class="buyshopBtn" onclick="toBuy('${pid}','${pprice}','${pdesc}','${pimg}','${pname}','${pcat}','${pdisc}')">Buy</button>
                                     <button class="tocartShopBtn" onclick="addtoCartAllPro('${pid}','${pprice}','${pdesc}','${pimg}','${pname}','${pcat}','${pdisc}')"><i class="icofont-cart-alt"></i></button>
                                   </div>
                                 </div>
                             </div>
             `
        })
    }
        document.getElementById("shopProductsWrapper").innerHTML=productCard
        })

    }

}

