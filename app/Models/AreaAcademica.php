<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AreaAcademica extends Model
{

    protected $table = 'areas_academicas';
    protected $fillable = [
        'nombre',
        'area_fundamental_id',
        'descripcion',
        'orden',
        'visible',
        'afecta_promocion',
    ];

    public function area_fundamental()
    {
        return $this->belongsTo(AreaFundamental::class,'area_fundamental_id');
    }
}
