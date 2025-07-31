<?php

namespace App\Http\Controllers;

use App\Models\AreaAcademica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AreaAcademinaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $page=$request->input('paginate', false);
            if($page){
                $data = AreaAcademica::with('area_fundamental')->orderBy('orden', 'asc')->paginate(10);
            } else {
                $data = AreaAcademica::with('area_fundamental')->orderBy('orden', 'asc')->get();
            }
            return response()->json([
                'success' => true,
                'data' => $data
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al obtener datos: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al obtener los datos.'
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
    */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
    */
    public function store(Request $request)
    {
        try {
            $data = $request->all();

            $resp = AreaAcademica::updateOrCreate(
                ['id' => $request->input('id')],
                $data
            );



            return response()->json([
                'message' => 'Información guardada con éxito!',
                'data' => AreaAcademica::with('area_fundamental')->orderBy('orden', 'asc')->get()
            ]);
        } catch (\Exception $e) {
            Log::error('Error al obtener datos: ' . $e->getMessage());
            if(str_contains($e->getMessage(),'Duplicate')){
                $message="Ya existe esta área.";
            }else{
                $message = 'Ocurrió un error al guardar la información.';
            }
            return response()->json(['success' => false, 'message' => $message], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        try {
                $resp = AreaAcademica::findOrFail($id);
                $resp->delete();

            } catch (\Exception $e) {
                return response()->json(['success' => false, 'message' => 'Error al guardar: ' . $e->getMessage()], 500);
            }finally{
            return response()->json([
                'message' => 'Información eliminada con éxito!',
                'data' => AreaAcademica::with('area_fundamental')->orderBy('orden', 'asc')->get()
                ]);

        }
    }
}
