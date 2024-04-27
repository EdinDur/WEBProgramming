<?php
require_once __DIR__ . '/rest/services/WishlistService.class.php';

$wishlist_service = new WishlistService();

$data = $wishlist_service->delete_wishlist_all();

echo json_encode([
    'data' => $data,
]);