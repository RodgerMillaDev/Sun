auth.onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid;
        if(uid==="VBiIUAdnhVTTB2ihVTBmKrXkK6f1" || uid==="kJOGf3BXgpPnrj94lDuox3qdPBf1"){
            document.getElementById("toadminLink").style.display="flex"
        }else{
            document.getElementById("toadminLink").style.display="none"

        }
        isLoggedIn = true;
        localStorage.setItem("sununpUID",uid)
        document.getElementById("shopAuth").innerText="Sign Out"
        dbFirestore.collection("Users").doc(uid).get().then((doc)=>{
            var uname = doc.data().name;
            var em = doc.data().em;
            var fr = doc.data().fonReg;
            var sr = doc.data().sexReg;

            localStorage.setItem("sunupUserName",uname)
            localStorage.setItem("emUserName",em)
            document.getElementById("checkoutName").value=uname;
            document.getElementById("setName").value=uname;
            document.getElementById("setEmail").value=em;
            if(fr !="" && sr !=""){
                document.getElementById("setPhone").value=fr;
                document.getElementById("setGender").value=sr;
            }
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
function toProfile(){
    if(isLoggedIn){
        document.getElementById("shopMainMenu").style.left="-103%"
        document.getElementById("drawerTitle").innerText='Profile Settings'
        document.getElementById("mobPgLb").innerText='Profile Settings'
        document.getElementById("actDrawerShop").style.right='-103%'
        document.getElementById("actDrawerProduct").style.right='-103%'
        document.getElementById("actDrawerCart").style.right='-103%'
        document.getElementById("checkoutPage").style.right='-103%'
        document.getElementById("actDrawerSuccessCheck").style.right='-103%'
        document.getElementById("actDrawerProfile").style.right='0'
    }else{
        Swal.fire("Log In First", "Log in to set up your profile", "info")
    }


}

function updateProfile(){
    var name=document.getElementById("setName").value;
    var em=document.getElementById("setEmail").value;
    var fr=document.getElementById("setPhone").value;
    var sr=document.getElementById("setGender").value;

    dbFirestore.collection("Users").doc(uid).update({
        em:em,
        name:name,
        fonReg:fr,
        sexReg:sr
    }).then(()=>{
        Swal.fire("Profile Updated", "Your profile has been updated", "success")
    })
}