const vscode = require('vscode');
const assert = require('assert');
const sinon = require('sinon');
const axios = require('axios');
const { activate, shortenUrl, replaceSelectedText, handleError } = require('../../extension'); // Ajusta según sea necesario

describe('Extension Tests', () => {
    let context;
    let editor;

    beforeEach(() => {
        context = { subscriptions: [] };

        editor = {
            document: {
                getText: sinon.stub().returns('https://example.com'), 
                selection: { start: 0, end: 18 }
            },
            selections: [{ start: 0, end: 18 }],
            visibleRanges: [],
            options: {},
            edit: sinon.stub().callsFake((editBuilderFunc) => {
                const editBuilder = {
                    replace: sinon.spy()
                };
                editBuilderFunc(editBuilder);
                return Promise.resolve();
            })
        };

        vscode.window = {
            activeTextEditor: editor,
            showErrorMessage: sinon.spy(),
            showInformationMessage: sinon.spy(),
            showInputBox: sinon.stub().resolves('test_access_token'),
        };
    });

    it('should activate the extension', () => {
        activate(context);
        assert.strictEqual(context.subscriptions.length, 1);
    });

    it('should shorten a URL', async () => {
        const url = 'https://example.com';
        const accessToken = 'test_access_token';
        sinon.stub(axios, 'post').resolves({ data: { data: { tiny_url: 'https://tinyurl.com/abcd' } } });

        const shortUrl = await shortenUrl(url, accessToken);
        assert.strictEqual(shortUrl, 'https://tinyurl.com/abcd');

        axios.post.restore();
    });

    it('should replace the selected text', async () => {
        await replaceSelectedText(editor, 'https://tinyurl.com/abcd');
        assert.strictEqual(editor.edit.calledOnce, true);
        const editBuilder = editor.edit.getCall(0).args[0];
        assert.strictEqual(editBuilder.replace.calledOnce, true);
        assert.strictEqual(editBuilder.replace.getCall(0).args[1], 'https://tinyurl.com/abcd');
    });

    it('should handle errors correctly', () => {
        const consoleErrorSpy = sinon.spy(console, 'error');
        const errorResponse = { response: { data: { message: 'Error message' }, status: 400 } };
        const errorRequest = { request: {} };

        handleError(errorResponse);
        assert(vscode.window.showErrorMessage.calledWith('Error shortening URL: Error message'));
        assert(consoleErrorSpy.calledOnce);

        handleError(errorRequest);
        assert(vscode.window.showErrorMessage.calledWith('No response received from the server. Please check your internet connection.'));
        
        handleError(new Error('Unexpected error'));
        assert(vscode.window.showErrorMessage.calledWith('An unexpected error occurred while shortening the URL.'));

        console.error.restore();
    });
});
