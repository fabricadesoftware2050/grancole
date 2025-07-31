<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('areas_fundamentales', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->longText('nombre_corto')->nullable();
            $table->longText('descripcion')->nullable();
            $table->string('orden')->default("1");
            $table->boolean('visible')->default("1");
            $table->timestamps();
        });

        //  Áreas Fundamentales
    DB::table('areas_fundamentales')->insert([
        ['nombre' => 'Ciencias Naturales y Educación Ambiental', 'nombre_corto'=>'Ciencias Naturales' ,'descripcion'=> 'Incluye el estudio de los fenómenos naturales, la vida, la conservación del medio ambiente y la relación del ser humano con la naturaleza.'],
        ['nombre' => 'Ciencias Sociales, Historia, Geografía, Constitución Política y Democracia', 'nombre_corto'=>'Ciencias Sociales' ,'descripcion'=> 'Abarca el análisis de procesos sociales, históricos, geográficos y políticos, así como la formación ciudadana y el conocimiento de la Constitución y los principios democráticos.'],
        ['nombre' => 'Educación Artística y Cultural', 'nombre_corto'=>'Artística y Cultura' ,'descripcion'=> 'Busca desarrollar la creatividad, la sensibilidad estética y la apreciación de las diferentes expresiones artísticas y culturales.'],
        ['nombre' => 'Educación Ética y en Valores Humanos', 'nombre_corto'=>'Ética y Valores' ,'descripcion'=> 'Se enfoca en la formación en valores como la justicia, la solidaridad, el respeto, la tolerancia y la responsabilidad, promoviendo una convivencia pacífica y democrática.'],
        ['nombre' => 'Educación Física, Recreación y Deportes', 'nombre_corto'=>'Educación Física' ,'descripcion'=> 'Fomenta la actividad física, la recreación y la práctica de deportes, contribuyendo al desarrollo integral del estudiante.'],
        ['nombre' => 'Educación Religiosa', 'nombre_corto'=>'Religión' ,'descripcion'=> 'Se ofrece en todos los establecimientos educativos, respetando la libertad de conciencia y el derecho a no recibirla si así se elige.'],
        ['nombre' => 'Humanidades, Lengua Castellana e Idiomas Extranjeros', 'nombre_corto'=>'Idiomas' ,'descripcion'=> 'Incluye el desarrollo de habilidades comunicativas en español y en otros idiomas, así como el estudio de la literatura y la cultura asociadas.'],
        ['nombre' => 'Matemáticas', 'nombre_corto'=>'Matemáticas' ,'descripcion'=> 'Permite el desarrollo del pensamiento lógico, la resolución de problemas y la aplicación de conceptos matemáticos en diferentes contextos.'],
        ['nombre' => 'Tecnología e Informática', 'nombre_corto'=>'Informática' ,'descripcion'=> 'Introduce a los estudiantes en el uso de herramientas tecnológicas, el manejo de información y el desarrollo de habilidades informáticas.'],
        ['nombre' => 'Áreas optativas', 'nombre_corto'=>'Optativas' ,'descripcion'=> 'Introduce a los estudiantes en una especialidad.'],
        ['nombre' => 'Servicio Social', 'nombre_corto'=>'Servicio Social' ,'descripcion'=> 'Introduce a los estudiantes en una especialidad.'],
        ['nombre' => 'Servicio Social Estudiantil', 'nombre_corto'=>'Servicio Social' ,'descripcion'=> 'Introduce a los estudiantes en una especialidad.'],
    ]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('areas_fundamentales');
    }
};
