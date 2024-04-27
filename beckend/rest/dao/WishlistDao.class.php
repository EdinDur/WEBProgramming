<?php

require_once __DIR__ . '/BaseDao.class.php';

class WishlistDao extends BaseDao {
    public function __construct() {
        parent::__construct('wihlist');
    }
    
    public function add_to_wishlist($wishlist) {
        if (!isset($wishlist['username']) || !isset($wishlist['productName'])) {
            return null;
        }
    
        $entity = [
            'username' => $wishlist['username'],
            'productName' => $wishlist['productName']
        ];  
        return $this->insert($entity);
    } 
    public function get_wishlist($username){
        return $this->query_unique(
        "SELECT p.mImage, p.productName, p.price
        FROM wihlist c
        JOIN products p ON c.productName = p.productName
        WHERE c.username = :username;",
        [
            ":username" => $username
        ]
        );
    } 
    public function delete_wishlist_all(){
        return $this->query(
            "DELETE FROM wihlist;"
        );
    }  
}