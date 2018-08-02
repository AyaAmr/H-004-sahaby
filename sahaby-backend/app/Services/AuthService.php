<?php

namespace App\Services;

use \Firebase\JWT\JWT;

class AuthService
{
    public function __construct()
    {
        $this->key = config('app.key');
    }

    public function generateToken($authenticatable)
    {
        $jwt = JWT::encode($authenticatable, $this->key);
        return $jwt;
    }

    public function decodeToken($token)
    {
        $decoded = JWT::decode($token, $this->key, array('HS256'));
        return $decoded;
    }
}
