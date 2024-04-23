<?php
require_once __DIR__ . '/rest/services/ProductService.class.php';

$name = $_GET['productName'];

$product_service = new ProductService();

$data = $product_service->get_product_by_name($name);

echo json_encode([
    'data' => $data,
]);