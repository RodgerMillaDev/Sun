var dbFirestore = firebase.firestore();
var uid;
var isLoggedIn = false;
let allCartItems = [];
var cartItemsNumber = 0;

// Listen for authentication state changes
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid;
        isLoggedIn = true;
        setupCartListener(); // Start listening for cart changes
    } else {
        isLoggedIn = false;
        console.log("User not signed in");
    }
});

function updateCartCount() {
    if (isLoggedIn && uid) {
        dbFirestore.collection("Users").doc(uid).get().then((doc) => {
            if (doc.exists) {
                allCartItems = doc.data().cartItems || [];
                cartItemsNumber = allCartItems.filter(item => item !== "").length;
                document.getElementById("lapiCartNumber").innerText = cartItemsNumber;
            } else {
                console.log("Cart data not found");
            }
        }).catch(error => {
            console.error("Error fetching cart items:", error);
        });
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

       });


       document.getElementById("shopProductsWrapper").innerHTML=productCard
    })
}

renderProducts()



function toBuy(pid,pprice,pdesc,pimg,pname,pcat,pdisc){
    var toBuyArray={
        productDocId:pid,
        productCat:pcat,
        productName:pname,
        productPrice:pprice,
        productUrl:pimg,
        productDesc:pdesc,
        productQuantity:"1",
        productDiscount:pdisc,
    }
    localStorage.setItem("toBuyJSON",JSON.stringify(toBuyArray))
    if(!pid || pid===""){
        return;
    }else{
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
    document.getElementById("viewProName").innerText=pname
    document.getElementById("viewProCat").innerText=pcat
    document.getElementById("viewProPrice").innerText=pprice
    document.getElementById("viewProDesc").innerText=pdesc
    document.getElementById("viewProId").innerText=pid
    document.getElementById("viewProImg").src=pimg

    }

}

function addtoCartViewPro(){
    var pid=document.getElementById("viewProId").innerText;
    if(!pid){
      return;
    }else{
            if(isLoggedIn){
                dbFirestore.collection("Users").doc(uid).get().then((userDoc)=>{
                    var userCartItems=userDoc.data().cartItems;
                    // check if prodcut already exists kwa cart

                    var existingProdIndex=userCartItems.findIndex(item => item.productDocId === pid)
                

                    if(existingProdIndex === -1){
                        var newCartitem = JSON.parse(localStorage.getItem("toBuyJSON"))
                        userCartItems.push(newCartitem)

                        dbFirestore.collection("Users").doc(uid).update({
                            cartItems:userCartItems
                        }).then(()=>{
                            updateCartCount()
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                  toast.onmouseenter = Swal.stopTimer;
                                  toast.onmouseleave = Swal.resumeTimer;
                                }
                              });
                              Toast.fire({
                                icon: "success",
                                title: "Added to cart"
                              });
                        })

                    }else{
                        Swal.fire("Item already in cart")
                    }

                })




                
            }else{
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "warning",
                    title: "Sign in to proceed"
                  });
            }
            

    }
}

function addtoCartAllPro(pid,pprice,pdesc,pimg,pname,pcat,pdisc){

    if(!pid){
      return;
    }else{



            if(isLoggedIn){



                var toBuyArray={
                    productDocId:pid,
                    productCat:pcat,
                    productName:pname,
                    productPrice:pprice,
                    productUrl:pimg,
                    productDesc:pdesc,
                    productQuantity:"1",
                    productDiscount:pdisc,
                }
                localStorage.setItem("toBuyJSON",JSON.stringify(toBuyArray))






                dbFirestore.collection("Users").doc(uid).get().then((userDoc)=>{
                    var userCartItems=userDoc.data().cartItems;
                    // check if prodcut already exists kwa cart

                    var existingProdIndex=userCartItems.findIndex(item => item.productDocId === pid)
                

                    if(existingProdIndex === -1){
                        var newCartitem = JSON.parse(localStorage.getItem("toBuyJSON"))
                        userCartItems.push(newCartitem)

                        dbFirestore.collection("Users").doc(uid).update({
                            cartItems:userCartItems
                        }).then(()=>{
                            console.log(pid)
                            updateCartCount()
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                  toast.onmouseenter = Swal.stopTimer;
                                  toast.onmouseleave = Swal.resumeTimer;
                                }
                              });
                              Toast.fire({
                                icon: "success",
                                title: "Added to cart"
                              });
                        })

                    }else{
                        Swal.fire("Item already in cart")
                    }

                })




                
            }else{
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "warning",
                    title: "Sign in to proceed"
                  });
            }
            

    }
}


