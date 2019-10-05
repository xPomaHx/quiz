<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
$servername = "shop.svyatsy.org";
$username = "saint_qiuz";
$password = "BheRWkOPd8y76cKzdNfR";
$dbname = "shop_sv";

function toNum($n)
{
    return (int)($n);
}
$ids = join(",",array_map('toNum',explode(",",$_GET["ids"])));
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
$conn->set_charset("utf8");
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT evo_site_content.id, evo_site_content.alias, evo_site_content.pagetitle, evo_site_tmplvar_contentvalues.value,evo_site_tmplvar_contentvalues.tmplvarid FROM evo_site_content LEFT JOIN  evo_site_tmplvar_contentvalues ON evo_site_tmplvar_contentvalues.contentid = evo_site_content.id  WHERE evo_site_tmplvar_contentvalues.contentid IN (".$ids.") AND evo_site_tmplvar_contentvalues.tmplvarid IN (46, 35, 32)";

$result = $conn->query($sql);
if ($result->num_rows > 0) {
  $rows = array();
  while ($r = $result->fetch_assoc()) {
    $rows['goods'][] = $r;
  }
  print json_encode($rows);
} else {
  echo "0 results";
}
$conn->close();
