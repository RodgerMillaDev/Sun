
var dbFirestore=firebase.firestore();
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
        productDiscount:pdisc,
    }
    localStorage.setItem("toBuyJSON",toBuyArray)
    console.log(localStorage.getItem("toBuyJSON"))
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

        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                var uid=user.uid;

                dbFirestore.collection("Users").doc(uid).get().then((userDoc)=>{
                    var userCartItems=userDoc.data().cartItems;
                    // check if prodcut already exists kwa cart

                    var existingProdIndex=userCartItems.findIndex(item => item.productDocId === pid)
                

                    if(existingProdIndex === -1){
                        Swal.fire("Item is added to cart")
                        

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
            
        })
        
        

    }
}