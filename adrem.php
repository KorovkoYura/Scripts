<?php
define('DB_NAME', 'techsn00_ps');
define('DB_USER', 'techsn00_ps');
define('DB_PASSWORD', '481ol7ld');
define('DB_HOST', 'techsn00.mysql.ukraine.com.ua');
$dbh = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die("Can't connect to MySQL!");
mysql_select_db(DB_NAME) or die("Can't connect to DB!");
mysql_query("TRUNCATE TABLE `ps_image_url`") or die(mysql_error());
$query = "SELECT p.id_product, pl.name, pl.link_rewrite, cl.link_rewrite, p.price, cr.conversion_rate, i.id_image FROM ps_product p
LEFT JOIN ps_product_lang pl ON (p.id_product = pl.id_product)
LEFT JOIN ps_category_product cp ON (p.id_product = cp.id_product)
LEFT JOIN ps_category_lang cl ON (cp.id_category = cl.id_category)
LEFT JOIN ps_category c ON (cp.id_category = c.id_category)
LEFT JOIN ps_product_tag pt ON (p.id_product = pt.id_product)
LEFT JOIN ps_currency cr ON (p.id_currency = cr.id_currency)
LEFT JOIN ps_image i ON i.id_product = p.id_product AND i.cover = 1
WHERE pl.id_lang = 7
AND cl.id_lang = 7
AND p.id_shop_default = 1
AND c.id_shop_default = 1
GROUP BY p.id_product";
mysql_set_charset( 'utf8' );
$res = mysql_query($query) or die(mysql_error());
while($goods[] = mysql_fetch_array($res));
$count = mysql_num_rows($res);
for ($i = 0; $i < $count; $i++)
{
	$isoprice = round($goods[$i]['price'] / $goods[$i]['conversion_rate']) . " UAH";
	$pass = $goods[$i]['id_image'];
	$url = str_split($pass);
	for($j = 0; $j < count($url); $j ++)
	{
		$url[$j] .= "/";
		$new_pass .= $url[$j];
	}
	$product_url = "http://techsnab.com.ua/" . $goods[$i]['link_rewrite'] . "/" . $goods[$i][2] . "-p-" . $goods[$i]['id_product'];
	$final_url = "http://techsnab.com.ua/img/p/" . $new_pass . $goods[$i]['id_image'] . ".jpg";
	$new_pass = "";
	$url = "";
	echo "<b>id</b>: " . $goods[$i]['id_product'] . "<br /><b>name</b>: " . $goods[$i]['name'] . "<br /><b>price</b>: " . $isoprice . "<br /><b>img_url</b>: " . $final_url . "<br /><b>product_url</b>: " . $product_url . "<br /><br />";
	$query = "INSERT IGNORE INTO ps_image_url VALUES ('" . $goods[$i]['id_image'] . "', '" . $final_url . "', '" . $product_url . "', '" . $isoprice .  "')";
	$insert = mysql_query($query) or die(mysql_error());
	$product_url = "";
}
mysql_close($dbh);
?>