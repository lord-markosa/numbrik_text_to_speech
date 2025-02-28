# My Node.js Project

This is a basic Node.js project that demonstrates how to set up a simple application with environment variables and npm package management.

This uses Azure Speech service.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Environment Variables](#environment-variables)
-   [License](#license)

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/lord-markosa/numbrik_text_to_speech.git
    ```

2. Navigate to the project directory:

    ```
    cd <whatever>
    ```

3. Install the dependencies:
    ```
    npm install
    ```

## Usage

To start the application, run the following command:

```
npm run fast
```

This will execute the `index.js` file located in the `src` directory.

## Environment Variables

Create a `.env` file in the root directory of the project and define your environment variables in the format `KEY=VALUE`. For example:

```
SPEECH_KEY = <YOUR_AZ_SPEECH_KEY>
SPEECH_REGION = <YOUR_AZ_SPEECH_REGION>
```

These variables can be accessed throughout the application using the `dotenv` package.

## License

This project is licensed under the MIT License.
