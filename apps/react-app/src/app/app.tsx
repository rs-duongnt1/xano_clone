import { useRoutes } from 'react-router-dom';
import routes from './routes';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
function App() {
  const routing = useRoutes(routes());
  return routing;
}

export default App;
