var cartPrice=localStorage.getItem("grandTotal");

// var discountPercent=localStorage.getItem()
function checkoutMath(transportCost){
    var prevCost=parseInt(localStorage.getItem("grandTotal"))
    const gt=prevCost+transportCost
    document.getElementById("checkRTopDetGrandDisocunt").innerText=parseInt(gt).toLocaleString()
    document.getElementById("cardPrice").innerText=parseInt(gt).toLocaleString()
}

function delCountyClicked(e){
    var delBtns=document.querySelectorAll(".delCountyBtn");
    delBtns.forEach(delBtn =>{
        delBtn.classList.remove("delCountyBtnActive")
        e.classList.add("delCountyBtnActive")
        updateDelChoice()
    })

}

function selectedRoute(e) {
    dbFirestore.collection(e.value).get().then((locs) => {
        var selectTag = document.createElement("select"); // Create a new <select> element
        selectTag.name = "area"; 
        selectTag.id = "delAreaInput"; 

        // Create and append the default "Select Area" option
        var defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select Area";
        selectTag.appendChild(defaultOption);

        locs.forEach(loc => {
            var locName = loc.data().areaName;
            var locCost = loc.data().transportCost; // Get transport cost

            // Create an <option> element
            var option = document.createElement("option");
            option.value = locName;
            option.textContent = locName;
            option.setAttribute("data-cost", locCost); // Store cost as a data attribute

            // Append the option to the select element
            selectTag.appendChild(option);
        });

        // Append the new <select> inside the div with id 'delDetArea'
        var delDetArea = document.getElementById("delDetArea");
        delDetArea.innerHTML = ""; // Clear previous content
        delDetArea.appendChild(selectTag);

        // Add event listener to log the selected transport cost
        selectTag.addEventListener("change", function() {
            var selectedOption = selectTag.options[selectTag.selectedIndex]; // Get selected option
            var transportCost = parseInt(selectedOption.getAttribute("data-cost")); // Get cost
            document.getElementById("checkRTopDetTransport").innerText=transportCost
            checkoutMath(transportCost)
        });

    }).catch(error => {
        console.error("Error fetching locations: ", error);
    });
}

async function payNow(){
    var sltCounty=document.querySelector(".delCountyBtnActive").innerText; 
    var nm=document.getElementById("checkoutName").value;
    var delfon=document.getElementById("delPhone").value;
    var uid=localStorage.getItem("sununpUID")
    var em=localStorage.getItem("emUserName")
  
    if(sltCounty=="Nairobi"){
        document.getElementById("payNowBtn").style.display="none"
        document.getElementById("checkPayLoader").style.display="block"
        var route=document.getElementById("Route").value;
        var dlArea=document.getElementById("delAreaInput").value;
        var delBuilding=document.getElementById("delDetBuildingInp").value;
        console.log("nm:", nm, "delfon:", delfon, "sltCounty:", sltCounty, "town:", town, "route:", route, "dlArea:", dlArea, "delBuilding:", delBuilding);
        if(nm&&delfon&&route&&dlArea&&delBuilding){
            var county= "Nairobi"
          try {
            const url= "http://localhost:4455/payNow"
            // const url= "https://official-backend-sunup.onrender.com/payNow"
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
    
                },
                body:JSON.stringify({nm,delfon,em,county,route,town:"",dlArea,delBuilding,uid})
            })
            const result = await response.json()
            if(result.status==true){
                var accessCode=result.data.accessCode;
                var refCode=result.data.reference;
                var authUrl=result.data.authorization_url
                localStorage.setItem('refCodePay',refCode)
                console.log(localStorage.getItem('refCodePay'))
                window.location.href=authUrl
            }else{
                Swal.fire("Error", "An error occured try again", "error")
             }
        document.getElementById("payNowBtn").style.display="block"
        document.getElementById("checkPayLoader").style.display="none"
        } catch (error) {
               document.getElementById("payNowBtn").style.display="block"
        document.getElementById("checkPayLoader").style.display="none"
            console.log(error)
        }

        }else{

            Swal.fire("Missing Data", "Fill in all the delivery data", "info")
            document.getElementById("payNowBtn").style.display="block"
            document.getElementById("checkPayLoader").style.display="none"
        }

    }else{
        var county=document.getElementById("delCountyInput").value;
        var town=document.getElementById("delCountyTownInput").value;
        if(nm,delfon,county,town){
            try {
                // const url= "https://official-backend-sunup.onrender.com/payNow"
                const url= "http://localhost:4455/payNow"
                const response = await fetch(url,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({nm,delfon,em,county,route:"",town,uid,dlArea:"",delBuilding:""})
                })
                const result = await response.json()
                if(result.status==true){
                    var accessCode=result.data.accessCode;
                    var refCode=result.data.reference;
                    var authUrl=result.data.authorization_url
                    localStorage.setItem('refCodePay',refCode)
                    console.log(localStorage.getItem('refCodePay'))
                    window.location.href=authUrl

                }else{
                   Swal.fire("Error", "An error occured try again", "error")
                }
            document.getElementById("payNowBtn").style.display="block"
            document.getElementById("checkPayLoader").style.display="none"
            } catch (error) {
                   document.getElementById("payNowBtn").style.display="block"
        document.getElementById("checkPayLoader").style.display="none"
                console.log(error)
            }

        }else{
            Swal.fire("Missing Data", "Fill in all the delivery data", "info")
            document.getElementById("payNowBtn").style.display="block"
            document.getElementById("checkPayLoader").style.display="none"
        }


    }

}

function updateDelChoice(){
    var sltCounty=document.querySelector(".delCountyBtnActive").innerText;
    if(sltCounty=="Nairobi"){
        document.getElementById("delCountyInputWrap").style.display="none";
        document.getElementById("delCountyTownWrap").style.display="none";
        document.getElementById("delDetRoute").style.display="block";
        document.getElementById("delDetArea").style.display="block";
        document.getElementById("delDetBuilding").style.display="block";
    }else{
        document.getElementById("delCountyInputWrap").style.display="flex";
        document.getElementById("delCountyTownWrap").style.display="flex";
        document.getElementById("delDetRoute").style.display="none";
        document.getElementById("delDetArea").style.display="none";
        document.getElementById("delDetBuilding").style.display="none"; 
    }

}


