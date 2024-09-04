import { Octokit } from "octokit";
import fs from "node:fs";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function getAllFilePaths(owner: string, repo: string, path:string = '') {
    const response = await octokit.request(`GET /repos/${owner}/${repo}/contents/${path}`, {
        owner,
        repo,
        path,
    });

    const filePaths: string[] = [];

    for (const item of response.data) {
        if (item.type === 'file') {
            const itemPath: string = item?.path as string;
            console.log({ itemPath });
            filePaths.push(itemPath);
        } else if (item.type === 'dir') {
            const subDirPaths = await getAllFilePaths(owner, repo, item.path);
            filePaths.push(...subDirPaths);
        }
    }

  return filePaths;
}

async function startReadingTheContent(owner: string, repo: string, path:string = '', fileName: string) {
    const response = await octokit.request(`GET /repos/${owner}/${repo}/contents/${path}`, {
        owner,
        repo,
        path,
    });
    console.log({ response });

    const buffer = Buffer.from(response.data.content, 'base64');

    fs.writeFile(`${fileName}`, buffer, { encoding: 'utf-8' }, (err) => {
        if (err) {
            console.error('Error writing file:', err);
          } else {
            console.log('File written successfully!');
        }
    })

}

async function main() {
    const owner = "";
    const repo = "";
    const allFilePaths = await getAllFilePaths(owner, repo);
    console.log({ allFilePaths });

    for (const file of allFilePaths) {
        const fileName: string = file.split('/').pop() as string;
        if (fileName.includes('.ts' || '.js')) {
            await startReadingTheContent(owner, repo, file, fileName);
        }
    }
}

main();