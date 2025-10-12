# Contributing to Flarum Replay By AI

Thank you for considering contributing to this project! 🎉

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/wszdb/flarum-replaybyai/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (Flarum version, PHP version, etc.)
   - Screenshots if applicable

### Suggesting Features

1. Open a new issue with the `enhancement` label
2. Describe the feature and its use case
3. Explain why it would be useful

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Follow PSR-12 for PHP code
- Use TypeScript for frontend code
- Add comments for complex logic
- Keep functions small and focused

### Testing

- Test your changes with different Flarum versions
- Verify both admin and forum functionality
- Check mobile responsiveness
- Test with different API configurations

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/flarum-replaybyai.git
cd flarum-replaybyai

# Install dependencies
composer install
cd js && npm install

# Build assets
npm run dev  # for development
npm run build  # for production
```

## Questions?

Feel free to open an issue for any questions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.