(function initClaspo(windowRef, documentRef, scriptTag, projectId) {
    var scriptEl = documentRef.createElement(scriptTag);
    scriptEl.async = 1;
    scriptEl.src = "https://scripts.claspo.io/scripts/" + projectId + ".js";

    var firstScript = documentRef.scripts[0];
    if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(scriptEl, firstScript);
    } else {
        (documentRef.head || documentRef.body || documentRef.documentElement).appendChild(scriptEl);
    }

    var queueFn = function () {
        queueFn.c(arguments);
    };
    queueFn.q = [];
    queueFn.c = function () {
        queueFn.q.push(arguments);
    };

    windowRef.claspo = windowRef.claspo || queueFn;
    windowRef.claspo("init");
})(window, document, "script", "357AC246413E4B54924DAF2F78DDB309");
