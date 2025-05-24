var dbFirestore = firebase.firestore();
var uid;
var isLoggedIn = false;
let allCartItems = [];
var cartItemsNumber = 0;
const deURL = decodeURIComponent(window.location.search);
const SU = deURL.split("?");

if(deURL.includes("fromPayment")){
    var payStack=SU[3]
    var payStackArr=payStack.split("&")
    var fp=payStackArr[0].split("=")
    var rf=payStackArr[2].split("=")
    var ppURL=SU[3].split("&")
    const ps=fp[1]
    const refCode=rf[1]
    localStorage.setItem('refCodePay',refCode)
    if(ps=="true"){
        document.getElementById("fidiShopOffer").style.top='0vh'
        document.getElementById("catnSearchCont").style.top='35vh'
        document.getElementById("shopProducts").style.top='45vh'
        document.getElementById("drawerTitle").innerText='Product'
        document.getElementById("actDrawerCart").style.right='-101%'
        document.getElementById("actDrawerProfile").style.right='-101%'
        document.getElementById("actDrawerShop").style.right='-101%'
        document.getElementById("actDrawerProduct").style.right='-101%'
        document.getElementById("checkoutPage").style.right='-101%'
        document.getElementById("actDrawerSuccessCheck").style.right='-101%'  
        document.getElementById("checkTrxStatus").style.right='0%'  
      }
    
}
// Real-time cart update listener
function setupCartListener() {
    dbFirestore.collection('Users').doc(uid).onSnapshot((doc) => {
        if (doc.exists) {
            allCartItems = doc.data().cartItems || [];
            cartItemsNumber = allCartItems.filter(item => item !== "").length;
            var username = doc.data().name ;
            var strngname = username.split(" ") ;
            var clname = strngname[0] ;
            document.getElementById("lapiCartNumber").innerText = cartItemsNumber;
            document.getElementById("fcn").innerText = cartItemsNumber;
            document.getElementById("LapiNavDp").innerText = clname;
        } else {
            console.log("No cart data found for this user.");
        }
    }, (error) => {
        console.error("Error getting cart items:", error);
    });
}
updateCartCount()
function renderProducts() {
    dbFirestore.collection("Products").get().then((shopItems) => {
        var productCard = '';
        shopItems.forEach(shopitem => {
            // Extract product data
            const data = shopitem.data();
            const pname = data.productName;
            const pprice = parseInt(data.productPrice);
            const ppricel = pprice.toLocaleString();
            const pid = data.productDocId;
            const pimg = data.productUrl;
            const pcat = data.productCat;
            const pdesc = data.productDesc;
            const pdisc = data.productDiscount;
            const isMulti = data.isMulti;
            const extraImageUrls = data.extraImageUrls;
            const imageString = JSON.stringify(extraImageUrls);
            const pdi = parseInt(data.discountPercentage);

            // Prepare discounted price
            let priceHTML = `<p class="newPrice">Ksh. ${ppricel}</p>`;
            if (pdi > 0) {
                const rperc = 100 - pdi;
                const newPrice = Math.ceil((rperc * pprice) / 100).toLocaleString();
                priceHTML = `
                    <p class="oldPrice">Ksh. ${ppricel}</p>
                    <p class="newPrice">Ksh. ${newPrice}</p>
                `;
            }

            // Add product card HTML with data-* attributes
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
        });

        document.getElementById("shopProductsWrapper").innerHTML = productCard;
    });
}
renderProducts();
function handleAddToCartClick(btn) {
    const pid = btn.dataset.id;
    const pprice = btn.dataset.price;
    const pdesc = decodeURIComponent(btn.dataset.desc);
    const pimg = btn.dataset.img;
    const pname = btn.dataset.name;
    const pcat = btn.dataset.cat;
    const pdisc = btn.dataset.disc;

    addtoCartAllPro(pid, pprice, pdesc, pimg, pname, pcat, pdisc);
}

