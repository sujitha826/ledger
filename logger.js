var { createLogger, Logger, LoggerSettings } = require("@upstox/upstox-node-logger");


const getLogger = () => {
    const loggerSettings = {
        console: {
            minLevel: 'silly'
        },
        file: {
            minLevel: 'debug',
            maxFileSize: '5g'
        },
        auditSeparator: '|'
    }
    return createLogger(loggerSettings).logger;
}

const logger = getLogger();
module.exports = logger;