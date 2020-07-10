module.exports = {
    publishPath: {
        master: 'cdnmaster',
        live: 'cdnlive'
    },
    localPublishPath: 'http://localhost:3000/',
    branchEnvMap: {
        master: 'online',
        live: 'live'
    },
    domains: {
        live: {
            ORIGIN_DOMAIN: '//'
        },
        master: {
            ORIGIN_DOMAIN: '//'
        }
    }
}