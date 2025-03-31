auth.onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid;
        isLoggedIn = true;
        localStorage.setItem("sununpUID",uid)
        document.getElementById("shopAuth").innerText="Sign Out"
        dbFirestore.collection("Users").doc(uid).get().then((doc)=>{
            var uname = doc.data().name;
            var em = doc.data().em;

            localStorage.setItem("sunupUserName",uname)
            localStorage.setItem("emUserName",em)
            document.getElementById("checkoutName").value=uname;

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

