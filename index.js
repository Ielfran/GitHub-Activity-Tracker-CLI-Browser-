#!/usr/bin/env node

const https = require('https');
const { Command } = require('commander');
const chalk = require('chalk');

const program = new Command();

program
    .name('github-activity-tracker')
    .description('This is a CLI to fetch recent public GitHub activity for a user.')
    .version('1.0.0')
    .argument('<username>', 'GitHub username')
    .action(main);

function fetchUserActivity(username) {
    const options = {
        hostname: 'api.github.com',
        path: `/users/${username}/events/public`,
        method: 'GET',
        headers: {
            'User-Agent': 'NodeJS-GitHub-Activity-App',
            'Accept': 'application/vnd.github+json',
        },
    };

    return new Promise((resolve, reject) => {
        https.get(options, res => {
            if (res.statusCode === 404) return reject(new Error(`User not found: ${username}`));
            if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));

            let data = '';
            res.setEncoding('utf8');
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error(`Parse error: ${e.message}`));
                }
            });
        }).on('error', e => reject(new Error(`Network error: ${e.message}`)));
    });
}

function displayActivity(username, events) {
    console.log(chalk.bold.underline(`\nRecent activity for ${chalk.green(username)}:\n`));

    if (!events.length) {
        console.log(chalk.grey('    No recent public events.'));
        return;
    }

    events.slice(0, 15).forEach(event => {
        const repo = chalk.cyan(event.repo.name);
        let msg;

        switch (event.type) {
            case 'PushEvent':
                const cnt = event.payload.size;
                msg = `${chalk.green('Pushed')} ${cnt} commit${cnt === 1 ? '' : 's'} to ${repo}`;
                break;
            case 'WatchEvent':
                msg = `${chalk.yellow('Starred')} ${repo}`;
                break;
            case 'CreateEvent':
                msg = chalk.blue(`Created new ${event.payload.ref_type} in ${repo}`);
                break;
            case 'IssueEvent':
            case 'PullRequestEvent':
                const action = event.payload.action;
                msg = chalk.magenta(`${action.charAt(0).toUpperCase() + action.slice(1)} in ${repo}`);
                break;
            case 'ForkEvent':
                msg = `${chalk.blue('Forked')} ${repo} to ${chalk.cyan(event.payload.forkee.full_name)}`;
                break;
            default:
                msg = chalk.gray(`Did a ${event.type} on ${repo}`);
        }
        console.log(`- ${msg}`);
    });
}

async function main(username) {
    console.log(chalk.yellow(`Fetching activity for ${username}...`));
    try {
        const events = await fetchUserActivity(username);
        displayActivity(username, events);
    } catch (err) {
        console.error(chalk.red.bold(`Error: ${err.message}`));
        process.exit(1);
    }
}

program.parse(process.argv);
