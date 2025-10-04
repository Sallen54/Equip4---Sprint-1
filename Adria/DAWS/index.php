<?php
// Configuración
$csvFile = 'favoritos.csv';

// Crear archivo CSV si no existe
if (!file_exists($csvFile)) {
    $fp = fopen($csvFile, 'w');
    fputcsv($fp, ['id', 'nombre_producto', 'precio', 'fecha_agregado']);
    fclose($fp);
}

// Procesar acciones
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = $_POST['accion'] ?? '';
    
    if ($accion === 'agregar') {
        // Agregar producto a favoritos
        $id = uniqid();
        $nombre = $_POST['nombre_producto'] ?? '';
        $precio = $_POST['precio'] ?? '';
        $fecha = date('Y-m-d H:i:s');
        
        if (!empty($nombre) && !empty($precio)) {
            $fp = fopen($csvFile, 'a');
            fputcsv($fp, [$id, $nombre, $precio, $fecha]);
            fclose($fp);
            $mensaje = "Producto agregado a favoritos";
        }
    }
    
    if ($accion === 'eliminar') {
        // Eliminar producto de favoritos
        $idEliminar = $_POST['id'] ?? '';
        
        if (!empty($idEliminar)) {
            $datos = [];
            $fp = fopen($csvFile, 'r');
            while (($row = fgetcsv($fp)) !== false) {
                if ($row[0] !== $idEliminar) {
                    $datos[] = $row;
                }
            }
            fclose($fp);
            
            $fp = fopen($csvFile, 'w');
            foreach ($datos as $fila) {
                fputcsv($fp, $fila);
            }
            fclose($fp);
            $mensaje = "Producto eliminado de favoritos";
        }
    }
}

// Leer favoritos
$favoritos = [];
if (file_exists($csvFile)) {
    $fp = fopen($csvFile, 'r');
    $headers = fgetcsv($fp); // Saltar encabezados
    while (($row = fgetcsv($fp)) !== false) {
        $favoritos[] = [
            'id' => $row[0],
            'nombre' => $row[1],
            'precio' => $row[2],
            'fecha' => $row[3]
        ];
    }
    fclose($fp);
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Favoritos</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #333;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .mensaje {
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .formulario {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 30px;
        }
        
        .formulario h2 {
            color: #555;
            margin-bottom: 15px;
            font-size: 18px;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            color: #666;
            font-weight: bold;
        }
        
        input[type="text"],
        input[type="number"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        
        button:hover {
            background-color: #45a049;
        }
        
        .btn-eliminar {
            background-color: #f44336;
            padding: 8px 15px;
        }
        
        .btn-eliminar:hover {
            background-color: #da190b;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        
        th {
            background-color: #4CAF50;
            color: white;
            padding: 12px;
            text-align: left;
        }
        
        td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
        }
        
        tr:hover {
            background-color: #f5f5f5;
        }
        
        .vacio {
            text-align: center;
            padding: 40px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1> Gestión de Productos Favoritos</h1>
        
        <?php if (isset($mensaje)): ?>
            <div class="mensaje"><?php echo $mensaje; ?></div>
        <?php endif; ?>
        
        <div class="formulario">
            <h2>Agregar Producto a Favoritos</h2>
            <form method="POST">
                <input type="hidden" name="accion" value="agregar">
                
                <div class="form-group">
                    <label>Nombre del Producto:</label>
                    <input type="text" name="nombre_producto" required>
                </div>
                
                <div class="form-group">
                    <label>Precio (€):</label>
                    <input type="number" name="precio" step="0.01" required>
                </div>
                
                <button type="submit">Agregar a Favoritos</button>
            </form>
        </div>
        
        <h2>Mis Productos Favoritos</h2>
        
        <?php if (empty($favoritos)): ?>
            <div class="vacio">
                <p>No tienes productos favoritos aún. ¡Agrega algunos!</p>
            </div>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Fecha Agregado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($favoritos as $fav): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($fav['nombre']); ?></td>
                            <td><?php echo htmlspecialchars($fav['precio']); ?> €</td>
                            <td><?php echo htmlspecialchars($fav['fecha']); ?></td>
                            <td>
                                <form method="POST" style="display: inline;">
                                    <input type="hidden" name="accion" value="eliminar">
                                    <input type="hidden" name="id" value="<?php echo htmlspecialchars($fav['id']); ?>">
                                    <button type="submit" class="btn-eliminar" onclick="return confirm('¿Eliminar este producto de favoritos?')">
                                        Eliminar
                                    </button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</body>
</html>