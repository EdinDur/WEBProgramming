const productsNewTemplate = $("[data-product-new-template]");
const productCardContainer = $("[data-product-new-cards-container]");

const productsBestSellingTemplate = $("[data-product-best-selling-template]");
const productBestSellingContainer = $("[data-product-best-selling-cards-container]");

$.ajax({
    url: "http://127.0.0.1:443/json/products.json",
    dataType: "json",
    success: function(data) {
        const newProducts = data.filter(product => product.new === true);
        const bestSellingProducts = data.filter(product => product.new === false);
        const bestSellingProductsToDisplay = bestSellingProducts.slice(0, 4);
        const newProductsToDisplay = newProducts.slice(2, 6);

        $.each(newProductsToDisplay, function(index, product) {
            const cardContent = productsNewTemplate.html();
        
            const $card = $(cardContent);
    
            $card.find("[data-product-name]").text(product.name);
            $card.find("[data-product-price]").text("$" + product.price);
            $card.find("[data-product-category]").text(product.category);
            $card.find("[data-product-image]").attr("src", product.mimage);

            if (product.new) {
                $card.find(".new").text("New");
            } else {
                $card.find(".new").remove();
            }
        
            if (product.sale) {
                $card.find(".sale").text(`${product.sale}%`);
            } else {
                $card.find(".sale").remove();
            }
        
            productCardContainer.append($card);
        });
        

        $.each(bestSellingProductsToDisplay, function(index, product) {
            const cardContent = productsBestSellingTemplate.html();
            const $card = $(cardContent);

            $card.find("[data-product-name]").text(product.name);
            $card.find("[data-product-price]").text("$" + product.price);
            $card.find("[data-product-category]").text(product.category);
            $card.find("[data-product-image]").attr("src", product.mimage);
        
      
            const newIndicator = $card.find(".new");
            if (product.new) {
                newIndicator.text("New");
            } else {
                newIndicator.remove();
            }
        
       
            const onSaleIndicator = $card.find(".sale");
            if (product.sale) {
                onSaleIndicator.text(`${product.sale}%`);
            } else {
                onSaleIndicator.remove();
            }
        
           
            productBestSellingContainer.append($card);
        });
        
    },
    error: function(xhr, status, error) {
        console.error("Error fetching data:", error);
    }
});
