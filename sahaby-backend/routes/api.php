<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('auth/login_with_fb', 'SocialAuthController@loginWithFb');
Route::post('auth/user/signup', 'AuthController@userSignUp');
Route::post('auth/user/login', 'AuthController@userLogin');
Route::post('auth/volunteer/login', 'AuthController@volunteerLogin');
