<?php
require_once __DIR__ . '/rest/services/ProductService.class.php';

$product_service = new ProductService();

$data = $product_service->get_product_new();

echo json_encode([
    'data' => $data,
]);