import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const script_path = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
	// Write your code here
	const childProcess = spawn('node', [script_path, ...args], {
		stdio: ['pipe', 'pipe', process.stderr],
	});
	process.stdin.pipe(childProcess.stdin);
	childProcess.stdout.on('data', (data) => {
		process.stdout.write(data);
	});
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);
