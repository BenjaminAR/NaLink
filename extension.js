const vscode = require('vscode');
const axios = require('axios');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.shortenUrl', async () => {
        const config = vscode.workspace.getConfiguration('nalink');
        let accessToken = config.get('accessToken');

        // If no access token is found, prompt the user to enter one
        if (!accessToken) {
            accessToken = await promptForAccessToken(config);
            if (!accessToken) {
                vscode.window.showErrorMessage('Access token is required to shorten URLs.');
                return;
            }
        }

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor found.');
            return;
        }

        const selectedText = editor.document.getText(editor.selection);
        if (!selectedText) {
            vscode.window.showWarningMessage('Please select a URL to shorten.');
            return;
        }

        try {
            const shortUrl = await shortenUrl(selectedText, accessToken);
            await replaceSelectedText(editor, shortUrl);
            vscode.window.showInformationMessage(`URL shortened: ${shortUrl}`);
        } catch (error) {
            handleError(error);
        }
    });

    context.subscriptions.push(disposable);
}

async function promptForAccessToken(config) {
    const token = await vscode.window.showInputBox({
        prompt: 'Enter your TinyURL API access token',
        password: true
    });

    if (token) {
        await config.update('accessToken', token, vscode.ConfigurationTarget.Global);
    }

    return token;
}

async function shortenUrl(url, accessToken) {
    const response = await axios.post('https://api.tinyurl.com/create', 
        {
            url: url,
            domain: "tinyurl.com",
            description: "Shortened by NaLink"
        },
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data.data.tiny_url;
}

async function replaceSelectedText(editor, newText) {
    await editor.edit(editBuilder => {
        editBuilder.replace(editor.selection, newText);
    });
}

function handleError(error) {
    console.error('Error details:', error);
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        vscode.window.showErrorMessage(`Error shortening URL: ${error.response.data.message || error.response.status}`);
    } else if (error.request) {
        // The request was made but no response was received
        vscode.window.showErrorMessage('No response received from the server. Please check your internet connection.');
    } else {
        // Something happened in setting up the request that triggered an Error
        vscode.window.showErrorMessage('An unexpected error occurred while shortening the URL.');
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
    handleError,
    replaceSelectedText,
    shortenUrl
};