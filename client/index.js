import 'babel-polyfill'; // for features that babel cannot transpile
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import './styles/styles.css';//styles
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getAllClients } from './redux/actions/clientActions';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
const store = configureStore();

store.dispatch(getAllClients());

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,
	document.getElementById('app')
);
