import { Notify } from 'notiflix';

function showNotification(msgType) {
	const notifyOpts = {
		position: 'center-center',
		clickToClose: true,
		fontSize: '20px',
		cssAnimationStyle: 'zoom',
		showOnlyTheLastOne: true,
	};

	return msgType === 'error'
		? Notify.failure('Oops, there is no country with that name', notifyOpts)
		: Notify.info(
				'Too many matches found. Please enter a more specific name',
				notifyOpts
		  );
}

export default showNotification;
