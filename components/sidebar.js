import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { productsListSelected,atomIdCategorySelected } from '../lib/state';
import classnames from 'classnames';

function SideBar({ categories, onHover }) {
	const [productList, setProductList] = useAtom(productsListSelected);
	const [idCategorySelected,setIdCategorySelected] = useAtom(atomIdCategorySelected)


	const _handleSwitchCat = idCategory => {
		const selectedCat = categories.find(category => category.id === idCategory);
		setProductList(selectedCat.products);
	};
	useEffect(() => {}, [categories]);
	return (
		<div className="sidebar_main">
			<ul>
				{categories.map(category => {
					return (
						<li key={category.id}>
							<Link href="/">
								<div
									className={classnames('sidebar_list_item',{'selected' : category.id === idCategorySelected})}
									onMouseEnter={() => {
										_handleSwitchCat(category.id);
										onHover(category.id);
									}}>
									{category.category_name}
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default SideBar;
