$.ajax({
    url: "http://127.0.0.1:443/json/cart.json",
    dataType: "json",
    success: function(data) {
        populateTableWithData(data);
        populateCartDropdown(data);
        populateOrderSummary(data);
    },
    error: function(xhr, status, error) {
        console.error("Failed to fetch cart data:", error);
    }
});

//CARTTABLE
function populateTableWithData(data) {
    var tableBody = $('#productTableBody');
    var totalPrice = 0;
    var products = {};

    //Repeating products
    data.forEach(function(product) {
        if (!products[product.name]) {
            products[product.name] = {
                count: 0,
                totalPrice: 0
            };
        }
        products[product.name].count++;
        products[product.name].totalPrice += product.price;
    });

    tableBody.empty();

    Object.keys(products).forEach(function(productName) {
        var product = products[productName];
        var pricePerProduct = product.totalPrice / product.count;
        var row = $('<tr>');
        row.html(`
            <td><img src="${data.find(p => p.name === productName).mimage}" alt="${productName}" width="50"></td>
            <td class="bold uppercase">${productName}</td>
            <td class="bold uppercase">$${pricePerProduct.toFixed(2)}</td>
            <td class="bold uppercase">${product.count}</td>
            <td class="bold uppercase">$<span class="productTotal">${product.totalPrice.toFixed(2)}</span></td>
        `);
        tableBody.append(row);
        totalPrice += product.totalPrice;
    });
    var totalElement = $('#totalPrice');
    totalElement.text('$' + totalPrice.toFixed(2));
}

//DROPDOWN
function populateCartDropdown(data) {
    var cartList = $('#cartList');
    var totalItems = $('#totalItems');
    var totalQuantity = $('#totalQuantity');
    var subtotal = $('#subtotal');

    var totalPrice = 0;
    var itemCount = 0;
    var itemsSummary = {};

    // Count occurrences of each product and calculate total price
    data.forEach(function(product) {
        if (!itemsSummary[product.name]) {
            itemsSummary[product.name] = {
                count: 0,
                totalPrice: 0
            };
        }
        itemsSummary[product.name].count++;
        itemsSummary[product.name].totalPrice += product.price;
        totalPrice += product.price;
        itemCount++;
    });

    // Clear existing cart items
    cartList.empty();

    // Populate cart items
    Object.keys(itemsSummary).forEach(function(productName) {
        var product = itemsSummary[productName];
        var pricePerProduct = product.totalPrice / product.count;
        var productItem = $('<div class="product-widget">');
        productItem.html(`
            <div class="product-img">
                <img src="${data.find(p => p.name === productName).mimage}" alt="${productName}">
            </div>
            <div class="product-body">
                <h3 class="product-name"><a href="#product">${productName}</a></h3>
                <h4 class="product-price"><span class="qty">${product.count}x</span>$${pricePerProduct.toFixed(2)}</h4>
            </div>
        `);
        cartList.append(productItem);
    });

    totalItems.text(itemCount);
    totalQuantity.text(itemCount > 0 ? itemCount + " Item(s) selected" : "No items selected");
    subtotal.text("SUBTOTAL: $" + totalPrice.toFixed(2));
}


//CHECKOUT
function populateOrderSummary(data) {
    var orderSummaryContainer = $('#orderSummaryContainer');
    var totalPrice = 0;

    // Clear existing order summary
    orderSummaryContainer.empty();

    // Populate order summary
    var orderSummary = $('<div class="order-summary">');

    // Add product details
    data.forEach(function(product) {
        var productRow = $('<div class="order-col">');
        productRow.html(`
            <div>${product.name}</div>
            <div>$${product.price.toFixed(2)}</div>
        `);
        orderSummary.append(productRow);
        totalPrice += product.price;
    });

    // Add shipping details
    var shippingRow = $('<div class="order-col">');
    shippingRow.html(`
        <div>Shipping</div>
        <div>FREE</div>
    `);
    orderSummary.append(shippingRow);

    // Add total
    var totalRow = $('<div class="order-col">');
    totalRow.html(`
        <div><strong>TOTAL</strong></div>
        <div><strong class="order-total">$${totalPrice.toFixed(2)}</strong></div>
    `);
    orderSummary.append(totalRow);

    // Append order summary to container
    orderSummaryContainer.append(orderSummary);
}




$('#emptyCartButton').click(function() {
    $.ajax({
        url: "http://127.0.0.1:443/json/cart.json",
        type: "DELETE",
        success: function() {
            $('#productTableBody').empty();
            $('#totalPrice').text('$0.00');
        },
        error: function(xhr, status, error) {
            console.error("Failed to empty the cart:", error);         
        }
    });
});
