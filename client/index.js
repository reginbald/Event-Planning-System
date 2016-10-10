import 'babel-polyfill'; // for features that babel cannot transpile
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css';//styles
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
	<Router history={browserHistory} routes={routes} />,
	document.getElementById('app')
);
