const itemsContainer = document.getElementById("items");
const totalSalesEl = document.getElementById("totalSales");
const productForm = document.getElementById("productForm");
const exportButton = document.createElement("button");

// Load items from localStorage or initialize as empty array
let items = JSON.parse(localStorage.getItem("items")) || [];

// Update total sales
function updateTotalSales() {
  const total = items.reduce((sum, item) => sum + item.sold * item.price, 0);
  totalSalesEl.textContent = `Total Sales: ₹${total}`;
}

// Save items to localStorage
function saveItemsToLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

// Render the items
function renderItems() {
  itemsContainer.innerHTML = ""; // Clear the list
  items.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "list-group-item";

    const itemInfo = document.createElement("div");
    itemInfo.innerHTML = `<strong>${item.name}</strong> - ₹${item.price} | Sold: ${item.sold} | Added on: ${item.date}`;

    // "Increase" button
    const increaseButton = document.createElement("button");
    increaseButton.className = "btn btn-success";
    increaseButton.textContent = "+";
    increaseButton.onclick = () => {
      items[index].sold++;
      saveItemsToLocalStorage();
      updateTotalSales();
      renderItems();
    };

    // "Decrease" button
    const decreaseButton = document.createElement("button");
    decreaseButton.className = "btn btn-danger";
    decreaseButton.textContent = "-";
    decreaseButton.onclick = () => {
      if (items[index].sold > 0) {
        items[index].sold--;
        saveItemsToLocalStorage();
        updateTotalSales();
        renderItems();
      } else {
        alert("Sold count cannot be less than 0!");
      }
    };

    // "Remove" button
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-remove";
    removeButton.textContent = "Remove";
    removeButton.onclick = () => {
      // Remove the item from the array
      items.splice(index, 1);
      saveItemsToLocalStorage();
      renderItems();
      updateTotalSales();
    };

    const buttonGroup = document.createElement("div");
    buttonGroup.appendChild(increaseButton);
    buttonGroup.appendChild(decreaseButton);
    buttonGroup.appendChild(removeButton);

    itemDiv.appendChild(itemInfo);
    itemDiv.appendChild(buttonGroup);
    itemsContainer.appendChild(itemDiv);
  });
}

// Handle new product form submission
productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  const date = new Date().toLocaleDateString(); // Get current date

  if (name && !isNaN(price) && price > 0) {
    items.push({ name, price, sold: 0, date });
    saveItemsToLocalStorage();
    renderItems();
    updateTotalSales();
    productForm.reset();
  } else {
    alert("Please enter valid product details!");
  }
});


// Initial rendering of items and sales
renderItems();
updateTotalSales();
