<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$products = wc_get_products(array('limit' => 10,));
$currency = get_woocommerce_currency_symbol( get_woocommerce_currency() );
?>

<ul class="products">
	<?php foreach ($products as $product) {
		$data = $product->get_data();
	?>
		<li class="product">
			<article>
				<h1><?= $data['name']; ?></h1>
				<div class="details">
					<span class="price"><?= $currency . $data['price']; ?></span>
				</div>
			</article>
		</li>
	<?php } ?>
</ul>

