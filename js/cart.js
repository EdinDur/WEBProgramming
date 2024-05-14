let username="edin1234";
$.ajax({
    url: "beckend/cart",
    type:"GET",
    data:{username:username},
    dataType: "json",
    success: function(data) {
        populateTableWithData(data);
        populateOrderSummary(data);
    },
    error: function(xhr, status, error) {

    }
});

$('#emptyCartButton').click(function() {
    $.ajax({
        url: "beckend/cart/delete",
        type: "DELETE",
        data:{username:username},
        success: function() {
            $('#productTableBody').empty();
            $('#totalPrice').text('$0.00');
        },
        error: function(xhr, status, error) {
            console.error("Failed to empty the cart:", error);         
        }
    });
});


//CARTTABLE
function populateTableWithData(response) {
    var responseData = response.data; // Extracting the 'data' array from the response
    var tableBody = $('#productTableBody');
    var totalPrice = 0;
    var products = {}; // Object to store unique products
    
    tableBody.empty(); // Clearing any existing table rows
    
    // Iterate over each product object in the 'data' array
    responseData.forEach(function(product) {
        var productName = product.productName;
        var productPrice = product.price;
        var productImage = product.mImage;

        // Check if product already exists in products object
        if (products[productName]) {
            // Product already exists, update quantity and total price
            products[productName].quantity++;
            products[productName].totalPrice += productPrice;
            
            var row = tableBody.find(`tr[data-name="${productName}"]`);
            row.find('.productQuantity').text(products[productName].quantity);
            row.find('.productTotal').text( products[productName].totalPrice.toFixed(2));
        } else {
            products[productName] = {
                quantity: 1,
                totalPrice: productPrice
            };

            var row = $('<tr>');
            row.attr('data-name', productName);
            var imageHtml = productImage ? `<td><img src="${productImage}" alt="${productName}" width="50"></td>` : '<td colspan="1">Image not available</td>';
            row.html(`
                ${imageHtml}
                <td class="bold uppercase">${productName}</td>
                <td class="bold uppercase">$${productPrice.toFixed(2)}</td>
                <td class="bold uppercase productQuantity">1</td>
                <td class="bold uppercase">$<span class="productTotal">${productPrice.toFixed(2)}</span></td>
            `);
            tableBody.append(row); 
        }
        
        totalPrice += productPrice; 
    });

    var totalElement = $('#totalPrice');
    totalElement.text('$' + totalPrice.toFixed(2));
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