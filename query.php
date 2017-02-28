<?php
define('DB_NAME', 'benzo_db_vds');
define('DB_USER', 'benzo_db_vds');
define('DB_PASSWORD', '123qazwsx');
define('DB_HOST', 'localhost');

$dbh = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die("Can't connect to MySQL!");

mysql_select_db(DB_NAME) or die("Can't connect to DB!");

mysql_set_charset( 'utf8' );

$query = "SELECT p.product_id, pd.name, p.price, p.currency, p.image FROM oc_product p
LEFT JOIN oc_product_description pd ON (p.product_id = pd.product_id)
GROUP BY p.product_id";


$res = mysql_query($query) or die(mysql_error());


while($goods[] = mysql_fetch_array($res));

$count = mysql_num_rows($res);

$exchange = 27.19;

for ($i = 0; $i < $count; $i++)
{

	if($goods[$i]['currency'] == 'USD'){
		$isoprice = round($goods[$i]['price'] * $exchange) . " UAH";
	}else{
		$isoprice = round($goods[$i]['price']) . " UAH";	
	}

	$pass = $goods[$i]['image'];

	$url = str_split($pass);

	for($j = 0; $j < count($url); $j ++)
	{
		$url[$j] .= "/";
		$new_pass .= $url[$j];
	}

	$url =  str2url(html_entity_decode($goods[$i]['name']));

	$product_url = "http://benzoman.com.ua/" . $url . '/';

	//$product_url = "http://benzoman.com.ua/" . $goods[$i]['name']  . "-" . $goods[$i]['product_id'];
	$final_url = "http://benzoman.com.ua/img/cache/" . $goods[$i]['image'];
	$new_pass = "";

	echo "<b>id</b>: " . $goods[$i]['product_id'] . "<br /><b>name</b>: " . $goods[$i]['name'] . "<br /><b>price</b>: " . $isoprice . "<br /><b>img_url</b>: " . $final_url . "<br /><b>product_url</b>: " . $product_url . "<br /><br />";
	
}


mysql_close($dbh);

function str2url($str) {
    // переводим в транслит
    $str = rus2translit($str);
    // в нижний регистр
    $str = strtolower($str);
    // заменям все ненужное нам на "-"
    $str = preg_replace('~[^-a-z0-9_]+~u', '-', $str);
    // удаляем начальные и конечные '-'
    $str = trim($str, "-");
    return $str;
}

function rus2translit($string) {
    $converter = array(
        'а' => 'a',
        'б' => 'b',
        'в' => 'v',
        'г' => 'g',
        'д' => 'd',
        'е' => 'e',
        'ё' => 'e',
        'ж' => 'zh',
        'з' => 'z',
        'и' => 'i',
        'й' => 'y',
        'к' => 'k',
        'л' => 'l',
        'м' => 'm',
        'н' => 'n',
        'о' => 'o',
        'п' => 'p',
        'р' => 'r',
        'с' => 's',
        'т' => 't',
        'у' => 'u',
        'ф' => 'f',
        'х' => 'h',
        'ц' => 'c',
        'ч' => 'ch',
        'ш' => 'sh',
        'щ' => 'sch',
        'ь' => '',
        'ы' => 'y',
        'ъ' => '',
        'э' => 'e',
        'ю' => 'yu',
        'я' => 'ya',
//      '&' => '-and-',
        'А' => 'A',
        'Б' => 'B',
        'В' => 'V',
        'Г' => 'G',
        'Д' => 'D',
        'Е' => 'E',
        'Ё' => 'E',
        'Ж' => 'Zh',
        'З' => 'Z',
        'И' => 'I',
        'Й' => 'Y',
        'К' => 'K',
        'Л' => 'L',
        'М' => 'M',
        'Н' => 'N',
        'О' => 'O',
        'П' => 'P',
        'Р' => 'R',
        'С' => 'S',
        'Т' => 'T',
        'У' => 'U',
        'Ф' => 'F',
        'Х' => 'H',
        'Ц' => 'C',
        'Ч' => 'Ch',
        'Ш' => 'Sh',
        'Щ' => 'Sch',
        'Ь' => '',
        'Ы' => 'Y',
        'Ъ' => '',
        'Э' => 'E',
        'Ю' => 'Yu',
        'Я' => 'Ya',
        );
    return strtr($string, $converter);
}

?>