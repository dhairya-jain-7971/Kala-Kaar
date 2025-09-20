// Temporary simplified AI service (replace with Google AI later)
class AIService {
  /**
   * Generate product description using AI
   */
  static async generateProductDescription(productName, craftType, description, culturalContext = '') {
    // Mock response for testing
    return `🌟 ${productName} - ${craftType} 🌟

This exquisite ${craftType.toLowerCase()} piece showcases the finest traditional craftsmanship passed down through generations. ${description}

${culturalContext ? `Cultural Significance: ${culturalContext}` : ''}

✨ Features:
- Handcrafted with traditional techniques
- Premium quality materials
- Unique cultural heritage
- Perfect for collectors and art enthusiasts

Support traditional artisans and bring home a piece of cultural heritage! 🛍️

#Handmade #TraditionalCraft #CulturalHeritage #ArtisanMade`;
  }

  /**
   * Generate social media posts
   */
  static async generateSocialMediaPost(productName, description, platform = 'instagram') {
    return `🌟 Discover the beauty of traditional craftsmanship! 🌟

${productName}
${description}

✨ Handcrafted with love and tradition
🛍️ Support local artisans
#TraditionalCraft #Handmade #CulturalHeritage

Shop now and bring home authentic artistry!`;
  }

  /**
   * Generate marketing copy for email campaigns
   */
  static async generateMarketingCopy(productName, artisanStory, specialOffer = '') {
    return {
      subject: `Discover Authentic ${productName} - Limited Time Offer!`,
      body: `Dear Craft Enthusiast,

We're excited to introduce you to our latest collection featuring authentic ${productName}.

${artisanStory}

${specialOffer ? `Special Offer: ${specialOffer}` : ''}

Each piece tells a unique story of tradition, skill, and cultural heritage. By choosing our handcrafted items, you're not just buying a product - you're preserving a legacy.

Shop now and experience the difference of authentic craftsmanship!

Best regards,
Kala Kaar Team`
    };
  }

  /**
   * Generate storytelling content about artisan's craft
   */
  static async generateStoryContent(artisanName, craftType, personalStory, culturalSignificance) {
    return `The Art of ${craftType}: A Journey with ${artisanName}

${personalStory}

${culturalSignificance}

In today's fast-paced world, artisans like ${artisanName} remind us of the importance of preserving traditional crafts. Each piece created is not just an object, but a testament to human creativity and cultural continuity.

Supporting traditional artisans means investing in cultural preservation and sustainable craftsmanship. When you choose handcrafted items, you're choosing quality, authenticity, and a story worth telling.

Discover more about ${artisanName}'s work and help preserve this beautiful tradition for future generations.`;
  }

  /**
   * Generate SEO-optimized product titles and descriptions
   */
  static async generateSEOContent(baseTitle, keywords = '') {
    return {
      title: `${baseTitle} - Authentic Handcrafted ${keywords}`,
      metaDescription: `Discover authentic ${baseTitle}. Handcrafted with traditional techniques. ${keywords}. Premium quality, cultural heritage.`,
      tags: `${baseTitle}, handcrafted, traditional, artisan, ${keywords}`
    };
  }
}

module.exports = AIService;
