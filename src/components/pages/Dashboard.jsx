import React, { Suspense, useMemo, useState } from 'react';
import placeholderData from '../../data.json';
import styles from './Dashboard.module.css';
import Select from '../inputs/Select';
import DatePicker from '../inputs/DatePicker';

// Lazy load chart components
const LazyLineChart = React.lazy(() => import('../charts/LineChart'));
const LazyBarChart = React.lazy(() => import('../charts/BarChart'));
const LazyPieChart = React.lazy(() => import('../charts/PieChart'));

const Dashboard = () => {
	// State for filter controls
	const [filterCategory, setFilterCategory] = useState('');
	const [startDate, setStartDate] = useState('2022-11-21');
	const [endDate, setEndDate] = useState('2023-05-09');
	
	// Sales data
	const salesData = placeholderData.data;
	
	// Options for select element
	const categoryOptions = [
		{value: '', label: 'Category'},
		{value: 'kitchen appliances', label: 'Kitchen Appliances'},
		{value: 'toys', label: 'Toys'},
		{value: 'books', label: 'Books'},
		{value: 'sports equipment', label: 'Sports Equipment'},
		{value: 'home decor', label: 'Home Decor'},
		{value: 'clothing', label: 'Clothing'},
		{value: 'electronics', label: 'Electronics'},
	];
	
	// Filter data based on selected category and date range
	const filteredData = useMemo(() => salesData.filter(item => {
		const categoryMatch = filterCategory === '' || item.category === filterCategory;
		const dateMatch = new Date(item.createdAt) >= new Date(startDate) && new Date(item.createdAt) <= new Date(
			endDate);
		return categoryMatch && dateMatch;
	}), [salesData, filterCategory, startDate, endDate]);
	
	// Aggregate sales data by date
	const aggregatedSalesByDate = useMemo(() => {
		const salesByDate = filteredData.reduce((acc, curr) => {
			const date = curr.createdAt;
			acc[date] = (acc[date] || 0) + curr.sales;
			return acc;
		}, {});
		
		return Object.keys(salesByDate)
		             .map(date => ({
			             time: date,
			             sales: salesByDate[date],
		             }))
		             .sort((a, b) => new Date(a.time) - new Date(b.time));
	}, [filteredData]);
	
	// Aggregate sales data by category
	const aggregatedSalesByCategory = useMemo(() => {
		const salesByCategory = filteredData.reduce((acc, curr) => {
			const category = curr.category;
			acc[category] = (acc[category] || 0) + curr.sales;
			return acc;
		}, {});
		
		return Object.keys(salesByCategory)
		             .map(category => ({
			             category: category,
			             sales: salesByCategory[category],
		             }));
	}, [filteredData]);
	
	// Aggregate sales data by region
	const aggregatedSalesByRegion = useMemo(() => {
		const salesByRegion = filteredData.reduce((acc, curr) => {
			const region = curr.region;
			acc[region] = (acc[region] || 0) + curr.sales;
			return acc;
		}, {});
		
		return Object.keys(salesByRegion)
		             .map(region => ({
			             region: region,
			             sales: salesByRegion[region],
		             }));
	}, [filteredData]);
	
	return (
		<div>
			<h1 className={styles.title}>
				Dashboard
			</h1>
			{/* Filter controls */}
			<div className={styles.filters__container}>
				<div>
					<Select
						value={filterCategory}
						onChange={(e) => setFilterCategory(e.target.value)}
						options={categoryOptions}
					/>
				</div>
				<div>
					<DatePicker
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
					/>
					<span> to </span>
					<DatePicker
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
					/>
				</div>
			</div>
			{/* Chart components */}
			<div className={styles.grid__layout}>
				<div className={styles.two__thirds__column}>
					<div className={styles.full__width__row}>
						<h2 className={styles.card__title}>Trends</h2>
						<Suspense fallback={<div>Loading Trends...</div>}>
							<LazyLineChart data={aggregatedSalesByDate}/>
						</Suspense>
					</div>
					<div className={styles.full__width__row}>
						<h2 className={styles.card__title}>Categories</h2>
						<Suspense fallback={<div>Loading Categories...</div>}>
							<LazyBarChart data={aggregatedSalesByCategory}/>
						</Suspense>
					</div>
				</div>
				<div className={styles.one__third__column}>
					<h2 className={styles.card__title}>Regions</h2>
					<Suspense fallback={<div>Loading Regions...</div>}>
						<LazyPieChart data={aggregatedSalesByRegion}/>
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
