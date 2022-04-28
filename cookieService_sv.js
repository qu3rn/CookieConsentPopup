class CookiePolicyService {

    constructor(policyUrl = '#', boxAnimSpeed = 1000) {
        this.policyUrl = policyUrl;
        this.animBoxSpeed = boxAnimSpeed;
        this.cookiePolicyBox;
        this.self = this;
        this.init();
    }

    cookieStorage = {
        getItem: (key) => {
            let cookies = document.cookie
                .split(';')
                .map(cookie => cookie.split('='))
                .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
            return cookies[key];
        },
        setItem: (key, value) => {
            document.cookie = `${key}=${value}`;
        }
    };

    storageType = this.cookieStorage;
    consentPropertyName = 'jdc_consent';

    websiteReady(boolean) {
        let doc, body

        document.onreadystatechange = () => {
            doc = document.readyState,
                body = document.body;

            try {
                if (doc !== 'complete') throw 'Init while document not loaded';
                if (body == null) throw 'Something happend to body/content loading';
                if (typeof (body) == 'undefined') throw 'Body undefined'
            }
            catch (err) {
                console.error(err);
            }

            if (typeof (body) != 'undefined' && body != null) {
                return boolean = true;
            }
        };
    }

    init() {
        // walktrought function
        // console.log(
        //     this.storageType,
        //     this.shouldShowPopup(),
        //     this.checkServiceCookie(),
        // );
        this.checkServiceCookie();
    }

    checkServiceCookie() {
        if (this.shouldShowPopup()) {
            if (this.createCookieAgreement()) {
                this.saveToStorage();
            }
        }

    }

    shouldShowPopup() {
        return !this.storageType.getItem(this.consentPropertyName);
    }

    saveToStorage() {
        return this.storageType.setItem(this.consentPropertyName, true);
    }

    createCookieSerivcePopupDOM(url, animSpeed) {

        url = url ? url : this.policyUrl;
        animSpeed = animSpeed ? animSpeed : this.animBoxSpeed;
        const transition = `opacity ${animSpeed}ms ease`;
        const btnBgColorBase = '#0CF25D';
        const btnBgColorHover = '#06732C';

        //console.log(url, '\n', animSpeed);

        let popupWrapper = document.createElement('div'),
            popupContainer = document.createElement('div'),
            popupP = document.createElement('p'),
            popupBtn = document.createElement('div'),
            link = document.createElement('link'),
            stylesWrapper = `z-index: 9999;width: 100%;height: auto;position: absolute;bottom: 0;background-color: rgba(39, 59, 64,0.45);padding: 8px 0px;-webkit-box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-ms-flex-direction: row;flex-direction: row;-webkit-transition: ${transition};transition: ${transition};`.trim(),
            stylesContainer = '-webkit-box-flex: 0;-ms-flex: 0 0 60%;flex: 0 0 60%;margin: 0 auto;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-ms-flex-direction: row;flex-direction: row;'.trim(),
            stylesP = 'margin: auto !important;line-height: 12px;color: #f2f2f2;font-family: "Roboto", sans-serif;vertical-align: middle;text-align: justify;font-size: 12px;padding-right: 47px;'.trim(),
            stylesBtn = `-webkit-box-align: center; -ms-flex-align: center; align-items: center; background-color: ${btnBgColorBase}; border: 0; border-radius: 100px; -webkit-box-sizing: border-box; box-sizing: border-box; color: #ffffff; cursor: pointer; display: -webkit-inline-box; display: -ms-inline-flexbox; display: inline-flex; font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; line-height: 20px; max-width: 480px; min-height: 40px; min-width: 0px; overflow: hidden; padding: 0px; padding-left: 20px; padding-right: 20px; text-align: center; -ms-touch-action: manipulation; touch-action: manipulation; -webkit-transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, -webkit-box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s; transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, -webkit-box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s; transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s; transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, -webkit-box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-select: none; vertical-align: middle;`.trim();

        console.log(stylesWrapper);

        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Roboto&display=swap');
        document.head.appendChild(link);

        popupWrapper.classList.add('cookieService-wrapper');
        popupContainer.classList.add('cookieService-container');
        popupP.classList.add('consent');
        popupBtn.classList.add('cookieService-btn');

        popupP.innerHTML = `Plikami cookies stosowanymi na naszej stronie można zarządzać, w tym je usunąć za pośrednictwem ustawień przeglądarki internetowej. Internauci mogą dowolnie zarządzać stosowanymi plikami <a href="${url}" style="color: rgb(12, 242, 93)!important;">(polityka prywatności)</a>`;
        popupBtn.innerHTML = `Ok`;

        popupWrapper.appendChild(popupContainer);
        popupContainer.appendChild(popupP);
        popupContainer.appendChild(popupBtn);
        document.body.appendChild(popupWrapper);
        document.body.style.margin = '0';

        popupWrapper.style.cssText = stylesWrapper;
        popupContainer.style.cssText = stylesContainer;
        popupP.style.cssText = stylesP;
        popupBtn.style.cssText = stylesBtn;

        popupBtn.addEventListener('transitionend', (e) => {
            e.stopPropagation();
        });

        popupBtn.addEventListener('mouseenter', (e) => {
            popupBtn.style.backgroundColor = `${btnBgColorHover}`;
            popupBtn.style.color = 'rgba(255, 255, 255, 0.7)';
        });

        popupBtn.addEventListener('mouseleave', (e) => {
            popupBtn.style.backgroundColor = `${btnBgColorBase}`;
            popupBtn.style.color = '#ffffff';
        });

        popupBtn.addEventListener('click', (e) => { this.accept() });


        return popupWrapper;
    }

    removeCookieSerivcePopupDOM(elem) {
        try {
            if (elem == null) throw 'cookiePolicyBox doesnt exist';
        }
        catch (err) {
            console.error(err);
            return;
        }

        elem.addEventListener('transitionend', (e) => {
            elem.style.display = 'none';
            elem.style.visibility = 'hidden';
            elem.remove();
        });

        elem.style.opacity = '0';

    }

    createCookieAgreement() {
        this.cookiePolicyBox = this.createCookieSerivcePopupDOM();
        return false;
    }

    accept(event) {
        this.saveToStorage(this.storageType);
        this.removeCookieSerivcePopupDOM(this.cookiePolicyBox);
    }

}

service = new CookiePolicyService('https://www.pcwoenergy.pl/polityka-prywatnosci-2/');