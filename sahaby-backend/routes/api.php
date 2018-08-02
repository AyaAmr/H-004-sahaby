<?php

use Illuminate\Http\Request;
use App\Http\Middleware\JwtAuth;

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
Route::post('auth/volunteer/login_with_fb', 'SocialAuthController@volunteerLoginWithFb');
Route::post('auth/volunteer/signup', 'AuthController@volunteerSignUp');

Route::post('users/create_profile', 'UserController@createProfile')->middleware(JwtAuth::class);
Route::get('users/get_current_active_request', 'UserController@getCurrentActiveRequest')->middleware(JwtAuth::class);
Route::post('volunteers/create_profile', 'VolunteerController@createProfile')->middleware(JwtAuth::class);

Route::get('languages', 'LanguageController@index');
Route::get('countries', 'CountryController@index');
Route::get('type_needs', 'TypeNeedController@index');
Route::get('steps', 'StepController@index');
Route::resource('requests', 'RequestController')->middleware(JwtAuth::class);
Route::patch('requests/{requestModel}/cancel', 'RequestController@cancelRequest')->middleware(JwtAuth::class);

