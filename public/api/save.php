<?
function  my_fputcsv($fp, $csv_arr, $delimiter = ';', $enclosure = '"')
{
  // проверим, что на  входе массив
  if (!is_array($csv_arr)) {
    return (false);
  }
  // обойдем все  элемены массива
  for ($i = 0, $n = count($csv_arr); $i < $n; $i++) {
    // если это не  число
    if (!is_numeric($csv_arr[$i])) {
      // вставим символ  ограничения и продублируем его в теле элемента
      $csv_arr[$i] =  $enclosure . str_replace($enclosure, $enclosure . $enclosure,  $csv_arr[$i]) . $enclosure;
    }
    // если  разделитель - точка, то числа тоже экранируем
    if (($delimiter == '.') && (is_numeric($csv_arr[$i]))) {
      $csv_arr[$i] =  $enclosure . $csv_arr[$i] . $enclosure;
    }
  }
  // сольем массив в строку, соединив разделителем
  $str = implode($delimiter,  $csv_arr) . "\n";
  fwrite($fp, $str);
  // возвращаем  количество записанных данных
  return strlen($str);
}

$pathFormDataFile = "../data/formData.csv";
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);
$handle = fopen($pathFormDataFile, "a");
if (filesize($pathFormDataFile) == 0) {
  fwrite($handle, "\xEF\xBB\xBF");
  my_fputcsv($handle, array(
    "dateCur",
    "email",
    "dlyakogo",
    "currentStep",
    "name",
    "vaskrestili",
    "vaskrestilipomny",
    "datekrest",
    "datebeth",
    "imyaprikresh",
    "name2",
  ));
}
my_fputcsv($handle, $decoded);
fclose($handle);
echo "ok";
