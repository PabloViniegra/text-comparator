# Text Comparison Tool

A powerful web application for comparing text documents with a clean, modern interface. Built with React, TypeScript, and Vite, this tool helps you easily identify differences between two pieces of text with syntax highlighting and a side-by-side comparison view.

![Text Comparison Tool Screenshot](public/screenshot.png)

## ✨ Features

- **Side-by-Side Comparison**: View differences between two text documents simultaneously
- **Line-by-Line Highlighting**: Easily spot added, removed, or modified lines
- **Responsive Design**: Works on desktop and tablet devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing in any lighting
- **Modern Tech Stack**: Built with the latest web technologies for optimal performance

## 🚀 Technologies

- ⚡ [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- ⚛️ [React 18](https://reactjs.org/) - A JavaScript library for building user interfaces
- 💡 [TypeScript](https://www.typescriptlang.org/) - Type-checked JavaScript
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- 🔍 [Diff Match Patch](https://github.com/google/diff-match-patch) - High-performance library for text comparison

## 🛠️ Prerequisites

- Node.js (v16 or later)
- pnpm
- Git

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/text-comparator.git
cd text-comparator
```

### 2. Install dependencies

Using pnpm:

```bash
pnpm install
```

### 3. Start the development server

```bash
pnpm run dev
```

This will start the development server at `http://localhost:5173`

### 4. Build for production

To create a production build:

```bash
pnpm run build
```

The build artifacts will be stored in the `dist/` directory.

### 5. Run tests

This project uses Playwright for end-to-end testing. Ensure the development server is running (`pnpm dev`) before executing the test suite.

```bash
pnpm tests
```

## 📦 Project Structure

```
text-comparator/
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and libraries
│   ├── types/          # TypeScript type definitions
│   └── App.tsx         # Main application component
├── public/             # Static files
├── index.html          # Main HTML file
└── vite.config.ts      # Vite configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing development experience
- [React](https://reactjs.org/) for the component-based architecture
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Diff Match Patch](https://github.com/google/diff-match-patch) for the text comparison algorithm
