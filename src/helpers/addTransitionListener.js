export default function addTransitionListener(callback, node) {
    function whichTransitionEvent() {
        var t;
        var el = document.createElement("fakeelement");
        var transitions = {
            transition: "animationend",
            OTransition: "oAnimationEnd",
            MozTransition: "animationend",
            WebkitTransition: "webkitAnimationEnd"
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