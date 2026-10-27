// CloudOps AutoDeploy - Interactive Pipeline & Terminal Controller

document.addEventListener('DOMContentLoaded', () => {
    // State definitions
    const pipelineData = {
        github: {
            chip: 'Selected: GitHub Repository',
            heading: 'GitHub Source Control (KrishChothani/devops-exam)',
            status: 'SYNCHRONIZED',
            badgeClass: 'badge-success',
            endpoint: 'https://github.com/KrishChothani/devops-exam.git',
            auth: 'GitHub Personal Access Token (Bearer PAT) / HTTPS',
            trigger: 'Git Push on branch "main" / Webhook event',
            artifact: 'Automated mirror / sync to AWS CodeCommit'
        },
        codecommit: {
            chip: 'Selected: AWS CodeCommit',
            heading: 'AWS CodeCommit Git Repository (devops-exam-repo)',
            status: 'AVAILABLE',
            badgeClass: 'badge-success',
            endpoint: 'https://git-codecommit.us-east-1.amazonaws.com/v1/repos/devops-exam-repo',
            auth: 'SigV4 AWS Credential Helper (aws codecommit credential-helper)',
            trigger: 'Amazon EventBridge / CodePipeline Source Polling (1 min)',
            artifact: 'arn:aws:codecommit:us-east-1:956420554301:devops-exam-repo'
        },
        codepipeline: {
            chip: 'Selected: AWS CodePipeline',
            heading: 'AWS CodePipeline Orchestrator (devops-exam-pipeline)',
            status: 'ACTIVE / LISTENING',
            badgeClass: 'badge-accent',
            endpoint: 'arn:aws:codepipeline:us-east-1:956420554301:devops-exam-pipeline',
            auth: 'IAM Role: arn:aws:iam::956420554301:role/PipelineRole',
            trigger: 'Automated source change detection in CodeCommit',
            artifact: 'Stores artifacts in S3 bucket: devops-exam-artifacts-956420554301'
        },
        s3: {
            chip: 'Selected: Amazon S3 Hosting',
            heading: 'Amazon S3 Static Cloud Storage (devops-exam-site)',
            status: 'DEPLOYED & LIVE',
            badgeClass: 'badge-success',
            endpoint: 's3://devops-exam-site-956420554301 (Region: us-east-1)',
            auth: 'CodePipeline S3 Deployer / Scoped IAM Policy',
            trigger: 'CodePipeline Stage 2 Action (Extract: true)',
            artifact: 'Live static assets (index.html, style.css, script.js)'
        }
    };

    // Node selection
    const nodes = document.querySelectorAll('.pipeline-node');
    const chipEl = document.getElementById('detail-chip');
    const headingEl = document.getElementById('detail-heading');
    const statusEl = document.getElementById('detail-status');
    const endpointEl = document.getElementById('detail-endpoint');
    const authEl = document.getElementById('detail-auth');
    const triggerEl = document.getElementById('detail-trigger');
    const artifactEl = document.getElementById('detail-artifact');

    function selectNode(nodeKey) {
        nodes.forEach(n => n.classList.remove('active'));
        const targetNode = document.querySelector(`[data-node="${nodeKey}"]`);
        if (targetNode) targetNode.classList.add('active');

        const data = pipelineData[nodeKey];
        if (!data) return;

        chipEl.textContent = data.chip;
        headingEl.textContent = data.heading;
        statusEl.textContent = data.status;
        statusEl.className = `detail-status-badge badge ${data.badgeClass}`;
        endpointEl.textContent = data.endpoint;
        authEl.textContent = data.auth;
        triggerEl.textContent = data.trigger;
        artifactEl.textContent = data.artifact;
    }

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const key = node.getAttribute('data-node');
            selectNode(key);
        });
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('theme-light');
    });

    // Terminal Controller
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const terminalSend = document.getElementById('terminal-send');
    const btnClearTerm = document.getElementById('btn-clear-term');
    const btnReplayTerm = document.getElementById('btn-replay-term');
    const btnTriggerDeploy = document.getElementById('btn-trigger-deploy');
    const progressBar = document.getElementById('pipeline-progress');

    function getTimestamp() {
        const now = new Date();
        return `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
    }

    function appendLog(type, message) {
        const line = document.createElement('div');
        line.className = `log-line ${type}`;
        line.innerHTML = `<span class="log-ts">${getTimestamp()}</span> ${message}`;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function runDeploymentSimulation() {
        appendLog('highlight', '🚀 [SIMULATION START] Initiating automated CI/CD deployment cycle...');
        btnTriggerDeploy.disabled = true;
        btnTriggerDeploy.style.opacity = '0.6';

        const stages = [
            { key: 'github', progress: '25%', log: '[STAGE 1: GITHUB] Developer pushed commit to "main" (sha: 7f3a9b1) on KrishChothani/devops-exam' },
            { key: 'codecommit', progress: '50%', log: '[STAGE 2: CODECOMMIT] Synchronized commit to AWS CodeCommit repo: devops-exam-repo' },
            { key: 'codepipeline', progress: '75%', log: '[STAGE 3: CODEPIPELINE] CodePipeline triggered! Executing Stage: Source -> Deploy' },
            { key: 's3', progress: '100%', log: '[STAGE 4: S3 HOSTING] Deployed & extracted artifacts to S3 bucket devops-exam-site-956420554301!' }
        ];

        let i = 0;
        function nextStep() {
            if (i < stages.length) {
                const step = stages[i];
                selectNode(step.key);
                if (progressBar) progressBar.style.width = step.progress;
                appendLog('info', step.log);
                i++;
                setTimeout(nextStep, 1000);
            } else {
                appendLog('success', '🎉 [SUCCESS] Pipeline execution finished in 4.1s. All health checks PASSED.');
                btnTriggerDeploy.disabled = false;
                btnTriggerDeploy.style.opacity = '1';
                setTimeout(() => {
                    if (progressBar) progressBar.style.width = '0%';
                }, 2000);
            }
        }
        nextStep();
    }

    if (btnTriggerDeploy) btnTriggerDeploy.addEventListener('click', runDeploymentSimulation);
    if (btnReplayTerm) btnReplayTerm.addEventListener('click', runDeploymentSimulation);

    if (btnClearTerm) {
        btnClearTerm.addEventListener('click', () => {
            terminalOutput.innerHTML = '';
            appendLog('info', 'Console cleared. Terminal ready.');
        });
    }

    // Terminal Input CLI
    function handleTerminalCommand() {
        const cmd = terminalInput.value.trim().toLowerCase();
        if (!cmd) return;
        appendLog('highlight', `<span>$</span> ${terminalInput.value}`);
        terminalInput.value = '';

        switch (cmd) {
            case 'help':
                appendLog('info', 'Available commands: <strong>status</strong>, <strong>deploy</strong>, <strong>specs</strong>, <strong>repo</strong>, <strong>clear</strong>');
                break;
            case 'status':
                appendLog('success', 'STATUS: CodePipeline: OK | S3: OK | CodeCommit: OK | GitHub Sync: OK');
                break;
            case 'deploy':
                runDeploymentSimulation();
                break;
            case 'specs':
                appendLog('info', 'Target: devops-exam-site-956420554301 | Region: us-east-1 | Role: PipelineRole');
                break;
            case 'repo':
                appendLog('info', 'GitHub: https://github.com/KrishChothani/devops-exam');
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                appendLog('info', 'Console cleared.');
                break;
            default:
                appendLog('error', `Command not found: "${cmd}". Type "help" for a list of available commands.`);
        }
    }

    if (terminalSend && terminalInput) {
        terminalSend.addEventListener('click', handleTerminalCommand);
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleTerminalCommand();
        });
    }

    // Update build time
    const footerTime = document.getElementById('footer-build-time');
    if (footerTime) {
        const d = new Date();
        footerTime.textContent = `Last Build: ${d.toLocaleDateString()} ${d.toLocaleTimeString()} (Active)`;
    }
});
