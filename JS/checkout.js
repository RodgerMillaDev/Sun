var cartPrice=localStorage.getItem("grandTotal");
// var discountPercent=localStorage.getItem()
function checkoutMath(){
    
}



function delCountyDet(){
    var delBtn=document.querySelector(".delCountyBtnActive");
    if(delBtn.innerText == "Nairobi"){
  
        document.getElementById("delDetRoute").style.display="flex"
        document.getElementById("delDetArea").style.display="flex"
        document.getElementById("delDetBuilding").style.display="flex"
        document.getElementById("delCountyInputWrap").style.display="none"
        document.getElementById("delCountyTownWrap").style.display="none"

        


    }else{
  
        document.getElementById("delDetRoute").style.display="none"
        document.getElementById("delDetArea").style.display="none"
        document.getElementById("delDetBuilding").style.display="none"
        document.getElementById("delCountyInputWrap").style.display="flex"
        document.getElementById("delCountyTownWrap").style.display="flex"
    }

}

function delCountyClicked(e){
    var delBtns=document.querySelectorAll(".delCountyBtn");
    delBtns.forEach(delBtn =>{
        delBtn.classList.remove("delCountyBtnActive")
        e.classList.add("delCountyBtnActive")
        delCountyDet()
    })


}

function selectedRoute(e) {
    firebase.firestore().collection(e.value).get().then((locs) => {
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
            var transportCost = selectedOption.getAttribute("data-cost"); // Get cost
            document.getElementById("checkRTopDetTransport").innerText=transportCost
        });

    }).catch(error => {
        console.error("Error fetching locations: ", error);
    });
}

