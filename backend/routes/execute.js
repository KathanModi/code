const express = require('express');
const router = express.Router();
const Docker = require('dockerode');
const docker = new Docker();

router.post('/', async (req, res) => {
    const { code, language } = req.body;

    try {
        const output = await executeCodeInDocker(code, language);
        res.status(200).json({ output });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const executeCodeInDocker = (code, language) => {
    return new Promise((resolve, reject) => {
        const containerConfig = {
            Image: 'node:14', // Use Node.js Docker image
            Tty: false,
            Cmd: ['node', '-e', code], // Run the code in Node.js
        };

        docker.createContainer(containerConfig, (err, container) => {
            if (err) return reject(err);

            container.start((err, data) => {
                if (err) return reject(err);

                container.logs({ stdout: true, stderr: true }, (err, stream) => {
                    if (err) return reject(err);

                    let result = '';
                    stream.on('data', (chunk) => {
                        result += chunk.toString();
                    });

                    stream.on('end', () => {
                        resolve(result);
                        container.remove(); // Clean up container
                    });
                });
            });
        });
    });
};

module.exports = router;