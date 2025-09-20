# Kala Kaar Marketplace - AI-Powered Artisan Platform

An AI-driven platform that helps local Indian artisans market their craft, tell their stories, and expand their reach to new digital audiences using Google Cloud's generative AI.

## 🌟 Features

- **AI-Powered Content Generation**: Generate compelling product descriptions, social media posts, and marketing copy
- **Digital Marketplace**: Connect artisans with customers worldwide
- **Story-Telling Platform**: Preserve and share cultural heritage stories
- **Analytics Dashboard**: Track performance and business insights
- **Artisan Profiles**: Comprehensive profiles showcasing traditional craftsmanship

## 🛠️ Technology Stack

- **Frontend**: React.js with Material-UI
- **Backend**: Node.js with Express
- **AI**: Google Cloud Generative AI (Gemini)
- **Database**: MongoDB
- **Storage**: Google Cloud Storage
- **Payments**: Stripe integration

## 🚀 Quick Start (Development)

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd kala-kaar-marketplace
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your actual credentials
   ```

3. **Start the application**
   ```bash
   # Terminal 1 - Backend
   npm start

   # Terminal 2 - Frontend
   cd client && npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Google Cloud Setup

1. **Create a Google Cloud Project**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project or select existing
   - Enable billing

2. **Enable Required APIs**
   ```bash
   gcloud services enable aiplatform.googleapis.com
   gcloud services enable storage.googleapis.com
   gcloud services enable firestore.googleapis.com
   ```

3. **Set up Authentication**
   - Create a service account
   - Download JSON key
   - Set `GOOGLE_APPLICATION_CREDENTIALS` environment variable
   - Or use API key for Vertex AI

4. **Test AI Integration**
   ```bash
   curl -X POST http://localhost:5000/api/ai/generate-product-description \
   -H "Content-Type: application/json" \
   -d '{
     "productName": "Terracotta Pot",
     "craftType": "pottery",
     "description": "Handcrafted clay pot with traditional design",
     "culturalContext": "Traditional Rajasthan pottery techniques"
   }'
   ```

## 📁 Project Structure

```
kala-kaar-marketplace/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── ...
├── server/                # Node.js backend
│   ├── routes/            # API routes
│   ├── services/          # Business logic services
│   ├── models/            # Database models
│   └── server.js          # Main server file
├── google-cloud-config.json # Google Cloud configuration
└── package.json
```

## 🎯 Usage

### For Artisans

1. **Register and create profile**
   - Add personal information and craft details
   - Upload photos of your work
   - Share your cultural story

2. **Add products**
   - Create product listings with photos
   - Use AI to generate compelling descriptions
   - Set pricing and availability

3. **Generate marketing content**
   - Create social media posts
   - Generate email marketing copy
   - Optimize for search engines

4. **Track performance**
   - View analytics dashboard
   - Monitor sales and engagement
   - Get insights for business growth

### For Customers

1. **Browse marketplace**
   - Search for authentic crafts
   - Filter by craft type, location, price
   - Learn about artisan stories

2. **Learn about crafts**
   - Read cultural stories
   - Understand traditional techniques
   - Connect with heritage

3. **Purchase with confidence**
   - Secure payment processing
   - Direct support to artisans
   - Cultural preservation

## 🤖 AI Features

### Content Generation
- **Product Descriptions**: AI generates compelling descriptions highlighting cultural significance
- **Social Media Posts**: Platform-specific content for Instagram, Facebook, Twitter
- **Marketing Copy**: Email campaigns and promotional content
- **Story Content**: Cultural narratives and artisan stories
- **SEO Optimization**: Search-friendly titles and meta descriptions

### Example AI Prompts
The AI service uses carefully crafted prompts to ensure culturally sensitive and authentic content generation while maintaining marketing effectiveness.

## 🌐 Deployment

### Deploy to Google Cloud
1. **Set up Google Cloud Run**
2. **Configure Cloud Build**
3. **Deploy with gcloud CLI**
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT-ID/kala-kaar
   gcloud run deploy --image gcr.io/PROJECT-ID/kala-kaar --platform managed
   ```

### Deploy to Heroku
1. **Create Heroku app**
2. **Set environment variables**
3. **Deploy**
   ```bash
   git push heroku main
   ```

## 📊 Analytics

- **Sales tracking**: Monitor product performance
- **Customer engagement**: Track views and interactions
- **Marketing effectiveness**: Measure content performance
- **Geographic insights**: Understand customer locations

## 🔒 Security

- JWT authentication for users
- Secure payment processing with Stripe
- Input validation and sanitization
- Google Cloud security best practices

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

For support and questions:
- Email: support@kalakaar.com
- Documentation: [Link to docs]
- Community: [Link to forum]

## 🙏 Acknowledgments

- Google Cloud for AI services
- Indian artisan communities for inspiration
- Open source community for tools and libraries

---

**Kala Kaar Marketplace** - Preserving cultural heritage through digital innovation
