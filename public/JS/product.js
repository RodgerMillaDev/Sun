function addProductQuantity(productDocId) {
    var itemEl = document.getElementById("ProductQuantityPG");
    var singleitemTotalPrice = document.getElementById("viewProPrice");
    var itemOrgPrice = parseInt(document.getElementById("viewOrgPrice").innerText);
    var itemNumber = parseInt(itemEl.innerText);
    if (itemNumber < 50) {
        itemNumber++;
        itemEl.innerText = itemNumber;
        let toBuyJSON = JSON.parse(localStorage.getItem("toBuyJSON"));
        if (toBuyJSON) {
            toBuyJSON.productQuantity = itemNumber;
            localStorage.setItem("toBuyJSON", JSON.stringify(toBuyJSON));
        }
        singleitemTotalPrice.innerText =  (itemOrgPrice * itemNumber).toLocaleString();
        cartUpdates[productDocId] = itemNumber;
    }
}

function minusProductQuantity(productDocId) {
    var itemEl = document.getElementById("ProductQuantityPG");
    var singleitemTotalPrice = document.getElementById("viewProPrice");
    var itemOrgPrice = parseInt(document.getElementById("viewOrgPrice").innerText);
    var itemNumber = parseInt(itemEl.innerText);
    if (itemNumber > 1) {
        itemNumber--;
        itemEl.innerText = itemNumber;
        let toBuyJSON = JSON.parse(localStorage.getItem("toBuyJSON"));
        if (toBuyJSON) {
            toBuyJSON.productQuantity = itemNumber;
            localStorage.setItem("toBuyJSON", JSON.stringify(toBuyJSON));
        }
    
        singleitemTotalPrice.innerText = (itemOrgPrice * itemNumber).toLocaleString();
        cartUpdates[productDocId] = itemNumber;
    }
}