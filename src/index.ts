import { CodeLytic } from "./core/index.js";

const sourceFilePaths = [
    `../../lake/sample/**/*.ts`,
    `../../lake/sample-2/**/*.ts`   
]
const codeLytic = new CodeLytic(sourceFilePaths);

await codeLytic.getAnalytics();