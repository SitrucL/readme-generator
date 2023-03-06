import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: "~/Code/Personal/readme-bot/.env" });
const OPENAI_KEY = process.env.OPENAI_KEY;

const config = new Configuration({
    apiKey: OPENAI_KEY
});
const currentDir = process.cwd();

const rootFiles = fs.readdirSync(`${currentDir}/`).join(" ");
const srcFiles = fs.readdirSync(`${currentDir}/src`).join(" /src/");
export const generateREADME = async () => {
    try {
        const allFiles = rootFiles.concat(srcFiles);

        const openai = new OpenAIApi(config);
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Generate me a readme file in markdown based on the given list of file names ${allFiles}. You should be able to, create a title & description of what the project does, generate instructions for installation, running testing and have mention of any additional scripts in the package json. Should also mention any .env keys the user needs to add. Do not use the file names in the README just use them to make an assumption on what the project is. `
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
        console.log("error generating README: ", error);
    }
};

const generatedREADME = await generateREADME();

if (!generatedREADME) throw new Error("no README generated");

console.log("currentDir: ", currentDir);
fs.writeFile(`${currentDir}/README.md`, generatedREADME, function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
});
