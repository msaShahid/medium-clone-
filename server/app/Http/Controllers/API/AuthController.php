<?php

namespace App\Http\Controllers\API;

use Log;
use Exception;
use Throwable;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\UserRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{

    public function user(){

        try {

            $user = User::all();
            
            return response()->json([
                'status' => 200,
                'message' => 'User list',
                'data' => UserResource::collection($user),
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve user list',
                'error' => $e->getMessage(),
            ], 500);
        }

        
    }

    public function register(UserRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();
    
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);
    
            return response()->json([
                'status' => 200,
                'message' => 'User created successfully',
                'data' => new UserResource($user),
            ], 201);
            
        } catch (Throwable $th) {
            Log::error('User registration error: ' . $th->getMessage(), [
                'request' => $request->all(),
                'error' => $th,
            ]);
    
            return response()->json([
                'status' => false,
                'message' => 'An error occurred during registration. Please try again later.',
            ], 500);
        }
    }
    
    

     public function login(LoginRequest $request): JsonResponse
    {
        try{
            $validatedData = $request->validated();

            // $validator = Validator::make($request->all(), [
            //     'email'     => 'required|string|email|max:255',
            //     'password'  => 'required|string|min:8'
            // ]);

            // if ($validator->fails()) {
            //     return response()->json($validator->errors(), 422);
            // }

            $credentials = $request->only('email', 'password');

            if (!Auth::attempt($credentials)) {
                return response()->json(['status' => 401,'message' => 'Invalid credentials'], 401);
            }

            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;

            $userResource = new UserResource($user);
            $userResource->token = $token; // Set the token on the resource
            
            return response()->json([
                'status' => 200,
                'message' => 'User logged in successfully',
                'user' => $userResource,
            ], 200);

        } catch (\Throwable $th){
            return response()->json(['status' => 401,'message : ' => $th->getMessage()], 500);
        }

    }

     // * Login user
    // public function login(Request $request)
    // {
    //     $payload = $request->validate([
    //         "email" => "required|email",
    //         "password" => "required"
    //     ]);

    //     try {
    //         $user = User::where("email", $payload["email"])->first();
    //         if ($user) {
    //             // * Check password
    //             if (!Hash::check($payload["password"], $user->password)) {
    //                 return response()->json(["status" => 401, "message" => "Invalid credentials."]);
    //             }

    //             $token = $user->createToken("web")->plainTextToken;
    //             $authRes = array_merge($user->toArray(), ["token" => $token]);
    //             return ["status" => 200, "user" => $authRes, "message" => "Loggedin succssfully!"];
    //         }
    //         return response()->json(["status" => 401, "message" => "No account found with these credentials."]);
    //     } catch (\Exception $err) {
    //         Log::info("user_register_err =>" . $err->getMessage());
    //         return response()->json(["status" => 500, "message" => "Something went wrong!"], 500);
    //     }
    // }

    public function verifyCredentials(LoginRequest $request)
    {

        try{

            $validatedData = $request->validated();

            $credentials = $request->only('email', 'password');

            if (!Auth::attempt($credentials)) {
                return ['status' => 401,'message' => 'Invalid credentials'];
            }

           return response()->json([
                'status' => 200,
                'message' => 'User logged in successfully',
            ], 200);

        } catch (\Throwable $th){
            return response()->json(['status' => 401,'message : ' => $th->getMessage()], 500);
        }

    }

    public function logout(Request $request): JsonResponse
    {
        try {
            $request->user()->currentAccessToken()->delete();
    
            return response()->json(['message' => 'Successfully logged out'], 200);
        } catch (\Throwable $th) {
            Log::info('User logout error : ' . $th->getMessage(), [
                'request' => $request->all(),
                'error' => $th,
            ]);
    
            return response()->json(['message' => 'Logout failed', 'error' => 'Internal Server Error'], 500);
        }
    }
     

}
