const core = require('@actions/core');
const github = require('@actions/github');

const validEvents = ['pull_request', 'push'];

function getBranchName(eventName, payload) {
    let branchName;

    switch (eventName) {
        case 'pull_request':
            branchName = payload.pull_request.head.ref;
            break;
        case 'push':
            branchName = payload.ref.replace('refs/heads/', '');
            break;
        default:
            throw new Error('Unsupported event: ${eventName}');
    }

    return branchName;
}

async function runValidation() {
    try {
        const eventName = github.context.eventName;
        const payload = github.context.payload;
        const branchName = getBranchName(eventName, github.context.payload);
        
        // Get inputs
        const branchMain = core.getInput('branch_main');
        const branchDevelop = core.getInput('branch_develop');
        const prefixFeature = core.getInput('prefix_feature');
        const prefixHotfix = core.getInput('prefix_hotfix');
        const prefixAlign = core.getInput('prefix_align');

        // If not main or develop branch
        if (branchName != branchMain && branchName != branchDevelop) {
            // Check if the branch starts with a valid prefix
            core.info(`Validating prefixes of branch. Allowed prefixes: ${prefixFeature}, ${prefixHotfix}, ${prefixAlign}`);
            if (!branchName.startsWith(prefixFeature) && !branchName.startsWith(prefixHotfix) && !branchName.startsWith(prefixAlign)) {
                core.setFailed(`Branch ${branchName} is not valid. Did not match any of the allowed prefixes: ${prefixFeature}, ${prefixHotfix}, ${prefixAlign}`);
                return;
            }

            // Check if branch is heading in the right direction

            if (payload.base.ref = '') {

            }
        }

        // core.info(`Branch name: ${branchName}`);
        
        // Check if branch is to be ignored
        // const ignore = core.getInput('ignore');
        // if (ignore.length > 0 && ignore.split(',').some((el) => branchName === el)) {
        //     core.info(`Skipping checks since ${branchName} is in the ignored list - ${ignore}`);
        //     return;
        // }

        // Check if branch pass regex
        // const regex = RegExp(core.getInput('regex'));
        // core.info(`Regex: ${regex}`);
        // if (!regex.test(branch)) {
        //     core.setFailed(`Branch ${branch} failed to pass match regex - ${regex}`);
        //     return;
        // }

        // Check if branch starts with a prefix
        const prefixes = core.getInput('allowed_prefixes');
        core.info(`Allowed Prefixes: ${prefixes}`);
        if (prefixes.length > 0 && !prefixes.split(',').some((el) => branch.startsWith(el))) {
            core.setFailed(`Branch ${branch} failed did not match any of the prefixes - ${prefixes}`);
            return;
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

runValidation();