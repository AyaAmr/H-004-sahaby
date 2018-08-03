<?php

namespace App\Http\Controllers;

use App\Helpers\API\Client as ApiClient;
use Illuminate\Http\Request;
use Facebook\Facebook;
use App\User;
use App\Volunteer;
use App\Services\AuthService;

class SocialAuthController extends Controller
{
	public function __construct(AuthService $authService)
	{
		$this->fb = new Facebook([
			  'app_id' => config('app.fb_app_id'), // Replace {app-id} with your app id
			  'app_secret' => config('app.fb_app_secret'),
			  'default_graph_version' => 'v2.2',
		  ]);
        $this->authService = $authService;

	}

	public function loginWithFb(Request $request)
	{
		try {
		  $response = $this->fb->get('/me', $request['fb_token']);
		} catch(\Facebook\Exceptions\FacebookResponseException $e) {
		  return ApiClient::respondError(401, 'Graph returned an error: ' . $e->getMessage());

		} catch(\Facebook\Exceptions\FacebookSDKException $e) {
		  return ApiClient::respondError(401, 'Facebook SDK returned an error: ' . $e->getMessage());
		}
		$me = $response->getGraphUser();
		$user = User::where('fb_id' , $me->getId())->first();
		if(!$user) {
			$user = User::create(['name' => $me->getName(), 'fb_id' => $me->getId()]);
		}
 		$access_token = $this->authService->generateToken($user);
		return ApiClient::respondSuccess("Auth success", compact('access_token', 'user'));
	}


	public function volunteerLoginWithFb(Request $request)
	{
		try {
		  $response = $this->fb->get('/me', $request['fb_token']);
		} catch(\Facebook\Exceptions\FacebookResponseException $e) {
		  return ApiClient::respondError(401, 'Graph returned an error: ' . $e->getMessage());

		} catch(\Facebook\Exceptions\FacebookSDKException $e) {
		  return ApiClient::respondError(401, 'Facebook SDK returned an error: ' . $e->getMessage());
		}
		$me = $response->getGraphUser();
		$volunteer = Volunteer::where('fb_id' , $me->getId())->first();
		if(!$volunteer) {
			$volunteer = Volunteer::create(['name' => $me->getName(), 'fb_id' => $me->getId()]);
		}
 		$access_token = $this->authService->generateToken($volunteer);
		return ApiClient::respondSuccess("Auth success", compact('access_token', 'volunteer'));
	}
}
