<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait HasNumber
{
    /**
     * Generate a unique sequential number with a given prefix for the model.
     *
     * @return void
     */
    protected static function bootHasNumber()
    {
        static::creating(function ($model) {
            if (property_exists($model, 'abbreviation')) {
                $model->unique_number = $model->generateUniqueSequentialNumber($model->abbreviation);
            }
        });
    }

    /**
     * Generate a unique sequential number based on the model's abbreviation.
     *
     * @param string $prefix
     * @return string
     */
    protected function generateUniqueSequentialNumber(string $prefix): string
    {
        // Fetch the latest number from the model's table
        $latestRecord = DB::table($this->getTable())
            ->where('unique_number', 'LIKE', "{$prefix}%")
            ->orderBy('id', 'desc')
            ->first();

        // Determine the next sequential number
        $nextNumber = $latestRecord 
            ? (int) substr($latestRecord->unique_number, strlen($prefix)) + 1 
            : 1;

        // Format the next number with leading zeros
        return strtoupper($prefix) . str_pad($nextNumber, 8, '0', STR_PAD_LEFT);
    }
}
