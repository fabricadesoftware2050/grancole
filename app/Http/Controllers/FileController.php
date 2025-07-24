<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
class FileController extends Controller
{
    public function subir(Request $request)
    {
        try {
            $request->validate([
            'file' => 'required|file|max:2048|mimes:jpg,png,gif,svg,doc,docx,pdf,webp', // puedes agregar mimes:jpg,png,pdf según necesites
            ]);

            $archivo = $request->file('file');

            // Nombre único
            $nombreArchivo = uniqid() . '.' . $archivo->getClientOriginalExtension();

            // Guardar en public/files usando el disco "public" configurado a public_path('files')
            Storage::disk('public')->put($nombreArchivo, file_get_contents($archivo));

            // Retornar la URL relativa
            $urlRelativa = '/files/' . $nombreArchivo;

            return response()->json([
                'url' => $urlRelativa,
                'nombre' => $nombreArchivo,
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error al subir el archivo: ' . $e->getMessage()], 500);
        }
    }


    public function eliminarArchivo(Request $request)
{
    try {
    $request->validate([
        'filename' => 'required|string',
    ]);

    $filename = $request->input('filename');
    $filename = basename(parse_url($filename, PHP_URL_PATH)); // obtiene "firma_auxiliar_123.png"


    if (Storage::disk('public')->exists($filename)) {
        Storage::disk('public')->delete($filename);
        return response()->json([
            'message' => 'Archivo eliminado correctamente',
        ]);
    } else {
        return response()->json([
            'message' => 'El archivo no existe',
        ], 404);
    }
    } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error al eliminar el archivo: ' . $e->getMessage()], 500);
        }
}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
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
        //
    }
}
