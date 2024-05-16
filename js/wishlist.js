let username="edin1234";
$.ajax({
    url: "beckend/wishlist",
    data: {username: username},
    dataType: "json",
    success: function(response) {
        var responseData = response.data;
        var tableBody = $('#productWishlistTableBody');
        var totalPrice = 0;
        var products = {};

        responseData.forEach(function(product) {
            var productName = product.productName;
            if (!products[productName]) {
                products[productName] = {
                    count: 0,
                    totalPrice: 0,
                    productImage: product.mImage
                };
            }
            products[productName].count++;
            products[productName].totalPrice += product.price; 
        });

        tableBody.empty();

        Object.keys(products).forEach(function(productName) {
            var product = products[productName];
            var pricePerProduct = product.totalPrice / product.count;
            var row = $('<tr>');
            row.html(`
                <td><img src="${product.productImage}" alt="${productName}" width="50"></td>
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
});


$('#emptyWishlistButton').click(function() {
    $.ajax({
        url: "beckend/wishlist/delete",
        type: "DELETE",
        data:{username:username},
        success: function() {
            $('#productWishlistTableBody').empty();
            $('#totalPrice').text('$0.00');
        },
        error: function(xhr, status, error) {
            console.error("Failed to empty the wishlist:", error);         
        }
    });
});
