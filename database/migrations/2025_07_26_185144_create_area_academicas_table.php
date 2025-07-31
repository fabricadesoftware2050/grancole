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
        Schema::create('areas_academicas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->longText('descripcion')->nullable();
            $table->string('orden')->default("1");
            $table->unsignedBigInteger('area_fundamental_id')->nullable();
            $table->boolean('visible')->default("1");
            $table->boolean('afecta_promocion')->default("1");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('areas_academicas');
    }
};
