<?php

require 'vendor/autoload.php';

require 'rest/routes/product_routes.php';
require 'rest/routes/user_routes.php';
require 'rest/routes/cart_routes.php';
require 'rest/routes/wishlist_routes.php';

Flight::start();