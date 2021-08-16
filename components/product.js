import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { atomExtras, atomProductSelected } from '../lib/state';
import { getStrapiMedia } from '../lib/media';
import { useState } from 'react';

function Product() {
	const [product, setProduct] = useAtom(atomProductSelected);
	const [extras, setExtras] = useAtom(atomExtras);
	const [extrasSelected, setExtrasSelected] = useState([]);

	useEffect(() => {
		const tmpExtras = extras.filter(extras => {
			return extras.id === product.id;
		});

		if (tmpExtras && tmpExtras.length > 0 && tmpExtras[0].product_extras) {
			setExtrasSelected(tmpExtras[0].product_extras);
		}
	}, [product]);

	return (
		<React.Fragment>
			{product ? (
				<React.Fragment>
					<div className="product_main">
						<div className="product_details_header">{product.product_name}</div>
						{product.is_extras_family ? (
							<div className="extras_list_container">
								<ul>
									{extrasSelected.map((extra, idx) => {
										return <li key={idx}>{extra.extras_name}</li>;
									})}
								</ul>
							</div>
						) : (
							<div className="product_details_content">
								<div className="product_img">
									//{' '}
									{product.product_img && product.product_img.length > 0 ? (
										<Image
											src={getStrapiMedia(product.product_img[0])}
											alt="me"
											width="600"
											height="700"
										/>
									) : null}
								</div>

								<div className="product_description">
									<span className="product_composition">
										{product.product_description}
									</span>
									<span className="product_price">
										{`${
											product.product_price
												? product.product_price.toFixed(2)
												: 0
										} €`}
									</span>
								</div>
							</div>
						)}
					</div>
					<div className="product_footer"></div>
				</React.Fragment>
			) : null}
		</React.Fragment>
	);
}

export default Product;
