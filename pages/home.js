import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAtom } from 'jotai';
import {
	atomCategories,
	atomIdCategorySelected,
	atomCategorySelected,
	productsListSelected,
	atomProductSelected,
	atomExtras,
} from '../lib/state';

import { deliveryMenuDatas } from '../lib/variables';
import { fetchAPI } from '../lib/api';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MobileApp from './mobile';
import SideBar from '../components/sidebar';
import MenuContent from '../components/menu';
import Product from '../components/product';
import useWindowSize from '../hooks/useWindowSize';
import {
	FBLogo,
	GLogo,
	IconDeliverooMobile,
	IconJustEat,
	IconUber,
	IconUberEatsMobile,
	IGLogo,
	Logo,
	LogoV2,
} from '../assets/svg/Svg';
import { socialData } from '../lib/variables';

export default function Main({
	products,
	product_categories,
	restaurant,
	error,
}) {
	if (error) {
		return <div>An error occurred</div>;
	}
	const [width, height] = useWindowSize();
	const [categories, setCategories] = useAtom(atomCategories);
	const [productList, setProductList] = useAtom(productsListSelected);
	const [extras, setExtras] = useAtom(atomExtras);
	const [idCategorySelected, setIdCategorieSelected] = useAtom(
		atomIdCategorySelected
	);
	const [categorySelected, setCategorySelected] = useAtom(atomCategorySelected);
	const [productSelected, setProductSelected] = useAtom(atomProductSelected);

	const handleSelectedCategory = idCategory => {
		const selectedCat = categories.find(
			category => category.id === idCategorySelected
		);
		setIdCategorieSelected(idCategory);
		setCategorySelected(selectedCat);
	};

	useEffect(() => {
		if (product_categories) {
			const initCat = categories.find(
				category => category.id === idCategorySelected
			);
			setCategorySelected(
				categories.find(category => category.id === idCategorySelected)
			);
		}
	}, []);

	useEffect(() => {
		const initCat = categories.find(
			category => category.id === idCategorySelected
		);
		if (initCat && initCat.products && initCat.products.length > 0) {
			setProductList(initCat.products);
			setProductSelected(initCat.products[0]);
		}
	}, [categories]);

	const isMobile = width < 940;

	return (
		<div className={styles.container}>
			<main className="main_container">
				<Container maxWidth="xl" style={{ padding: 0 }}>
					{isMobile ? (
						<MobileApp />
					) : (
						<Grid
							container
							spacing={2}
							style={{
								width: '100%',
								height: '100vh',
								margin: 0,
							}}>
							<Grid item id="main_sidebar_container">
								<div className="sidebar_logo">
									<a href="/">
										<LogoV2 viewBoxSize="120 110 270 270" />
									</a>
								</div>
								<div className="sidebar_menu">
									<SideBar
										categories={
											categories && categories.length > 0 ? categories : []
										}
										onHover={handleSelectedCategory}
									/>
									<div className="social_media">
										<span>Fais toi livrer</span>
										<div className="icon_container">
											{' '}
											{deliveryMenuDatas.map((socialMedia, idx) => (
												<a
													href={socialMedia.link}
													target="_blank"
													index={socialMedia.name + idx}>
													{socialMedia.logo}
												</a>
											))}
										</div>
									</div>
								</div>

								<div className="sidebar_footer">
									<div className="adress">
										<p>
											81 route de Narbonne <br></br>31400 Toulouse{' '}
										</p>
									</div>
									<div className="phone">
										<p>Tel : 06 17 12 53 48</p>
									</div>
									<div className="hours">
										<p>
											11h30 - 14h <br></br>19h - 22h{' '}
										</p>
									</div>
									<div className="social_media">
										{socialData.map((social, idx) => (
											<a
												target="_blank"
												href={social.link}
												key={social.name + idx}>
												{social.svg}
											</a>
										))}
									</div>
								</div>
							</Grid>
							<Grid item id="main_menu_container">
								<MenuContent />
							</Grid>
							<Grid item id="main_product_container">
								<Product />
							</Grid>
						</Grid>
					)}
				</Container>
			</main>
		</div>
	);
}
