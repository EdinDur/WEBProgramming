<?php
require_once __DIR__ . '/rest/services/CartService.class.php';

$payload = json_decode(file_get_contents("php://input"), true);

$cart_service = new CartService();

$cart = $cart_service->add_to_cart($payload);

if ($cart) {
    echo json_encode(['message' => "You have successfully added to cart", 'data' => $cart]);
} else {
    echo json_encode(['message' => "Failed to add to cart", 'data' => null]);
}

