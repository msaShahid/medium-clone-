<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "title" =>  "required|string|min:5|max:100",
            "content" => "nullable|string|max:20000",
            "short_description" => "required|min:5|max:255",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
        ];
    }
}
