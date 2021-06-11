import { Preset } from './preset.js';
import { Storage } from './storage.js';
import { Template } from './template.js';
import { settings } from './settings.js';
import './tabs.js';

(async () => {
	const storage = new Storage();
	const template = new Template();

	document.querySelectorAll('[data-locale]').forEach(i => 
		i.textContent = Preset.i18n(i.dataset.locale)
	);

	const setting_layout = document.querySelector('#setting_layout');
	const setting_themes = document.querySelector('#setting_themes');
	const setting_google = document.querySelector('#setting_google');
	const setting_my_links = document.querySelector('#setting_my_links');
	const modal_overlay = document.querySelector('#modal_overlay');
	
	const openCloseSettings = () => modal_overlay.classList.toggle('open');
	
	document.querySelector('#close_settings').addEventListener('click', () => 
		openCloseSettings()
	);

	modal_overlay.addEventListener('click', (e) => {
		if (e.button == 0 && e.target == modal_overlay) openCloseSettings();
	});

	const setAppearance = () =>{
		const root = document.documentElement;
		root.className = settings.current.theme;
		root.style.setProperty('--columns', settings.current.columns);
	};

	const createMyLinks = () => {
		document.querySelector('#my_links').innerHTML = settings.current.my_links.length ? 
			template.link('my_anchors', settings.current.my_links) : '';
		setting_my_links.innerHTML = template.my_links();
	};
	const createGoogleLinks = () => {
		const glf = Preset.links.filter((_, i) => settings.current.filter.includes(i));
		document.querySelector('#google_links').innerHTML = settings.current.filter.length ? 
			template.link('google', glf) : '';
	};
	const createTopLinks = async () => {
		document.querySelector('#top_links').innerHTML = settings.current.top_sites ? 
			template.link('top_sistes', await getTopSites()) : '';
	};

	const getTopSites = async () => {
		return new Promise((res, _) => { chrome.topSites.get((t) => res(t)) });
	};

	function addLink() {
		if (isInputUrlEmpty(add_url.value)) {
			add_url.focus();
			return;
		}
		settings.current.my_links.push({
			title: add_title.value.trim() || add_url.value,
			url: urlFull(add_url.value)
		});
		add_url.value = '';
		storage.saveSettings(settings.current);
	}

	const isInputUrlEmpty = url => url.trim() === '';

	const urlFull = url => url.startsWith('http') ? url : `https://${url}`;

	function editLink(target, id) {
		const wrap = target.closest('div'),
			inputs = wrap.querySelectorAll('input');
		inputs.forEach(i => i.disabled = 0);
		wrap.addEventListener('change', () => {
			if (isInputUrlEmpty(inputs[1].value)){
				inputs[1].focus();
				return;
			}
			settings.current.my_links[id] = {
				title: inputs[0].value.trim() || inputs[1].value,
				url: inputs[1].value
			};
			storage.saveSettings(settings.current);
		});
	}

	function deleteLink(id) {
		if (window.confirm(Preset.i18n('delete_link'))) {
			settings.current.my_links.splice(id, 1);
			storage.saveSettings(settings.current);
		}
	}

	setting_my_links.addEventListener('click', manadgeLink);
	setting_my_links.addEventListener('keypress', manadgeLink);
	
	function manadgeLink(e) {
		const button = e.target.closest('button');
		const key = e.key === 'Enter';
		if (button || key){ 
			const { type, id } = button ? button.dataset : { type: 'add' };
			switch (type) {
				case 'add':
					addLink();
					break;
				case 'edit':
					editLink(e.target, id);
					break;
				case 'delete':
					deleteLink(id);
					break;
				default:
					console.log(`Type not found! ${type}`);
					break;
			}
		}
	}

	setting_layout.addEventListener('change', function (){
		settings.current.top_sites = this.querySelector('[name="top"]').checked;
		settings.current.columns = this.querySelector('[name="columns"]:checked').value;
		settings.current.line = this.querySelector('[name="line"]:checked').value;
		storage.saveSettings(settings.current);
	});

	setting_themes.addEventListener('change', function (){
		settings.current.theme = this.querySelector('[name="theme"]:checked').value
		storage.saveSettings(settings.current);
	});

	setting_google.addEventListener('change', function (){
		let checked = [];
		this.querySelectorAll('[name="preset"]:checked')
			.forEach(i => checked.push(+i.value))
		settings.current.filter = checked;
		storage.saveSettings(settings.current);
	});

	document.querySelector('#open_settings').addEventListener('click', () => {
		openCloseSettings();
		setting_layout.innerHTML = template.layout();
		setting_themes.innerHTML = template.themes();
		setting_google.innerHTML = template.google();
	});
	
	function init(data) {
		settings.setCurrent(data);
		setAppearance();
		createMyLinks();
		createGoogleLinks();
		createTopLinks();
	}

	init(await storage.getSettings());

	storage.onChange((data) => init(data));
})();