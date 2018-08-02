<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Helpers\API\Client as ApiClient;
use App\Request as RequestModel;
use Illuminate\Http\Request;
use App\Services\AuthService;

class RequestController extends Controller
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
        dd('list all requests');
    }

    public function store(Request $request)
    {
        $request['user_id'] = $request['authenticatable_id'];
        $request['request_status'] = 1; //1 pending //2 on way //3 done //4 cancel
        $requestAlreadyExists = RequestModel::where([ ['user_id', '=', $request['user_id']]])->whereIn('request_status', [1,2])->first();
        if($requestAlreadyExists) {
            return ApiClient::respondError(401, "you already have another request not setteled");
        }
        $requestModel = RequestModel::create($request->only('step_id', 'text_notes', 'preferred_gender', 'user_id', 'request_status'));
        return ApiClient::respondSuccess("request created successfully", compact('requestModel'));
    }

    public function cancelRequest(Request $request, RequestModel $requestModel)
    {
        $authUserId = $request['authenticatable_id'];
        if($requestModel->user_id == $authUserId) {
            $requestModel->request_status = 4;
            $requestModel->save();
            return ApiClient::respondSuccess("request cancelled successfully", compact('requestModel'));
        }
        return ApiClient::respondError(401, "you cannot cancel this request");

    }
}