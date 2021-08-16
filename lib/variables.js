import {
	DeliverooLogo,
	FBLogo,
	GLogo,
	IconDeliverooMobile,
	IconJustEat,
	IconUberEatsMobile,
	IGLogo,
	JustEatLogo,
	UberLogo,
} from '../assets/svg/Svg';

export const socialData = [
	{
		name: 'Facebook',
		link: 'https://www.facebook.com/Sorami-Tha%C3%AF-111280114072290/',
		svg: <FBLogo />,
	},
	{ name: 'Instagram', link: 'https://www.instagram.com/', svg: <IGLogo /> },
	{
		name: 'Google',
		link: 'https://www.google.com/maps/place/Sorami+Thai/@43.5687088,1.4569417,18z/data=!4m5!3m4!1s0x0:0x8a17c654626e74ca!8m2!3d43.5680927!4d1.456931',
		svg: <GLogo />,
	},
];

export const deliveryData = [
	{
		name: 'deliveroo',
		link: 'https://deliveroo.fr/fr/menu/toulouse/universite-rangueil/sorami-thai-and-sushi',
		logo: <DeliverooLogo />,
	},
	{
		name: 'uberEats',
		link: 'https://www.ubereats.com/fr/toulouse/food-delivery/sorami-thai/Q7WgCmDARHeFCDnG7wPSLQ',
		logo: <UberLogo />,
	},
	{
		name: 'justEat',
		link: 'https://www.just-eat.fr/menu/sorami-thai-sushi',
		logo: <JustEatLogo />,
	},
];

export const deliveryMenuDatas = [
	{
		name: 'deliveroo',
		link: 'https://deliveroo.fr/fr/menu/toulouse/universite-rangueil/sorami-thai-and-sushi',
		logo: <IconDeliverooMobile />,
	},
	{
		name: 'uberEats',
		link: 'https://www.ubereats.com/fr/toulouse/food-delivery/sorami-thai/Q7WgCmDARHeFCDnG7wPSLQ',
		logo: <IconUberEatsMobile />,
	},
	{
		name: 'justEat',
		link: 'https://www.just-eat.fr/menu/sorami-thai-sushi',
		logo: <IconJustEat />,
	},
];
