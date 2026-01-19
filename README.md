<div align="center">

# 🚀 Vegam Solutions - Admin Dashboard

### A Modern, Feature-Rich Admin Dashboard Built with React

[![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Live Demo](https://vegam-solutions-dashboard.vercel.app/) • [Documentation](#-table-of-contents) • [Report Bug](https://github.com/yourusername/vegam-solutions/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Vegam Solutions Admin Dashboard** is a modern, responsive, and feature-rich admin panel designed for managing users, analytics, transactions, and more. Built with cutting-edge technologies, it offers a seamless user experience with dark mode support, real-time updates, and comprehensive testing coverage.

### ✨ Key Highlights

- 🎨 **Beautiful UI/UX** - Modern design with smooth animations and transitions
- 🌓 **Dark Mode** - Fully functional dark/light theme toggle with system preference detection
- 📱 **Responsive Design** - Works flawlessly on desktop, tablet, and mobile devices
- ⚡ **Performance Optimized** - Code splitting, lazy loading, and optimized bundle size
- 🧪 **Well Tested** - Comprehensive test coverage with Vitest and React Testing Library
- 🔒 **Error Handling** - Robust error boundaries and user-friendly error messages

---

## 🌟 Features

### 📊 Dashboard
- Real-time statistics and metrics
- Interactive charts and graphs (User Activity, Role Distribution)
- Quick action cards for common tasks
- Recent activity feed

### 👥 User Management
- Complete CRUD operations for users
- Advanced filtering and search capabilities
- Role-based access control
- Bulk actions (export, delete)
- Pagination with customizable page sizes

### 💬 Chat Interface
- Real-time messaging simulation
- Contact list with search
- Message history
- Typing indicators
- File attachment support

### 📈 Analytics
- Comprehensive data visualization
- Performance metrics
- User engagement tracking
- Custom date range filtering

### 💰 Transactions
- Transaction history with detailed views
- Status tracking (Completed, Pending, Failed)
- Export functionality
- Advanced filtering options

### 📂 Portfolio
- Project showcase
- Category-based filtering
- Detailed project views
- Status management

### 🔔 Notifications
- Real-time notification system
- Categorized notifications (System, User, Transaction)
- Mark as read/unread
- Notification preferences

### ⚙️ Settings
- Profile customization
- Security settings
- Notification preferences
- Theme customization
- Account management

### 👤 Profile
- User profile management
- Avatar upload
- Personal information editing
- Activity history
- Security settings

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI Library |
| **Vite** | 7.2.4 | Build Tool & Dev Server |
| **React Router** | 7.12.0 | Client-side Routing |
| **TailwindCSS** | 3.4.17 | Utility-first CSS Framework |

### State Management & Data Fetching

- **TanStack Query** (5.90.18) - Server state management
- **Axios** (1.13.2) - HTTP client
- **React Hooks** - Local state management

### UI & Styling

- **Lucide React** (0.562.0) - Icon library
- **Tailwind Merge** (3.4.0) - Utility class merging
- **clsx** (2.1.1) - Conditional class names
- **Lenis** (1.3.17) - Smooth scrolling

### Testing

- **Vitest** (3.0.0) - Unit testing framework
- **React Testing Library** (16.1.0) - Component testing
- **jsdom** (26.0.0) - DOM implementation
- **MSW** (2.12.7) - API mocking

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/vegam-solutions.git
cd vegam-solutions
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**

Navigate to `http://localhost:5173` to view the application.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm test` | Run tests in watch mode |
| `npm run test:ui` | Run tests with UI interface |
| `npm run test:coverage` | Generate test coverage report |

---

## 📁 Project Structure

```
vegam-solutions/
├── public/                    # Static assets
│   ├── mockServiceWorker.js  # MSW service worker
│   └── vite.svg              # Vite logo
├── src/
│   ├── components/           # Reusable components
│   │   ├── layout/          # Layout components
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── TopBar.jsx
│   │   ├── ui/              # UI components
│   │   │   ├── Cards.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── ...
│   │   └── ErrorBoundary.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useUsers.js
│   │   └── ...
│   ├── mocks/               # MSW mock handlers
│   │   ├── handlers.js
│   │   ├── browser.js
│   │   └── server.js
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   ├── Chat.jsx
│   │   ├── Analytics.jsx
│   │   ├── Transactions.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Notifications.jsx
│   │   ├── Settings.jsx
│   │   └── Profile.jsx
│   ├── services/            # API services
│   │   └── api.js
│   ├── test/                # Test utilities
│   │   ├── setup.js
│   │   └── test-utils.jsx
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── .gitignore
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind configuration
├── vercel.json              # Vercel deployment config
├── vite.config.js           # Vite configuration
└── vitest.config.js         # Vitest configuration
```

---

## 🧪 Testing

This project maintains high code quality with comprehensive test coverage.

### Running Tests

```bash
# Run all tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Coverage

- ✅ **ErrorBoundary** - 6 tests
- ✅ **Cards Component** - 7 tests
- ✅ **Modal Component** - 6 tests
- ✅ **useUsers Hook** - 8 tests
- ✅ **API Service** - 11 tests

**Total: 38 tests** | **Pass Rate: 100%**

### Testing Stack

- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **MSW (Mock Service Worker)** - API mocking
- **jsdom** - DOM implementation for Node.js

---

## 🌐 Deployment

### Deploy to Vercel

This project is optimized for deployment on Vercel.

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Deploy**

```bash
vercel
```

3. **Production Deployment**

```bash
vercel --prod
```

### Deploy to Other Platforms

#### Netlify

```bash
npm run build
# Upload the 'dist' folder to Netlify
```

#### GitHub Pages

```bash
npm run build
# Configure GitHub Pages to serve from the 'dist' folder
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_url_here
VITE_APP_NAME=Vegam Solutions
```

---

## 🎨 Customization

### Theme Configuration

Customize colors, fonts, and spacing in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          // Your custom colors
        }
      }
    }
  }
}
```

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add lazy import in `src/App.jsx`
3. Add route in the routing logic
4. Update sidebar navigation in `src/components/layout/Sidebar.jsx`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style
- Run `npm run lint` before committing
- Write tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Vegam Solutions Team**

- GitHub: [@yourusername](https://github.com/yourusername)
- Website: [vegamsolutions.com](#)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - The amazing UI library
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icon library
- [TanStack Query](https://tanstack.com/query) - Powerful data synchronization

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by Vegam Solutions Team

</div>
