import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const script_path = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
	// Write your code here
	spawn('node', [script_path, ...args], {
		stdio: [process.stdin, process.stdout, process.stderr],
	});
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);