// ⬇️ New handler that pulls data from the button
function handleBuyClick(btn) {
    const pid = btn.dataset.id;
    const pprice = btn.dataset.price;
    const pdesc = decodeURIComponent(btn.dataset.desc);
    const pimg = btn.dataset.img;
    const pname = btn.dataset.name;
    const pcat = btn.dataset.cat;
    const pdisc = btn.dataset.disc;
    const pdi = btn.dataset.pdi;
    const isMulti = btn.dataset.multi;
    const imageString = decodeURIComponent(btn.dataset.extra);

    toBuy(pid, pprice, pdesc, pimg, pname, pcat, pdisc, pdi, isMulti, imageString);
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
        dbFirestore.collection("Products").where('productCat','==', catName ).get().then((shopItems)=>{
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
                    // Extract product data
                    const data = shopitem.data();
                    const pname = data.productName;
                    const pprice = parseInt(data.productPrice);
                    const ppricel = pprice.toLocaleString();
                    const pid = data.productDocId;
                    const pimg = data.productUrl;
                    const pcat = data.productCat;
                    const pdesc = data.productDesc;
                    const pdisc = data.productDiscount;
                    const isMulti = data.isMulti;
                    const extraImageUrls = data.extraImageUrls;
                    const imageString = JSON.stringify(extraImageUrls);
                    const pdi = parseInt(data.discountPercentage);
        
                    // Prepare discounted price
                    let priceHTML = `<p class="newPrice">Ksh. ${ppricel}</p>`;
                    if (pdi > 0) {
                        const rperc = 100 - pdi;
                        const newPrice = Math.ceil((rperc * pprice) / 100).toLocaleString();
                        priceHTML = `
                            <p class="oldPrice">Ksh. ${ppricel}</p>
                            <p class="newPrice">Ksh. ${newPrice}</p>
                        `;
                    }
        
                    // Add product card HTML with data-* attributes
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
                                <div class="ProdPrices"> <h4> ${priceHTML} </h4></div>
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
                });
            }
        document.getElementById("shopProductsWrapper").innerHTML=productCard
        })

    }

}

