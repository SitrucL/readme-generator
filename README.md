# WIP - README.md Generator

-   You'll need to edit `line 5` of `index.ts` with the path to this repo's `.env`

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
    -   [Running the Application](#running-the-application)
    -   [Running Tests](#running-tests)
    -   [Additional Scripts](#additional-scripts)
-   [Environment Variables](#environment-variables)
-   [Contributing](#contributing)

## Installation

To install the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/readme-bot.git
```

2. Navigate to the project directory:

```bash
cd readme-bot
```

3. Install the dependencies:

```bash
npm install
```

## Usage

In your terminal, navigate to a repo that you want to create a README.md for and then run the `index.ts` file using `ts-node` like so :

```
ts-node ~/GENERTIC_DIRECTORY/readme-bot/src/index.ts
```

(Creating an alias or function within your .zshrc or equaivalent is advised)

### Running the Application

To run the application, use the following command:

```bash
npm start
```

This will start the application using `node dist/src/app.js`.

### Running Tests

To run tests for the project, use the following command:

```bash
npm test
```

This will run tests using Jest with specific configurations.

### Additional Scripts

The project also includes several additional scripts to help maintain code quality and consistency:

-   **Development mode**: To run the application in development mode with live reloading, use `npm run dev`.
-   **Prettier**: To format your code using Prettier, use `npm run prettier`.
-   **Lint**: To lint your code using ESLint, use `npm run lint`.
-   **Validate**: To validate your code by running both linting and TypeScript compilation, use `npm run validate`.
-   **Format**: To format your TypeScript files using Prettier, use `npm run format`.
-   **Prepare**: To set up Husky for Git hooks, use `npm run prepare`.

## Environment Variables

You'll need to create a `.env` using the `.env.example` file and add your `OPENAI_KEY` to it

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please feel free to submit a pull request or open an issue with your
suggestions or improvements.
