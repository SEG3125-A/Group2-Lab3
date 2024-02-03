window.onload = function () {
  document.getElementById("defaultOpen").click();
  uncheckAll();

  products.sort(function (p1, p2) {
    return p1.price - p2.price;
  });

  console.log(products);

  restrictProductChoices();

  let cart = document.getElementById("displayCart");
  let numOfItems = products.reduce(function (p1, p2) {
    return p1 + p2.quantity;
  }, 0);

  if (numOfItems === 0) {
    cart.innerHTML = "";
    cart.appendChild(
      document.createTextNode(
        "You currently have no items in your shopping cart."
      )
    );
  }

};

function uncheckAll() {
  var checkbox = document.getElementsByTagName("input");
  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox[i].type == "checkbox") {
      checkbox[i].checked = false;
    }
  }
 
}

function restrictProductChoices() {
  selectedItems();
  for (let i = 0; i < products.length; i++) {
    products[i].quantity = 0;
  }

  products.sort(function (p1, p2) {
    return p1.price > p2.price;
  });

  let glutenRestriction = document.getElementById("glutenIntolerant");
  let nonVegetarianRestriction = document.getElementById("vegetarian");
  let organicRestriction = document.getElementById("organic");

  document.getElementById("displayProduct").innerHTML = "";

  let display = document.getElementById("displayProduct");

  let optionArray = products;

  if (glutenRestriction.checked) {
    optionArray = optionArray.filter((product) => product.glutenFree);
  }
  if (nonVegetarianRestriction.checked) {
    optionArray = optionArray.filter((product) => product.vegetarian);
  }
  if (organicRestriction.checked) {
    optionArray = optionArray.filter((product) => product.organic);
  }

  for (i = 0; i < optionArray.length; i++) {
    let productName = optionArray[i].name;
    let productPrice = optionArray[i].price;
    let glutenFree = optionArray[i].glutenFree;
    let vegetarian = optionArray[i].vegetarian;
    let organic = optionArray[i].organic;
    var img = document.createElement('img');
    img.src = optionArray[i].image; // Utilisez l'image du produit filtré
    img.alt = optionArray[i].name;
    img.className = 'productImage'; // Appliquez la classe pour le style


    let productCheckboxDiv = document.createElement("div");
    productCheckboxDiv.className = "productCheckboxDiv";

    let productLabelPriceDiv = document.createElement("div");
    productLabelPriceDiv.className = "productLabelPriceDiv";

    let label = document.createElement("label");
    label.htmlFor = productName;

    productCheckboxDiv.appendChild(img);

    label.appendChild(document.createTextNode(productName));
    productLabelPriceDiv.appendChild(label);

    productCheckboxDiv.appendChild(productLabelPriceDiv);

    let productDetailsDiv = document.createElement("div");
    productDetailsDiv.className = "productDetailsDiv";

    if (glutenFree) {
      let glutenDiv = document.createElement("div");
      glutenDiv.className = "descriptionDiv";
      glutenDiv.appendChild(document.createTextNode("Gluten"));
      productDetailsDiv.appendChild(glutenDiv);
    }

    if (organic) {
      let organicDiv = document.createElement("div");
      organicDiv.className = "descriptionDiv";
      organicDiv.appendChild(document.createTextNode("Organic"));
      productDetailsDiv.appendChild(organicDiv);
    }

    if (vegetarian) {
      let vegeterianDiv = document.createElement("div");
      vegeterianDiv.className = "descriptionDiv";
      vegeterianDiv.appendChild(document.createTextNode("For vegetarian"));
      productDetailsDiv.appendChild(vegeterianDiv);
    }

    productCheckboxDiv.appendChild(productDetailsDiv);

    let priceDiv = document.createElement("div");
    priceDiv.className = "priceDiv";
    priceDiv.appendChild(document.createTextNode("$" + productPrice));
    productCheckboxDiv.appendChild(priceDiv);

    let AddProductsButtonsDiv = document.createElement("div");
    AddProductsButtonsDiv.className = "addProductsButtonsDiv";
    let addBtn = document.createElement("button");
    addBtn.className = "addProductButton";
    addBtn.id = "addProductButton";
    addBtn.onclick = function () {
      let num = document.getElementById(productName);
      let temp = parseInt(num.innerHTML.toString());
      temp++;
      num.innerHTML = temp.toString();

      let product = products.find(
        (prod) => prod.name.localeCompare(productName) === 0
      );
      product.quantity = temp;
      selectedItems();
    };

    let removeBtn = document.createElement("button");
    removeBtn.id = "removeProductButton";
    removeBtn.className = "removeProductButton";
    removeBtn.onclick = function () {
      let num = document.getElementById(productName);
      if (num.innerHTML.toString() > 0) {
        let temp = parseInt(num.innerHTML.toString());
        temp--;
        num.innerHTML = temp.toString();

        let product = products.find(
          (prod) => prod.name.localeCompare(productName) === 0
        );
        product.quantity = temp;
        selectedItems();
      }
    };

    addBtn.appendChild(document.createTextNode("+"));
    removeBtn.appendChild(document.createTextNode("-"));
    AddProductsButtonsDiv.appendChild(removeBtn);
    AddProductsButtonsDiv.appendChild(addBtn);

    let numberOfElementsInputDiv = document.createElement("div");
    numberOfElementsInputDiv.className = "numberOfElementsInputDiv";
    

    let quantityText = document.createElement("p");
    quantityText.appendChild(document.createTextNode("Quantity: "));

    let numberOfElementsInput = document.createElement("p");
    numberOfElementsInput.id = productName;
    numberOfElementsInput.className = "numberOfElementsInput";
    numberOfElementsInput.appendChild(document.createTextNode("0"));

    numberOfElementsInputDiv.appendChild(quantityText);
    numberOfElementsInputDiv.appendChild(numberOfElementsInput);

    productCheckboxDiv.appendChild(AddProductsButtonsDiv);
    productCheckboxDiv.appendChild(numberOfElementsInputDiv);

    display.appendChild(productCheckboxDiv);

    display.appendChild(document.createElement("br"));
  }
}
function displayProducts() {
  var productList = document.getElementById('displayProduct');
  // productList.innerHTML = '';  Nettoie le contenu existant

  products.forEach(function(product) {
    var productContainer = document.createElement('div');
    var img = document.createElement('img');
    img.src = product.image; // Assurez-vous d'utiliser 'product.image'
    img.alt = product.name;
    img.className = 'productImage'; // Utilise la classe pour le style
    productContainer.appendChild(img);
    //productList.appendChild(productContainer);
  });
}

