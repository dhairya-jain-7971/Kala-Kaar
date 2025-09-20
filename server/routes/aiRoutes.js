const express = require('express');
const router = express.Router();
const AIService = require('../services/aiService');

// Generate product description
router.post('/generate-product-description', async (req, res) => {
  try {
    const { productName, craftType, description, culturalContext } = req.body;

    if (!productName || !craftType || !description) {
      return res.status(400).json({
        error: 'Missing required fields: productName, craftType, description'
      });
    }

    const result = await AIService.generateProductDescription(
      productName,
      craftType,
      description,
      culturalContext
    );

    res.json({ description: result });
  } catch (error) {
    console.error('Error in /generate-product-description:', error);
    res.status(500).json({ error: 'Failed to generate product description' });
  }
});

// Generate social media post
router.post('/generate-social-post', async (req, res) => {
  try {
    const { productName, description, platform } = req.body;

    if (!productName || !description) {
      return res.status(400).json({
        error: 'Missing required fields: productName, description'
      });
    }

    const result = await AIService.generateSocialMediaPost(
      productName,
      description,
      platform
    );

    res.json({ post: result });
  } catch (error) {
    console.error('Error in /generate-social-post:', error);
    res.status(500).json({ error: 'Failed to generate social media post' });
  }
});

// Generate marketing copy
router.post('/generate-marketing-copy', async (req, res) => {
  try {
    const { productName, artisanStory, specialOffer } = req.body;

    if (!productName || !artisanStory) {
      return res.status(400).json({
        error: 'Missing required fields: productName, artisanStory'
      });
    }

    const result = await AIService.generateMarketingCopy(
      productName,
      artisanStory,
      specialOffer
    );

    res.json({ copy: result });
  } catch (error) {
    console.error('Error in /generate-marketing-copy:', error);
    res.status(500).json({ error: 'Failed to generate marketing copy' });
  }
});

// Generate story content
router.post('/generate-story-content', async (req, res) => {
  try {
    const { artisanName, craftType, personalStory, culturalSignificance } = req.body;

    if (!artisanName || !craftType || !personalStory || !culturalSignificance) {
      return res.status(400).json({
        error: 'Missing required fields: artisanName, craftType, personalStory, culturalSignificance'
      });
    }

    const result = await AIService.generateStoryContent(
      artisanName,
      craftType,
      personalStory,
      culturalSignificance
    );

    res.json({ story: result });
  } catch (error) {
    console.error('Error in /generate-story-content:', error);
    res.status(500).json({ error: 'Failed to generate story content' });
  }
});

// Generate SEO content
router.post('/generate-seo-content', async (req, res) => {
  try {
    const { baseTitle, keywords } = req.body;

    if (!baseTitle) {
      return res.status(400).json({
        error: 'Missing required field: baseTitle'
      });
    }

    const result = await AIService.generateSEOContent(baseTitle, keywords);

    res.json({ seoContent: result });
  } catch (error) {
    console.error('Error in /generate-seo-content:', error);
    res.status(500).json({ error: 'Failed to generate SEO content' });
  }
});

module.exports = router;
