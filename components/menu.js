import React from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import classnames from 'classnames';
import {
	idProductSelected,
	productsListSelected,
	atomProductSelected,
} from '../lib/state';
function MenuContent() {
	const [idProduct, setIdProductSelected] = useAtom(idProductSelected);
	const [productList, setProductList] = useAtom(productsListSelected);
	const [productSelected, setProductSelected] = useAtom(atomProductSelected);

	return (
		<div className="menu_main">
			<div className="menu_main_header">
				<p>VIENT ON S'THAÏ</p>
			</div>
			<ul className="menu_main_list">
				{productList.map(product => {
					return (
						<li key={product.id}>
							<Link href="/">
								<div
									onMouseEnter={() => {
										setIdProductSelected(product.id);
										setProductSelected(product);
									}}
									className={classnames('menu_main_list_item', {
										selected: idProduct === product.id,
									})}>
									<span className="product_name">{product.product_name}</span>
									<span className="product_price">{`${product.product_price.toFixed(
										2
									)} €`}</span>
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default MenuContent;
