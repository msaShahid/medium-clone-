<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Requests\PostUpdate;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $posts = Post::with('user')->get(); 
            
            return response()->json([
                'status' => 200,
                'message' => 'Retrieved all posts successfully!',
                'data' => PostResource::collection($posts),
               // 'data' => $posts, 
            ], 200); 
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to retrieve posts!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        try{

            $user = $request->user();
            $validatedData = $request->validated();
            $validatedData['user_id'] = $user->id;

            if(isset($validatedData['image'])){
                $validatedData['image'] = $validatedData['image']->store($user->id);
            }

            $post = Post::create($validatedData);
            return response()->json([
                'status' => 200,
                'message' => 'Post created successfully',
                'data' => new PostResource($post)
            ], 201);

            
        }catch (Exception $e) {
            Log::info('Post error : ' . $e->getMessage(), [
                'request' => $request->all(),
                'error' => $e,
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $posts = Post::with('user')->where('id', $id)->first(); 
            
            return response()->json([
                'status' => 200,
                'message' => 'Retrieved all posts successfully!',
                'data' => new PostResource($posts),
               // 'data' => $posts, 
            ], 200); 
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve posts!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostUpdate $request, string $id)
    {
        try{

            $post = Post::findOrFail($id);

            $validatedData = $request->validated();

            $post->update($validatedData);

            return response()->json([
                'status' => 200,
                'message' => 'Post Update successfully',
                'data' => new PostResource($post)
            ], 201);

            
        }catch (Exception $e) {
            Log::info('Post Update error : ' . $e->getMessage(), [
                'request' => $request->all(),
                'error' => $e,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        try{

            $post = Post::findOrFail($id);
            $user = $request->user();

            if($user->id !== $post->user_id){
                return response()->json([
                    'status' => false,
                    'message' => 'You are not the owner of this post',
                ], 401);
            }

            if(isset($post->image)){
                Storage::delete($post->image);
            }

            $post->delete();
            
            return response()->json([
                'status' => true,
                'message' => 'Post deleted successfully',
            ], 200);


        }catch (Exception $e) {
            Log::info('Post Delete error : ' . $e->getMessage(), [
                'request' => $request->all(),
                'error' => $e,
            ]);
        }
    }

    // Fetch user posts

    public function fetchUserPosts(Request $request){
        $user = $request->user();
        $posts = Post::select("id","user_id","title","image","created_at")
                        ->with('user')->where('user_id', $user->id)->get();
                         
        return ["status"=> 200, "posts" => $posts];

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Post fetch successfully',
        //     'posts' => $posts
        // ], 200);
    }



}
