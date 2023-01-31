import { createContext, useState } from "react";
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CatDetail from "./pages/catDetail";
import Home from "./pages/home";

const client = new QueryClient()

export const AppContext = createContext()

function App() {

	const [breed, setBreed] = useState()

	const initialValues = {
		breed,
		setBreed
	}

	return (
		<QueryClientProvider client={client}>
			<AppContext.Provider value={initialValues}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Home />}></Route>
						<Route path='/:id' element={<CatDetail />}></Route>
					</Routes>
				</BrowserRouter>
			</AppContext.Provider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
