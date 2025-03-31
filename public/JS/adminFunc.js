async function getSMSBalance(){
    try {
        // const url= "https://official-backend-sunup.onrender.com/getBalance"
        const url= "http://localhost:4455/smsBalance"
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
            Swal.fire(`Your sms balance is ${deBalance}`)
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
function pullPendingOrders() {
    dbFirestore.collection("Orders").where("orderStatus", "==", "pending").get().then((docs) => {
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

            console.log("Cart Items in pullPendingOrders:", cartItems);  // ✅ Debugging

            // Encode cartItems properly to avoid issues with special characters
            let encodedCartItems = encodeURIComponent(JSON.stringify(cartItems));

            orderRow += `
               <tr onclick="viewOrder('${docId}', '${orderId}', '${fon}', '${encodedCartItems}', '${county}', '${dlArea}', '${dlBuilding}', '${name}', '${route}', '${town}')">
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

pullPendingOrders();

function viewOrder(docId, orderId, fon, cartItems, county, dlArea, dlBuilding, name, route, town) {
    // ✅ Decode and parse cartItems
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
        orderStatus:"completed"
    }).then(()=>{
        sendDelSMS(fon,name)
        pullPendingOrders()
    })
}
async function sendDelSMS(fon,name){
    try {
        // const url= "https://official-backend-sunup.onrender.com/sendSMSOrder"
        const url= "http://localhost:4455/sendSMSOrder"
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


function pullCompleteOrders(){
    dbFirestore.collection("Orders").where("orderStatus", "==", "completed").get().then((docs) => {
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

            console.log("Cart Items in pullPendingOrders:", cartItems);  // ✅ Debugging

            // Encode cartItems properly to avoid issues with special characters
            let encodedCartItems = encodeURIComponent(JSON.stringify(cartItems));

            orderRow += `
               <tr onclick="viewOrder('${docId}', '${orderId}', '${fon}', '${encodedCartItems}', '${county}', '${dlArea}', '${dlBuilding}', '${name}', '${route}', '${town}')">
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