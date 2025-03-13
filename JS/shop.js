
var dbFirestore=firebase.firestore();
var uid;
var isLoggedIn=false
let allCartItems=false

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
         uid=user.uid;
         isLoggedIn=true;
    }else{
        isLoggedIn=false;
    }
})

function updateCartCount(){

    
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
         uid=user.uid;
         isLoggedIn=true;


         if(isLoggedIn){
            dbFirestore.collection("Users").doc(uid).get().then((doc)=>{
                allCartItems=doc.data().cartItems
                var cartItemsNumber=allCartItems.filter(item =>item !== "").length;
                document.getElementById("lapiCartNumber").innerText=cartItemsNumber
            })
    
        }else{
            console.log("User not signed in")
    
        }
    }else{
        isLoggedIn=false;
    }
})
    
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
                                <button class="tocartShopBtn" onclick="addToCartAllPro('${pid}','${pprice}','${pdesc}','${pimg}','${pname}','${pcat}','${pdisc}')"><i class="icofont-cart-alt"></i></button>
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
                                title: "Sign in to proceed"
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
      console.log(availableCartItem)
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
            
    
    
            cartItemDiv+=`
            
    
                            <div class="cartItem" id="cartItem${productDocId}">
                                <div class="cartItemWrap">
                                    <div class="cartImgNDetail">
                                        <img width="100px" src="${productUrl}" alt="">
                                        <div class="cartItemDet">
                                            <h4>${productName}</h4>
                                            <p>${productCat}</p>
                                            <h4>Ksh. ${productPrice}</h4>
        
        
                                        </div>
                                    </div>
                                  
                                    <div class="quantNRemove">
                                        <div class="remvCartItem" onclick="removeCartItem('${productDocId}')">
                                              <i class="fa-solid fa-trash"></i>
                                        </div>
                                        <div class="quantCart">
                                            <div class="addItemCart" onclick="addProductQuantityCart('${productDocId}')">
                                               <p>+</p>
                                            </div>
                                            <p>${productQuantity}</p>
                                            <div class="minusItemCart" onclick="minusProductQuantityCart('${productDocId}')">
                                                <p>-</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
             
            `
    
        })

      }else{
        console.log('no cart item')
        
        cartItemDiv+=`
            <div id="emptyCart">
                            <img src="./Media/empty cart.png" alt="">
                            <p>Your cart is empty</p>
                        </div>

          `
      }
      

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
                  // Update the document in Firestore with the modified array
                    dbFirestore.collection("Users").doc(uid).update({
                        cartItems: cartArray
                    }).then(() => {
                
                        console.log("Item deleted successfully.");
                        // reupdateGrandTotal()
                        updateCartCount(uid)
                        toCart()
            
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