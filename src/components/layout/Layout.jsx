import { Outlet } from 'react-router-dom';
import Sidebar from '../navigation/Sidebar';

// AppLayout component responsible for rendering the Sidebar and routing content
const AppLayout = () => {
	return (
		<div>
			<Sidebar>
				<Outlet/> {/* Renders nested routes */}
			</Sidebar>
		</div>
	);
};

export default AppLayout;
