
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
                updateGrandTotal()
    
    
            }else{
                appliedPromoPerc = 0.0; // Reset promo if invalid
                updateGrandTotal(); // Ensure the price updates
                Swal.fire("Invalid Promo Code", "Please enter a valid code.", "error");
    
            }
        })
    }
  
    
}