function toBuy(pid,pprice,pdesc,pimg,pname,pcat,pdisc,pdi,isMulti,imageString){
    window.history.pushState({ page: "product" }, "", "/shop.html");

    document.getElementById("ProductQuantityPG").innerText=1

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
            document.getElementById("selectColorPrPg").style.display='flex'
            var extCont=''
            var cleanArray=JSON.parse(imageString)
            var imgAryy=cleanArray.push(pimg)

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
    document.getElementById("viewProCat").innerText=pcat;
    document.getElementById("viewProPrice").innerText=(parseInt(vprice).toLocaleString())
    document.getElementById("viewProDesc").innerText=pdesc
    document.getElementById("viewProId").innerText=pid
    document.getElementById("viewOrgPrice").innerText=vprice;
    document.getElementById("viewProImg").src=pimg

    }
}
function sltdClUrl(e){
    var sltdClUrlImg=e.querySelector("img").src;
    document.getElementById("viewProImg").src=sltdClUrlImg
    console.log(document.getElementById("viewProImg").src)

        // Retrieve the current toBuyArray from localStorage
        const toBuyArray = JSON.parse(localStorage.getItem("toBuyJSON"));
    
        // Update the productUrl in the array
        if (toBuyArray) {
            toBuyArray.productUrl = sltdClUrlImg;
            
            // Save the updated array back to localStorage
            localStorage.setItem("toBuyJSON", JSON.stringify(toBuyArray));
            console.log( JSON.parse(localStorage.getItem("toBuyJSON")))
        }
}
function updateCartCount() {
    if (isLoggedIn && uid) {
        dbFirestore.collection("Users").doc(uid).get().then((doc) => {
            if (doc.exists) {
                allCartItems = doc.data().cartItems || [];
                cartItemsNumber = allCartItems.filter(item => item !== "").length;
                document.getElementById("lapiCartNumber").innerText = cartItemsNumber;
                document.getElementById("fcn").innerText = cartItemsNumber;
            } else {
                console.log("Cart data not found");
            }
        }).catch(error => {
            console.error("Error fetching cart items:", error);
        });
    }
}
function addtoCartViewPro() {


   
    var pid = document.getElementById("viewProId").innerText;
    if (!pid) {
        Swal.fire("No product ID found");
        return;
    }

    let quantityEl = document.getElementById("ProductQuantityPG");
    let updatedQuantity = quantityEl ? parseInt(quantityEl.innerText) : 1;

    if (isLoggedIn) {
        dbFirestore.collection("Users").doc(uid).get().then((userDoc) => {
            var userCartItems = userDoc.data().cartItems || [];

            // Check if the product already exists in the cart
            var existingProdIndex = userCartItems.findIndex(item => item.productDocId === pid);

            if (existingProdIndex === -1) {
                // Product is not in cart, add it as new
                var newCartItem = JSON.parse(localStorage.getItem("toBuyJSON"));
           

                if (newCartItem) {
                    newCartItem.productQuantity = updatedQuantity;
                    userCartItems.push(newCartItem);
                    dbFirestore.collection("Users").doc(uid).update({
                        cartItems: userCartItems
                    }).then(() => {
                        updateCartCount();
                    });
                }
            } else {
                var newImage=document.getElementById("viewProImg").src;
                // Product exists, update its quantity
                userCartItems[existingProdIndex].productQuantity = updatedQuantity;
                userCartItems[existingProdIndex].productUrl = newImage;

                dbFirestore.collection("Users").doc(uid).update({
                    cartItems: userCartItems
                }).then(() => {
                    updateCartCount();
                    Swal.fire({
                        icon: "success",
                        title: "Cart updated",
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true
                    });
                });
            }
        });
    } else {
        Swal.fire({
            icon: "warning",
            title: "Sign in to proceed",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    }
}

async function confirmPay(){
    try {
        document.getElementById("confirmPaymentBtn").style.display="none"
        document.getElementById("TrxStatusLoader").style.display="block"
        // const url= "http://localhost:4455/trxnStatus"
        const url= "https://official-backend-sunup.onrender.com/trxnStatus"
        const refCode=localStorage.getItem('refCodePay')
        const orderNumber=localStorage.getItem('orderNumber')        
        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({refCode,userId:localStorage.getItem("sununpUID"),orderNumber:orderNumber})
        })
        const result = await response.json()
        console.log(result)
        if(result.orderStatus.success==true && result.orderStatus.message=="Order processed successfully"){
            localStorage.setItem('refCodePay','')
            const newURL='https://sunup-collection.com'
            // const newURL='http://localhost:5500/public/index.html'
            window.history.replaceState({}, "", newURL) 
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
            readNewOrder()  
            document.getElementById("checkTrxStatus").style.right='-105%'  
        }else{
            Swal.fire("Error", "An error occured try again", "error")
         }
            document.getElementById("confirmPaymentBtn").style.display="block"
            document.getElementById("TrxStatusLoader").style.display="none"
        } catch (error) {
            document.getElementById("confirmPaymentBtn").style.display="block"
            document.getElementById("TrxStatusLoader").style.display="none"
            console.log(error)
        }
}
readNewOrder()
function readNewOrder() {
    var uid = localStorage.getItem("sununpUID");
    dbFirestore.collection("Orders")
        .where("orderID", "==", uid)
        .orderBy("timestamp", "desc") // Order by timestamp (latest first)
        .limit(1) // Get only the most recent order
        .get()
        .then((docs) => {
            if (!docs.empty) {
                var rc=docs.docs[0].data().name;
                var on=docs.docs[0].data().orderNumber;
                var pa=docs.docs[0].data().paidAmount;
                var pd=docs.docs[0].data().date;
                var dc=docs.docs[0].data().county;
                document.getElementById("scRecipient").innerText=rc
                document.getElementById("scorderNumber").innerText=on
                document.getElementById("scPaid").innerText=pa
                document.getElementById("scdatePaid").innerText=pd
                if(dc=="Nairobi"){
                    var adl=docs.docs[0].data().dlArea;
                    document.getElementById("scDest").innerText=adl
                }else{
                    var adl=docs.docs[0].data().town;
                    document.getElementById("scDest").innerText=adl
                }
            } else {
                console.log("No orders found.");
            }
        })
        .catch((error) => {
            console.error("Error fetching latest order:", error);
        });
}
function updateGrandTotal() {
    function parseLocalizedNumber(str) {
    return parseInt(str.replace(/[^0-9-]/g, ""), 10);
    }

    var cipAll = 0;
    var cartItemPrices = document.querySelectorAll(".cartproductTotalPriceSingle");
    cartItemPrices.forEach(cartItemPrice => {
        var cip = parseInt(parseLocalizedNumber(cartItemPrice.innerText)) || 0;
        cipAll += cip;
    });

    // Apply promo discount if available
    var discountedTotal = Math.ceil(cipAll);
    if (appliedPromoPerc > 0) {
        discountedTotal = Math.ceil(cipAll - (cipAll * (appliedPromoPerc / 100)));
    }
    // Update localStorage and UI
    localStorage.setItem("grandTotal", discountedTotal);
    localStorage.setItem("PromoCode", appliedPromoPerc);
    document.getElementById("totalCartCost").innerText = discountedTotal.toLocaleString();
    document.getElementById("cartPromoPercDiscount").innerText = appliedPromoPerc;
    document.getElementById("grandTotalCartItems").innerText = discountedTotal.toLocaleString();

}


