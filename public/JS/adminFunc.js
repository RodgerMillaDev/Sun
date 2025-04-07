async function getSMSBalance(){
    try {
        const url= "https://official-backend-sunup.onrender.com/smsBalance"
        // const url= "http://localhost:4455/smsBalance"
        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({aloo:"aloo"})
        })
        const result = await response.json()
        if(result["response-code"]==200){
            
            var deBalance=result.credit
            Swal.fire({
                title: deBalance,
                text: `Your credit balance is ${deBalance}. Do you want to top up?`,
                showCancelButton: true,
                confirmButtonColor: "#003335",
                cancelButtonColor: "#003335",
                confirmButtonText: "Top up",
                cancelButtonText: "Cancel"
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href="https://sms.textsms.co.ke/auth/login"
                }
              });
        }
        console.log(result)
     
    } catch (error) {
       
           console.log(error)
    }
}
function pullAnalysis(){
    dbFirestore.collection("Orders").get().then((docs)=>{
        var totalSales=0;
        docs.forEach(doc => {
            totalSales+=parseInt(doc.data().paidAmount);
        });
    
        document.getElementById("allSales").innerText=totalSales
        document.getElementById("totalOrders").innerText=docs.size
    
    }).catch((error)=>{
        console.log(error)
    })
}
pullAnalysis()
function pullOrders(viewStatus) {
    dbFirestore.collection("Orders").where("orderStatus", "==", viewStatus).get().then((docs) => {
        let orderRow = '';
        docs.forEach(doc => {
            let docId = doc.id;  // ✅ Fix: Correct way to get document ID
            let orderData = doc.data();
            let orderId = orderData.orderID;
            let date = orderData.date;
            let orderNumber = orderData.orderNumber;
            let fon = orderData.fon;
            let time = orderData.time;
            let cartItems = orderData.cartItems;
            let county = orderData.county;
            let dlArea = orderData.dlArea;
            let dlBuilding = orderData.dlBuilding;
            let name = orderData.name;
            let route = orderData.route;
            let town = orderData.town;
            // Encode cartItems properly to avoid issues with special characters
            let encodedCartItems = encodeURIComponent(JSON.stringify(cartItems));
            orderRow += `
               <tr onclick="viewOrder('${viewStatus}','${docId}', '${orderId}', '${fon}', '${encodedCartItems}', '${county}', '${dlArea}', '${dlBuilding}', '${name}', '${route}', '${town}')">
                    <td class="orderNoTb"><p>${orderNumber}</p></td>
                    <td class="orderPhoneTb"><p>${fon}</p></td>
                    <td class="orderDateTb"><p>${date}</p></td>
                    <td class="orderDateTb"><p>${time}</p></td>
               </tr>
            `;
        });

        document.getElementById("ordersTable").innerHTML = orderRow;
    }).catch(error => {
        console.log("Error fetching orders:", error);
    });
}

pullOrders("Pending");

function viewOrder(viewStatus,docId, orderId, fon, cartItems, county, dlArea, dlBuilding, name, route, town) {
    // ✅ Decode and parse cartItems

    if(viewStatus=="Pending"){
        document.getElementById("viewBackBtn").style.width="49%"
        document.getElementById("clearBtn").style.display="block"
    }else{
        document.getElementById("clearBtn").style.display="none"
        document.getElementById("viewBackBtn").style.width="100%"
    }
    
    
    let parsedCartItems = JSON.parse(decodeURIComponent(cartItems));

    console.log("Cart Items in viewOrder:", parsedCartItems);  // ✅ Console log cartItems

    document.getElementById("viewID").innerText = docId;
    document.getElementById("voname").innerText = name;
    document.getElementById("vofon").innerText = fon;
    document.getElementById("voCounty").innerText = county;

    if (county === "Nairobi") {
        document.getElementById("votown").style.display = "none";
        document.getElementById("voroute").style.display = "block";
        document.getElementById("voarea").style.display = "block";
        document.getElementById("vobuilding").style.display = "block";
        document.getElementById("voroute").innerText = route;
        document.getElementById("voarea").innerText = dlArea;
        document.getElementById("vobuilding").innerText = dlBuilding;
    } else {
        document.getElementById("voroute").style.display = "none";
        document.getElementById("voarea").style.display = "none";
        document.getElementById("vobuilding").style.display = "none";
        document.getElementById("votown").style.display = "block";
        document.getElementById("votown").innerText = town;
    }

    let orderProd = '';
    parsedCartItems.forEach(cartItem => {
        let img = cartItem.productUrl;
        let pname = cartItem.productName;
        let pprice = Number(cartItem.productPrice).toLocaleString('en-KE'); // For Kenyan Shillings format
        let pq = cartItem.productQuantity;

        orderProd += `
            <div class="viewOrderCart">
                <div class="vocPlacer">
                    <div class="vocImg">
                        <img width="10px" src="${img}" alt="">
                    </div>
                    <div class="vocCont">
                        <p>${pname}</p>
                        <p>Quantity ${pq}</p>
                        <p>Ksh. ${pprice}</p>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("viewOrderMid").innerHTML = orderProd;
    document.getElementById("viewOrder").style.display = 'flex';
}

function clearOrder(){
    var docid=document.getElementById("viewID").innerText;
    var fon=document.getElementById("vofon").innerText;
    var name=document.getElementById("voname").innerText;
    dbFirestore.collection("Orders").doc(docid).update({
        orderStatus:"Completed"
    }).then(()=>{    
        Swal.fire("Order Cleared", `You have cleared ${name}'s order`, "success" )
        sendDelSMS(fon,name)
        pullOrders("Pending")
        document.getElementById("viewOrder").style.display="none"

    })
}
async function sendDelSMS(fon,name){
    try {
        const url= "https://official-backend-sunup.onrender.com/sendSMSOrder"
        // const url= "http://localhost:4455/sendSMSOrder"
        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({fon,name})
        })
        const result = await response.json()

        console.log(result)
     
    } catch (error) {
       
           console.log(error)
    }

}

