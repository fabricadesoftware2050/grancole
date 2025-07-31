<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AreaFundamental extends Model
{
    protected $table = 'areas_fundamentales';
    protected $fillable = [
        'nombre',
        'nombre_corto',
        'descripcion',
        'orden',
        'visible',
    ];
}
