<?php

declare(strict_types=1);

$projectDirectory = dirname(__DIR__) . '/public/images/projects';
$sourceFiles      = glob($projectDirectory . '/*.png');
$removeSource     = in_array('--remove-source', $argv, true);
$createdFiles     = array();

if (false === $sourceFiles || 0 === count($sourceFiles)) {
    fwrite(STDERR, "No PNG screenshots found.\n");
    exit(1);
}

foreach ($sourceFiles as $sourceFile) {
    $source = imagecreatefrompng($sourceFile);
    if (false === $source) {
        fwrite(STDERR, "Unable to read {$sourceFile}.\n");
        exit(1);
    }

    $sourceWidth  = imagesx($source);
    $sourceHeight = imagesy($source);
    $output       = $source;

    if ($sourceWidth > 1200) {
        $targetWidth  = 1200;
        $targetHeight = (int) round($sourceHeight * ($targetWidth / $sourceWidth));
        $output       = imagescale($source, $targetWidth, $targetHeight, IMG_BICUBIC);
    }

    $destination = preg_replace('/\.png$/', '.webp', $sourceFile);
    if (null === $destination || false === imagewebp($output, $destination, 82)) {
        fwrite(STDERR, "Unable to create WebP for {$sourceFile}.\n");
        exit(1);
    }

    if ($output !== $source) {
        imagedestroy($output);
    }
    imagedestroy($source);

    echo basename($destination) . '|' . filesize($destination) . PHP_EOL;
    $createdFiles[] = $destination;
}

if ($removeSource && count($createdFiles) === count($sourceFiles)) {
    foreach ($sourceFiles as $sourceFile) {
        if (!unlink($sourceFile)) {
            fwrite(STDERR, "Unable to remove {$sourceFile}.\n");
            exit(1);
        }
    }
    echo 'Removed ' . count($sourceFiles) . ' source PNG files.' . PHP_EOL;
}
