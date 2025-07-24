<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    //
    protected $table = 'departamentos';
    protected $primaryKey = 'id_departamento';
    protected $fillable = [
        'departamento',
    ];
}
