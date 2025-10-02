# PanelTest - React Admin Dashboard

A modern, responsive admin dashboard built with React, TypeScript, and Vite. This project provides a complete user management system with authentication, CRUD operations, and a clean, professional interface.

## 🚀 Features

- **Authentication System**: Secure login with JWT token management
- **User Management**: Complete CRUD operations for user data
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI Components**: Reusable components with consistent design
- **Data Grid**: Advanced table with pagination, search, and filtering
- **Form Validation**: Comprehensive form handling and validation
- **Error Handling**: Robust error management and user feedback
- **Loading States**: Smooth loading indicators and skeleton screens
- **Persian/Farsi Support**: RTL layout and Persian font integration
- **Toast Notifications**: User-friendly success and error messages

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Authentication**: JWT with Universal Cookie

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PanelTest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Authentication

Use the following credentials to access the application:

- **Email**: `george.bluth@reqres.in`
- **Password**: `123456`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Button, Input, etc.)
│   ├── grid/           # Data grid components
│   └── navigation/     # Navigation components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   └── users/          # User management pages
├── services/           # API services and HTTP client
│   ├── apiServices/    # Core API infrastructure
│   ├── auth/           # Authentication services
│   └── user/           # User-related services
├── routes/             # Routing configuration
├── utils/              # Utility functions
└── assets/             # Static assets (fonts, images)
```

## 🎨 UI Components

### Common Components
- **Button**: Customizable button with variants
- **InputField**: Form input with validation
- **SelectField**: Dropdown selection component
- **Header**: Application header with navigation
- **LoadingSpinner**: Loading indicators

### Grid Components
- **DataGrid**: Advanced table with sorting and pagination
- **GridHeader**: Table header with actions
- **Pagination**: Page navigation controls

## 🔄 State Management

The application uses TanStack Query for:
- Server state management
- Caching and synchronization
- Background updates
- Optimistic updates
- Error handling

## 🌐 API Integration

The project integrates with REQRes API for demonstration purposes:
- **Base URL**: `https://reqres.in/api`
- **Authentication**: JWT token-based
- **Endpoints**: Users, Authentication

### API Services Architecture
- **HTTP Client**: Centralized Axios configuration
- **Error Handling**: Comprehensive error strategies
- **Token Management**: Automatic token refresh
- **Request/Response Interceptors**: Logging and transformation

## 🎯 Key Features

### Authentication Flow
- Login form with validation
- JWT token storage and management
- Protected routes
- Automatic logout on token expiration

### User Management
- User listing with pagination
- Create new users
- Edit existing users
- Delete users with confirmation
- Search and filter functionality

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- RTL (Right-to-Left) support for Persian content
- Custom Persian font (Vazirmatn)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=https://reqres.in/api
VITE_APP_NAME=PanelTest
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Persian font family
- Custom color palette
- RTL support
- Responsive breakpoints

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The build artifacts will be stored in the `dist/` directory.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [REQRes](https://reqres.in/) for providing the demo API
- [Vazirmatn Font](https://github.com/rastikerdar/vazirmatn) for Persian typography
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📞 Support

If you have any questions or need help, please open an issue in the repository.

---

**Happy Coding! 🎉**