function selectedItems() {
  let cart = document.getElementById("displayCart");
  let numOfItems = products.reduce(function (p1, p2) {
    return p1 + p2.quantity;
  }, 0);

  if (numOfItems === 0) {
    cart.innerHTML = "";
    cart.appendChild(
      document.createTextNode(
        "You currently have no items in your shopping cart."
      )
    );
  } else {
    let glutenRestriction = document.getElementById("glutenIntolerant");
    let nonVegetarianRestriction = document.getElementById("vegetarian");
    let organicRestriction = document.getElementById("organic");

    let optionArray = products;

    if (glutenRestriction.checked) {
      optionArray = optionArray.filter((product) => product.glutenFree);
    }
    if (nonVegetarianRestriction.checked) {
      optionArray = optionArray.filter((product) => product.vegetarian);
    }
    if (organicRestriction.checked) {
      optionArray = optionArray.filter((product) => product.organic);
    }

    cart.innerHTML = "";

    let yourShoppingCartContainsDiv = document.createElement("div");
    yourShoppingCartContainsDiv.className = "yourShoppingCartContainsDiv";
    let yourShoppingCartContains = document.createElement("p");
    yourShoppingCartContains.appendChild(
      document.createTextNode(
        "Your shopping cart contains the following items:"
      )
    );
    yourShoppingCartContainsDiv.appendChild(yourShoppingCartContains);

    cart.appendChild(yourShoppingCartContainsDiv);

    let productsInCartDiv = document.createElement("div");
    productsInCartDiv.className = "productsInCartDiv";

    for (i = 0; i < optionArray.length; i++) {
      if (optionArray[i].quantity > 0) {
        let itemDiv = document.createElement("div");
        itemDiv.className = "itemDiv";

        let itemNameAndPriceDiv = document.createElement("div");
        itemNameAndPriceDiv.className = "itemNameAndPriceDiv";

        let para = document.createElement("p");
        para.className = "cartItem";

        para.appendChild(document.createTextNode(optionArray[i].name + " - "));

        let singleProductPrice = document.createElement("span");
        singleProductPrice.className = "singleProductPrice";

        singleProductPrice.appendChild(
          document.createTextNode(
            "$" + optionArray[i].price + " x " + optionArray[i].quantity
          )
        );

        let productName = optionArray[i].name;

        para.appendChild(singleProductPrice);
        itemNameAndPriceDiv.appendChild(para);

        let removeFromCartBtnDiv = document.createElement("div");
        removeFromCartBtnDiv.className = "removeFromCartBtnDiv";

        let removeFromCartBtn = document.createElement("button");

        removeFromCartBtn.onclick = function () {
          let num = document.getElementById(productName);
          num.innerHTML = 0;

          let product = products.find(
            (prod) => prod.name.localeCompare(productName) === 0
          );
          product.quantity = 0;
          selectedItems();
        };

        removeFromCartBtn.className = "removeFromCartBtn";
        removeFromCartBtn.id = "removeFromCartBtn-" + optionArray[i].name;
        removeFromCartBtn.appendChild(
          document.createTextNode("Remove item from cart")
        );

        removeFromCartBtnDiv.appendChild(removeFromCartBtn);

        itemDiv.appendChild(removeFromCartBtnDiv);
        itemDiv.appendChild(itemNameAndPriceDiv);

        productsInCartDiv.appendChild(itemDiv);
      }
    }

    cart.appendChild(productsInCartDiv);

    let totalPriceDiv = document.createElement("div");
    totalPriceDiv.className = "totalPriceDiv";

    let yourTotalPrice = document.createElement("p");
    yourTotalPrice.appendChild(
      document.createTextNode("Your total price is: ")
    );

    let totalPriceFigure = document.createElement("span");
    totalPriceFigure.className = "totalPriceFigure";
    totalPriceFigure.appendChild(
      document.createTextNode("$" + getTotalPrice().toFixed(2))
    );
    yourTotalPrice.appendChild(totalPriceFigure);

    totalPriceDiv.appendChild(yourTotalPrice);

    cart.appendChild(totalPriceDiv);
  }
}

function getTotalPrice() {
  let glutenRestriction = document.getElementById("glutenIntolerant");
  let nonVegetarianRestriction = document.getElementById("vegetarian");
  let organicRestriction = document.getElementById("organic");

  let optionArray = products;

  if (glutenRestriction.checked) {
    optionArray = optionArray.filter((product) => product.glutenFree);
  }
  if (nonVegetarianRestriction.checked) {
    optionArray = optionArray.filter((product) => product.vegetarian);
  }
  if (organicRestriction.checked) {
    optionArray = optionArray.filter((product) => product.organic);
  }

  totalPrice = 0;
  for (let i = 0; i < optionArray.length; i++) {
    totalPrice += optionArray[i].price * optionArray[i].quantity;
  }
  return totalPrice;
}

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
