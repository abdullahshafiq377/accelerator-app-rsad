import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/Layout';
import Dashboard from './components/pages/Dashboard';

function App () {
	return (
		// Set up the BrowserRouter to enable routing
		<BrowserRouter>
			<Routes>
				{/* Define routes for different pages */}
				<Route path="/" element={<AppLayout/>}>
					{/* Define the dashboard route */}
					<Route index element={<Dashboard/>}/>
					{/* Define additional routes for notifications and settings */}
					<Route path="notifications" element={<Dashboard/>}/>
					<Route path="settings" element={<Dashboard/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
