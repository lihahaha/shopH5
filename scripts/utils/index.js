const webpack = require('webpack');
const path = require('path');
const HappyPack = require('happypack');
const fs = require('fs-extra');
const os = require('os');
const _ = require('lodash');
const Config = require('../config');


const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 });
const isDev = process.env.NODE_ENV !== 'production';
const chunkHash = isDev ? '' : '_[chunkhash:8]';
const contentHash = isDev ? '' : '_[contentHsh:8]';
const cwd = process.cwd();

const { mapKeys, mapValues } = _;
const { branchEnvMap, publishPath, domains, localPublishPath } = Config;

function resolveCwd(...args) {
    return path.resolve(cwd, ...args);
}

function resolveDir(...args) {
    return path.resolve(__dirname, ...args);
}

function getBranch() {
    let branchEnv = process.env.CURRENT_BRANCH;
    if (branchEnv) {
        return branchEnv;
    }
    // js执行的文件路径
    const branchArg = process.argv.find(arg => arg.indexOf('branch') === 0);;
    if (branchArg) {
        branchEnv = branchArg.split('=').pop();
        if (branchEnv) {
            return branchEnv;
        }
    }

    try {
        branchEnv = fs
            .readFileSync(resolveCwd('.git/HEAD'), 'utf-8')
            .trim()
            .split('/')
            .pop();

        return branchEnv;
    } catch (e) {
        return '';
    }
}

const branch = getBranch();

function getLocalServer() {
    return localPublishPath;
}

function getPublishServer() {
    // if (isDev) {
    //     return getLocalServer();
    // }
    return `${publishPath[branch]}-${branch}`;
}

function getDefined() {
    const branchDomains = domains[branch] || domains.live;
    // const DOMAIN = mapValues(mapKeys(branchDomains, (v, k) => {

    // }))

    return {
        DOMAIN: JSON.stringify('DOMAIN'),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.CURRENT_BRANCH': JSON.stringify(branch),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        _DEV_: isDev
    }
}


module.exports = {
    isDev,
    resolveCwd,
    branch,
    resolveDir,
    getLocalServer,
    getPublishServer,
    getDefined,
    chunkHash,
    contentHash
}