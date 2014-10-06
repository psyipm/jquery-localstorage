/**
 * https://github.com/psyipm/jquery-localstorage.git
 */

(function($) {
    var Storage = function() {
        this._getCurrentTimestamp = function() {
            return new Date().getTime();
        };
        
        this._getExpireTimestamp = function(days) {
            days = (typeof days == "undefined") ? 1 : days;
            
            var expires = this._getCurrentTimestamp() + 1000*60*60*24*days;
            return expires;
        };
        
        this._isExpired = function(data) {
            if(!data.hasOwnProperty("expires"))
                return true;
            
            if(data.expires < this._getCurrentTimestamp())
                return true;
            
            return false;
        };
    };
    
    /**
     * set item to local storage or cookie if storage is not supported
     * @param {string} name
     * @param {object} value
     * @param {int} expires days
     * @returns {object}
     */
    Storage.prototype.set = function(name, value, expires) {
        if(typeof(Storage) == "undefined") {
            var options = {expires: expires};
            $.cookie(name, value, options);
        }

        var data = {value: value, expires: this._getExpireTimestamp(expires)};
        localStorage.setItem(name, JSON.stringify(data));
    };
    
    Storage.prototype.get = function(name) {
        var d = localStorage.getItem(name);
        
        try {
            var data = JSON.parse(d);
            if(this._isExpired(data)) 
                return;
            
            return data.value;
        }
        catch(e) {
            return $.cookie(name);
        }
    };
    
    $.storage = new Storage();
})(jQuery);