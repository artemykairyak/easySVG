$('.svg').each(function() {
	var path = '../' + $(this).data('src');
	replace($(this), path);
});

function replace(elem, path) {
	var s = new XMLSerializer();
	
	$.ajax({
    	url: path,
        success: function(data) {
			var str = s.serializeToString(data);
        	elem.append(str);
        	elem.find('svg').unwrap();
      	}
	});
}
