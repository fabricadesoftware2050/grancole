<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Institucion extends Model
{
    protected $table = 'instituciones';

    protected $fillable = [
        'nombre',
        'nombre_corto',
        'nit',
        'codigo_dane',
        'codigo_icfes',
        'direccion',
        'barrio',
        'departamento_id',
        'municipio_id',
        'zona',
        'sector',
        'correo',
        'telefono',
        'web',
        'nombre_rector',
        'nombre_auxiliar',
        'cc_rector',
        'cc_auxiliar',
        'cargo_rector',
        'cargo_auxiliar',
        'firma_rector',
        'firma_auxiliar',
        'encabezado_membrete',
        'pie_membrete',
        'escudo',
    ];
}
