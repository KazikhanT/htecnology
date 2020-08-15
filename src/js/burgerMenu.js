class Button {
    constructor(className) {
        this.selector = document.querySelector('.' + className);
    }

    show() {
        const DEFAULT_POSITION = "-20px";
        this.selector.style.top = DEFAULT_POSITION;
    }

    hide() {
        const SHIFT_DOWN = "-5px";
        this.selector.style.top = SHIFT_DOWN;

        setTimeout(() => {
            const BUTTON_HEIGHT = "64px";
            this.selector.style.top = `-${BUTTON_HEIGHT}`;
        }, 400);
    }
}


class Overlay {
    constructor(className) {
        this.selector = document.querySelector('.' + className);
    }

    show() {
        setTimeout(() => {
            this.selector.style.opacity = "1";
        }, 400);
    }

    hide() {
        this.selector.style.opacity = "0";
    }
}


class Menu {
    constructor(className) {
        this._className = className;
        this.selector = document.querySelector('.' + className);
    }

    addActiveClass() {
        this.selector.classList.add(this._className + "_active");
    }

    removeActiveClass() {
        this.selector.classList.remove(this._className + "_active");
    }
}


class BurgerMenu {
    constructor() {
        let _className = "burger-menu";

        this.menu = new Menu(_className);
        this.button = new Button(_className + "__button");
        this.overlay = new Overlay(_className + "__overlay");
        this.nav = document.querySelector('.' + _className + "__nav");
    }

    _hideScroll() {
        document.body.style.overflow = "hidden";
    }

    _showScroll() {
        document.body.style.overflow = "";
    } 

    show() {
        this.button.hide();
        this.overlay.show();
        this.menu.addActiveClass();
        this._hideScroll();
    }

    hide() {
        this.overlay.hide();
        this.button.show();
        this.menu.removeActiveClass();
        this._showScroll();
    }
}


function createHTML() {
    document.body.insertAdjacentHTML("afterbegin", `
    <div class="burger-menu">
        <a class="burger-menu__button" href="#">
            <span class="burger-menu__button-linies"></span>
        </a>
        <nav class="burger-menu__nav">
            <ul>
                <li><a class="burger-menu__link" href="#home">HOME</a></li>
                <li><a class="burger-menu__link" href="#about">ABOUT</a></li>
                <li><a class="burger-menu__link" href="#services">SERVICES</a></li>
                <li><a class="burger-menu__link" href="#blog">BLOG</a></li>
                <li><a class="burger-menu__link" href="#contact">CONTACT US</a></li>
            </ul>
        </nav>
        <div class="burger-menu__overlay"></div>
    </div>`);
}


export default function() {
    if (document.documentElement.clientWidth > 768) {
        return;
    }

    createHTML();
    let bgMenu = new BurgerMenu();

    bgMenu.button.selector.addEventListener("click", event => {
        event.preventDefault();
        bgMenu.show();
    });

    bgMenu.overlay.selector.addEventListener("click", () => {
        bgMenu.hide();
    });

    bgMenu.nav.addEventListener("click", event => {
        let isLink = event.target.classList.contains("burger-menu__link");

        if (isLink) {
            event.preventDefault();
            bgMenu.hide();

            const SECTION_NAME = event.target.getAttribute("href").substr(1);

            document.getElementById(SECTION_NAME).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}