<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Helpers\API\Client as ApiClient;
use App\User;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Request as RequestModel;

class UserController extends Controller
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

    public function createProfile(Request $request)
    {
        $user = User::where('id', $request['authenticatable_id'])->first();
        if($user) {

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $name = time().'.'.$image->getClientOriginalExtension();
                $destinationPath = public_path('/images');
                $image->move($destinationPath, $name);
                $request['image_name'] = $name;
            }
            $user = $user->update($request->only('language_id', 'country_id', 'type_need_id', 'name', 'gender', 'image_name'));
            $user = User::where('id', $request['authenticatable_id'])->first();
            return ApiClient::respondSuccess("User profile created successfully", compact('user'));
        }
        return ApiClient::respondError(404, "User not found", '');
    }

    public function getCurrentActiveRequest(Request $request)
    {
        $user = User::where('id', $request['authenticatable_id'])->first();
        if($user) {

            $activeRequest = RequestModel::where([ ['user_id', '=', $request['authenticatable_id']]])->whereIn('request_status', [1,2])->first();

            if($activeRequest) {
                return ApiClient::respondSuccess("Current active request", compact('activeRequest'));
            }
            return ApiClient::respondSuccess("No active request", compact('activeRequest'));
        }
        return ApiClient::respondError(404, "User not found", '');

    }
}
