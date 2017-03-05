<?php
define('DB_NAME', 'benzo_db_vds');
define('DB_USER', 'benzo_db_vds');
define('DB_PASSWORD', '123qazwsx');
define('DB_HOST', 'localhost');

$dbh = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die("Can't connect to MySQL!");

mysql_select_db(DB_NAME) or die("Can't connect to DB!");

mysql_set_charset( 'utf8' );

$query = "SELECT p.product_id, p.quantity, p.overheads, p.overheads_currency, p.margin, pd.name, p.price, p.currency, p.image, ps.price as sale
FROM oc_product p
LEFT JOIN oc_product_description pd ON (p.product_id = pd.product_id)
LEFT JOIN oc_product_special ps ON (p.product_id = ps.product_id)
WHERE p.quantity = 1 AND 
p.status = 1
GROUP BY p.product_id";

$query_array = "SELECT query, keyword FROM oc_url_alias WHERE query LIKE 'product_id=%' ORDER BY query";

$res_array = mysql_query($query_array) or die(mysql_error());
while($res_url[] = mysql_fetch_array($res_array));

$count_array = mysql_num_rows($res_array);

$currency_query = "SELECT code, value FROM oc_currency";

$currency_array = mysql_query($currency_query) or die(mysql_error());
while($currency_value[] = mysql_fetch_array($currency_array));
$count_currency_array = mysql_num_rows($res_array);

$exchangeUSD = $currency_value[0]['value'];
$exchangeEUR = $currency_value[1]['value'];
$exchangeUAH = $currency_value[2]['value'];

$res = mysql_query($query) or die(mysql_error());

while($goods[] = mysql_fetch_array($res));

$count = mysql_num_rows($res);

require_once 'PHPExcel.php';

 $phpexcel = new PHPExcel();

    $page = $phpexcel->setActiveSheetIndex(0);
    $page->setCellValue("A1", 'ID');
    $page->setCellValue("B1", 'Item title');
    $page->setCellValue("C1", 'Price');
    $page->setCellValue("D1", 'Image URL');
    $page->setCellValue("E1", 'Final URL');
    $page->setTitle("ProductList");
    $page->getColumnDimension('A')->setWidth(5);
    $page->getColumnDimension('B')->setWidth(40);
    $page->getColumnDimension('C')->setWidth(10);
    $page->getColumnDimension('D')->setWidth(50);
    $page->getColumnDimension('E')->setWidth(50);

    $x = 1;

for ($i = 0; $i < $count; $i++)
{
	if($goods[$i]['currency'] == 'USD'){
        if($goods[$i]['sale'])
            $isoprice = round($goods[$i]['sale'] * $exchangeUAH) . " UAH";
                else
                    $isoprice = $goods[$i]['price'] * $exchangeUAH . " UAH";
	
    }elseif($goods[$i]['currency'] == 'UAH'){
        if($goods[$i]['sale'])
            $isoprice = round($goods[$i]['sale']) . " UAH";
                else
                    $isoprice = $goods[$i]['price'] . " UAH";
	
    }elseif($goods[$i]['currency'] == 'EUR'){
        if($goods[$i]['sale'])
            $isoprice = round($goods[$i]['sale'] * $exchangeEUR) . " EUR";
                else
                    $isoprice = $goods[$i]['price'] * $exchangeEUR . " EUR";
    
    }else
        if($goods[$i]['sale'])
            $isoprice = round($goods[$i]['sale']) . " UAH";
                else
                    $isoprice = $goods[$i]['price'] . " UAH";

    if($goods[$i]['margin'])
        if($goods[$i]['currency'] == 'USD')
            $margin = ($goods[$i]['price'] * $goods[$i]['margin'] / 100) * $exchangeUAH;
        elseif($goods[$i]['currency'] == 'UAH')
            $margin = $goods[$i]['price'] * $goods[$i]['margin'] / 100;
        elseif($goods[$i]['currency'] == 'EUR')
            $margin =($goods[$i]['price'] * $goods[$i]['margin'] / 100) * $exchangeEUR;
            else
                $margin = 0;

    if($goods[$i]['overheads'])
        if($goods[$i]['overheads_currency'] == 'USD')
            $overheads = $goods[$i]['overheads'] * $exchangeUAH;
        elseif ($goods[$i]['overheads_currency'] == 'UAH')
            $overheads = $goods[$i]['overheads'];
        elseif ($goods[$i]['overheads_currency'] == 'EUR')
            $overheads = $goods[$i]['overheads'] * $exchangeEUR;
            else 
                $overheads = $goods[$i]['overheads'] * $exchangeUAH;

    if($goods[$i]['currency'] == 'USD'){

        $total = $overheads + $margin;
        $isoprice = round($isoprice + $total) . ' UAH';

    }elseif ($goods[$i]['currency'] == 'UAH') {

        $total = $overheads + $margin;
        $isoprice = round($isoprice + $total) . ' UAH';

    }elseif ($goods[$i]['currency'] == 'EUR') {

        $total = $overheads + $margin;
        $isoprice = round($isoprice + $total) . ' EUR';

    }else{

        $total = $overheads + $margin;
        $isoprice = round($isoprice + $total) . ' UAH';
    }
    
	$pass = $goods[$i]['image'];

	$url = str_split($pass);

	for($j = 0; $j < count($url); $j ++)
	{
		$url[$j] .= "/";
		$new_pass .= $url[$j];
	}

    $product = str_replace('/', '', $str);

    for ($k = 0; $k < $count_array; $k++){
        if ('product_id=' . $goods[$i]['product_id'] == $res_url[$k]['query']){
            $product_url = "http://benzoman.com.ua/" . $res_url[$k]['keyword'] . '/';
            break;
        }else
            $product_url = "http://benzoman.com.ua/index.php?route=product/product&product_id=" . $goods[$i]['product_id'] ;        
    }

	$final_url = "http://benzoman.com.ua/image/" . $goods[$i]['image'];
	$new_pass = "";

	echo "<b>id</b>: " . $goods[$i]['product_id'] . "<br /><b>name</b>: " . html_entity_decode($goods[$i]['name']) . "<br /><b>price</b>: " . $isoprice . "<br /><b>img_url</b>: " . $final_url . "<br /><b>product_url</b>: " . $product_url . "<br /><br />";

        $x++;
        $page ->setCellValue("A$x", $goods[$i]['product_id']);
        $page ->setCellValue("B$x", $goods[$i]['name']);
        $page ->setCellValue("C$x", $isoprice);
        $page ->setCellValue("D$x", $final_url);
        $page ->setCellValue("E$x", $product_url);  
}

    $objWriter = PHPExcel_IOFactory::createWriter($phpexcel, 'Excel2007');
    $objWriter->save("report/ProductList.xlsx");

mysql_close($dbh);

?>