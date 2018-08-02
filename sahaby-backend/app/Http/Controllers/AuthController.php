<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Helpers\API\Client as ApiClient;
use App\User;
use Illuminate\Http\Request;
use App\Services\AuthService;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }


    public function userSignUp(Request $request)
    {
        $user = User::create(['phone_number' => $request['phone_number']]);
        $access_token = $this->authService->generateToken($user);

        return ApiClient::respondSuccess("Auth success", compact('access_token', 'user'));
    }

    public function userLogin()
    {

        $credentials = request(['phone_number']);
        $user = User::where('phone_number', $credentials['phone_number'])->first();
        if($user) {
            $access_token = $this->authService->generateToken($user);
            return ApiClient::respondSuccess("Auth success", compact('access_token', 'user'));

        }
        return ApiClient::respondError(401, "Invalid credentials", compact('credentials'));
    }
}