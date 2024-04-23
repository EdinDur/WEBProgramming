<?php

require_once __DIR__ . "/../dao/UserDao.class.php";

class UserService {
    private $user_dao;

    public function __construct() {
        $this->user_dao = new UserDao();
    }
    public function add_user($user) {
        return $this->user_dao->add_user($user);
    }
    public function get_user_login($user) {
        return $this->user_dao->get_user_login($user);
    }
    public function edit_user($user) {
        return $this->user_dao->edit_user($user);
    }
    public function delete_user($username) {
        return $this->user_dao->delete_user($username);
    }
    
}
