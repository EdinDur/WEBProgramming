<?php
require_once __DIR__ . '/rest/services/ProductService.class.php';

$input = $_GET['input'];

$product_service = new ProductService();

$data = $product_service->get_product_by_search($input);

echo json_encode([
    'data' => $data,
]);