import './setupPolyfills';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

jest.mock('undici');
Enzyme.configure({ adapter: new Adapter() });
