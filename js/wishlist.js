$.ajax({
    url: "http://127.0.0.1:443/json/wishlist.json",
    dataType: "json",
    success: function(data) {
        function populateTableWithData(data) {
            var tableBody = $('#productWishlistTableBody');
            var totalPrice = 0;
            var products = {};

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
        populateTableWithData(data);
    }
});

$('#emptyWishlistButton').click(function() {
    $.ajax({
        url: "http://127.0.0.1:443/json/wishlist.json",
        type: "DELETE",
        success: function() {
            $('#productWishlistTableBody').empty();
            $('#totalPrice').text('$0.00');
        },
        error: function(xhr, status, error) {
            console.error("Failed to empty the cart:", error);        
        }
    });
});
