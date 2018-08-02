<?php

namespace App\Http\Middleware;

use Closure;
use App\Services\AuthService;

class JwtAuth
{

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $jwtToken = $request->header('Authorization');
        $object = $this->authService->decodeToken($jwtToken);
        $request['authenticatable_id'] = $object->id;
        return $next($request);
    }
}
