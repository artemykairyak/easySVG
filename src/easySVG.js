document.addEventListener("DOMContentLoaded", function() {
    easySVG();
});

function SVGrefresh() {
    easySVG();
}

function easySVG() {
    const svgArr = document.querySelectorAll('.svg');

    for (var i = 0; i < svgArr.length; i++) {
        const path = svgArr[i].dataset.src;
        replaceSvg(svgArr[i], path);
    }
}

function replaceSvg(elem, path) {
    if ('ActiveXObject' in window) {
        let IErequest = new ActiveXObject('MSXML2.XMLHTTP');
        IErequest.onReadyStateChange = function() {
            if (IErequest.readyState === 4 && IErequest.status === 200) {
                const attr = elem.getAttribute('class');
                const noSvgClassAttr = attr.slice(attr.indexOf('svg') + 3);

                if (elem.parentNode) {
                    elem.insertAdjacentHTML('afterend', IErequest.responseText);

                    if (noSvgClassAttr.length) {
                        elem.nextSibling.setAttribute('class', noSvgClassAttr.trim());
                    }

                    elem.parentNode.removeChild(document.querySelector('.svg'));
                }
            }
        }
        IErequest.open('GET', path);
        IErequest.send();

    } else {
        let request = new XMLHttpRequest();
        request.open('GET', path);
        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                const attr = elem.getAttribute('class');
                const noSvgClassAttr = attr.slice(attr.indexOf('svg') + 3);

                if (path && elem.parentNode) {
                    elem.insertAdjacentHTML('afterend', request.responseText);

                    if (noSvgClassAttr.length) {
                        elem.nextSibling.setAttribute('class', noSvgClassAttr.trim());
                    }
                }

                elem.remove();
            }
        });

        request.send();
    }
}