<?php
// Mostrar todos los errores (útil para desarrollo)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Archivo CSV donde guardamos noticias
$archivo = "noticias.csv";

// ---------------- FUNCIONES ----------------

// Leer todas las noticias del CSV
function leerNoticias($archivo)
{
    $data = [];
    if (file_exists($archivo)) {
        $f = fopen($archivo, "r");
        while (($linea = fgetcsv($f, 1000, ";")) !== FALSE) {
            $data[] = $linea;
        }
        fclose($f);
    }
    return $data;
}

// Guardar todas las noticias en el CSV
function guardarNoticias($archivo, $data)
{
    $f = fopen($archivo, "w");
    foreach ($data as $linea) {
        fputcsv($f, $linea, ";");
    }
    fclose($f);
}

// ---------------- ACCIONES ----------------

$action = $_REQUEST['action'] ?? "";

// Guardar (crear o editar noticia)
if ($action == "save") {
    // Recoger datos del formulario
    $id = $_POST['id'] ?? "";
    $title = $_POST['title'] ?? "";
    $description = $_POST['description'] ?? "";
    $body = $_POST['body'] ?? "";
    $category = $_POST['category'] ?? "";
    $author = $_POST['author'] ?? "";
    $date = date("Y-m-d H:i:s");
    $status = "borrador"; // siempre se crea como borrador
    $imagePath = "";

    // Manejo de imagen subida
    if (!empty($_FILES['image']['name'])) {
        if (!is_dir("uploads")) {
            mkdir("uploads", 0777, true);
        }
        $filename = "uploads/" . time() . "_" . basename($_FILES['image']['name']);
        move_uploaded_file($_FILES['image']['tmp_name'], $filename);
        $imagePath = $filename;
    }

    // Cargar noticias actuales
    $noticias = leerNoticias($archivo);

    if ($id) {
        // Editar noticia existente
        foreach ($noticias as &$n) {
            if ($n[0] == $id) {
                $n = [$id, $title, $description, $body, $category, $author, $date, $status, $imagePath ?: $n[8]];
                break;
            }
        }
    } else {
        // Crear nueva noticia con ID incremental
        $newId = count($noticias) ? max(array_map(fn($n) => (int) $n[0], $noticias)) + 1 : 1;
        $noticias[] = [$newId, $title, $description, $body, $category, $author, $date, $status, $imagePath];
    }

    // Guardar de nuevo el CSV
    guardarNoticias($archivo, $noticias);
    header("Location: index.php");
    exit;
}

// Eliminar noticia
if ($action == "delete") {
    $id = $_GET['id'];
    $noticias = leerNoticias($archivo);
    $noticias = array_filter($noticias, fn($n) => $n[0] != $id);
    guardarNoticias($archivo, $noticias);
    header("Location: index.php");
    exit;
}

// Publicar noticia (cambiar estado a publicada)
if ($action == "publish") {
    $id = $_GET['id'];
    $noticias = leerNoticias($archivo);
    foreach ($noticias as &$n) {
        if ($n[0] == $id) {
            $n[7] = "publicada";
            break;
        }
    }
    guardarNoticias($archivo, $noticias);
    header("Location: index.php");
    exit;
}
?>
