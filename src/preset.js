export class Preset {
	static i18n = (message) => chrome.i18n.getMessage(message);

	static links = [
		{ url: 'https://google.com', title: this.i18n('search') },
		{ url: 'https://translate.google.com', title: this.i18n('translate') },
		{ url: 'https://drive.google.com', title: this.i18n('drive') },
		{ url: 'https://maps.google.com', title: this.i18n('maps') },
		{ url: 'https://mail.google.com', title: this.i18n('mail') },
		{ url: 'https://www.google.com/calendar', title: this.i18n('calendar') },
		{ url: 'https://photos.google.com', title: this.i18n('photos') },
		{ url: 'https://contacts.google.com', title: this.i18n('contacts') },
		{ url: 'https://www.youtube.com', title: 'YouTube' },
		{ url: 'https://music.youtube.com', title: 'YouTube Music' },
		{ url: 'https://myaccount.google.com', title: this.i18n('account') },
		{ url: 'https://play.google.com', title: 'Play' },
		{ url: 'https://earth.google.com/web', title: this.i18n('earth') },
		{ url: 'https://meet.google.com', title: 'Meet' },
		{ url: 'https://news.google.com', title: this.i18n('news') },
		{ url: 'https://docs.google.com', title: this.i18n('docs') },
		{ url: 'https://keep.google.com', title: 'Keep' },
	];

	static themes = [
		'dark', 'Github', 'Telegram', 'Onedark', 'Stackoverflow', 'Google',
		'Firefox','light',
	];

	static columns = [1, 2, 3, 4, 5, 6];

	static lines = [1, 2];
}
