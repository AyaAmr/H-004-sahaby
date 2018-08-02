<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Helpers\API\Client as ApiClient;
use App\Country;
use Illuminate\Http\Request;
use App\Services\AuthService;

class CountryController extends Controller
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

    public function index()
    {
        $Countries = Country::all();
        return ApiClient::respondSuccess("List of Countries", compact('Countries'));
    }
}