<?php
$id = $_GET['id'] ?? ""; // Si llega un ID por GET, es edición
$archivo = "noticias.csv";

// Valores por defecto (si es noticia nueva)
$noticia = ["", "", "", "", "", "", "", "borrador", ""];

// Categorías fijas de noticias
$categorias = [
    "Política",
    "Economía",
    "Sociedad",
    "Internacional",
    "Deportes",
    "Cultura",
    "Ciencia y Tecnología",
    "Salud",
    "Opinión"
];

// Si estamos editando, cargamos la noticia desde el CSV
if ($id && file_exists($archivo)) {
    $f = fopen($archivo, "r");
    while (($linea = fgetcsv($f, 1000, ";")) !== FALSE) {
        if ($linea[0] == $id) {
            $noticia = $linea;
            break;
        }
    }
    fclose($f);
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title><?= $id ? "Editar" : "Crear" ?> Noticia</title>
</head>

<body>
    <h1><?= $id ? "Editar" : "Crear" ?> Noticia</h1>

    <!-- Formulario para guardar noticia -->
    <form action="acciones.php" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="id" value="<?= $noticia[0] ?>">

        <label>Título:</label><br>
        <input type="text" name="title" value="<?= htmlspecialchars($noticia[1]) ?>" required><br><br>

        <label>Descripción:</label><br>
        <textarea name="description" required><?= htmlspecialchars($noticia[2]) ?></textarea><br><br>

        <label>Cuerpo:</label><br>
        <textarea name="body" required><?= htmlspecialchars($noticia[3]) ?></textarea><br><br>

        <label>Categoría:</label><br>
        <!-- Select con las categorías fijas -->
        <select name="category" required>
            <option value="">-- Selecciona categoría --</option>
            <?php foreach ($categorias as $cat): ?>
                <option value="<?= $cat ?>" <?= ($noticia[4] == $cat) ? "selected" : "" ?>>
                    <?= $cat ?>
                </option>
            <?php endforeach; ?>
        </select><br><br>

        <label>Autor:</label><br>
        <input type="text" name="author" value="<?= htmlspecialchars($noticia[5]) ?>" required><br><br>

        <label>Imagen:</label><br>
        <?php if ($noticia[8]): ?>
            <!-- Mostrar imagen previa si existe -->
            <img src="<?= $noticia[8] ?>" width="100"><br>
        <?php endif; ?>
        <input type="file" name="image"><br><br>

        <button type="submit" name="action" value="save">Guardar</button>
    </form>
</body>

</html>