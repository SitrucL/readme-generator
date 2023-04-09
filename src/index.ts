import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: "~/Code/Personal/readme-bot/.env" });
const OPENAI_KEY = process.env.OPENAI_KEY;

const config = new Configuration({
    apiKey: OPENAI_KEY
});
const currentDir = process.cwd();

const packageJSONInfo = JSON.parse(fs.readFileSync(`${currentDir}/package.json`, "utf8"));

function getFilesRecursively(directoryPath: string): string[] {
    const files = [];

    const fileNames = fs.readdirSync(directoryPath);

    for (const fileName of fileNames) {
        if (fileName.startsWith(".") || fileName === "node_modules" || fileName === "ios" || fileName === "android" || fileName === "vendor") {
            continue;
        }

        const filePath = path.join(directoryPath, fileName);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isDirectory()) {
            files.push(...getFilesRecursively(filePath));
        } else {
            files.push(filePath);
        }
    }

    return files;
}

const allFiles = getFilesRecursively(`${currentDir}/`).join(" ");
console.log("allFiles: ", allFiles);

export const generateREADME = async () => {
    try {
        // const allFiles = rootFiles.concat(srcFiles, " ");
        const scripts = JSON.stringify(packageJSONInfo.scripts);
        // console.log("scripts: ", scripts);

        const openai = new OpenAIApi(config);
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {
                    role: "user",
                    content: `Generate me a readme file in markdown based on the given list of file names ${allFiles}. You should be able to, create a title & description of what the project does, generate instructions for installation, running testing and have mention of any additional scripts in the package json: ${scripts}. Should also mention any .env keys the user needs to add. Do not use the file names in the README just use them to make an assumption on what the project is. Your README should include a clear and concise title and description of the project, as well as instructions for installation, running tests, and any additional scripts in the package json. Please refrain from using the file names in the README to infer the project description, and instead rely on the provided project purpose or use case. `
                    // content: `Generate a README file in markdown for a project that is designed to [insert project purpose or use case here]. The project contains the following files: [insert list of file names here]. Your README should include a clear and concise title and description of the project, as well as instructions for installation, running tests, and any additional scripts in the package json. Please also mention any necessary .env keys that the user needs to add. Please refrain from using the file names in the README to infer the project description, and instead rely on the provided project purpose or use case.`
                }
            ],
            temperature: 0,
            frequency_penalty: 0.25
        });

        let result = response.data.choices[0].message?.content;
        if (!result) return;

        // Remove dots and newlines from the start of the code
        while (result.charAt(0) == "." || result.charAt(0) == "," || result.charAt(0) == "\n") {
            result = result.substring(1);
        }

        return result;
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log("error generating README: ", error.response.data!);
    }
};

const generatedREADME = await generateREADME();

if (!generatedREADME) throw new Error("no README generated");

fs.writeFile(`${currentDir}/README.md`, generatedREADME, function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
});
