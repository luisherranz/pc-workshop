/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const products = useSelect((select) => {
		const { getProducts } = select("wc/admin/products");
		return getProducts({});
	}, []);
	const currencySymbol = wcSettings.currency.symbol;

	if (!products) {
		return <p {...useBlockProps()}>Loading...</p>;
	}

	return (
		<ul className="products" {...useBlockProps()}>
			{products.map(({ slug, name, price }) => {
				return (
					<li className="product" key={slug}>
						<article>
							<h1 class="product-name">{name}</h1>
							<div class="product-details">
								<span class="product-price">
									{currencySymbol} {price}
								</span>
							</div>
						</article>
					</li>
				);
			})}
		</ul>
	);
}
