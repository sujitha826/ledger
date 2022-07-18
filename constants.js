var Constants = function () {

    this.KEY_TYPE = "API_KEY";
    this.ENV_TYPE_PROD = 'PROD';
    this.SESSION_MAX_AGE_IN_MS = 1 * 24 * 60 * 60 * 1000;

    // Billing details
    this.MINIMUM_REQUIRED_BLANACE = 1500;
    this.CREATE_APP_AMOUNT = 1500;

    // // Pricing
    // this.ALGO_HISTORICAL = 6;
    // this.ALGO_INTERACTIVE = 4;
    // this.BROKER_HISTORICAL = 5;
    // this.BROKER_INTERACTIVE = 5;
    // this.MULTI_CLIENT_INTERACTIVE = 0;
    // this.MULTI_CLIENT_HISTORICAL = 0;
    // this.GST_PERCENTAGE = 18;
    // this.AMIBROKER = 1500;
    //
    // // Market Feed Data Pricing
    // this.BASIC_NSECASH_PRICE = 7.00;
    // this.BASIC_NSEFO_PRICE = 7.00;
    // this.BASIC_NSECASH_FO_PRICE = 9.00;
    // this.PRO_NSECASH_PRICE = 8.00;
    // this.PRO_NSEFO_PRICE = 8.00;
    // this.PRO_NSECASH_FO_PRICE = 10.00;

    // Actual pricing
    this.ALGO_HISTORICAL = 500;
    this.ALGO_INTERACTIVE = 750;
    this.BROKER_HISTORICAL = 500;
    this.BROKER_INTERACTIVE = 500;
    this.MULTI_CLIENT_INTERACTIVE = 0;
    this.MULTI_CLIENT_HISTORICAL = 0;
    this.GST_PERCENTAGE = 18;
    this.AMIBROKER = 1500;

    // Market Feed Data Pricing
    this.BASIC_NSECASH_PRICE = 990.00;
    this.BASIC_NSEFO_PRICE = 990.00;
    this.BASIC_NSECASH_FO_PRICE = 1790.00;
    this.PRO_NSECASH_PRICE = 1490.00;
    this.PRO_NSEFO_PRICE = 1490.00;
    this.PRO_NSECASH_FO_PRICE = 2690.00;

    // Symbols
    this.BASIC_NSECASH_SYMBOLS = 25;
    this.BASIC_NSEFO_SYMBOLS = 25;
    this.BASIC_NSECASH_FO_SYMBOLS = 50;
    this.PRO_NSECASH_SYMBOLS = 35;
    this.PRO_NSEFO_SYMBOLS = 35;
    this.PRO_NSECASH_FO_SYMBOLS = 75;

    // Market feed plan details
    this.BASIC_NSECASH_IntraHistoryMonths = 1;
    this.BASIC_NSEFO_IntraHistoryMonths = 1;
    this.BASIC_NSECASH_FO_IntraHistoryMonths = 1;

    this.PRO_NSECASH_IntraHistoryMonths = 3;
    this.PRO_NSEFO_IntraHistoryMonths = 3;
    this.PRO_NSECASH_FO_IntraHistoryMonths = 3;

    this.BASIC_NSE_CASH_DailyHistoryYears = 7;
    this.BASIC_NSEFO_DailyHistoryYears = 7;
    this.BASIC_NSECASH_FO_DailyHistoryYears = 7;

    this.PRO_NSE_CASH_DailyHistoryYears = 12;
    this.PRO_NSEFO_DailyHistoryYears = 12;
    this.PRO_NSECASH_FO_DailyHistoryYears = 12;

    this.TRIAL_DAYS = 5;
    this.GUEST_MD_USER_DAYS = 5;
    this.ALGO_TRADING_TRIAL_DAYS = 14; // should be 14
    this.SUBSCRIPTION_VALIDITY_MONTH = 1;

    // MultiClient Plans
    this.Basic = ["Profile", "Balance", "Holdings", "Positions"];
    this.Interactive = ["PlaceOrder", "CancelOrder", "UpdateOrder"];
    this.Historical = ["OHLC"];
    this.History = ["TradeHistory", "OrderHistory"];
    this.LiveFeeds = ["FeedsNow", "SubFeed", "UnSubFeeds"];

    // Market Feed Data
    this.EXPECTED_SEGMENTS = ["NSECASH", "NSEFNO"];

    // App Types
    this.APP_TYPE_ALGO_TRADING = "AlgoTrading";
    this.APP_TYPE_MULTI_CLIENT = "MultiClient";
    this.APP_TYPE_BROKER = "Amibroker";
    this.APP_TYPE_MARKET_FEED_DATA = "MarketDataFeedBridge";
    this.PAYMENT_TYPE_DEBITED = "Debited";
    this.CREATE_APP_PAYMENT_DETAILS = "Debited for the subscription of Upstox APIs with all Trading APIs, charges for created app";
    this.HISTORICAL_SUB_PAYMENT_DETAILS = "Debited for subscription of Historical APIs of Upstox";
    this.PAYMENT_REMARK = "Being amount received from payment gateway towards Upstox developer.";
    this.PAYMENT_MESSAGE = "Being amount debited towards ";
    this.COUPON_CREDIT_MESSAGE = "Being amount credited towards coupon ";

    // Email
    this.RKSV_EMAIL = "puneet.maheshwari@rksv.in";

    // Error Status Code
    // Login API
    this.INVALID_CREDENTIALS = "login_001";
    this.SESSION_EXPIRED = "login_002";
    this.FREEDOM_PLAN_BLOCK = "login_003";
    this.USER_ACCOUNT_BLOCKED = "login_004";
    this.NOT_AN_INVESTER_CLIENT = "login_005";
    this.AUTO_LOGOUT = "autoLogout003";
    this.USER_DETAILS_NOT_FOUND = "user_001";
    this.BLOCKED_MESSAGE = `Due to multiple failed sign in attempts, your account has been blocked. Please click <a target="_blank" href= https://pro.upstox.com/forgot-password  >here</a> to unblock your account.`;
    this.EXPIRED_PASSWORD = `Your password has expired. Please click <a target="_blank" href= https://pro.upstox.com/forgot-password  >here</a> to reset using the forgot password option`
    this.AUTHORIZATION_FAILED = "login_006"
    // APP API
    this.NO_AVAILABLE_BALANCE = "billing_001";
    this.INVALID_REDIRECTION_URL = "app_001";
    this.MISSING_PARAMS = "app_002";
    this.MISSING_REDIRECTION_URL = "app003";
    this.MISSING_APP_NAME_URL = "app004";
    this.NAME_NOT_UNIQUE = "app005";
    this.MISSING_APP_TYPE = "app006";
    this.UNIQUE_BROKER_APP = "app007";
    this.INVALID_APP_TYPE = "app008";
    this.MISSING_MULTICLIENT_PLAN = "app009";
    this.MISSING_POSTBACK_URL = "app010";
    this.INVALID_POSTBACK_URL = "app011";
    this.ENABLE_POSTBACK = "app012";

    this.WRONG_SEGMENT = "app013";
    this.SEGEMNT_EXISTS = "app014";
    this.SEGEMNT_DOES_NOT_EXISTS = "app023";
    this.ALGO_APP_LIMIT = "user_limit_001";

    // Market Feed Data
    this.MISSING_MARKET_FEED_PLANS = "app014";
    this.PASSWORD_CHANGED = "app015";
    this.PASSWORD_POLICY_FAILED = "app016";
    this.INVALID_USERID_PASSWORD = "app017";
    this.INVALID_USER_ID = "app018";
    this.USER_RENEWED = "app019";
    this.INVALID_RENEW_DATE = "app020";
    this.APP_NOT_FOUND = "app021";
    this.PLAN_EXIST = "app022";
    this.DISABLED_ALGO_LAB = "app023";

    // Subscription with addOns
    this.NO_ADDONS_FOUND = "subscription_001";
    this.WRONG_APP_ID = "subscription002";

    this.INVOICE_ERROR = "invoice001";
    this.INVOICE_SUCESSS = "invoice002";

    this.AUTO_DEBIT_STATE_EXIST = "autodebit001";

    // Server API
    this.BAD_REQUEST = "badrequest_400";
    this.SERVER_ERROR = "servererror500";
    this.NOT_FOUND = "servererror404";
    this.NOT_VALID_ORIGIN = "unauthorized401";

    // APP
    this.APP_DELETE_SUCCESS = true;

    this.ENTER_GUEST_USER_INFO = "guest001";
    this.INVALID_OTP = "guest002";

    // Service name
    this.IDART_SERVICE = "iDartService";
    this.AUTO_DEBIT = "autoDebit";

    this.AUTO_DEBIT_PROCESS_FAILED_SUBJECT = "Auto debit callback process failed";
    this.AUTO_DEBIT_PROCESS_FAILED_HTML = "Auto debit callback process failed";

    this.PAYMENT_REQUEST_TYPE = {
        INSTANT_CREATE: "INSTANT_CREATE",
        INSTANT_RENEWAL: "INSTANT_RENEWAL",
        INSTANT_AND_UPDATE: "INSTANT_AND_UPDATE",
        RENEW_CALLBACK: "RENEW_CALLBACK"
    }

    this.EMAIL_SUBJECT = {
        PAYMENT_SUCCESSFUL: "Payment Success in ledger",
        PAYMENT_FAILED: "Payment Failed on API",
        AUTO_DEBIT_PROCESS_FAILED: "Auto Renewal callback process failed",
        AUTO_RENEWAL_UPDATE: "Auto Renewal Update",
        BILLING_HISTORY_FAILED: "Auto Renewal Failed - with billing",
        USER_AUTO_RENEWAL_SUCCESS: "Success: Your Upstox service subscription has been renewed! ",
        USER_INSUFFICIENT_BAL: "Unsuccessful: Failure to renew your Upstox service subscription"
    }

    this.ADMIN_KEY = "7EFC771E4B687A48D84BA9F50B910020C43D1BAE34944429FEDED6304068AE6E";
    this.INVALID_ADMIN_KEY = "Invalid Admin Key";

    // Coupons
    this.COUPON_GENERATION_FAILED = "coupon_001";
    this.COUPON_VIEW_FAILED = "coupon002";
    this.COUPON_ALREADY_EXISTS = "coupon003";
    this.COUPON_DOESNT_EXIST = "coupon004";
    this.COUPON_DELETION_FAILED = "coupon005";
    this.COUPON_UPDATION_FAILED = "coupon006";
    this.COUPON_ALREADY_APPLIED = "coupon007";
    this.COUPON_APPLY_FAILED = "coupon008";
    this.COUPON_EXPIRED = "coupon009";
    this.INVAID_COUPON_AMOUNT = "coupon010";
    this.INVAID_COUPON_EXPIRY = "coupon011";

    this.LOGIN_API = {
        LOGIN_METHOD: {
            OMS: "OMS"
        },
        TWO_FA_METHOD: {
            YOB: "YOB",
            MOBILE_KEY: "MOBILE_KEY"
        },
        PLATFORM_TYPE: {
            ANDROID: "ANDROID",
            IOS: "IOS",
            WEB: "WEB"
        },
        RELEASE_TYPE: {
            GREEN: "green",
            BLUE: "blue"
        },
        OS_VERSION: "osVersion",
        OS_NAME: "osName",
        APP_VERSION: "appVersion",
        MANUFACTURER: "manufacturer",
        MODEL_NAME: "modelName"
    }

    this.SETUP_A = "SETUP_A";
    this.SETUP_B = "SETUP_B";

    this.AUTH_PARAMS = {
        response_type: "code"
    };

    this.BACKOFFICE_LEDGER_CONSTANTS = {
        DEFAULT_DEBIT_ACCOUNT_UCC: "999806",
        DEFAULT_CONSUMER_NAME: "DC_SRVC",
        EXTERNAL_REFERENCE_ID_PREFIX: "DCS-",
        DEFAULT_USERNAME: "DEVCONS",                          // comtek has a validation on length <= 10 chars
    };

};

module.exports.Constants = new Constants();