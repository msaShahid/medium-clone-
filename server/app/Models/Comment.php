<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','post_id', 'content'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->select('id','name','email');
    }
    
}
