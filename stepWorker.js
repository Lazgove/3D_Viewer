// stepWorker.js
import occtimportjs from 'occt-import-js';

const wasmUrl = 'https://cdn.jsdelivr.net/npm/occt-import-js@0.0.12/dist/occt-import-js.wasm';

let occtInitialized = false;
let occt;

async function initializeOcct() {
    if (!occtInitialized) {
        occt = await occtimportjs({
            locateFile: () => wasmUrl,
        });
        occtInitialized = true;
    }
}

self.onmessage = async (event) => {
    const { fileBuffer } = event.data;

    await initializeOcct();

    // Read the imported step file
    const result = occt.ReadStepFile(fileBuffer);
    
    // Send the result back to the main thread
    self.postMessage(result);
};
