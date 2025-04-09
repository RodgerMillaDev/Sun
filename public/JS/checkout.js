var cartPrice=localStorage.getItem("grandTotal");

var discountPercent=localStorage.getItem("discountPercent")
function checkoutMath(transportCost){
    console.log(transportCost)
    var prevCost=parseInt(localStorage.getItem("grandTotal"))
    const gt=prevCost+transportCost
    document.getElementById("checkRTopDetTransport").innerText=transportCost
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
    if(e.value==""){
      checkoutMath(0)
    }else{
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
                checkoutMath(transportCost)
            });
    
        }).catch(error => {
            console.error("Error fetching locations: ", error);
        });
    }
    
}

function getFormattedDate(date = new Date()) {
    const day = date.getDate();
    const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
                   (day % 10 === 2 && day !== 12) ? 'nd' :
                   (day % 10 === 3 && day !== 13) ? 'rd' : 'th';
    const monthNames = ["Ja", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = `'${date.getFullYear().toString().slice(-2)}`;
    console.log(`${day}${suffix} ${month} ${year}`)
    return `${day}${suffix} ${month} ${year}`;
  }
  function getFormattedTime(date = new Date()) {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    console.log(`${hours}:${minutes} ${ampm}`)

    return `${hours}:${minutes} ${ampm}`;
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
        if(nm&&delfon&&route&&dlArea&&delBuilding){
            var county= "Nairobi"
          try {
            // const url= "http://localhost:4455/payNow"
            const url= "https://official-backend-sunup.onrender.com/payNow"
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
    
                },
                body:JSON.stringify({nm,delfon,em,county,route,town:"",dlArea,delBuilding,uid,date:getFormattedDate(),time:getFormattedTime()})
            })
            const result = await response.json()
            if(result.status==true){
                var accessCode=result.data.accessCode;
                var refCode=result.data.reference;
                var authUrl=result.data.authorization_url
                localStorage.setItem('refCodePay',refCode)
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
         document.getElementById("payNowBtn").style.display="none"
        document.getElementById("checkPayLoader").style.display="block"
        var county=document.getElementById("delCountyInput").value;
        var town=document.getElementById("delCountyTownInput").value;
        if(nm,delfon,county,town){
            try {
                const url= "https://official-backend-sunup.onrender.com/payNow"
                // const url= "http://localhost:4455/payNow"
                const response = await fetch(url,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({nm,delfon,em,county,route:"",town,uid,dlArea:"",delBuilding:"",date:getFormattedDate(),time:getFormattedTime()})
                })
                const result = await response.json()
                if(result.status==true){
                    var accessCode=result.data.accessCode;
                    var refCode=result.data.reference;
                    var authUrl=result.data.authorization_url
                    localStorage.setItem('refCodePay',refCode)
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
        var r =document.getElementById("Route");
        if(r.value==""){
            checkoutMath(0)
        }else{
            selectedRoute(r)
            document.getElementById("delCountyInputWrap").style.display="none";
            document.getElementById("delCountyTownWrap").style.display="none";
            document.getElementById("delDetRoute").style.display="block";
            document.getElementById("delDetArea").style.display="block";
            document.getElementById("delDetBuilding").style.display="block";
        }

    }else{
        checkoutMath(0)

        document.getElementById("delCountyInputWrap").style.display="flex";
        document.getElementById("delCountyTownWrap").style.display="flex";
        document.getElementById("delDetRoute").style.display="none";
        document.getElementById("delDetArea").style.display="none";
        document.getElementById("delDetBuilding").style.display="none"; 
    }

}


