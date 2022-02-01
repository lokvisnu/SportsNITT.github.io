import React, { useEffect, useState } from 'react';
import {
	Button,
	Container,
	Grid,
	Icon,
	Image,
	Loader,
} from 'semantic-ui-react';
import Footer from '../../components/Footer';
import NavbarMain from '../../components/Navbar';
import Event from './Event';
import images from '../../assets/content/gallery.json';
import './gallery.css';
import { colors } from '../../utils/colors';

export default function Gallery() {
	const [eventName, setEventName] = useState("Sportsfete '18");
	const [imageData, setImageData] = useState(images[`Sportsfete '18`]);
	const [loading, setLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		setLoading(true);
		setImageData(images[`${eventName}`]);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [eventName]);

	useEffect(() => {
		document.addEventListener('scroll', () => {
			toggleVisibility();
		});
	}, []);
	function toggleVisibility() {
		if (window.pageYOffset > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	}
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	return (
		<div
			style={{
				backgroundColor: '#222',
			}}
		>
			<NavbarMain />
			<Container
				style={{
					backgroundColor: '#222',
					marginTop: '15px',
					marginBottom: '5%',
				}}
			>
				<Event eventName={eventName} setEventName={setEventName} />
				{!loading ? (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<div class='gallery_grid'>
							{imageData &&
								imageData.map((ele, i) => (
									<div class='gallery_grid__item'>
										<img
											src={ele.src}
											alt={ele.alt}
											loading='lazy'
											width={'100%'}
											className='gallery_img'
										/>
									</div>
								))}
						</div>
					</div>
				) : (
					<Loader active inline='centered' size='massive' />
				)}
				{isVisible && (
					<div
						onClick={() => scrollToTop()}
						style={{
							position: 'fixed',
							right: 10,
							bottom: 10,
						}}
					>
						<Button
							circular
							icon='arrow alternate circle up outline'
							size='big'
						></Button>
					</div>
				)}
			</Container>
			<Footer />
		</div>
	);
}