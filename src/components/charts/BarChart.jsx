import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const RenderBarChart = ({data}) => {
	return (
		<ResponsiveContainer width="100%" height="90%">
			<BarChart
				width={500}
				height={300}
				data={data}
			>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis dataKey="category"/>
				<YAxis/>
				<Tooltip/>
				<Legend/>
				<Bar dataKey="sales" fill="#82ca9d"/>
			</BarChart>
		</ResponsiveContainer>
	);
};

export default RenderBarChart;
