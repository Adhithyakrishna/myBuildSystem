stopLoad = false;
$(document).ready(function() {
	function liveInject() {
		if (!stopLoad) {
			$(".container").load("script/indexHelper.html");
		}
	}
	setInterval(liveInject, 2000);
});