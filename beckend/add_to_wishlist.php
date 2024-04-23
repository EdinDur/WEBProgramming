<?php
require_once __DIR__ . '/rest/services/WishlistService.class.php';

$payload = json_decode(file_get_contents("php://input"), true);

$wishlist_service = new WishlistService();

$wishlist = $wishlist_service->add_to_wishlist($payload);

if ($wishlist) {
    echo json_encode(['message' => "You have successfully added to wishlist", 'data' => $wishlist]);
} else {
    echo json_encode(['message' => "Failed to add to wishlist", 'data' => null]);
}

