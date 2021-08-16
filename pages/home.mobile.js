import React, { useState } from 'react';
import { useAtom } from 'jotai';
import Image from 'next/image';

import { socialData } from '../lib/variables';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { ListItemText, SwipeableDrawer } from '@material-ui/core';
import { fetchAPI } from '../lib/api';
import { atomCategories, atomExtras } from '../lib/state';
import { getStrapiMedia } from '../lib/media';

import {
	ArrowDown,
	ArrowRight,
	DeliverooLogo,
	FBLogo,
	GLogo,
	IGLogo,
	JustEatLogo,
	LogoV2,
	UberLogo,
} from '../assets/svg/Svg';

function HomeMobile() {
	const [openOrderList, setOpenOrderList] = useState(false);
	const [extras, setExtras] = useAtom(atomExtras);
	const [openDetailsMenu, setOpenDetailsMenu] = useState(false);
	const [idCategorySelected, setIdSelectedCategory] = useState(null);
	const [categories, setCategories] = useAtom(atomCategories);
	const [openOrderMenu, setOpenOrderMenu] = useState(false);

	const handleOrderClick = e => {
		setOpenOrderMenu(true);
	};

	const handleOnMenuClick = (e, selectedCat) => {
		setIdSelectedCategory(
			selectedCat.id === idCategorySelected ? null : selectedCat.id
		);
	};

	const getExtrasList = product => {
		const findExtras = extras.find(ext => ext.id === product.id);
		const formattedList = findExtras.product_extras.map(ext => {
			return [...[], ext.extras_name];
		});
		return <p>{formattedList.toString()}</p>;
	};
	return (
		<div className="mobile_main_container">
			<div className="mobile_header">
				<LogoV2
					viewBoxSize="90 100 320 320"
					style={{ width: '180px', height: '180px' }}
				/>
				<p id="slogan">VIENT ON S'THAÏ</p>
				<p>81 route de Narbonne 31400 Toulouse </p>
				<p>Tel : 06 17 12 53 48</p>
				<p>
					11h30 - 14h <br></br>19h - 22h{' '}
				</p>

				<div className="social_media">
					{socialData.map(social => (
						<a target="_blank" href={social.link} key={social.name}>
							{social.svg}
						</a>
					))}
				</div>
				<span></span>
			</div>

			<div className="mobile_menu">
				<List
					component="div"
					key="menu_main_list"
					key={30304}
					aria-labelledby="nested-list-subheader"
					className="mobile_menu_list">
					{categories.map((cat, idx) => {
						return (
							<React.Fragment
								key={cat.name + idx + Math.floor(Math.random() * 100)}>
								<ListItem
									button
									key={
										cat.category_name + cat.id + Math.floor(Math.random() * 100)
									}
									className="mobile_menu_category"
									onClick={e => handleOnMenuClick(e, cat)}>
									<ListItemText
										className="category_name"
										primary={cat.category_name}
									/>
									{idCategorySelected && idCategorySelected === cat.id ? (
										<ArrowDown />
									) : (
										<ArrowRight />
									)}
								</ListItem>
								<Collapse
									in={idCategorySelected && idCategorySelected === cat.id}
									timeout="auto"
									key={cat.category_name + cat.id}
									unmountOnExit>
									<List
										component="div"
										className="product_list"
										disablePadding
										key={idx}>
										{cat.products &&
											cat.products.length > 0 &&
											cat.products.map((product, index) => {
												return (
													<ListItem
														className="mobile_menu_products"
														key={
															product.product_name +
															index +
															Math.floor(Math.random() * 100)
														}>
														<div className="mobile_menu_products_content">
															<div className="product_img">
																{product.product_img &&
																product.product_img.length > 0 ? (
																	<Image
																		src={getStrapiMedia(
																			product.product_img[0].formats.small
																		)}
																		alt="me"
																		width="80"
																		height="80"
																	/>
																) : null}
															</div>
															<div className="product_infos">
																<div className="title">
																	<span>
																		{`${
																			product.product_name
																		} ${product.product_price.toFixed(2)} €`}
																	</span>
																</div>
																<p className="description">
																	{product.is_extras_family
																		? getExtrasList(product)
																		: product.product_description}
																</p>
															</div>
														</div>
													</ListItem>
												);
											})}
									</List>
								</Collapse>
							</React.Fragment>
						);
					})}
				</List>
			</div>
			<div className="order_btn_container">
				<button className="btn_order" onClick={handleOrderClick}>
					Commander
				</button>
			</div>

			<SwipeableDrawer
				anchor="bottom"
				open={openOrderMenu}
				onOpen={e => {
					console.log('Open Drawer');
				}}
				className="drawer_menu_order"
				onClose={e => setOpenOrderMenu(false)}>
				<div className="mobile_order_menu">
					<div className="mobile_order_header">
						<p>Commander</p>
					</div>
					<div className="mobile_order_main">
						<a key="collect" href="tel:+33617125348">
							<div className="menu_btn_mobile collect">À emporter</div>
						</a>
						<a
							target="_blank"
							key="delivroo"
							href="https://deliveroo.fr/fr/menu/toulouse/universite-rangueil/sorami-thai-and-sushi">
							<div className="menu_btn_mobile deliveroo">
								<DeliverooLogo />
							</div>
						</a>
						<a
							target="_blank"
							key="uberEats"
							href="https://www.ubereats.com/fr/toulouse/food-delivery/sorami-thai/Q7WgCmDARHeFCDnG7wPSLQ">
							<div className="menu_btn_mobile uberEats">
								<UberLogo />
							</div>
						</a>
						<a
							target="_blank"
							key="justEat"
							href="https://www.just-eat.fr/menu/sorami-thai-sushi">
							<div className="menu_btn_mobile justEat">
								<JustEatLogo />
							</div>
						</a>
					</div>
				</div>
			</SwipeableDrawer>
		</div>
	);
}

export default HomeMobile;
