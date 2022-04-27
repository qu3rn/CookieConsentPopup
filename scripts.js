class CookiePolicyService 
{
    storageType = localStorage;
    consentPropertyName = 'jdc_consent';
    
    constructor( policyUrl ) 
    {
        this.policyUrl = policyUrl;
        this.self = this;
    }

    websiteReady( boolean ) 
    {   
        let doc, body
            
        document.onreadystatechange = () =>
        {
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

    cookieServiceStart()
    {
        // walktrought function
    }

    shouldShowPopup()
    {
        return !this.storageType.getItem(this.consentPropertyName);
    }

    saveToStorage()
    {
        return this.storageType.getItem(this.consentPropertyName, true);
    }

    createCookieSerivcePopup()
    {
        
    }

    createCookieAgreement()
    {
        
    }

    createCookieSerivce()
    {
        
    }

}

service = new CookiePolicyService;