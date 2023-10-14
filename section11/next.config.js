const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                mongodb_username:'yuju0903',
                mongodb_password:'T3llsCsHh9UAAmTJ',
                mongodb_clustername: 'cluster0',
                mongodb_database: 'my-site-dev',
            }
        };
    }
    return {
    env: {
        mongodb_username:'yuju0903',
        mongodb_password:'T3llsCsHh9UAAmTJ',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'my-site',
    }
}
};
