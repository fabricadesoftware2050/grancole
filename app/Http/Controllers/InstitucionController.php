<?php

namespace App\Http\Controllers;

use App\Models\Institucion;
use Illuminate\Http\Request;

class InstitucionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Obtener la institución, asumiendo que solo hay una
            $institucion = Institucion::latest()->get()[0] ?? null;

            if (!$institucion) {
                return response()->json(['message' => 'Configure los datos de la institución'], 404);
            }

            return response()->json(['data' => $institucion,'message'=>'Datos de la institución cargados correctamente'], 200);



        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error al guardar la institución: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->all();

    // Asumimos que solo hay una institución, o se identifica por NIT o código DANE
    $institucion = Institucion::updateOrCreate(
        ['nit' => $data['nit']],
        $data
    );

    return response()->json([
        'message' => 'Institución guardada correctamente',
        'data' => $institucion
    ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error al guardar la institución: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
