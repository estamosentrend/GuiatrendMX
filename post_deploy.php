<?php
// Script de post-despliegue para Hostinger
// Este script se ejecutará automáticamente después del despliegue

echo "Iniciando post-despliegue...\n";

// Rutas posibles de npm en Hostinger
$npm_paths = [
    '/usr/bin/npm',
    '/usr/local/bin/npm', 
    '/opt/cpanel/ea-nodejs16/bin/npm',
    '/opt/cpanel/ea-nodejs18/bin/npm',
    '/opt/cpanel/ea-nodejs20/bin/npm'
];

$npm_found = false;
$npm_path = '';

// Buscar npm en las rutas posibles
foreach ($npm_paths as $path) {
    if (file_exists($path)) {
        $npm_found = true;
        $npm_path = $path;
        echo "Encontrado npm en: $path\n";
        break;
    }
}

if (!$npm_found) {
    echo "ERROR: No se encontró npm en ninguna de las rutas conocidas\n";
    exit(1);
}

// Cambiar al directorio del proyecto
chdir(dirname(__FILE__));

echo "Instalando dependencias de Node.js...\n";
$install_cmd = "$npm_path install";
echo "Ejecutando: $install_cmd\n";
$result = shell_exec($install_cmd);
echo "Resultado de npm install:\n$result\n";

echo "Construyendo la aplicación...\n";
$build_cmd = "$npm_path run build";
echo "Ejecutando: $build_cmd\n";
$result = shell_exec($build_cmd);
echo "Resultado de npm run build:\n$result\n";

echo "Iniciando el servidor...\n";
$start_cmd = "$npm_path start";
echo "Ejecutando: $start_cmd\n";
$result = shell_exec($start_cmd);
echo "Resultado de npm start:\n$result\n";

echo "Post-despliegue completado exitosamente!\n";
?>