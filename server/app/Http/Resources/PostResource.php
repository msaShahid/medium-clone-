<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'image' => $this->image,
            'short_description' => $this->short_description,
            'content' => $this->content,
            'created_at' => $this->created_at->toDateTimeString(),
            'created_by' => $this->user ? $this->user->name : null,
          //  'user' => $this->user ? new UserResource($this->user)  : null, 
        ];
    }
}
