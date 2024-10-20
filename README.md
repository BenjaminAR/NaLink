# NaLink

NaLink is a Visual Studio Code extension that allows you to quickly and easily shorten URLs directly from your editor. With a simple keyboard shortcut, you can transform any long URL into a concise, shareable link using the TinyURL service.

## Features

- Shorten URLs with a single keyboard shortcut
- Automatically replaces the selected URL with its shortened version
- Configurable TinyURL API access token
- Works seamlessly within VS Code

## Installation

1. Open Visual Studio Code
2. Press `Ctrl+P` (or `Cmd+P` on macOS) to open the Quick Open dialog
3. Type `ext install nalink` and press Enter
4. Click the Install button to install the extension
5. Click Reload to reload VS Code

## Usage

1. Select a URL in your editor
2. Press `ctrl+shift+alt+s` (or `⌘ + Shift + Alt + S` on macOS) or use the command palette and search for "NaLink: Shorten URL"
3. The selected URL will be replaced with its shortened version

## Configuration

Before using NaLink, you need to configure your TinyURL API access token:

1. Go to [TinyURL](https://tinyurl.com/app) and sign up for an API key if you haven't already
2. In VS Code, open Settings (File > Preferences > Settings)
3. Search for "NaLink"
4. Enter your TinyURL API access token in the "Nalink: Access Token" field

## Development

To set up the project for development:

1. Clone the repository:
   ```
   git clone https://github.com/BenjaminAR/NaLink.git
   ```
2. Navigate to the project directory:
   ```
   cd nalink
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or if you're using pnpm:
   ```
   pnpm install
   ```

## Running Tests

To run the test suite:

1. Ensure you have all dependencies installed
2. Run the following command:
   ```
   npm test
   ```
   or with pnpm:
   ```
   pnpm test
   ```

## Contributing

Contributions to NaLink are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## Support

If you encounter any problems or have any questions, please open an issue on the [GitHub repository](https://github.com/BenjaminAR/nalink/issues).

Happy URL shortening!
---

**Enjoy!**
