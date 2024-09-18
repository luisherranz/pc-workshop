<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$page_number = (int) ( $_GET['page_num'] ?? 1 );

$query = array(
	'limit' => 10,
	'paginate' => true,
	'page' => $page_number
);
$response = wc_get_products($query);
$products = $response->products;

$max_num_pages = $response->max_num_pages;

$currency = get_woocommerce_currency_symbol( get_woocommerce_currency() );

?>

<div data-wp-interactive="workshop" class="pc-workshop-block">
	<div data-wp-router-region="workshop-loop">
		<ul class="products">
			<?php foreach ($products as $product) {
				$data = $product->get_data();
			?>
				<li class="product">
					<article>
						<h1><?= $data['name']; ?></h1>
						<div class="product__details">
							<span class="product__price"><?= $currency . $data['price']; ?></span>
						</div>
					</article>
				</li>
			<?php } ?>
		</ul>
		<nav>
			<ul class="pagination">
				<?php for ($i = 1; $i <= $max_num_pages; $i++) {
					$is_active = $i === $page_number;
				?>
					<li class="pagination__page">
						<?php if ($is_active) : ?>
							<span class="pagination__page--is-active"><?= $i; ?></span>
						<?php else : ?>
							<a class="pagination__page--link" data-wp-on--click="actions.navigate" href="?page_num=<?= $i; ?>"><?= $i; ?></a>
						<?php endif; ?>
					</li>
				<?php } ?>
			</ul>
		</nav>
	</div>
</div>

