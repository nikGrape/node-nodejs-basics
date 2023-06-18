import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import path from 'path';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __worker_filename = path.join(__dirname, 'worker.js');
const CPUs = os.cpus();

const performCalculations = async () => {
	// Write your code here
	const workers = Array.from(
		{ length: CPUs.length },
		(_, i) =>
			new Worker(__worker_filename, {
				workerData: { n: 10 + i },
			})
	);

	const promises = workers.map((worker) => {
		return new Promise((resolve, _) => {
			worker
				.on('message', (data) => {
					resolve({ status: 'resolved', data });
				})
				.on('error', (err) => {
					resolve({ status: 'error', data: null });
				});
		});
	});

	const results = (await Promise.allSettled(promises)).map((v) => v.value);

	console.log(results);
};

await performCalculations();
