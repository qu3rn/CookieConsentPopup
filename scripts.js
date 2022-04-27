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

    createCookieSerivcePopup() {
        let popupWrapper = document.createElement('div'),
            popupContainer = document.createElement('div'),
            popupP = document.createElement('p'),
            popupBtn = document.createElement('div');

        popupWrapper.classList.add('cookieService-wrapper');
        popupWrapper.style.cssText('z-index: 9999;width: 100 %;height: auto;position: absolute;bottom: 0;background - color: #fff;padding: 15px 0px;-webkit - box - shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;box - shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;display: -webkit - box;display: -ms - flexbox;display: flex;-webkit - box - orient: horizontal;-webkit - box - direction: normal;-ms - flex - direction: row;flex - direction: row;-webkit - transition: bottom ease - out 200ms;transition: bottom ease - out 200ms;'.trim());

        popupContainer.classList.add('cookieService-container');
        popupContainer.style.cssText('-webkit-box-flex: 0;-ms-flex: 0 0 60%;flex: 0 0 60%;margin: 0 auto;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-ms-flex-direction: row;flex-direction: row;'.trim());

        popupP.classList.add('consent');
        popupP.style.cssText = 

        popupBtn.addEventListener('click', this.accept());

    }

    createCookieAgreement() {

        this.createCookieSerivcePopup();

        return true;
    }

    accept(event) {
        this.saveToStorage(this.storageType);
    }

}

service = new CookiePolicyService;
service.cookieServiceStart();