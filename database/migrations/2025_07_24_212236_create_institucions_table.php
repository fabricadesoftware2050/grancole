<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    
    public function up()
    {
        Schema::create('instituciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('nombre_corto')->nullable();
            $table->string('nit')->nullable();
            $table->string('codigo_dane')->nullable();
            $table->string('codigo_icfes')->nullable();
            $table->string('direccion')->nullable();
            $table->string('barrio')->nullable();
            $table->unsignedBigInteger('departamento_id')->nullable();
            $table->unsignedBigInteger('municipio_id')->nullable();
            $table->string('zona')->nullable(); // RURAL / URBANA
            $table->string('sector')->nullable(); // OFICIAL / PRIVADO
            $table->string('correo')->nullable();
            $table->string('telefono')->nullable();
            $table->string('web')->nullable();
            $table->string('nombre_rector')->nullable();
            $table->string('nombre_auxiliar')->nullable();
            $table->string('cc_rector')->nullable();
            $table->string('cc_auxiliar')->nullable();
            $table->string('cargo_rector')->nullable();
            $table->string('cargo_auxiliar')->nullable();
            $table->string('firma_rector')->nullable();
            $table->string('firma_auxiliar')->nullable();
            $table->string('encabezado_membrete')->nullable();
            $table->string('pie_membrete')->nullable();
            $table->string('escudo')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('instituciones');
    }

};
