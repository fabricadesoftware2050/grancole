<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asignatura extends Model
{
    protected $table = 'asignaturas';
    protected $fillable = [
        'nombre',
        'area_academica_id',
        'descripcion',
        'malla',
        'plan_area',
        'visible_en_informes',
        'orden',
        'visible',
        'afecta_promocion',
    ];

    public function area_academica()
    {
        return $this->belongsTo(AreaAcademica::class,'area_academica_id');
    }
}
