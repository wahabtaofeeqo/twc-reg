<?php

use App\Http\Controllers\IndexController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/**
 * RSVP for the event
 */
Route::post('rsvp', [IndexController::class, 'store'])->name('rsvp');
Route::get('success', [IndexController::class, 'success'])->name('rsvp.success');

/**
 * Admin
 */
Route::group(['prefix' => 'dashboard', 'middleware' => ['auth']], function () {
    Route::get('/', [IndexController::class, 'index'])->name('dashboard');
    Route::post('/send-qr', [IndexController::class, 'sendQr'])->name('send');
    Route::get('/export-qr', [IndexController::class, 'exportQr'])->name('export');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
