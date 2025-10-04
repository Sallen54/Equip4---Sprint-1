<?php
session_start();

$categorias = $_SESSION['categorias'] ?? [];
$mensaje = "";

// Inicializamos historial si no existe
if (!isset($_SESSION['log'])) {
    $_SESSION['log'] = [];
}

// CREAR categoría
if (isset($_POST['crear'])) {
    $nueva = trim($_POST['nueva_categoria']);
    if ($nueva != "" && !in_array($nueva, $categorias)) {
        $categorias[] = $nueva;
        $mensaje = "Se creó la categoría \"$nueva\"";
        $_SESSION['log'][] = $mensaje;
    }
}

// ELIMINAR categoría
if (isset($_POST['eliminar'])) {
    $index = $_POST['index'];
    $nombre = $categorias[$index];
    unset($categorias[$index]);
    $categorias = array_values($categorias);
    $mensaje = "Ha eliminado la categoría \"$nombre\"";
    $_SESSION['log'][] = $mensaje;
}

// MODIFICAR categoría
if (isset($_POST['modificar'])) {
    $index = $_POST['index'];
    $nuevoNombre = trim($_POST['nuevo_nombre']);
    $antiguo = $categorias[$index];
    if ($nuevoNombre != "") {
        $categorias[$index] = $nuevoNombre;
        $mensaje = "Ha modificado la categoría \"$antiguo\" → \"$nuevoNombre\"";
        $_SESSION['log'][] = $mensaje;
    }
}

// EXPORTAR CSV
if (isset($_POST['exportar'])) {
    $filename = "categorias.csv";
    $fp = fopen($filename, "w");

    // Cabecera
    fputcsv($fp, ["Cantidad de categorías", count($categorias)]);

    // Listado
    fputcsv($fp, ["Listado de categorías"]);
    foreach ($categorias as $cat) {
        fputcsv($fp, [$cat]);
    }

    // Historial
    fputcsv($fp, []); // línea en blanco
    fputcsv($fp, ["Historial de acciones"]);
    foreach ($_SESSION['log'] as $accion) {
        fputcsv($fp, [$accion]);
    }

    fclose($fp);
    $mensaje = "Archivo CSV creado con historial: \"$filename\"";
}

// Guardamos cambios
$_SESSION['categorias'] = $categorias;
$_SESSION['mensaje'] = $mensaje;

// Volver al index
header("Location: index.php");
exit;
 
