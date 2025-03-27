var dbFirestore = firebase.firestore();


firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        var uid=user.uid;
        console.log(uid)
        if(uid==="VBiIUAdnhVTTB2ihVTBmKrXkK6f1"){
            document.getElementById("preloaderWrap").style.display="none"
    
        }else{
            window.location.href="index.html"
        }
    }else{
        window.location.href="index.html"
    }
  
})


function toUploadProduct(){
    document.getElementById("adminMenuNavId").style.left="-101%"
    document.getElementById("adminDashboard").style.right="-105%"
    document.getElementById("AllProducts").style.right="-105%"
    document.getElementById("UploadLocation").style.right="-105%"
    document.getElementById("UploadProduct").style.right="0%"
 }


 
function toDestination(){
    document.getElementById("adminMenuNavId").style.left="-101%"
    document.getElementById("adminDashboard").style.right="-105%"
    document.getElementById("AllProducts").style.right="-105%"
    document.getElementById("UploadProduct").style.right="-105%"
    document.getElementById("UploadLocation").style.right="0%"
  }
  

async function uploadProduct(e){
    var ProductImg=document.getElementById("ProImageFileInput").files[0];
    var ProductName=document.getElementById("UploadProductName").value;
    var ProductPrice=document.getElementById("UploadProductPrice").value;
    var ProductCategory=document.getElementById("UploadProductCategory").value;
    var ProductDescription=document.getElementById("UploadProductDescription").value;
    if(ProductImg && ProductName && ProductPrice && ProductCategory && ProductDescription){
       document.getElementById("uploadProductBtn").style.display="none"
       document.getElementById("uploadProLoader").style.display="block"

        try {
            const formData = new FormData();
            formData.append("image",ProductImg)
            formData.append("prodPrice",ProductPrice)
            formData.append("prodName",ProductName)
            formData.append("prodCat",ProductCategory)
            formData.append("prodDesc",ProductDescription)
            console.log(ProductPrice)
            var backUrl='http://localhost:3333/upload';
            const response = await fetch(backUrl,{
                method:'POST',
                body: formData,

            })
            const result = await response.json()
            console.log(result)
            if(result==="Upload Done"){
                Swal.fire("Product Uploaded")
                document.getElementById("ProImageFileInput").value=null;
                document.getElementById("UploadProductName").value="";
                document.getElementById("UploadProductPrice").value="";
                document.getElementById("UploadProductCategory").value="";
                document.getElementById("UploadProductDescription").value="";
                document.getElementById("selectedImage").src="";
                document.getElementById("uploadProductBtn").style.display="block"
                document.getElementById("uploadProLoader").style.display="none"
            }else{

            }
            

        } catch (error) {
               document.getElementById("uploadProductBtn").style.display="block"
               document.getElementById("uploadProLoader").style.display="none"
            console.log(error)
            
        }



    }else{
        Swal.fire("Fill in all the data")
    }
}

function toProducts(){
    pullAllProducts()
    document.getElementById("UploadLocation").style.right="-105%"

    document.getElementById("UploadProduct").style.right="-105%"
    document.getElementById("adminMenuNavId").style.left="-101%"
    document.getElementById("adminDashboard").style.right="-105%"
    document.getElementById("AllProducts").style.right="0%"
 }


function pullAllProducts(){
    firebase.firestore().collection("Products").get().then((Products)=>{
      
        var productListDiv=''
        Products.forEach(product => {
            
            var pname=product.data().productName;
            var pprice=product.data().productPrice;
            var pdiscount=product.data().productDiscount;
            productListDiv +=`
             <tr>
                <td class="prodNameTb"><p>${pname}</p> </td>
                <td class="prodPiceTb"><p>${pprice}</p></td>
                <td class="prodOfferTb"> <p>${pdiscount}% 0FF</p></td>
            </tr>
        

            `
            
        });

        document.getElementById("allProductsTable").innerHTML=productListDiv;

    })
}



function uplodLoc(){
    var County =document.getElementById("County").value;
    var Route =document.getElementById("Route").value;
    var areaName =document.getElementById("areaName").value;
    var transportCost =document.getElementById("transportCost").value;

    if(County && areaName && transportCost && Route){
        document.getElementById("uploadLocLoader").style.display="flex";
        document.getElementById("uploadLocBtn").style.display="none";
        dbFirestore.collection(Route).doc(areaName).set({
            transportCost:transportCost,
            areaName:areaName,
            county:"Nairobi",
            Route:Route,
        }).then(()=>{
            document.getElementById("County").value=""
            document.getElementById("Route").value=""
            document.getElementById("areaName").value=""
            document.getElementById("transportCost").value=""
            document.getElementById("uploadLocLoader").style.display="none";
            document.getElementById("uploadLocBtn").style.display="block";
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
                title: "Location added"
              });
        })
    }else{
        Swal.fire("fill in all the data")
    }
}

    
    function signOut(){
        firebase.auth().signOut().then(() => {
            Swal.fire("Signed out successfully").then(()=>{
              window.location.href="index.html";
              
            })
            
          }).catch((error) => {
    
            console.log(error)
            // An error happened.
          });  
    }
    
    
    async function createOffer() {
        const { value: discount } = await Swal.fire({
            title: "Input Percentage Discount",
            input: "number",
            inputPlaceholder: "e.g 23%",
            inputAttributes: {
                min: 0,
                max: 100,
                step: 1
            }
        });
    
        if (discount !== undefined && discount !== "" && !isNaN(discount)) {
            const discountValue = parseFloat(discount);
            const batch = dbFirestore.batch();
            
            dbFirestore.collection("Products").get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    const productRef = dbFirestore.collection("Products").doc(doc.id);
                    const productData = doc.data();
                    
                    // Assuming the product has a 'price' field
                    const originalPrice = productData.productPrice;
                    const discountedPrice = Math.ceil(originalPrice - (originalPrice * (discountValue / 100))); // Round up
    
                    batch.update(productRef, { 
                        discountPercentage: discountValue,
                        discountedPrice: discountedPrice 
                    });
                });
    
                return batch.commit();
            }).then(() => {
                Swal.fire("Success", "Discount applied to all products!", "success");
            }).catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
        } else {
            Swal.fire("Invalid Input", "Please enter a valid number.", "error");
        }
    }
    

  async  function createPromoCode(){
    const { value: formValues } = await Swal.fire({
        title: "Create Promo Code",
        html: `
          <input id="promoCodeInput" class="swal2-input" placeholder="Promo Code">
          <input id="promoCodePercent" class="swal2-input" placeholder="Percentage Off">
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("promoCodeInput").value,
            document.getElementById("promoCodePercent").value
          ];
        }
      });
      if (formValues) {
        firebase.firestore().collection("PromoCode").doc(formValues[0]).set({
            promoCode:formValues[0],
            promoPerc:formValues[1]
        }).then(()=>{
            Swal.fire("Success", "Promo Code created!", "success");

        })
      }else{
        return;
      }
    }