function toCart(){
    if(isLoggedIn){

        var cartItemDiv="";
        document.getElementById("drawerTitle").innerText='My Cart'
        document.getElementById("actDrawerProfile").style.right='-101%'
        document.getElementById("actDrawerProduct").style.right='-101%'
        document.getElementById("actDrawerShop").style.right='-101%'
        document.getElementById("checkoutPage").style.right='-101%'
        document.getElementById("actDrawerSuccessCheck").style.right='-101%'
        document.getElementById("actDrawerCart").style.right='0%'
        var availableCartItem=allCartItems.filter(item => item !=='')
      if(availableCartItem.length!=0){



        availableCartItem.forEach((cartItem)=>{
        
        
            var productName=cartItem.productName
            var productDocId=cartItem.productDocId
            var productCat=cartItem.productCat
            var productPrice=cartItem.productPrice
            var productUrl=cartItem.productUrl
            var productDesc=cartItem.productDesc
            var productQuantity=cartItem.productQuantity
            var productDiscount=cartItem.productDiscount
            var productTotalPrice=productPrice*productQuantity

    
    
            cartItemDiv+=`
            
    
                            <div class="cartItem" id="cartItem${productDocId}">

                                <div class="cartItemWrap">
                                    <div class="cartImgNDetail">
                                         <p class="cartProdOrgPrice" id="cartProdName${productDocId}">${productName}</p>
                                         <p class="cartProdOrgPrice" id="cartProdOrgPrice${productDocId}">${productPrice}</p>
                                         <p class="cartProdOrgPrice" id="cartProDocId${productDocId}">${productDocId}</p>
                                         <p class="cartProdOrgPrice" id="cartProUrl${productDocId}">${productUrl}</p>
                                         <p class="cartProdOrgPrice" id="cartProCat${productDocId}">${productCat}</p>
                                         <p class="cartProdOrgPrice" id="cartProDesc${productDocId}">${productDesc}</p>
                                         <p class="cartProdOrgPrice" id="cartProQuantity${productDocId}">${productQuantity}</p>
                                         <p class="cartProdOrgPrice" id="cartProDiscount${productDocId}">${productDiscount}</p>
                                    
                                        <img width="100px" src="${productUrl}" alt="">
                                        <div class="cartItemDet">
                                            <h4>${productName}</h4>
                                            <p>${productCat}</p>
                                            <h4>Ksh. <span id="cartproductTotalPrice${productDocId}" class="cartproductTotalPriceSingle">${productTotalPrice}</span> </h4>
                                        </div>
                                    </div>
                                  
                                    <div class="quantNRemove">
                                        <div class="remvCartItem" onclick="removeCartItem('${productDocId}')">
                                              <i class="fa-solid fa-trash"></i>
                                        </div>
                                        <div class="quantCart">
                                                   <div class="minusItemCart" onclick="minusProductQuantityCart('${productDocId}')">
                                                <p>-</p>
                                            </div>
                                            <p  id="cartitemnumber${productDocId}">${productQuantity}</p>
                                    

                                              <div class="addItemCart" onclick="addProductQuantityCart('${productDocId}')">
                                               <p>+</p>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
             
            `
    
        })

      }else{
        console.log('no cart item')
        
        cartItemDiv=`
            <div id="emptyCart">
                            <img src="./Media/empty cart.png" alt="">
                            <p>Your cart is empty</p>
                        </div>

          `
      }
      
     // THEN, calculate totals
        setTimeout(() => {
        updateGrandTotal()
        }, 100); 
    document.getElementById("cartItemsWrap").innerHTML=cartItemDiv;

    }else{
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "warning",
            title: "Sign in to proceed"
          });
        
        }
    
}

function removeCartItem(productID){

      // Retrieve the document containing the array from Firestore
      dbFirestore.collection("Users").doc(uid).get().then((doc) => {
          if (doc.exists) {
      
              // Get the current array from the document data
              let cartArray = doc.data().cartItems || [];
              // Find the index of the item to delete in the array
              const indexToDelete = cartArray.findIndex(item => item.productDocId === productID);
              // If the item is found, remove it from the array
              if (indexToDelete !== -1) {
                document.getElementById("cartItem"+productID).remove(); 

                  cartArray.splice(indexToDelete, 1); // Remove the item at the found index
                  console.log(cartArray)
                  dbFirestore.collection("Users").doc(uid).update({
                        cartItems: cartArray
                    }).then(() => {
                
                        console.log("Item deleted successfully.");
                        // reupdateGrandTotal()
                        updateCartCount(uid)
                        if(cartArray==''){

                           
                              
                             var  cartItemDiv=`
                                <div id="emptyCart">
                                                <img src="./Media/empty cart.png" alt="">
                                                <p>Your cart is empty</p>
                                            </div>


                            `
                            document.getElementById("cartItemsWrap").innerHTML=cartItemDiv;

                            
                        }else{

                        }
            
                    }).catch((error) => {
                        console.error("Error updating document:", error);
                    });
              } else {
                  console.log("Item not found in the cart.");
              }
      
              
          } else {
              console.log("User document not found.");
          }
      }).catch((error) => {
          console.error("Error getting document:", error);
      });
      
}




