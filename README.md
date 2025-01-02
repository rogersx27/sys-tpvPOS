# TPV System (Point of Sale)

A modern, feature-rich Point of Sale system built with React, TypeScript, and Tailwind CSS.

## Features

### 🛍️ Sales Management
- Real-time product search
- Quick add to cart
- Multiple payment methods (cash, card, split payment)
- Tip calculator
- Receipt generation and printing
- Email receipts

### 📊 Dashboard
- Sales analytics
- Best-selling products
- Low stock alerts
- Daily/weekly/monthly reports
- Interactive charts

### 📦 Inventory Management
- Product catalog
- Stock tracking
- Low stock notifications
- Barcode support
- Category management

### 💰 Payment Processing
- Cash handling with change calculation
- Card payments
- Split payment support
- Tip management

### 🧾 Receipt Customization
- Custom business information
- Logo support
- Custom footer messages
- Multiple formats (print/email)

### 🎨 User Interface
- Modern, responsive design
- Dark/light mode support
- Touch-friendly interface
- Keyboard shortcuts

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM
- **State Management**: React Context
- **Date Handling**: date-fns

## Project Structure

```
src/
├── components/
│   ├── checkout/      # Checkout related components
│   ├── dashboard/     # Dashboard widgets and charts
│   ├── invoice/       # Invoice and receipt templates
│   ├── layout/        # App layout components
│   └── shared/        # Reusable components
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

### Code Style
- Use TypeScript for type safety
- Follow React best practices and hooks guidelines
- Use functional components
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use Tailwind CSS for styling

### File Naming Conventions
- Components: PascalCase (e.g., `ProductList.tsx`)
- Utilities: camelCase (e.g., `formatCurrency.ts`)
- Types: PascalCase (e.g., `Product.ts`)
- Hooks: camelCase, prefixed with "use" (e.g., `useProducts.ts`)

### Testing
```bash
npm run test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
