var scrW=(window.innerWidth)

window.toHome = function () {
    if(scrW<=768){
        document.getElementById("shopMainMenu").style.left="-103%"
        document.getElementById("fidiShopOffer").style.top = "0vh";
        document.getElementById("catnSearchCont").style.top = "29vh";
        document.getElementById("shopProducts").style.top = "38vh";
        document.getElementById("shopProducts").style.height = "48vh";
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
        document.getElementById("catnSearchCont").style.top = "35vh";
        document.getElementById("shopProducts").style.top = "45vh";
        document.getElementById("shopProducts").style.height = "43vh";
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
    if(scrW<=768){
        document.getElementById("shopMainMenu").style.left="-103%"
        document.getElementById("fidiShopOffer").style.top='-100vh'
        document.getElementById("catnSearchCont").style.top='.5vh'
        document.getElementById("shopProducts").style.top='9vh'
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
    if(scrW<=768){
        document.getElementById("shopMainMenu").style.left="-103%"
        document.getElementById("fidiShopOffer").style.top='-100vh'
        document.getElementById("catnSearchCont").style.top='.5vh'
        document.getElementById("shopProducts").style.top='9vh'
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
 function toCategory(e){
    document.getElementById("shopMainMenu").style.left="-103%"
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
                    var ppricel=(parseInt(shopitem.data().productPrice)).toLocaleString();
                    var pprice=parseInt(shopitem.data().productPrice);
                    var pid=shopitem.data().productDocId;
                    var pimg=shopitem.data().productUrl;
                    var pcat=shopitem.data().productCat;
                    var pdesc=shopitem.data().productDesc;
                    var pdisc=shopitem.data().productDiscount;
                    var isMulti=shopitem.data().isMulti;
                    var extraIamgeUrls=shopitem.data().extraIamgeUrls;
                    const imageString = JSON.stringify(extraImageUrls).replace(/"/g, '&quot;');

                    var pdi=parseInt(shopitem.data().discountPercentage);
                    if(pdi>0){
                        var rperc=100-pdi;
                        var newPrice=(Math.ceil((rperc*pprice)/100)).toLocaleString()
                        productCard+=
                        `<div class="shopProduct">
                            <div class="spTop">
                                <img width="10px" src=${pimg} alt="">
                            </div>
                            <div class="spBottom">
                                <h4>${pname}</h4>
                                <div class="ProdPrices">
                                            <p class="oldPrice">Ksh. ${ppricel}</p>
                                            <p class="newPrice">Ksh. ${newPrice}</p>
                                </div>
                                <div class="buyandCart">
                                <button class="buyshopBtn" onclick="toBuy('${pid}','${pprice}','${pdesc}','${pimg}','${pname}','${pcat}','${pdisc}','${pdi}','${isMulti}','${imageString}')">Buy</button>
                                <button class="tocartShopBtn" onclick="addtoCartAllPro('${pid}','${pprice}','${pdesc}','${pimg}','${pname}','${pcat}','${pdisc}','${pdi})"><i class="icofont-cart-alt"></i></button>
                                </div>
                            </div>
                        </div>
                        `
                    }else{
                        productCard+=
                        `
                        <div class="shopProduct">
                            <div class="spTop">
                                <img width="10px" src=${pimg} alt="">
                            </div>
                            <div class="spBottom">
                                <h4>${pname}</h4>
                                <div class="ProdPrices">
                                    <p class="newPrice">Ksh. ${ppricel}</p>
                                </div>
                                <div class="buyandCart">
                               <button class="buyshopBtn" onclick="toBuy('${pid}','${pprice}','${pdesc}','${pimg}','${pname}','${pcat}','${pdisc}','${pdi}','${isMulti}','${imageString}')">Buy</button>
                                <button class="tocartShopBtn" onclick="addtoCartAllPro('${pid}','${pprice}','${pdesc}','${pimg}','${pname}','${pcat}','${pdisc}','${pdi}')"><i class="icofont-cart-alt"></i></button>
                                </div>
                            </div>
                        </div>
                        `
                    } 
        })
    }
        document.getElementById("shopProductsWrapper").innerHTML=productCard
        })

    }

}
function pullSearched(e){
    var searchInput=(e.value).toLowerCase();
    if(searchInput){
    
    dbFirestore.collection("Products").where('productNameLower','>=', searchInput ).where('productNameLower', '<=', searchInput + '~').get().then((shopItems)=>{
        var productCard='';
        if(shopItems.empty){
            productCard =`
            <div class="noSuchProduct">
                <i class="fa-brands fa-dropbox"></i>
                <p>Oops, we don't have what you are looking for.</p>
            </div>
                 
            `

        }else{
           
            shopItems.forEach(shopitem => {
                var pname=shopitem.data().productName;
                var ppricel=(parseInt(shopitem.data().productPrice)).toLocaleString();
                var pprice=parseInt(shopitem.data().productPrice);
                var pid=shopitem.data().productDocId;
                var pimg=shopitem.data().productUrl;
                var pcat=shopitem.data().productCat;
                var pdesc=shopitem.data().productDesc;
                var pdisc=shopitem.data().productDiscount;
                var isMulti=shopitem.data().isMulti;
                var extraIamgeUrls=shopitem.data().extraIamgeUrls;
                var pdi=parseInt(shopitem.data().discountPercentage);
                if(pdi>0){
                    var rperc=100-pdi;
                    var newPrice=(Math.ceil((rperc*pprice)/100)).toLocaleString()
                    productCard+=
                    `<div class="shopProduct">
                        <div class="spTop">
                            <img width="10px" src=${pimg} alt="">
                        </div>
                        <div class="spBottom">
                            <h4>${pname}</h4>
                            <div class="ProdPrices">
                                        <p class="oldPrice">Ksh. ${ppricel}</p>
                                        <p class="newPrice">Ksh. ${newPrice}</p>
                            </div>
                            <div class="buyandCart">
                            <button class="buyshopBtn" onclick="toBuy('${pid}','${pprice}','${pdesc}','${pimg}','${pname}','${pcat}','${pdisc}','${pdi}','${isMulti}','${extraIamgeUrls}')">Buy</button>
                            <button class="tocartShopBtn" onclick="addtoCartAllPro('${pid}','${pprice}','${pdesc}','${pimg}','${pname}','${pcat}','${pdisc}','${pdi})"><i class="icofont-cart-alt"></i></button>
                            </div>
                        </div>
                    </div>
                    `
                }else{
                    productCard+=
                    `
                    <div class="shopProduct">
                        <div class="spTop">
                            <img width="10px" src=${pimg} alt="">
                        </div>
                        <div class="spBottom">
                            <h4>${pname}</h4>
                            <div class="ProdPrices">
                                <p class="newPrice">Ksh. ${ppricel}</p>
                            </div>
                            <div class="buyandCart">
                           <button class="buyshopBtn" onclick="toBuy('${pid}','${pprice}','${pdesc}','${pimg}','${pname}','${pcat}','${pdisc}','${pdi}','${isMulti}','${extraIamgeUrls}')">Buy</button>
                            <button class="tocartShopBtn" onclick="addtoCartAllPro('${pid}','${pprice}','${pdesc}','${pimg}','${pname}','${pcat}','${pdisc}','${pdi}')"><i class="icofont-cart-alt"></i></button>
                            </div>
                        </div>
                    </div>
                    `
                } 
           })

        }
       
    document.getElementById("shopProductsWrapper").innerHTML=productCard
})


}else if(searchInput =="" || searchInput == " " ){
    renderProducts()

}
}
function opsEnt(){
document.querySelector(".shopSearch").classList.add("opsSearch")
}
function opsLeave(){
document.querySelector(".shopSearch").classList.remove("opsSearch")
}
function toBuy(pid,pprice,pdesc,pimg,pname,pcat,pdisc,pdi,isMulti,imageString){
    var toBuyArray={
        productDocId:pid,
        productCat:pcat,
        productName:pname,
        productPrice:pprice,
        productUrl:pimg,
        productDesc:pdesc,
        productQuantity:"1",
        productDiscount:pdisc,
        discountPercentage:pdi,
        extraImageUrls:JSON.parse(imageString),
        isMulti:isMulti
    }
    localStorage.setItem("toBuyJSON",JSON.stringify(toBuyArray))
    if(!pid || pid===""){
        return;
    }else{
        var vprice=pprice;
        var pdiN=parseInt(pdi)
        if(pdiN>0){
            var rperc=100-pdiN;
            vprice=(Math.ceil((rperc*pprice)/100))
        }
        if(isMulti=="True"){
            console.log(imageString)
            document.getElementById("selectColorPrPg").style.display='flex'
            var extCont=''
            var cleanArray=JSON.parse(imageString)
            var imgAryy=cleanArray.push(pimg)
            console.log(cleanArray)

            cleanArray.forEach((imgstr)=>{
                extCont+=`
                    <div class="colorImg" onclick="sltdClUrl(this)">
                        <img src="${imgstr}" alt="">
                    </div>
                `
            })
            document.getElementById("selectColorPrPg").innerHTML=extCont


        }else{
            document.getElementById("selectColorPrPg").style.display='none'

        }
    document.getElementById("fidiShopOffer").style.top='0vh'
    document.getElementById("catnSearchCont").style.top='35vh'
    document.getElementById("shopProducts").style.top='45vh'
    document.getElementById("drawerTitle").innerText='Product'
    document.getElementById("actDrawerCart").style.right='-103%'
    document.getElementById("actDrawerProfile").style.right='-103%'
    document.getElementById("actDrawerShop").style.right='-103%'
    document.getElementById("checkoutPage").style.right='-103%'
    document.getElementById("actDrawerSuccessCheck").style.right='-103%'
    document.getElementById("actDrawerProduct").style.right='0%'
    document.getElementById("viewProName").innerText=pname
    document.getElementById("viewProCat").innerText=pcat
    document.getElementById("viewProPrice").innerText=(vprice).toLocaleString()
    document.getElementById("viewProDesc").innerText=pdesc
    document.getElementById("viewProId").innerText=pid
    document.getElementById("viewOrgPrice").innerText=vprice;
    document.getElementById("viewProImg").src=pimg

    }
}
function toAdminpanel(){
    window.location.href="adminpanel.html"
}
function cmpltPurchase(){
    window.location.href="index.html"
}
async function strtBackend() {
    try {
        console.log("Sending request...");
        const url = "https://official-backend-sunup.onrender.com/Alooo";
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
function sltdClUrl(e){
    var sltdClUrlImg=e.querySelector("img").src;
    document.getElementById("viewProImg").src=sltdClUrlImg
        // Retrieve the current toBuyArray from localStorage
        const toBuyArray = JSON.parse(localStorage.getItem("toBuyJSON"));
    
        // Update the productUrl in the array
        if (toBuyArray) {
            toBuyArray.productUrl = sltdClUrlImg;
            
            // Save the updated array back to localStorage
            localStorage.setItem("toBuyJSON", JSON.stringify(toBuyArray));
        }
}