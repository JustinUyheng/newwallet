<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use Symfony\Component\HttpFoundation\Request;
use Illuminate\Validation\ValidationException;
use App\Models\User; // Make sure to import the User model
use Illuminate\Support\Facades\Hash; // Make sure to import Hash facade

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/token', [UserController::class, 'token']);

Route::post('/password/email', [UserController::class, 'sendPasswordResetLink']);
Route::post('/password/reset', [UserController::class, 'resetPassword']);

