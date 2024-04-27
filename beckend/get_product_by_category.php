<?php
require_once __DIR__ . '/rest/services/ProductService.class.php';

$category = $_GET['category'];

$product_service = new ProductService();

$data = $product_service->get_product_by_category($category);

echo json_encode([
    'data' => $data,
]);