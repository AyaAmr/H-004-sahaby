<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Helpers\API\Client as ApiClient;
use App\Step;
use Illuminate\Http\Request;
use App\Services\AuthService;

class StepController extends Controller
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
        $steps = Step::all();
        return ApiClient::respondSuccess("List of steps", compact('steps'));
    }
}