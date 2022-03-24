import { settings } from './settings.js';
import { Preset } from './preset.js';

export class Template {
	_i18n = message => Preset.i18n(message);
	_createOutput = (tpl, arr) => arr.reduce((a, v, i) => a += tpl(v, i), '');

	_tplLink = (link, _) => `
		<a href="${link.url}" class="link" title="${link.title}&#13;${link.url}">
			<div class="favicon">
				<img src="https://www.google.com/s2/favicons?sz=32&domain_url=${link.url}" width="24" alt="">
			</div>
			<div class="text">
				<p class="text-prm">${link.title}</p>
					${settings.current.line == 2? 
						`<small class="text-sec">${link.url}</small>` : ''
					}
			</div>
		</a>
	`;//<img src="chrome://favicon/size/24@1x/${link.url}" alt>
	//chrome-extension://ecipkjlcbejnmfgammkacfpbepegohnf/_favicon/?pageUrl=https://google.com&size=24
	//https://www.google.com/s2/favicons?sz=32&domain_url=${link.url}
	_tplMyLinkAdd = () => `
		<div class="items-list">
			<input class="inp" type="text" id="add_title" autocomplete="off" placeholder="${this._i18n('add_title')}">
			<input class="inp" type="url" id="add_url" autocomplete="off" placeholder="URL">
			<button class="btn" data-type="add" title="${this._i18n('add')}">
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" class="bi" fill="currentColor" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
				</svg>
			</button>
		</div>
	`;
	_tplMyLink = (link, i) => `
		<div class="items-list">
			<input class="inp" type="text" value="${link.title}" disabled>
			<input class="inp" type="url" value="${link.url}" disabled>
			<button class="btn" data-type="edit" data-id="${i}" title="${this._i18n('edit')}">
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" class="bi" fill="currentColor" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
				</svg>
			</button>
			<button class="btn" data-type="delete" data-id="${i}" title="${this._i18n('delete')}">
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" class="bi" fill="currentColor" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
				</svg>
			</button>
		</div>
	`;
	_tplLinkChoose = (link, i) => `
		<label class="items-list check hover">
			<input class="input-hide" type="checkbox" value="${i}" name="preset" 
				${settings.current.filter.includes(i) ? 'checked' : ''}>
			<span class="checkbox-custom label-text">
				${link.title} 
				<small class="text-sec">(${link.url})</small>
			</span>
		</label>
	`;
	_tplTheme = (theme) => `
		<label>
			<input class="input-hide" type="radio" name="theme" value="${theme}"
				${settings.current.theme === theme ? 'checked' : ''}>
			<span class="radio-custom">
				<span class="${theme}" style="font-size:0;">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="112px" height="112px">
						<title>${this._i18n(theme) || theme }</title>
						<path d="M0 0h16v16H0V0z" fill="var(--back-prm)"/>
						<polygon points="0,0 16,16 16,0" fill="var(--back-sec)"/>
						<circle cx="16" cy="16" r="5" fill="var(--accent)"/>
					</svg>
				</span>
			</span>
			<br>
			<span class="label-text">${this._i18n(theme) || theme }</span>
		</label>    
	`.trim();
	_tplTopToggle = () => `
		<div>
			<label>
				<input class="input-hide" type="checkbox" name="top" 
					${settings.current.top_sites ? 'checked' : ''}>
				<span class="switch-custom label-text">${this._i18n('show_top_sistes')}</span>
			</label>
		</div>
	`;
	_setColumns = (col) => `
		<label>
			<input class="input-hide" type="radio" name="columns" value="${col}"
				${settings.current.columns == col ? 'checked' : ''}>
			<span class="radio-custom">
				<svg class="svg-icon">
					<use xlink:href="icons/icon_sprite.svg#col_${col}"></use>
				</svg>
			</span>
		</label>
	`.trim();
	_setLinkLine = (line) => `
		<label>
			<input class="input-hide" type="radio" name="line" value="${line}"
				${settings.current.line == line ? 'checked' : ''}>
			<span class="radio-custom">
				<svg class="svg-icon">
					<use xlink:href="icons/icon_sprite.svg#str_${line}"></use>
				</svg>
			</span>
		</label>
	`.trim();
	link = (header, arr) => `
		<div class="link-wrap">
			<div class="link-header">
				<small>${this._i18n(header)}</small>
			</div> 
			${this._createOutput(this._tplLink, arr)}
		</div>
	`;

	layout = () => `
		<p class="text-sec"><small>${this._i18n('lines')}</small></p>
		${this._createOutput(this._setLinkLine, Preset.lines)}
		<p class="text-sec"><small>${this._i18n('columns')}</small></p>
		${this._createOutput(this._setColumns, Preset.columns)}
		<p class="text-sec"><small>${this._i18n('top_sistes')}</small></p>
		${this._tplTopToggle()}
	`;
	themes = () => `
		<p class="text-sec"><small>${this._i18n('themes')}</small></p>
		${this._createOutput(this._tplTheme, Preset.themes)}
	`;

	my_links = () => `
		<p class="text-sec"><small>${this._i18n('add_anchor')}</small></p>
		${this._tplMyLinkAdd()}
		<p class="text-sec"><small>${this._i18n('my_links')}</small></p>
		${this._createOutput(this._tplMyLink, settings.current.my_links) || 
		'no links'}
	`;

	google = () => `
		<p class="text-sec"><small>${this._i18n('google_links')}</small></p>
		${this._createOutput(this._tplLinkChoose, Preset.links)}
	`;
}