let cartUpdates = {}; // Object to store updated cart quantities

function addProductQuantityCart(productDocId) {
    var itemEl = document.getElementById("cartitemnumber" + productDocId);
    var singleitemTotalPrice = document.getElementById("cartproductTotalPrice" + productDocId);
    var itemOrgPrice = parseInt(document.getElementById("cartProdOrgPrice" + productDocId).innerText);
    var itemNumber = parseInt(itemEl.innerText);

    if (itemNumber < 50) {
        itemNumber++;
        itemEl.innerText = itemNumber;
        singleitemTotalPrice.innerText = itemOrgPrice * itemNumber;
        updateGrandTotal();

        // Store the updated quantity locally
        cartUpdates[productDocId] = itemNumber;
    }
}

function minusProductQuantityCart(productDocId) {
    var itemEl = document.getElementById("cartitemnumber" + productDocId);
    var singleitemTotalPrice = document.getElementById("cartproductTotalPrice" + productDocId);
    var itemOrgPrice = parseInt(document.getElementById("cartProdOrgPrice" + productDocId).innerText);
    var itemNumber = parseInt(itemEl.innerText);

    if (itemNumber > 1) {
        itemNumber--;
        itemEl.innerText = itemNumber;
        singleitemTotalPrice.innerText = itemOrgPrice * itemNumber;
        updateGrandTotal();

        // Store the updated quantity locally
        cartUpdates[productDocId] = itemNumber;
    }
}


var cipAll = 0;
var appliedPromoPerc = 0.0; // Store promo percentage globally

function updateGrandTotal() {
    cipAll = 0;
    var cartItemPrices = document.querySelectorAll(".cartproductTotalPriceSingle");

    cartItemPrices.forEach(cartItemPrice => {
        var cip = parseInt(cartItemPrice.innerText) || 0;
        cipAll += cip;
    });

    // Apply promo discount if available
    var discountedTotal = cipAll;
    if (appliedPromoPerc > 0) {
        discountedTotal = cipAll - (cipAll * (appliedPromoPerc / 100));
    }

    // Update localStorage and UI
    localStorage.setItem("grandTotal", discountedTotal);
    document.getElementById("totalCartCost").innerText = discountedTotal.toLocaleString();
    document.getElementById("cartPromoPercDiscount").innerText = appliedPromoPerc;
    document.getElementById("grandTotalCartItems").innerText = discountedTotal.toLocaleString();
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
                console.log(shopitem.data().productNameLower)
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


}else if(searchInput =="" || searchInput == " " ){
    renderProducts()

}
}


function toCheckout() {
    if(allCartItems && cartItemsNumber !=0){
        var newCartItems = [];
        var cartDivs = document.querySelectorAll(".cartItem");
    
        cartDivs.forEach(cartDiv => {
            const item = {};
    
            // Get productDocId first
            const productDocId = cartDiv.querySelector(".cartProdOrgPrice[id^='cartProDocId']").innerText.trim();
            item.productDocId = productDocId;
    
            // Now use productDocId to get other elements
            item.productName = cartDiv.querySelector("#cartProdName" + productDocId).innerText.trim();
            item.productCat = cartDiv.querySelector("#cartProCat" + productDocId).innerText.trim();
            item.productPrice = cartDiv.querySelector("#cartProdOrgPrice" + productDocId).innerText.trim();
            item.productUrl = cartDiv.querySelector("#cartProUrl" + productDocId).innerText.trim();
            item.productDesc = cartDiv.querySelector("#cartProDesc" + productDocId).innerText.trim();
            item.productQuantity = cartDiv.querySelector("#cartitemnumber" + productDocId).innerText.trim();
            item.productDiscount = cartDiv.querySelector("#cartProDiscount" + productDocId).innerText.trim();
    
            newCartItems.push(item);
        });
    
    
    
        firebase.firestore().collection("Users").doc(uid).update({
            cartItems:newCartItems,
        }).then(()=>{
            delCountyDet()
            localStorage.setItem("carttocheckPrice",cipAll)
            document.getElementById("checkRTopDetproductCost").innerText=cipAll.toLocaleString()
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
        })
    }else{
         Swal.fire("You have no items in cart")
    }
    
}


function applyPromo(){
    var prm=document.getElementById("shopPromo").value;
    dbFirestore.collection("PromoCode").doc(prm).get().then((doc)=>{
        if(doc.exists){
            var promoPerc=doc.data().promoPerc;
            applyPromo=promoPerc;
            updateGrandTotal()


        }else{
            appliedPromoPerc = 0.0; // Reset promo if invalid
            updateGrandTotal(); // Ensure the price updates
            Swal.fire("Invalid Promo Code", "Please enter a valid code.", "error");

        }
    })
    
}