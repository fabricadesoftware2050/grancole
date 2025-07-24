<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/login',    function(){
    return view('welcome'); // Assuming you want to return the welcome view for login
})->name('login');


Route::get('/home', [HomeController::class, 'index'])->name('home');

