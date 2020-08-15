class Element {
    constructor(el, animationName) {
        this.isActive = false;
        this.animationName = animationName;
        this.el = el;
    }

    setActiveClass() {
        if (!this.isActive) {
            this.el.classList.add(this.animationName + "_active");
            this.isActive = true;
        }
    }

    isPartiallyVisible() {
        let elementBoundary = this.el.getBoundingClientRect();
        
        const TOP = elementBoundary.top;
        const HEIGHT = elementBoundary.height;
        const BOTTOM = elementBoundary.bottom;

        return ((TOP + HEIGHT >= 0) && (HEIGHT + window.innerHeight >= BOTTOM));
    }
}

function getAnimatedElements(AnimationName) {
    let allElements = [];
    let allAnimationElements = document.querySelectorAll('.' + AnimationName);

    for (let item of allAnimationElements) {
        let el = new Element(item, AnimationName);
        allElements.push(el);
    }

    return allElements;
}

function animateFirstBlock() {
    document.documentElement.scrollTop = 1;
}

export default function() {
    let allElements = [];
    const arr1 = getAnimatedElements("animation-up")
    const arr2 = getAnimatedElements("animation-right")
    const arr3 = getAnimatedElements("animation-left");
    allElements = allElements.concat(arr1, arr2, arr3);

    animateFirstBlock();
    
    window.addEventListener("scroll", () => {
        for (let i = 0; i < allElements.length; ++i) {
            let el = allElements[i];

            if (el.isPartiallyVisible()) {
                el.setActiveClass();
            }
        }
    })
}