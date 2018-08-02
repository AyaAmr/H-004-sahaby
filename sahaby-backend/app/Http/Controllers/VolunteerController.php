<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Helpers\API\Client as ApiClient;
use App\Volunteer;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Request as RequestModel;

class VolunteerController extends Controller
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
        $volunteer = Volunteer::where('id', $request['authenticatable_id'])->first();
        if($volunteer) {

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $name = time().'.'.$image->getClientOriginalExtension();
                $destinationPath = public_path('/images');
                $image->move($destinationPath, $name);
                $request['image_name'] = $name;
            }
            $request['password'] = bcrypt($request['password']);
            $updatedVolunteer = $volunteer->update($request->only('language_id', 'country_id', 'name', 'gender', 'image_name', 'password', 'name'));
            $volunteer->typeNeeds()->sync($request['type_needs']);
            return ApiClient::respondSuccess("Volunteer profile created successfully", compact('volunteer'));
        }
        return ApiClient::respondError(404, "Volunteer not found", '');
    }
}
