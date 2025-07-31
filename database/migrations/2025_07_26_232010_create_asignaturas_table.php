<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('asignaturas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->nullable(false);
            $table->longText('descripcion')->nullable();
            $table->longText('malla')->nullable();
            $table->longText('plan_area')->nullable();
            $table->string('orden')->default("1");
            $table->unsignedBigInteger('area_academica_id')->nullable();
            $table->boolean('visible')->default("1");
            $table->boolean('visible_en_informes')->default("1");
            $table->boolean('afecta_promocion')->default("1");
            $table->unique(['nombre','area_academica_id']);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asignaturas');
    }
};
