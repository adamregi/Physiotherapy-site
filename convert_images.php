<?php
/**
 * Helper script to convert PNG assets to optimized WebP files
 * Runs via CLI or Web
 */
header('Content-Type: text/plain');

$assetsDir = __DIR__ . '/assets';
if (!is_dir($assetsDir)) {
    echo "Assets directory not found.\n";
    exit;
}

$files = scandir($assetsDir);
$pngFiles = [];
foreach ($files as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'png') {
        $pngFiles[] = $file;
    }
}

if (empty($pngFiles)) {
    echo "No PNG files found in assets/ directory.\n";
    exit;
}

echo "Found " . count($pngFiles) . " PNG files to convert.\n\n";

foreach ($pngFiles as $file) {
    $source = $assetsDir . '/' . $file;
    $destination = $assetsDir . '/' . pathinfo($file, PATHINFO_FILENAME) . '.webp';
    
    if (file_exists($destination)) {
        echo "WebP file already exists for $file. Skipping.\n";
        continue;
    }
    
    echo "Converting $file -> " . basename($destination) . "... ";
    
    // Create image resource from PNG
    $img = @imagecreatefrompng($source);
    if (!$img) {
        echo "FAILED to open PNG file.\n";
        continue;
    }
    
    // Preserve transparency channel
    imagepalettetotruecolor($img);
    imagealphablending($img, true);
    imagesavealpha($img, true);
    
    // Convert to WebP with 80% quality compression
    $status = imagewebp($img, $destination, 80);
    imagedestroy($img);
    
    if ($status) {
        echo "SUCCESS! (" . filesize($destination) . " bytes)\n";
    } else {
        echo "FAILED to save WebP.\n";
    }
}

echo "\nConversion process complete!\n";
