// Listen for authentication state changes
auth.onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid;
        isLoggedIn = true;
        document.getElementById("shopAuth").innerText="Sign Out"
        setupCartListener(); // Start listening for cart changes
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
              window.location.href="index.html";
              
            })
            
          }).catch((error) => {
    
            console.log(error)
            // An error happened.
          });  
    }

}