import 'angular';
import { appAndStuffsComponent } from "./appAndStuffs";
import { todoComponent } from "./todo";

angular
	.module('myAppOfDoom', [])
	.component('appAndStuffs', appAndStuffsComponent)
	.component('todo', todoComponent);


angular.bootstrap(document.body, ['myAppOfDoom']);