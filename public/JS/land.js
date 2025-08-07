async function sendMailtoSun(){
    var userMail=document.getElementById("sayHelloMail").value;

    if(userMail){
        try {

        const url = "https://official-backend-sunup-2003.onrender.com/sendMailToSun";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userMail: userMail,
      })
    });

    const result = await response;

    Swal.fire("Email sent!");
    } catch (error) {
    console.error(error);
    Swal.fire("❌ Failed to send email.");
  }
    }else{
        return;
    }
  
}