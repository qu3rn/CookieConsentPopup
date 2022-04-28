class CookiePolicyService {
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

    constructor(policyUrl = '#') {
        this.policyUrl = policyUrl;
        this.self = this;
    }

    websiteReady(boolean) {
        let doc, body

        document.onreadystatechange = () => {
            doc = document.readyState,
                body = document.body;

            try {
                if (doc !== 'complete') throw 'Init while document not loaded';
                if (body === null) throw 'Something happend to body/content loading';
                if (typeof (body) === 'undefined') throw 'Body undefined'
            }
            catch (err) {
                console.error(err);
            }

            if (typeof (body) != 'undefined' && body != null) {
                return boolean = true;
            }
        };
    }

    cookieServiceStart() {
        // walktrought function
        
        console.log(
            this.storageType,
            this.shouldShowPopup(),
            this.checkServiceCookie(),
            
        );
    }

    checkServiceCookie() {
        if (this.shouldShowPopup()) {
            if ( this.createCookieAgreement()) {
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

    createCookieSerivcePopupDOM() {

        let popupWrapper = document.createElement('div'),
            popupContainer = document.createElement('div'),
            popupP = document.createElement('p'),
            popupBtn = document.createElement('div'),
            link = document.createElement('link'),
            stylesWrapper = 'z-index: 9999;width: 100%;height: auto;position: absolute;bottom: 0;background-color: #fff;padding: 8px 0px;-webkit-box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-ms-flex-direction: row;flex-direction: row;-webkit-transition: bottom ease-out 200ms;transition: bottom ease-out 200ms;'.trim(),
            stylesContainer = '-webkit-box-flex: 0;-ms-flex: 0 0 60%;flex: 0 0 60%;margin: 0 auto;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-ms-flex-direction: row;flex-direction: row;'.trim(),
            stylesP = 'font-family: "Roboto", sans-serif;vertical-align: middle;text-align: justify;font-size: 10px;padding-right: 13px;'.trim(),
            stylesBtn = '-webkit-box-align: center; -ms-flex-align: center; align-items: center; background-color: #0a66c2; border: 0; border-radius: 100px; -webkit-box-sizing: border-box; box-sizing: border-box; color: #ffffff; cursor: pointer; display: -webkit-inline-box; display: -ms-inline-flexbox; display: inline-flex; font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; line-height: 20px; max-width: 480px; min-height: 40px; min-width: 0px; overflow: hidden; padding: 0px; padding-left: 20px; padding-right: 20px; text-align: center; -ms-touch-action: manipulation; touch-action: manipulation; -webkit-transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, -webkit-box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s; transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, -webkit-box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s; transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s; transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, -webkit-box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-user-select: none; vertical-align: middle;'.trim();

        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Roboto&display=swap');
        document.head.appendChild(link);

        popupWrapper.classList.add('cookieService-wrapper');
        popupContainer.classList.add('cookieService-container');
        popupP.classList.add('consent');
        popupBtn.classList.add('cookieService-btn');

        popupP.innerHTML = `Plikami cookies stosowanymi na naszej stronie można zarządzać, w tym je usunąć za pośrednictwem ustawień przeglądarki internetowej. Internauci mogą dowolnie zarządzać stosowanymi plikami <a href="${this.policyUrl}">(polityka prywatności)</a>`;
        popupBtn.innerHTML = `Ok`;   
        
        popupWrapper.appendChild(popupContainer);
        popupContainer.appendChild(popupP);
        popupContainer.appendChild(popupBtn);
        document.body.appendChild(popupWrapper);

        popupWrapper.style.cssText = stylesWrapper;
        popupContainer.style.cssText = stylesContainer;
        popupP.style.cssText = stylesP;
        popupBtn.style.cssText = stylesBtn;

        popupBtn.addEventListener('mouseenter', (e) => { 
            popupBtn.style.backgroundColor = '#16437e';
            popupBtn.style.color = 'rgba(255, 255, 255, 0.7)';
        });

        popupBtn.addEventListener('mouseleave', (e) => { 
            popupBtn.style.backgroundColor = '#0a66c2';
            popupBtn.style.color = '#ffffff';
        });

        popupBtn.addEventListener('click', (e) => { this.accept() });

    }

    createCookieAgreement() {

        //this.createCookieSerivcePopupDOM();

        return false;
    }

    accept(event) {
        this.saveToStorage(this.storageType);
    }

}

service = new CookiePolicyService;
service.createCookieSerivcePopupDOM();
service.cookieServiceStart();