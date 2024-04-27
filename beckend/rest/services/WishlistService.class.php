<?php

require_once __DIR__ . "/../dao/WishlistDao.class.php";

class WishlistService {
    private $wishlist_dao;

    public function __construct() {
        $this->wishlist_dao = new WishlistDao();
    }
    public function add_to_wishlist($wishlist) {
        return $this->wishlist_dao->add_to_wishlist($wishlist);
    }
    public function get_wishlist($username) {
        return $this->wishlist_dao->get_wishlist($username);
    }
    public function delete_wishlist_all() {
        return $this->wishlist_dao->delete_wishlist_all();
    }
}