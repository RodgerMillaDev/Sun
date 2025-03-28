auth.onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid;
        isLoggedIn = true;
        document.getElementById("shopAuth").innerText="Sign Out"
        dbFirestore.collection("Users").doc(uid).get().then((doc)=>{
            var uname = doc.data().name;
            var em = doc.data().em;

            localStorage.setItem("sunupUserName",uname)
            localStorage.setItem("emUserName",em)
            document.getElementById("checkoutName").innerText=uname;
            document.getElementById("checkoutName").innerText=uname;

        })
        
        setupCartListener();
    } else {
        isLoggedIn = false;
        document.getElementById("shopAuth").innerText="Sign In"

    }
});

function shoptoAuth(){
    var authDet=document.getElementById("shopAuth").innerText;
    if(authDet=="Sign In"){
        window.location.href="auth.html"
    }else{
        auth.signOut().then(() => {
            localStorage.setItem("carttocheckPrice",0)
            localStorage.setItem("PromoCode",0)
            localStorage.setItem("PromoCode","")

            Swal.fire("Signed out successfully").then(()=>{
              window.location.href="auth.html";
              
            })
            
          }).catch((error) => {
    
            console.log(error)
            // An error happened.
          });  
    }

}

// function toCheckout() {
//     if(allCartItems && cartItemsNumber !=0){
//         var newCartItems = [];
//         var cartDivs = document.querySelectorAll(".cartItem");
    
//         cartDivs.forEach(cartDiv => {
//             const item = {};
    
//             // Get productDocId first
//             const productDocId = cartDiv.querySelector(".cartProdOrgPrice[id^='cartProDocId']").innerText.trim();
//             item.productDocId = productDocId;
    
//             // Now use productDocId to get other elements
//             item.productName = cartDiv.querySelector("#cartProdName" + productDocId).innerText.trim();
//             item.productCat = cartDiv.querySelector("#cartProCat" + productDocId).innerText.trim();
//             item.productPrice = cartDiv.querySelector("#cartProdOrgPrice" + productDocId).innerText.trim();
//             item.productUrl = cartDiv.querySelector("#cartProUrl" + productDocId).innerText.trim();
//             item.productDesc = cartDiv.querySelector("#cartProDesc" + productDocId).innerText.trim();
//             item.productQuantity = cartDiv.querySelector("#cartitemnumber" + productDocId).innerText.trim();
//             item.productDiscount = cartDiv.querySelector("#cartProDiscount" + productDocId).innerText.trim();
    
//             newCartItems.push(item);
//         });
    
    
    
//         dbFirestore.collection("Users").doc(uid).update({
//             cartItems:newCartItems,
//         }).then(()=>{
//             delCountyDet()
//             localStorage.setItem("carttocheckPrice",cipAll)
//             const params = new URLSearchParams(window.location.search);

//             params.set('cartTotal', cipAll);
//             params.set('cartDiscount', appliedPromoPerc);
//             history.replaceState(null, '', '?' + params.toString());

//             document.getElementById("checkRTopDetDisocunt").innerText=localStorage.getItem("PromoCode")
//             document.getElementById("checkRTopDetproductCost").innerText=cipAll.toLocaleString()
//             document.getElementById("fidiShopOffer").style.top='0vh'
//             document.getElementById("catnSearchCont").style.top='35vh'
//             document.getElementById("shopProducts").style.top='45vh'
//             document.getElementById("drawerTitle").innerText='Product'
//             document.getElementById("actDrawerCart").style.right='-101%'
//             document.getElementById("actDrawerProfile").style.right='-101%'
//             document.getElementById("actDrawerShop").style.right='-101%'
//             document.getElementById("actDrawerProduct").style.right='-101%'
//             document.getElementById("actDrawerSuccessCheck").style.right='-101%'
//             document.getElementById("checkoutPage").style.right='0%'
//         })
//     }else{
//          Swal.fire("You have no items in cart")
//     }
    
// }


function updateGrandTotal() {
    cipAll = 0;
    var cartItemPrices = document.querySelectorAll(".cartproductTotalPriceSingle");

    cartItemPrices.forEach(cartItemPrice => {
        var cip = parseInt(cartItemPrice.innerText) || 0;
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



