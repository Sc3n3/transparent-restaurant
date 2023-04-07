import { ToastContainer } from 'react-toastify';

import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import View from './default/View';

const Blank = ({ children }) => {
  return (
    <>
      <ToastContainer />
      { children }
    </>
  );
};

const Layout = ({ children }) => {
  return (
    <Blank>
      <View>
        { children }
      </View>
    </Blank>
  );
}

export default Layout;
export { Layout, Blank };