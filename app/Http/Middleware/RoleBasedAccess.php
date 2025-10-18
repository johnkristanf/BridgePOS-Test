<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleBasedAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $featureTag, string $permissionName): Response
    {
        $user = $request->user();
        if (! $user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $hasAccess = $user->roles()
            ->whereHas('features', function ($featureQuery) use ($featureTag, $permissionName) {
                $featureQuery->where('tag', $featureTag)
                    ->whereHas('permissions', function ($permQuery) use ($permissionName) {
                        $permQuery->where('name', $permissionName);
                    });
            })
            ->exists();

        if (! $hasAccess) {
            return response()->json([
                'message' => "You are not authorized to access this resources",
            ], 403);
        }

        return $next($request);
    }
}
