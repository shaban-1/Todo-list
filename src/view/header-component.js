import { AbstractComponent } from "../framework/view/abstract-component.js";

function createHeaderTemplate() {
	return (
		`<header class="header-section">
			<h1 class="main-title">Список задач</h1>
		</header>`
	);
}

export default class HeaderComponent extends AbstractComponent {
	get template() {
		return createHeaderTemplate();
	}
}