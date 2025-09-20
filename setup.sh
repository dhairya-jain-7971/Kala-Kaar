#!/bin/bash

# Kala Kaar Marketplace Setup Script
echo "🚀 Setting up Kala Kaar Marketplace..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher)"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'.' -f1 | cut -d'v' -f2)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version $(node -v) is installed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd client && npm install
cd ..

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create environment file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env 2>/dev/null || echo "Please create a .env file based on the .env.example template"
fi

echo "🔧 Environment setup complete"
echo ""
echo "📋 Next steps:"
echo "1. Configure your .env file with the following:"
echo "   - Google Cloud Project ID"
echo "   - Google Cloud AI API credentials"
echo "   - MongoDB connection string"
echo "   - JWT secret key"
echo ""
echo "2. Enable Google Cloud APIs:"
echo "   gcloud services enable aiplatform.googleapis.com"
echo "   gcloud services enable storage.googleapis.com"
echo "   gcloud services enable firestore.googleapis.com"
echo ""
echo "3. Start the development servers:"
echo "   npm start                    # Backend server"
echo "   cd client && npm start      # Frontend server (new terminal)"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo "   Health Check: http://localhost:5000/api/health"
echo ""
echo "🎉 Setup complete! Visit http://localhost:3000 to start using Kala Kaar Marketplace"
