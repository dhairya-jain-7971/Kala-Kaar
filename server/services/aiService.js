const { VertexAI } = require('@google-cloud/aiplatform');

// Initialize Vertex AI
const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT_ID,
  location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
});

const model = vertexAI.preview.getGenerativeModel({
  model: 'gemini-pro',
  generationConfig: {
    maxOutputTokens: 2048,
    temperature: 0.4,
    topP: 1,
    topK: 32,
  },
});

class AIService {
  /**
   * Generate product description using AI
   * @param {string} productName - Name of the product
   * @param {string} craftType - Type of craft (pottery, textile, etc.)
   * @param {string} description - Brief description from artisan
   * @param {string} culturalContext - Cultural background information
   */
  static async generateProductDescription(productName, craftType, description, culturalContext = '') {
    const prompt = `
      You are an expert marketing copywriter specializing in traditional crafts and artisanal products.

      Create a compelling, detailed product description for:

      Product Name: ${productName}
      Craft Type: ${craftType}
      Artisan Description: ${description}
      Cultural Context: ${culturalContext}

      The description should:
      - Be 150-200 words long
      - Highlight traditional craftsmanship and cultural significance
      - Use engaging, descriptive language that appeals to modern consumers
      - Include details about materials, techniques, and heritage
      - End with a call to action encouraging purchase
      - Be written in English

      Focus on authenticity, quality, and the story behind the product.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating product description:', error);
      throw new Error('Failed to generate product description');
    }
  }

  /**
   * Generate social media posts
   * @param {string} productName - Name of the product
   * @param {string} description - Product description
   * @param {string} platform - Platform (instagram, facebook, twitter)
   */
  static async generateSocialMediaPost(productName, description, platform = 'instagram') {
    const platformInstructions = {
      instagram: 'Create an engaging Instagram post (max 2200 characters) with relevant hashtags',
      facebook: 'Create an engaging Facebook post with a question to encourage engagement',
      twitter: 'Create a compelling Twitter post (max 280 characters) with relevant hashtags'
    };

    const prompt = `
      Create a social media post for ${platform} about this artisanal product:

      Product: ${productName}
      Description: ${description}

      ${platformInstructions[platform]}

      Include:
      - Compelling hook or question
      - Highlight cultural significance
      - Call to action
      - Relevant hashtags
      - Emoji where appropriate
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating social media post:', error);
      throw new Error('Failed to generate social media post');
    }
  }

  /**
   * Generate marketing copy for email campaigns
   * @param {string} productName - Name of the product
   * @param {string} artisanStory - Story about the artisan
   * @param {string} specialOffer - Any special offers or promotions
   */
  static async generateMarketingCopy(productName, artisanStory, specialOffer = '') {
    const prompt = `
      Write compelling marketing copy for an email campaign featuring a traditional craft product.

      Product: ${productName}
      Artisan Story: ${artisanStory}
      Special Offer: ${specialOffer}

      Create:
      1. Subject line (max 50 characters)
      2. Email body (200-300 words) that includes:
         - Attention-grabbing opening
         - Product highlights
         - Artisan story integration
         - Cultural significance
         - Special offer if applicable
         - Strong call to action

      Focus on authenticity, cultural heritage, and exclusivity.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating marketing copy:', error);
      throw new Error('Failed to generate marketing copy');
    }
  }

  /**
   * Generate storytelling content about artisan's craft
   * @param {string} artisanName - Name of the artisan
   * @param {string} craftType - Type of craft
   * @param {string} personalStory - Personal story from artisan
   * @param {string} culturalSignificance - Cultural significance of the craft
   */
  static async generateStoryContent(artisanName, craftType, personalStory, culturalSignificance) {
    const prompt = `
      Write an engaging story about a traditional artisan and their craft that can be used on a website or blog.

      Artisan: ${artisanName}
      Craft: ${craftType}
      Personal Story: ${personalStory}
      Cultural Significance: ${culturalSignificance}

      The story should be:
      - 300-400 words long
      - Written in third person
      - Include the artisan's personal journey
      - Explain the cultural and historical context
      - Highlight the importance of preserving traditional crafts
      - End with information about how readers can support the artisan

      Make it inspiring and educational, appealing to modern audiences interested in cultural heritage.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating story content:', error);
      throw new Error('Failed to generate story content');
    }
  }

  /**
   * Generate SEO-optimized product titles and descriptions
   * @param {string} baseTitle - Base product title
   * @param {string} keywords - Additional keywords to include
   */
  static async generateSEOContent(baseTitle, keywords = '') {
    const prompt = `
      Generate SEO-optimized content for an e-commerce product listing:

      Base Product Title: ${baseTitle}
      Keywords: ${keywords}

      Provide:
      1. SEO-optimized title (max 60 characters)
      2. Meta description (max 160 characters)
      3. Search tags (comma-separated list)

      Focus on traditional crafts, authenticity, handmade quality, and cultural heritage keywords.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating SEO content:', error);
      throw new Error('Failed to generate SEO content');
    }
  }
}

module.exports = AIService;
