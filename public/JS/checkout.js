var cartPrice=localStorage.getItem("grandTotal");

// var discountPercent=localStorage.getItem()
function checkoutMath(transportCost){
    var prevCost=parseInt(localStorage.getItem("carttocheckPrice"))
    const gt=prevCost+transportCost
    document.getElementById("checkRTopDetGrandDisocunt").innerText=gt
    document.getElementById("cardPrice").innerText=gt
}

// const observer = new MutationObserver(() => {
//     var url= decodeURIComponent(window.location.search);
//     var urlObj=new URLSearchParams(url)
//     const cartTotal = urlObj.get('cartTotal');
//     const cartDiscount = urlObj.get('cartDiscount');
//     document.getElementById("checkRTopDetDisocunt").innerText=cartDiscount
//     document.getElementById("checkRTopDetproductCost").innerText=cartTotal
//     checkoutMath()
// });
// observer.observe(document, { subtree: true, childList: true });





function delCountyClicked(e){
    var delBtns=document.querySelectorAll(".delCountyBtn");
    delBtns.forEach(delBtn =>{
        delBtn.classList.remove("delCountyBtnActive")
        e.classList.add("delCountyBtnActive")
        delCountyDet()
    })
}

function selectedRoute(e) {
    dbFirestore.collection(e.value).get().then((locs) => {
        var selectTag = document.createElement("select"); // Create a new <select> element
        selectTag.name = "area"; 
        selectTag.id = "dynamicSelect"; 

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
function payNow(){
    var delCounty=document.querySelector(".delCountyBtnActive").innerText;
    var delName=document.getElementById("delName").value;
    var delPhone=document.getElementById("delPhone").value;
    var delCountyInput=document.getElementById("delCountyInput").value;
    var delCountyTownWrap=document.getElementById("delCountyTownInput").value;
    var delRoute=document.getElementById("Route").value;
    var delDetArea=document.getElementById("delAreaInput").value;
    var delBuilding=document.getElementById("delDetBuilding").value;


    if(delCounty=="Nairobi"){
        if(delName&&delPhone&&delRoute&&delDetArea&&delBuilding){
            var deliveryDet=delName+"?"+delPhone+"?"+delRoute+"?"+delDetArea+"?"+delBuilding
            localStorage.setItem("deliveryDet",deliveryDet)               
            document.getElementById("fidiShopOffer").style.top='0vh'
            document.getElementById("catnSearchCont").style.top='35vh'
            document.getElementById("shopProducts").style.top='45vh'
            document.getElementById("drawerTitle").innerText='Product'
            document.getElementById("actDrawerCart").style.right='-101%'
            document.getElementById("actDrawerProfile").style.right='-101%'
            document.getElementById("actDrawerShop").style.right='-101%'
            document.getElementById("actDrawerProduct").style.right='-101%'
            document.getElementById("checkoutPage").style.right='-101%'
            document.getElementById("actDrawerSuccessCheck").style.right='0%'
            
        }else{
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "warning",
                title: "Delivery details are missing..."
              });
        }

    }else{
    }
}