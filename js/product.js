const productShowTemplate = $("[data-product-template]");
const productShowCarContainer = $("[data-product-container]");

//Fetch Product by Name
function fetchProductByName(productName){
    console.log(productName);
    $.ajax({
        url: "beckend/productsByName",
        type: "GET",
        data:{productName: productName},
        dataType: "json",
        success: function(response) {

            const data = response.data; 
            const cardContentProduct = productShowTemplate.html();
            const $card = $(cardContentProduct);
            
            $card.find('[data-product-name]').text(data.productName);
            $card.find('[data-product-price]').text("$" + data.price);
            $card.find('[data-product-stock]').text(data.stock > 0 ? "In Stock" : "Out of Stock");
            $card.find('[data-product-mini-description]').text(data.miniDescription);
            $card.find('[data-product-description]').text(data.description);
            $card.find('[data-product-details]').text(data.details);
            $card.find('[data-product-category]').text(data.category);
            $card.find('[data-product-mImage]').attr("src", data.mImage);
            $card.find('[data-product-sImage1]').attr("src", data.secondaryImage1);
            $card.find('[data-product-sImage2]').attr("src", data.secondaryImage2);
           
            if (data.productNew) {
                $card.find(".new").text("New");
            } else {
                $card.find(".new").remove();
            }

            if (data.sale) {
                $card.find(".sale").text(`${data.sale}%`);
            } else {
                $card.find(".sale").remove();
            }

            productShowCarContainer.empty().append($card);
        },
        error: function(xhr, status, error) {
            console.error("Error fetching products:", error);
        }
    });
}