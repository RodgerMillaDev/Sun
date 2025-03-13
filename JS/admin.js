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
        window.location.href="indexedDB.html"
    }
  
})

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

