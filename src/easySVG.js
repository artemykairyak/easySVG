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

function removeBadNodes() {
    var treeWalker = document.createTreeWalker(document, NodeFilter.SHOW_COMMENT, null, false);
    var nodeList = [];
    while (treeWalker.nextNode()) {
        if (treeWalker.currentNode.data.indexOf('?xml') !== -1) {
            nodeList.push(treeWalker.currentNode);
            if (treeWalker.currentNode.nextSibling.nodeType === 3) {
                nodeList.push(treeWalker.currentNode.nextSibling);
            }
        } else if (treeWalker.currentNode.data.indexOf('Adobe') !== -1) {
            nodeList.push(treeWalker.currentNode);
            if (treeWalker.currentNode.nextSibling.nodeType === 3) {
                nodeList.push(treeWalker.currentNode.nextSibling);
            }
        }
    }
    for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].parentNode.removeChild(nodeList[i])
    }
};

function replaceSvg(elem, path) {
    if ('ActiveXObject' in window) {
        let IErequest = new ActiveXObject('MSXML2.XMLHTTP');
        IErequest.onReadyStateChange = function() {
            if (IErequest.readyState === 4 && IErequest.status === 200) {
                const attr = elem.getAttribute('class');
                const noSvgClassAttr = attr.slice(attr.indexOf('svg') + 3);

                if (path && elem.parentNode) {
                    elem.insertAdjacentHTML('afterend', IErequest.responseText);
                    if (noSvgClassAttr.length) {
                        removeBadNodes();
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
                        removeBadNodes();
                        elem.nextSibling.setAttribute('class', noSvgClassAttr.trim());
                    }
                }
                elem.remove();
            }
        });
        request.send();
    }
}