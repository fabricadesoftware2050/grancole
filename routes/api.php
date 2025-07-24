<?php

use App\Http\Controllers\DepartamentoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\InstitucionController;
use App\Http\Controllers\MunicipioController;

Route::prefix('v1')->group(function () {
    Route::post('/login',    [AuthController::class, 'login']);

    // Rutas protegidas: requieren estar logueado
    Route::middleware('auth:api')->group(function () {
        Route::get('/logout', [AuthController::class, 'logout']);
        Route::post('/register', [AuthController::class, 'register']);

        Route::get('/me', [AuthController::class, 'me']);
        Route::get('/users', [AuthController::class, 'index']);
        Route::apiResource('/departamentos', DepartamentoController::class);
        Route::apiResource('/municipios', MunicipioController::class);
        Route::apiResource('/instituciones', InstitucionController::class);
        Route::post('/upload', [FileController::class, 'subir']);
        Route::delete('/deleteFile', [FileController::class, 'eliminarArchivo']);
    });
});
