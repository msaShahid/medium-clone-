<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $postId = $request->query('post_id');

        $comments = Comment::select('id','user_id','content','created_at')->with('user')->where('post_id', $postId);

        return response()->json([
            'status' => 200,
            'message' => 'Retrive comment successfully!',
            'data' => $comments->get(),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentRequest $request)
    {
        try{

            $user = $request->user();
            $validatedData = $request->validated();
            $validatedData['user_id'] = $user->id;

            
            $comment = Comment::create($validatedData);

            return response()->json([
                'status' => 200,
                'message' => 'Comment created successfully',
                'data' => $comment,
            ], 201);

            
        }catch (Exception $e) {
            Log::info('Comment error : ' . $e->getMessage(), [
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
        $comments = Comment::select('id','user_id','content')->where('id', $id)->get();

        return response()->json([
            'status' => 200,
            'message' => 'Retrive comment successfully!',
            'data' => $comments,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CommentRequest $request, string $id)
    {
        try{

            $Comment = Comment::findOrFail($id);

            $validatedData = $request->validated();

            $Comment->update($validatedData);

            return response()->json([
                'status' => 200,
                'message' => 'Comment Update successfully',
            ], 201);

            
        }catch (Exception $e) {
            Log::info('Comment Update error : ' . $e->getMessage(), [
                'request' => $request->all(),
                'error' => $e,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{

            $Comment = Comment::findOrFail($id);
            $user = $request->user();

            if($user->id !== $Comment->user_id){
                return response()->json([
                    'status' => false,
                    'message' => 'You are not the owner of this Comment',
                ], 401);
            }

            $Comment->delete();
            
            return response()->json([
                'status' => 200,
                'message' => 'Comment deleted successfully',
            ], 200);


        }catch (Exception $e) {
            Log::info('Comment Delete error : ' . $e->getMessage(), [
                'request' => $request->all(),
                'error' => $e,
            ]);
        }
    }
}
