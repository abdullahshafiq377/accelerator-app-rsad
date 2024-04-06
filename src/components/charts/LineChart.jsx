import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const RenderLineChart = ({data}) => {
	// Sort data by date in ascending order
	const sortedData = data.slice()
	                       .sort((a, b) => new Date(a.time) - new Date(b.time));
	
	return (
		<ResponsiveContainer width="100%" height="90%">
			<LineChart
				width={500}
				height={300}
				data={sortedData}
			>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis dataKey="time"/>
				<YAxis/>
				<Tooltip/>
				<Legend/>
				<Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{r: 8}}/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default RenderLineChart;
