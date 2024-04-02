const productsSearchTemplate = $("[data-product-template]");
const productCardContainer = $("[data-product-cards-container]");
const paginationContainer = $(".store-pagination");
const sortSelect = $("#sort-select");

let currentPage = 1;
const productsPerPage = 9;
let productsData = [];

function fetchProducts() {
    $.ajax({
        url: "http://127.0.0.1:443/json/products.json",
        dataType: "json",
        success: function(data) {
            productsData = data;
            displayProducts(currentPage);
        },
        error: function(xhr, status, error) {
            console.error("Error fetching products:", error);
        }
    });
}
function displayProducts(page) {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    let filteredProducts = productsData;

    const selectedOption = parseInt(sortSelect.val());
    if (selectedOption === 1) {
        filteredProducts = productsData.filter(product => product.new);
    } else if (selectedOption === 2) {
        filteredProducts = productsData.filter(product => product.sale);
    }

    const totalFilteredProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalFilteredProducts / productsPerPage);

    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    productCardContainer.empty();
    $.each(productsToShow, function(index, product) {
        const cardContent = productsSearchTemplate.html();
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

fetchProducts();
