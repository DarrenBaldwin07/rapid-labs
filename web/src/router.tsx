import { Routes, Route } from "react-router-dom";
import Home from './pages/index';
import Test from './pages/test';

const Router = (props: any) => {
  return (
	<Routes>
		<Route index element={<Home {...props} />} />
		<Route path="/test" element={<Test {...props} />} />
  	</Routes>
  );
};

export default Router;
