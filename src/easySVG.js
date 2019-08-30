const svgArr = document.querySelectorAll('.svg');

svgArr.forEach(function(item) {
	const path = item.dataset.src;
	replaceSvg(item, path);
});

function replaceSvg(elem, path) {
	const request = new XMLHttpRequest();

	request.open('GET', path);
	request.addEventListener("readystatechange", () => {
		if (request.readyState === 4 && request.status === 200) {
	      const attr = elem.getAttribute('class');
	      const noSvgClassAttr = attr.slice(attr.indexOf('svg') + 3);
	      
	      elem.insertAdjacentHTML('afterend', request.responseText);

	      if(noSvgClassAttr.length) {
	      	 elem.nextSibling.setAttribute('class', noSvgClassAttr.trim());
	      }
	     
	      elem.remove();
	    }
	});

	request.send();
}
