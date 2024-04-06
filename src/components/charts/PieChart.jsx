import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const RenderPieChart = ({data}) => {
	return (
		<ResponsiveContainer width="100%" height="90%">
			<PieChart width={400} height={400}>
				<Pie
					dataKey="sales"
					data={data}
					nameKey="region" // Use 'region' for labeling
					outerRadius={80}
					fill="#8884d8"
					label
				/>
				<Tooltip/>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default RenderPieChart;
