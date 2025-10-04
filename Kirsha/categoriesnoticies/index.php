<?php
session_start();

if (!isset($_SESSION['categorias'])) {
    //Array de categorías iniciales
    $_SESSION['categorias'] = [
        "Política",
        "Economía",
        "Internacional",
        "Deportes",
        "Cultura",
        "Ciencias y Tecnología",
        "Salud",
        "Opinión"
    ];
}

// Mensaje de acciones
$mensaje = $_SESSION['mensaje'] ?? "";
unset($_SESSION['mensaje']);

$categorias = $_SESSION['categorias'];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Gestión de Categorías</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        .mensaje { margin: 10px 0; padding: 10px; border: 1px solid #ccc; background: #f4f4f4; }
        table { border-collapse: collapse; width: 60%; margin-bottom: 20px; }
        td, th { border: 1px solid #999; padding: 8px; text-align: left; }
        .acciones form { display: inline; }
    </style>
</head>
<body>
    <h1>Categoría de notícias</h1>

    <?php if ($mensaje): ?>
        <div class="mensaje"><?= $mensaje ?></div>
    <?php endif; ?>

    <h2>Lista de categorías (<?= count($categorias) ?>)</h2>
    <table>
        <tr><th></th><th>Categoría</th><th>Acciones</th></tr>
        <?php foreach ($categorias as $i => $cat): ?>
        <tr>
            <td><?= $i+1 ?></td>
            <td><?= htmlspecialchars($cat) ?></td>
            <td class="acciones">
                <!-- Botón Editar -->
                <form method="get" action="index.php" style="display:inline;">
                    <input type="hidden" name="editar" value="<?= $i ?>">
                    <button type="submit">Editar</button>
                </form>

                <!-- Botón Eliminar -->
                <form method="post" action="acciones.php" style="display:inline;">
                    <input type="hidden" name="index" value="<?= $i ?>">
                    <button type="submit" name="eliminar" onclick="return confirm('¿Eliminar la categoría <?= $cat ?>?')">Eliminar</button>
                </form>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>

    <!-- Apartado de edición si se pulsa Editar -->
    <?php if (isset($_GET['editar'])): 
        $idx = (int)$_GET['editar']; ?>
        <h2>Editar categoría</h2>
        <form method="post" action="acciones.php">
            <input type="hidden" name="index" value="<?= $idx ?>">
            <input type="text" name="nuevo_nombre" value="<?= htmlspecialchars($categorias[$idx]) ?>">
            <button type="submit" name="modificar">Guardar cambios</button>
            <a href="index.php">Cancelar</a>
        </form>
    <?php endif; ?>

    <h2>Crear categoría</h2>
    <form method="post" action="acciones.php">
        <input type="text" name="nueva_categoria" placeholder="Nombre de la categoría">
        <button type="submit" name="crear">Crear</button>
    </form>

    <h2>Opciones</h2>
    <form method="post" action="acciones.php">
        <button type="submit" name="listar">Listar</button>
        <button type="submit" name="exportar">Exportar CSV</button>
    </form>
</body>
</html>
