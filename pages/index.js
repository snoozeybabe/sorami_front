import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import { fetchAPI } from '../lib/api';
import {
	atomCategories,
	atomIdCategorySelected,
	atomCategorySelected,
	productsListSelected,
	atomExtras,
} from '../lib/state';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import useWindowSize from '../hooks/useWindowSize';
import {
	DeliverooLogo,
	FBLogo,
	GLogo,
	IGLogo,
	JustEatLogo,
	LogoV2,
	UberLogo,
} from '../assets/svg/Svg';
import { deliveryData, socialData } from '../lib/variables';
import HomeMobile from './home.mobile';

export default function Home({ products, product_categories, restaurant }) {
	const [categories, setCategories] = useAtom(atomCategories);
	const [extras, setExtras] = useAtom(atomExtras);
	const [width, height] = useWindowSize();

	useEffect(() => {
		setCategories(product_categories);
		if (products) {
			const extras = products.filter(product => product.is_extras_family);
			setExtras(extras);
		}
	}, []);

	const isMobile = width < 940;

	return (
		<div className={styles.container}>
			<Head>
				<title>Sorami Thaï</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="main_container">
				<Container maxWidth="xl" style={{ padding: 0 }}>
					{isMobile ? (
						<HomeMobile />
					) : (
						<Grid
							container
							spacing={2}
							style={{
								width: '100%',
								height: '100vh',
								margin: 0,
							}}>
							<Grid item id="home_information">
								<div className="home_information_container">
									<div className="content_container">
										<div className="logo">
											<LogoV2
												viewBoxSize="95 110 310 310"
												style={{ height: '400px', width: '400px' }}
											/>
										</div>
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
									<div className="button_container">
										<Link href="/home" key="1">
											<div className="menu_btn show_home">
												<span>La carte</span>
											</div>
										</Link>
										{deliveryData.map((btn, idx) => {
											return (
												<a target="_blank" key={btn.name + idx} href={btn.link}>
													<div className={`menu_btn ${btn.name}`}>
														{btn.logo}
													</div>
												</a>
											);
										})}
									</div>
								</div>
							</Grid>
							<Grid item id="home_map"></Grid>
						</Grid>
					)}
				</Container>
			</main>
		</div>
	);
}

export async function getStaticProps() {
	const [product_categories, products, restaurant] = await Promise.all([
		fetchAPI('/product-categories'),
		fetchAPI('/products'),
		fetchAPI('/restaurants'),
	]);
	return {
		props: { products, product_categories, restaurant },
		revalidate: 1,
	};
}
