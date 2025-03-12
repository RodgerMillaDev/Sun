firebase.auth().onAuthStateChanged((user)=>{
    var uid=user.uid;
    console.log(uid)
    if(uid==="VBiIUAdnhVTTB2ihVTBmKrXkK6f1"){
        document.getElementById("preloaderWrap").style.display="none"

    }else{
        window.location.href="index.html"
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