<?php
try {
    $conn = new PDO("sqlsrv:server = tcp:aurea.database.windows.net,1433; Database = aureadb", "CloudSA43f66dc7", "Mm9300646@");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Connected to Azure SQL DB successfully.";
} catch (PDOException $e) {
    echo "❌ Connection failed: " . $e->getMessage();
}
?>