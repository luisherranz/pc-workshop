/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { ToolbarGroup } from "@wordpress/components";
import { BlockControls } from "@wordpress/block-editor";
import { list, grid } from "@wordpress/icons";

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

const ToolbarControls = ({ layout, setAttributes }) => {
	const displayLayoutControls = [
		{
			icon: list,
			title: __("List view", "woocommerce"),
			onClick: () => setAttributes({ layout: "list" }),
			isActive: layout === "list",
		},
		{
			icon: grid,
			title: __("Grid view", "woocommerce"),
			onClick: () => setAttributes({ layout: "grid" }),
			isActive: layout === "grid",
		},
	];

	return (
		<BlockControls>
			<ToolbarGroup controls={displayLayoutControls} />
		</BlockControls>
	);
};

export default function Edit({ attributes, setAttributes }) {
	const products = useSelect((select) => {
		const { getProducts } = select("wc/admin/products");
		return getProducts({});
	}, []);
	const currencySymbol = wcSettings.currency.symbol;

	const blockProps = useBlockProps();
	const { layout } = attributes;

	if (!products) {
		return <p {...blockProps}>Loading...</p>;
	}

	return (
		<>
			<div
				{...blockProps}
				className={`${blockProps.className} pc-workshop-block`}
			>
				<ul className={`products display-as-${layout}`}>
					{products.map(({ slug, name, price, images }) => {
						return (
							<li className="product" key={slug}>
								<article>
									<img class="product__img" src={images?.[0]?.src} />
									<h1 class="product__name">{name}</h1>
									<div class="product__details">
										<span class="product__price">
											{currencySymbol} {price}
										</span>
									</div>
								</article>
							</li>
						);
					})}
				</ul>
				<nav>
					<ul class="pagination">
						{[1, 2, 3, 4, 5].map((page) => (
							<li class="pagination__page">
								{page === 2 ? (
									<span class="pagination__page--is-active">{page}</span>
								) : (
									<a class="pagination__page--link">{page}</a>
								)}
							</li>
						))}
					</ul>
				</nav>
			</div>
			<ToolbarControls layout={layout} setAttributes={setAttributes} />
		</>
	);
}