function removeViewOrder(){
    document.getElementById("viewOrder").style.display="none"
}
function sltOrderView(e){
   var viewStatus= e.innerText;
   var ordersBtn= document.querySelectorAll(".OrderList");
   ordersBtn.forEach(orderBtn=>[
    orderBtn.classList.remove("activeOrderList")
   ])
   e.classList.add("activeOrderList")
   pullOrders(viewStatus)


}

function vpAdmin(pid,pname,pprice,pdiscount,pdesc,pcat){
        document.getElementById("viewProductAdmin").style.display="flex"
        document.getElementById("vpahidID").innerText=pid
        document.getElementById("vpaName").value=pname
        document.getElementById("vpaPrice").value=pprice
        console.log(document.getElementById("vpaPrice").value)
        document.getElementById("vpaOffer").value=pdiscount
        document.getElementById("vpaCat").value=pcat
        document.getElementById("vpaDescription").innerText=pdesc


}

function removevpAdmin(){
    document.getElementById("viewProductAdmin").style.display="none"

}
function deleteProduct(){
    var pid=document.getElementById("vpahidID").innerText;
    console.log(pid)

    dbFirestore.collection("Products").doc(pid).delete()
    .then(() => {
        document.getElementById("viewProductAdmin").style.display="none"
        pullAllProducts()

        Swal.fire("Product Deleted", "You have successfuly deleted the product", "success")
    })
    .catch((error) => {
        console.error("Error removing product: ", error);
    });
}
function saveProduct(){
    var pid=document.getElementById("vpahidID").innerText;
    var pname=document.getElementById("vpaName").value;
    var pprice=document.getElementById("vpaPrice").value;
    var pdiscount = document.getElementById("vpaOffer").value;
    console.log(pid)
    var pcat=document.getElementById("vpaCat").value;
    var pdesc=document.getElementById("vpaDescription").innerText;
    dbFirestore.collection("Products").doc(pid).update({
        productName:pname,
        productPrice:pprice,
        productDiscount:pdiscount,
        discountPercentage:pdiscount,
        productCategory:pcat,
        productDescription:pdesc,
    }).then(()=>{
        document.getElementById("viewProductAdmin").style.display="none"
        pullAllProducts()
        Swal.fire("Product Saved", "You have successfuly updated product data", "success")

    }).catch((error) => {
        console.error("Error removing product: ", error);
    });




}

const input = document.getElementById("UploadProductName");

input.addEventListener("beforeinput", (e) => {
    // Let backspace work
    if (e.inputType === "deleteContentBackward") return;
  
    // Simulate the new input value
    const current = input.value;
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;
  
    // Insert the new character at the current cursor position
    const newValue = 
      current.slice(0, selectionStart) + e.data + current.slice(selectionEnd);
  
    const words = newValue.trim().split(/\s+/);
    if (words.length > 4) {
      e.preventDefault();
    }
  });
  async function writeMail() {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Email",
      inputPlaceholder: "Type your email here...",
      inputAttributes: {
        "aria-label": "Type your email here"
      },
      showCancelButton: true,
      confirmButtonColor: "#003335",
      cancelButtonColor: "#003335",
      confirmButtonText: "Send Mail",
      cancelButtonText: "Cancel"
    });
  
    if (text && text.trim()) {
      try {
        const url = "https://official-backend-sunup.onrender.com/sendEmail";
        // const url = "http://localhost:4455/sendEmail";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            actEmail: text,
            emails: await getMails()
          })
        });
  
        const result = await response;
        console.log(result);
  
        Swal.fire("✅ Email sent!");
      } catch (error) {
        console.error(error);
        Swal.fire("❌ Failed to send email.");
      }
    }
  }
  
  async function getMails() {
    let mails = [];
    await dbFirestore
      .collection("Users")
      .where("uid", "!=", "kJOGf3BXgpPnrj94lDuox3qdPBf1")
      .get()
      .then((users) => {
        users.forEach((user) => {
          mails.push(user.data().em);
        });
      });
    return mails;
  }
  