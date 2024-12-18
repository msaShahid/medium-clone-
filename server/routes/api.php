<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\CommentController;

Route::group(['prefix' => 'v1/auth/'], function () {

    Route::post('register', [AuthController::class,'register'])->name('register');
    Route::post('login', [AuthController::class,'login'])->name('login'); 
    Route::post('verify-Credentials', [AuthController::class,'verifyCredentials'])->name('verifyCredentials'); 
 
});


Route::group(['prefix' => 'v1/auth/', 'middleware' => ['auth:sanctum']], function () {

    Route::get('user', [AuthController::class,'user'])->name('user');
    Route::post('logout', [AuthController::class,'logout'])->name('logout');
    Route::get('user/posts',[PostController::class, 'fetchUserPosts'])->name('user.posts');

    Route::apiResource('post', PostController::class)->except(['index','show']);
    Route::apiResource('comment', CommentController::class)->except(['index','show']);

});

// public route 
Route::apiResource('v1/post', PostController::class)->only(['index','show']);
Route::apiResource('v1/comment', CommentController::class)->only(['index','show']);