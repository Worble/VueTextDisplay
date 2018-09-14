function addAnimationListener(callback, node) {
    function whichAnimationEvent() {
        var a;
        var el = document.createElement("fakeelement");
        var animations = {
            animation: "animationend",
            OAnimation: "oAnimationEnd",
            MozAnimation: "animationend",
            WebkitAnimation: "webkitAnimationEnd",
        };

        for (a in animations) {
            if (el.style[a] !== undefined) {
                return animations[a];
            }
        }
    }
    var animationEvent = whichAnimationEvent();
    animationEvent &&
        node.addEventListener(animationEvent, function () {
            callback();
        });
}

function addTransitionListener(callback, node) {
    function whichTransitionEvent() {
        var t;
        var el = document.createElement("fakeelement");
        var transitions = {
            transition: 'transitionend',
            OTransition: 'oTransitionEnd',
            MozTransition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd'
        };

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }
    var transitionEvent = whichTransitionEvent();
    transitionEvent &&
        node.addEventListener(transitionEvent, function () {
            callback();
        });
}

export default { addAnimationListener, addTransitionListener }