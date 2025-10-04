<?php
// Archivo CSV donde se guardan las noticias
$archivo = "noticias.csv";
$noticias = [];

// Si existe el archivo, lo abrimos y leemos todas las noticias
if (file_exists($archivo)) {
    $f = fopen($archivo, "r");
    while (($linea = fgetcsv($f, 1000, ";")) !== FALSE) {
        $noticias[] = $linea;
    }
    fclose($f);
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Inicio - Noticias</title>
</head>

<body>
    <h1>Listado de Noticias</h1>

    <!-- Enlace para crear nueva noticia -->
    <a href="form.php">➕ Crear Noticia</a>

    <!-- Tabla con todas las noticias -->
    <table border="1" cellpadding="5">
        <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Categoría</th>
            <th>Autor</th>
            <th>Estado</th>
            <th>Acciones</th>
        </tr>
        <?php foreach ($noticias as $n): ?>
            <tr>
                <td><?= $n[0] ?></td>
                <td><?= htmlspecialchars($n[1]) ?></td>
                <td><?= htmlspecialchars($n[4]) ?></td>
                <td><?= htmlspecialchars($n[5]) ?></td>
                <td><?= $n[7] ?></td>
                <td>
                    <!-- Acciones sobre cada noticia -->
                    <a href="form.php?id=<?= $n[0] ?>">✏️ Editar</a> |
                    <a href="acciones.php?action=delete&id=<?= $n[0] ?>">🗑 Eliminar</a> |
                    <?php if ($n[7] == "borrador"): ?>
                        <a href="acciones.php?action=publish&id=<?= $n[0] ?>">📢 Publicar</a>
                    <?php else: ?>
                        <em>Publicada</em>
                    <?php endif; ?>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>
</body>

</html>