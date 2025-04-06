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

function renderProducts(){
    dbFirestore.collection("Products").get().then((shopItems)=>{
        var productCard='';
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
        var extraImageUrls=shopitem.data().extraImageUrls;
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
       });
       document.getElementById("shopProductsWrapper").innerHTML=productCard
    })
}
renderProducts()
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
                // Product exists, update its quantity
                userCartItems[existingProdIndex].productQuantity = updatedQuantity;

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
        console.log(refCode)
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
            const newURL='https://sunup-collections.web.app'
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


