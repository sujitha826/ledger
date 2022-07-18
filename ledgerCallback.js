// @ts-check
const stompit = require('stompit');
const main = require("./main");
var _ = require('lodash');
var logger = require("./logger");

const sync () => {
  const activeMQClient = stompit.Client;
  _subscribe(activeMQClient);
}; message broker act between producer and consumer
// message should follow some specific format(head/ decoupled and asynchronous communication between producer and consumer
//mpit is
// broadca

const ACTIVE_MQ_CONFIG = {
  FIRST_TRADE_EVENT_QUEUE: {
    subscribeHeaders: {
      destination: "referearnservice.first-trade-reward.queue", // change this
      ack: "client-individual"
    }
  },
  LEDGER_CALLBACK_EVENT_QUEUE: {
    subscribeHeaders: {
      destination: "dc_ldgr_q",                                // queue name here
      ack: "client-individual",
      "activemq.exclusive": true,
      "activemq.prefetchSize": 1
    }
  }
};

const _subscribe = (client) => {
  const subscribeHeaders = ACTIVE_MQ_CONFIG.LEDGER_CALLBACK_EVENT_QUEUE.subscribeHeaders;
  const logPrefix = `LedgerCallbackEventConsumer`;

  client.subscribe(subscribeHeaders, (error, message) => {
    if (error) {
      console.log(`${logPrefix} | Error subscribing through client | [${error}] [${error.stack}]`);
      return;
    }

    message.readString("utf-8", async (error, messageString) => {
      if (error) {
        console.log(`${logPrefix} | Error while reading data stream [${error}] [${error.stack}]`);
        client.nack(message);
        return;
      }

      if (!messageString) {
        console.log(`${logPrefix} | Empty message received`);
        client.ack(message);
        return;
      }

      try {
        const paramsFromQueue = JSON.parse(messageString);
        const isParamsValid = _validateParams(paramsFromQueue);

        if (!isParamsValid) {
          console.log(`${logPrefix} | Invalid params received | params=[${JSON.stringify(paramsFromQueue)}]`);
          client.ack(message);
          return false;
        }

        await _processEvent(paramsFromQueue);

        client.ack(message);
      } catch (error) {
        console.log(`${logPrefix} | Error processing ledger callback | message=[${messageString}] err=[${error}] [${error.stack}]`);
        client.ack(message);
      }
    });

  });
};

const _validateParams = (paramsFromQueue) => {
  return paramsFromQueue.data || paramsFromQueue.errors;
};

const _processEvent = async (paramsFromQueue) => {
  if (_.get(paramsFromQueue, "errors.0")) {
    return await main.processLedgerEntryFailureCallback(paramsFromQueue);
  }
  return await main.processLedgerEntrySuccessCallback(paramsFromQueue);
};


module.exports.init = init;