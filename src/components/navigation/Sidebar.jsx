import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import {
	AdjustmentsVerticalIcon,
	Bars3Icon,
	BellIcon,
	ChartPieIcon,
	HomeIcon,
	XMarkIcon
} from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';

// Sidebar items with display text, icon, route, and section
const sideBarItems = [
	{
		display: 'Dashboard',
		icon: <HomeIcon height={24} width={24}/>,
		to: '/',
		section: ''
	},
	{
		display: 'Notifications',
		icon: <BellIcon height={24} width={24}/>,
		to: '/notifications',
		section: 'notifications'
	},
	{
		display: 'Settings',
		icon: <AdjustmentsVerticalIcon height={24} width={24}/>,
		to: '/settings',
		section: 'settings'
	},
];

const Sidebar = ({children}) => {
	// State to manage visibility of sidebar
	const [showNav, setShowNav] = useState(false);
	// State to track active index for highlighting active sidebar item
	const [activeIndex, setActiveIndex] = useState(0);
	// Hook to get current location
	const location = useLocation();
	
	// Effect to update activeIndex when location changes
	useEffect(() => {
		const curPath = window.location.pathname.split('/')[1];
		const activeItem = sideBarItems.findIndex(item => item.section === curPath);
		setActiveIndex(curPath.length === 0 ? 0 : activeItem);
	}, [location]);
	
	return (
		<div className={styles.layout}>
			{/* Sidebar navigation */}
			{
				showNav && (
					<nav className={styles.nav}>
						<div className={styles.logo}>
							<ChartPieIcon height={32} width={32}/>
						</div>
						<ul>
							{
								// Mapping through sidebar items to render each item
								sideBarItems.map((item, index) => (
									<li key={index}
									    className={`${styles.nav__item} ${activeIndex === index ? styles.active : ''}`}>
										<Link to={item.to}>
											{item.icon}
										</Link>
									</li>
								))
							}
						</ul>
					</nav>
				)
			}
			{/* Sidebar content */}
			<div className={styles.content}>
				{/* Topbar */}
				<div className={styles.topbar}>
					<button onClick={() => setShowNav(!showNav)} className={styles.nav__toggle__button}>
						{
							showNav ? (
								<XMarkIcon height={24} width={24}/>
							) : (
								<Bars3Icon height={24} width={24}/>
							)
						}
					</button>
				</div>
				{/* Main content */}
				<main className={styles.main__content}>
					{children}
				</main>
			</div>
		</div>
	);
};

export default Sidebar;
