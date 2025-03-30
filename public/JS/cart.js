
function applyPromo(){
    var prm=document.getElementById("shopPromo").value;
    if(prm==""){
        appliedPromoPerc=0.0
        updateGrandTotal();
    }else{
        dbFirestore.collection("PromoCode").doc(prm).get().then((doc)=>{
            if(doc.exists){
                var promoPerc=doc.data().promoPerc;
                appliedPromoPerc=promoPerc;
                localStorage.setItem("appliedPromoCode",appliedPromoPerc)
                updateGrandTotal()
            }else{
                appliedPromoPerc = 0.0; // Reset promo if invalid
                updateGrandTotal(); // Ensure the price updates
                Swal.fire("Invalid Promo Code", "Please enter a valid code.", "error");    
            }
        })
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
        document.getElementById("mobPgLb").innerText='My Cart'
        document.getElementById("shopMainMenu").style.left="-101%"
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
            localStorage.setItem("appliedPromoCode",0)
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
                                            <h4>Ksh. <span id="cartproductTotalPrice${productDocId}" class="cartproductTotalPriceSingle">${productTotalPrice.toLocaleString()}</span> </h4>
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
                                            <p class="cartItemNumberP" id="cartitemnumber${productDocId}">${productQuantity}</p>
                                
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
                        updateGrandTotal()
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

let cartUpdates = {}; 
function addProductQuantityCart(productDocId) {
    var itemEl = document.getElementById("cartitemnumber" + productDocId);
    var singleitemTotalPrice = document.getElementById("cartproductTotalPrice" + productDocId);
    var itemOrgPrice = parseInt(document.getElementById("cartProdOrgPrice" + productDocId).innerText);
    var itemNumber = parseInt(itemEl.innerText);
    if (itemNumber < 50) {
        itemNumber++;
        itemEl.innerText = itemNumber;
        singleitemTotalPrice.innerText = (itemOrgPrice * itemNumber).toLocaleString();
        updateGrandTotal();
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
        singleitemTotalPrice.innerText = (itemOrgPrice * itemNumber).toLocaleString();
        updateGrandTotal();
        cartUpdates[productDocId] = itemNumber;
    }
}
var cipAll = 0;
var appliedPromoPerc =0.0
function toCheckout() {
    if(allCartItems && cartItemsNumber !=0){
        var newCartItems = [];
        var cartDivs = document.querySelectorAll(".cartItem");
        var deGrTo=localStorage.getItem("grandTotal")
        var uname=localStorage.getItem("sunupUserName")
        document.getElementById("checkoutName").value=uname;
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
    
        dbFirestore.collection("Users").doc(uid).update({
            cartItems:newCartItems,
        }).then(()=>{
            localStorage.setItem("carttocheckPrice",cipAll)
            const params = new URLSearchParams(window.location.search);

            params.set('cartTotal', cipAll);
            params.set('cartDiscount', appliedPromoPerc);
            history.replaceState(null, '', '?' + params.toString());

            document.getElementById("checkRTopDetDisocunt").innerText=localStorage.getItem("appliedPromoCode")
            document.getElementById("checkRTopDetproductCost").innerText=parseInt(deGrTo).toLocaleString()
            document.getElementById("fidiShopOffer").style.top='0vh'
            document.getElementById("catnSearchCont").style.top='35vh'
            document.getElementById("shopProducts").style.top='45vh'
            document.getElementById("drawerTitle").innerText='Checkout'
            document.getElementById("mobPgLb").innerText='Checkout'
            document.getElementById("actDrawerCart").style.right='-101%'
            document.getElementById("actDrawerProfile").style.right='-101%'
            document.getElementById("actDrawerShop").style.right='-101%'
            document.getElementById("actDrawerProduct").style.right='-101%'
            document.getElementById("actDrawerSuccessCheck").style.right='-101%'
            document.getElementById("checkoutPage").style.right='0%'
            updateDelChoice()
        })
    }else{
         Swal.fire("You have no items in cart")
    }
    
}

