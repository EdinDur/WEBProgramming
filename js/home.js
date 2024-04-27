let data=[];
let username="edin1234";

const productsNewTemplate = $("[data-product-new-template]");
const productCardHomeContainer = $("[data-product-new-cards-container]");

const productsBestSellingTemplate = $("[data-product-best-selling-template]");
const productBestSellingContainer = $("[data-product-best-selling-cards-container]");

productCardHomeContainer.on("click", ".quick-view", function(event) {
    const productName = $(this).closest('.product').find('[data-product-name]').text();
    event.preventDefault();
    window.location.href = "#product";
    fetchProductByName(productName); 
});

productBestSellingContainer.on("click", ".quick-view", function(event) {
    const productName = $(this).closest('.product').find('[data-product-name]').text();
    event.preventDefault();
    window.location.href = "#product";
    fetchProductByName(productName); 
});



$.ajax({
    url: "beckend/get_product_display.php",
    type: "GET",
    dataType: "json",
    success: function(response) {
        const data = response.data;

        const newProducts = data.filter(product => product.productNew === 1);
        const bestSellingProducts = data.filter(product => product.productNew === 0);
        const bestSellingProductsToDisplay = bestSellingProducts.slice(0, 4);
        const newProductsToDisplay = newProducts.slice(2, 6);

        $.each(newProductsToDisplay, function(index, product) {
            const cardContent = productsNewTemplate.html();     
            const $card = $(cardContent);
    
            $card.find("[data-product-name]").text(product.productName);
            $card.find("[data-product-price]").text("$" + product.price);
            $card.find("[data-product-category]").text(product.category);
            $card.find("[data-product-image]").attr("src", product.mImage);

            if (product.productNew) {
                $card.find(".new").text("New");
            } else {
                $card.find(".new").remove();
            }
        
            if (product.sale) {
                $card.find(".sale").text(`${product.sale}%`);
            } else {
                $card.find(".sale").remove();
            }

    
        
            productCardHomeContainer.append($card);
        });

        $.each(bestSellingProductsToDisplay, function(index, product) {
            const cardContent = productsBestSellingTemplate.html();
            const $card = $(cardContent);

            $card.find("[data-product-name]").text(product.productName);
            $card.find("[data-product-price]").text("$" + product.price);
            $card.find("[data-product-category]").text(product.category);
            $card.find("[data-product-image]").attr("src", product.mImage);
        
            const newIndicator = $card.find(".new");
            if (product.productNew) {
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
//button listeners
const buttons = document.querySelectorAll('.cta-btn');

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const category = this.getAttribute('data-category');
        if(category==="new"){
            window.location.href = "#store";
            fetchProductNew();
        }
        else{
            window.location.href = "#store";
            fetchCategoryProducts(category); 
        }
    });
});

//Add to cart button
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        event.preventDefault();
        var button = event.target;
        var productContainer = button.closest('.product');
        var productName = productContainer.querySelector('[data-product-name]').innerText;
        addToCart(productName);
    }
    else if (event.target.classList.contains('add-to-wishlist')){
        event.preventDefault();
        console.log("blee")
        var button = event.target;
        var productContainer = button.closest('.product');
        var productName = productContainer.querySelector('[data-product-name]').innerText;
        AddToWishlist(productName);
    }
});

//Add to cart
function addToCart(productName) {
    var cartProduct = {
        productName: productName,
        username: username
    };
    $.ajax({
        url: "beckend/add_to_cart.php",
        type: "POST",
        data: JSON.stringify(cartProduct),
        contentType: "application/json",
        dataType: "json",
        success: function(response) {
            

                     
            
        },
        error: function(xhr, status, error) {
            showErrorMessage("Unable to put product in cart");
        }
    });
}

//Add to wishlist
function AddToWishlist(productName) {
    var cartProduct = {
        productName: productName,
        username: username
    };
    $.ajax({
        url: "beckend/add_to_wishlist.php",
        type: "POST",
        data: JSON.stringify(cartProduct),
        contentType: "application/json",
        dataType: "json",
        success: function(response) {
            

                     
            
        },
        error: function(xhr, status, error) {
            showErrorMessage("Unable to put product in cart");
        }
    });
}


const productCardContainer = $("[data-product-specific-cards-container]");
const productsSearchTemplate = $("[data-product-specific-template]");
const paginationContainer = $(".store-pagination");
const sortSelect = $("#sort-select");

//fetch products by category
function fetchCategoryProducts(categoryName){
    $.ajax({
        url: "beckend/get_product_by_category.php",
        type: "GET",
        data:{category: categoryName},
        dataType: "json",
        success: function(response) {
            data = response.data; 

            displayProducts(currentPage);
        },
        error: function(xhr, status, error) {
            console.error("Error fetching products:", error);
        }
    });
}
//Fetch products by new
function fetchProductNew(){
    $.ajax({
        url: "beckend/get_product_new.php",
        type: "GET",
        dataType: "json",
        success: function(response) {
            data = response.data; 
            displayProducts(currentPage);
        },
        error: function(xhr, status, error) {
            console.error("Error fetching products:", error);
        }
    });
}

const productShowTemplate = $("[data-product-template]");
const productShowCarContainer = $("[data-product-container]");

//Fetch Product by Name
function fetchProductByName(productName){
    $.ajax({
        url: "beckend/get_product_by_name.php",
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
//Display all products
function displayProducts(page) {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    if (!Array.isArray(data)) {
        console.error("Data is not an array");
        return;
    }

    let filteredProducts = data; 

    const selectedOption = parseInt(sortSelect.val());

    if (selectedOption === 1) {
        filteredProducts = data.filter(product => product.productNew === 1);
    } else if (selectedOption === 2) {
        filteredProducts = data.filter(product => product.sale >0);
    }

    const totalFilteredProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalFilteredProducts / productsPerPage);

    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    productCardContainer.empty();

    $.each(productsToShow, function(index, product) {
        const cardContent = productsSearchTemplate.html();
        const $card = $(cardContent);

        $card.find("[data-product-name]").text(product.productName);
        $card.find("[data-product-price]").text("$" + product.price);
        $card.find("[data-product-category]").text(product.category);
        $card.find("[data-product-image]").attr("src", product.mImage);

        if (product.productNew) {
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

    generatePagination(totalPages);
}

function generatePagination(totalPages) {
    paginationContainer.empty();

    for (let i = 1; i <= totalPages; i++) {
        const li = $("<li>").text(i).attr("data-page", i);
        
        if (i === currentPage) {
            li.addClass("active");
        }

        paginationContainer.append(li);
    }
}

paginationContainer.on("click", "li", function() {
    const page = parseInt($(this).attr("data-page"));
    
    if (!isNaN(page)) {
        currentPage = page;
        displayProducts(currentPage);
    }
});

sortSelect.on("change", function() {
    currentPage = 1;
    displayProducts(currentPage);
});
