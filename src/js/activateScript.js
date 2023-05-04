import refs from './refs';
import handleInput from './handleInput';
import debounce from 'lodash.debounce';

function activateScript() {
	const DEBOUNCE_DELAY = 300;
	const debounceOpts = {
		leading: false,
	};

	refs.searchBox.addEventListener(
		'input',
		debounce(handleInput, DEBOUNCE_DELAY, debounceOpts)
	);
}

export default activateScript;
