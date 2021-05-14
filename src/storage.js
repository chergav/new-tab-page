export class Storage {
	_handler;
	_storage = chrome.storage.sync;
	_default_settings = {
		filter: [0, 1, 2, 3, 4, 6, 8, 9],
		my_links: [],
		theme: 'Google',
		top_sites: true,
		columns: 2,
		line: 2
	};
	
	async _getStorageData(key = null) {
		return new Promise((res, _) => {
			this._storage.get(key, data =>
				res(data && data[key] ? data[key] : this._default_settings)
			);
		});
	}

	saveSettings(data) {
		this._storage.set({ settings: data }, () => console.log('Data saved'));
		this._notify(data);
	}

	async getSettings() {
		//this._storage.clear();
		this._storage.get(null, d => console.log(d));
		return await this._getStorageData('settings');
	}

	onChange = handler => this._handler = handler;

	_notify = settings => typeof this._handler === 'function' && this._handler(settings);
}