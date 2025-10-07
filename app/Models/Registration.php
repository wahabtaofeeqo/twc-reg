<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'type',
        'email',
        'phone',
        'is_sent',
        'confirmed',
        'password',
        'industry',
        'attendance',
        'nationality',
        'designation',
        'organization',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_sent' => 'boolean',
            'confirmed' => 'boolean',
            'wants_mentorship' => 'boolean',
        ];
    }
}
