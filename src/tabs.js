const tabNavAll = document.querySelectorAll('.tab-nav'),
	tabContAll = document.querySelectorAll('.tab-cont');

tabNavAll.forEach(i => i.addEventListener('click', openTab));

function openTab() {
	tabNavAll.forEach(i => i.classList.remove('active'));
	this.classList.add('active');
	tabContAll.forEach(i => i.classList.add('hidden'));
	document.querySelector(`#${this.dataset.tab}`).classList.remove('hidden');
}
