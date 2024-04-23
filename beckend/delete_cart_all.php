<?php
require_once __DIR__ . '/rest/services/CartService.class.php';

$cart_service = new CartService();

$data = $cart_service->delete_cart_all();

echo json_encode([
    'data' => $data,
]);