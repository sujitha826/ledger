// @ts-check
const { BackOfficeService } = require('@upstox/node-backoffice-connector');
const AsyncService = new BackOfficeService().AsyncService;
const { ProfileService } = require('@upstox/node-profile-connector');tants').Constants;
var uuid = require('uuid');
var _ = require('lodash');_UCC: "999806",
    DEFAULT_CONSUMER_NAME: "DC_SRVC",
    EXTERNAL_REFERENCE_ID_PREFIX: "DCS-",
    DEFAULT_USERNAME: "DEVCONS",                          // comtek has a validation on length <= 10 chars
};
rateDateForAutoDebit = function (expiry) {
    expiry = new Date(expiry);
    let expiryYear = expiry.getFullYear();expiryDate = expiry.getDate();
    let expiryMonth = expiry.getMonth() + 1;
    expiryMonth = expiryMonth < 10 ? "0" + expiryMonth : expiryMonth;
    if (expiryDate < 10) {
        expiryDate = "0" + expiryDate;
  "-" + expiryMonth + "-" + expiryDate;teRequestId() {
    let requestId = "NUDC-" + uuid.v4();urn requestId;ram {string} re@param {string} user_id
 * @param {number} totalAmount
 * @param {string} narration
 * @param {string} exchangeount, narration, exchange) {
    //If the customer's correspondence address state is Maharashtra then CGST & SGST is t

    try {
        const response = await AsyncService.createLedgerEntryV2({
            metaData: {
                requestId: generateRequestId(),
                consumerService: 'DC_SRVC', //confirm this value with backoffice service team, for testing this value was set as GROWTH_SERVICE
                requestTime: new Date()
            },
            ledgerEntries: [
                {
                    data: [
                        {
                            ucc: user_id, //UCC of the client
                            amount: totalAmount.toString(),            //Amount to be charged
                            entryType: 'D',
                            unique: false
                        },
                        {
                            ucc: '999806',
                            amount: (totalAmount / 1.18).toString(),     //Amount / 1.18   
                            entryType: 'C',
                            unique: false
                        },
                        {
                            ucc: '999955CG',
                            amount: ((totalAmount / 1.18) * 0.09).toString(), // (Amount / 1.18) * 0.09
                            entryType: 'C',
                            unique: false
                        },
                        {
                            ucc: '999955SG',
                            amount: ((totalAmount / 1.18) * 0.09).toString(), // (Amount / 1.18) * 0.09
                            entryType: 'C',
                            unique: false
                        }
                    ],
                    transactionDate: new Date(),
                    exchange: exchange,      // 'FON' OR 'MCX'- developer console use case=> exchange = req.limit_type === "S" ? "FON" : "MCX";
                    book: 'DN17',            // book code for developer console is DN17
                    type: 'DN',
                    narration: narration,    // pass narration as per developer console use case
                    de: 61,                  // DE value for developer console is 61
                    mode: null,
                    externalReferenceId: 'DCS-' + user_id, //pass your own unique reference id upto 50 characters 
                    username: 'DEVCONSOLE'
                }
            ]
        });
        console.log('createLedgerEntryV2 | response:: ' + JSON.stringify(response));
        return response;
    } catch (error) {
        console.log('createLedgerEntryV2 | error:: ' + JSON.stringify(error));
        return error;
    }
}

/**
 * @param {string} user_id
 * @param {number} totalAmount
 * @param {string} narration
 * @param {string} exchange
 */
async function createLedgerEntryV2WithIGST(user_id, totalAmount, narration, exchange) {
    //If the customer's correspondence address state is not Maharashtra then IGST is to be applied

    try {
        const response = await AsyncService.createLedgerEntryV2({
            metaData: {
                requestId: generateRequestId(),
                consumerService: 'DC_SRVC', //confirm this value with backoffice service team, for testing this value was set as GROWTH_SERVICE
                requestTime: new Date()
            },
            ledgerEntries: [
                {
                    data: [
                        {
                            ucc: user_id, //UCC of the client
                            amount: (totalAmount).toString(),                           //Amount to be charged
                            entryType: 'D',
                            unique: false           // need to confirm this 
                        },
                        {
                            ucc: '999806',
                            amount: (totalAmount / 1.18).toString(),                    //Amount / 1.18   
                            entryType: 'C',
                            unique: false
                        },
                        {
                            ucc: '999955SG',
                            amount: ((totalAmount / 1.18) * 0.18).toString(),           // (Amount / 1.18) * 0.18
                            entryType: 'C',
                            unique: false
                        }
                    ],
                    transactionDate: new Date(),
                    exchange: exchange,            //'FON' OR 'MCX'- developer console use case=> exchange = req.limit_type === "S" ? "FON" : "MCX";
                    book: 'DN17',                  //book code for developer console is DN17
                    type: 'DN',
                    narration: narration,          //pass narration as per developer console use case
                    de: 61,                        //DE value for developer console is 61
                    mode: null,
                    externalReferenceId: 'DCS-' + user_id, //pass your own unique reference id upto 50 characters 
                    username: 'DEVCONSOLE'
                }
            ]
        });
        console.log('createLedgerEntryV2 | response:: ' + JSON.stringify(response));
        return response;
    } catch (error) {
        console.log('createLedgerEntryV2 | error:: ' + JSON.stringify(error));
        return error;
    }
}

/**
 * @param {string} ucc
 * @param {string} requestId
 */
async function getUserProfile(ucc, requestId) {
    let METHOD_NAME = "[getUserProfile] - ";
    try {
        const userProfile = await profileService.rpcGetUserProfile({
            requestId,
            identifier: {
                value: ucc,
                refType: ProfileService.ProfileRefType.UCC
            },
            outputFlagList: [
                ProfileService.OutputFlag.USER_ADDRESS
            ],
            customerStatusList: []
        });
        let state = userProfile.data.userAddressList[1].state;          // type-2 address is taken here, if needs type-1, userAddressList[0] can use instead.
        console.log(`${METHOD_NAME}State of user from User-Info-Service :: ${userProfile.data.userAddressList[0].state}`);
        return state;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * @param {string} user_id
 * @param {string} appType
 * @param {string} paymentRequest
 * @param {string} serviceName
 * @param {string} appId
 * @param {{ ledgerBalance: any; virtualCredits?: number; couponCredits?: number; }} debitFrom
 * @param {string} paymentDescription
 * @param {number} expiry
 * @param {string} exchange
 */
async function ledgerPayments(user_id, appType, paymentRequest, serviceName, appId, debitFrom, paymentDescription, expiry, exchange) {
    let METHOD_NAME = "[ledgerPayments] - ";
    let amountIn = debitFrom.ledgerBalance + debitFrom.virtualCredits + debitFrom.couponCredits;
    let discount;
    if (debitFrom.ledgerBalance === 0) {
        discount = debitFrom.ledgerBalance + debitFrom.virtualCredits + debitFrom.couponCredits
    } else {
        discount = debitFrom.virtualCredits + debitFrom.couponCredits;
    }
    switch (paymentRequest) {
        case Constants.PAYMENT_REQUEST_TYPE.INSTANT_CREATE:
            var debitType = 'I'; // Instant Create
            var totalAmount = debitFrom.ledgerBalance;    // Amount to be deducted in total from ledger
            let paymentMsg = paymentDescription;
            console.log(`Total amount being passed to ledger-entry:: ${totalAmount}`);
            var narration = paymentMsg ? Constants.PAYMENT_MESSAGE + paymentMsg : " instant subscription";
            console.log(`Narration in Instant Create:: ${narration}`);
            var refId = serviceName ? appId + "|" + serviceName : appId;

            // Get state from profileService-grpc by passing user_id and reqId
            var reqId = generateRequestId();
            var state = await getState(user_id, reqId);
            console.log(`${METHOD_NAME} State of user returned from User-Info-Service to ledger payment method:: ${state}`);

            const logPrefix = `createBackOfficeLedgerEntryForAppSubscription | Ucc=[${user_id}] requestId=[${reqId}]`;
            console.log(METHOD_NAME + " Sending request to auto debit back-office-service with narration - " + narration);
            if (state === "MAHARASHTRA") {
                try {
                    const paymentResponse = await createLedgerEntryV2WithSGST(user_id, totalAmount, narration, exchange);
                    // console.log(`${METHOD_NAME}Payment Response from back-office-service REST call::${JSON.stringify(paymentResponse)}`);
                    if (paymentResponse && paymentResponse.metadata.responseCode === 201) {
                        console.log(`${METHOD_NAME}| ${logPrefix}| back-office-service ledger entry request accepted | response=[${JSON.stringify(paymentResponse.data)}]`);
                        return debitFrom;
                    }
                    else {
                        console.log(`${METHOD_NAME}| ${logPrefix}| | back-office-service ledger entry invoked | unknown response | response=[${JSON.stringify(paymentResponse)}]`);
                        // TODO - retry for payment
                        return paymentResponse;
                    }
                }
                catch (err) {
                    console.log(`${logPrefix} | back-office-service call failed | err=[${err}]`);
                    throw err;
                }
            }
            else {
                try {
                    const paymentResponse = await createLedgerEntryV2WithIGST(user_id, totalAmount, narration, exchange);
                    // console.log(`${METHOD_NAME}Payment Response from back-office-service REST call::${JSON.stringify(paymentResponse)}`);
                    if (paymentResponse && paymentResponse.metadata.responseCode === 201) {
                        console.log(`${METHOD_NAME}| ${logPrefix}| back-office-service ledger entry request accepted | response=[${JSON.stringify(paymentResponse.data)}]`);
                        return debitFrom;
                    }
                    else {
                        console.log(`${METHOD_NAME}| ${logPrefix}| | back-office-service ledger entry invoked | unknown response | response=[${JSON.stringify(paymentResponse)}]`);
                        // TODO - retry for payment
                        return paymentResponse;
                    }
                }
                catch (err) {
                    console.log(`${logPrefix} | back-office-service call failed | err=[${err}]`);
                    throw err;
                }
            }
        case Constants.PAYMENT_REQUEST_TYPE.INSTANT_RENEWAL:
            console.log(METHOD_NAME + Constants.PAYMENT_REQUEST_TYPE.INSTANT_RENEWAL);
            var refId = serviceName ? appId + "|" + serviceName : appId;
            debitType = "I";    // Instant Renewal
            switch (appType) {
                case Constants.APP_TYPE_ALGO_TRADING:
                    paymentDescription = serviceName;
                    break;
                case Constants.APP_TYPE_MARKET_FEED_DATA:
                    serviceName = null;
                    paymentDescription = "Market Feed Data";
                    break;
                case Constants.APP_TYPE_BROKER:
                    serviceName = null;
                    paymentDescription = "Interactive Bridge";
                    break;
            }
            narration = "auto renewal of app - " + paymentDescription;
            if (!narration) {
                paymentDescription = "auto renewal of " + paymentDescription + ' subscription.';
                narration = paymentDescription;
            } else {
                paymentDescription = narration;
            }
            var totalAmount = debitFrom.ledgerBalance;    // Amount to be deducted in total from ledger
            console.log(`total amount being passed to ledger-entry:: ${totalAmount}`);
            console.log(`Narration in Instant Renewal:: ${narration}`);

            // Get state from profileService-grpc by passing user_id and reqId
            reqId = generateRequestId();
            state = await getState(user_id, reqId);
            console.log(`${METHOD_NAME} State of user returned from User-Info-Service to ledger payment method:: ${state}`);

            console.log(METHOD_NAME + "Sending request to auto debit back-office-service with narration - " + narration);
            if (state === "MAHARASHTRA") {
                const paymentResponse = await createLedgerEntryV2WithSGST(user_id, totalAmount, narration, exchange);
                console.log(`${METHOD_NAME}Payment Response from back-office-service REST call::${JSON.stringify(paymentResponse)}`);
                if (paymentResponse && paymentResponse.metadata.responseCode === 201) {
                    // return paymentResponse.data;
                    console.log(`${METHOD_NAME}debitFrom after successful payment :: ${JSON.stringify(debitFrom)}`);
                    return debitFrom;
                }
                else {
                    console.log(METHOD_NAME + "Error in auto debit callback  - " + JSON.stringify(paymentResponse));
                    // TODO - auto renewal failed and need to create new debit request
                    return paymentResponse;
                }
            }
            else {
                const paymentResponse = await createLedgerEntryV2WithIGST(user_id, totalAmount, narration, exchange);
                console.log(`${METHOD_NAME}Payment Response from back-office-service REST call::${JSON.stringify(paymentResponse)}`);
                if (paymentResponse && paymentResponse.metadata.responseCode === 201) {
                    // return paymentResponse.data;
                    console.log(`${METHOD_NAME}debitFrom after successful payment :: ${JSON.stringify(debitFrom)}`);
                    return debitFrom;
                }
                else {
                    console.log(METHOD_NAME + "Error in auto debit callback  - " + JSON.stringify(paymentResponse));
                    // TODO - auto renewal failed and need to create new debit request
                    return paymentResponse;
                }
            }
        case Constants.PAYMENT_REQUEST_TYPE.INSTANT_AND_UPDATE:
            console.log(METHOD_NAME + Constants.PAYMENT_REQUEST_TYPE.INSTANT_AND_UPDATE);
            var refId = serviceName ? appId + "|" + serviceName : appId;
            debitType = "R";         // Renewal and Update
            let startFrom = generateDateForAutoDebit(expiry);
            narration = "Renewal and update - " + paymentDescription + "subscription for 30 days from today until" + startFrom;
            totalAmount = debitFrom.ledgerBalance;    // Amount to be deducted in total from ledger
            console.log(`total amount being passed to ledger-entry:: ${totalAmount}`);

            // Get state from profileService-grpc by passing user_id and reqId
            reqId = generateRequestId();
            state = await getState(user_id, reqId);
            console.log(`${METHOD_NAME} State of user returned from User-Info-Service to ledger payment method:: ${state}`);

            console.log(`Narration in Instant Update:: ${narration}`);
            console.log(METHOD_NAME + "Sending request to auto debit back-office-service with narration - " + narration);
            if (state === "MAHARASHTRA") {
                const paymentResponse = await createLedgerEntryV2WithSGST(user_id, totalAmount, narration, exchange);
                console.log(`${METHOD_NAME}Payment Response from back-office-service REST call::${JSON.stringify(paymentResponse)}`);
                if (paymentResponse && paymentResponse.metadata.responseCode === 201) {
                    // return paymentResponse.data;
                    console.log(`${METHOD_NAME} debitFrom after successful payment :: ${JSON.stringify(debitFrom)}`);
                    return debitFrom;
                }
                else {
                    console.log(METHOD_NAME + "Error in auto debit callback  - " + JSON.stringify(paymentResponse));
                    // TODO - update failed and need to retry
                    return paymentResponse;
                }
            }
            else {
                const paymentResponse = await createLedgerEntryV2WithIGST(user_id, totalAmount, narration, exchange);
                console.log(`${METHOD_NAME}Payment Response from back-office-service REST call::${JSON.stringify(paymentResponse)}`);
                if (paymentResponse && paymentResponse.metadata.responseCode === 201) {
                    // return paymentResponse.data;
                    console.log(`${METHOD_NAME} debitFrom :: ${JSON.stringify(debitFrom)}`);
                    return debitFrom;                       // confirm whether this debiFrom has got deduction from ledger-balance, if responseCode is 201
                }
                else {
                    console.log(METHOD_NAME + "Error in auto debit callback  - " + JSON.stringify(paymentResponse));
                    // TODO - update failed and need to retry
                    return paymentResponse;
                }
            }
        case Constants.PAYMENT_REQUEST_TYPE.RENEW_CALLBACK:
            console.log(METHOD_NAME + Constants.PAYMENT_REQUEST_TYPE.RENEW_CALLBACK);
            return debitFrom;
    }
}

let appId = uuid.v4();
console.log(appId);
let today = new Date();
let xpiry = today.setMonth(today.getMonth() + 1);
let debitFrom = {
    ledgerBalance: 20,
    virtualCredits: 0,
    couponCredits: 0
};

// call ledgerPayments method with necessary arguments and run the file for test
ledgerPayments("4EAYWS", "Algotrading", "INSTANT_RENEWAL", "interactive", appId, debitFrom, "Interactive Subscription", xpiry, "FON");

const _extractRewardIdFromReference = (externalReferenceId) => {
    if (!externalReferenceId.startsWith(BACKOFFICE_LEDGER_CONSTANTS.EXTERNAL_REFERENCE_ID_PREFIX)) {
        console.log(`Invalid externalReferenceId | externalReferenceId=[${externalReferenceId}]`);
        return null;
    }
    return +externalReferenceId.substring(BACKOFFICE_LEDGER_CONSTANTS.EXTERNAL_REFERENCE_ID_PREFIX.length);
};

const processLedgerEntrySuccessCallback = async (message) => {
    const trId = uuid.v4();
    let logPrefix = `processLedgerEntrySuccessCallback | trkId=[${trId}]`;

    // TODO confirm with back office team if there is a usecase for data array having multiple elements
    const externalReferenceId = _.get(message, "data.0.externalReferenceId");           // On success, get the externalReferenceId from the message on queue

    if (!externalReferenceId) {
        console.log(`${logPrefix} | Ledger entry callback handler failed | externalReferenceId not found in message | message=[${JSON.stringify(message)}]`);
        return;
    }

    logPrefix += ` externalReferenceId=[${externalReferenceId}]`;
    const clientReferralId = _extractRewardIdFromReference(externalReferenceId);
    console.log(`clientReferralId extracted from externalReferenceId is : ${clientReferralId}`);
    if (clientReferralId != null) {
        console.log(`${logPrefix} | processed successfully`);
        return clientReferralId;
    }
    else {
        console.log(`${logPrefix} | process failed`);
        return false;
    }
};

const processLedgerEntryFailureCallback = async (message) => {
    const trId = uuid.v4();
    let logPrefix = `processLedgerEntryFailureCallback | trkId=[${trId}]`;

    // TODO confirm with back office team if there is a usecase for errors array having multiple elements
    const externalReferenceId = _.get(message, "errors.0.externalReferenceId");

    if (!externalReferenceId) {
        console.log(`${logPrefix} | Ledger entry callback handler failed | externalReferenceId not found in message | message=[${JSON.stringify(message)}]`);
        return;
    }

    logPrefix += ` externalReferenceId=[${externalReferenceId}]`;
    const clientReferralId = _extractRewardIdFromReference(externalReferenceId);
    console.log(`clientReferralId extracted from externalReferenceId is : ${clientReferralId}`);
    if (clientReferralId != null) {
        // any step to be done here ?
        console.log(`${logPrefix} | processed successfully`);
        return clientReferralId;
    }
    else {
        
        console.log(`${logPrefix} | process failed`);
        return false;
    }
};

module.exports.ledgerPayments = ledgerPayments;
module.exports.processLedgerEntrySuccessCallback = processLedgerEntrySuccessCallback;
module.exports.processLedgerEntryFailureCallback = processLedgerEntryFailureCallback;