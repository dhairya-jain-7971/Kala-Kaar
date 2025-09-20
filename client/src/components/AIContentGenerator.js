import React, { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { AutoAwesome as AIIcon, ContentCopy as CopyIcon } from '@mui/icons-material';
import axios from 'axios';

const AIContentGenerator = () => {
  const [productInfo, setProductInfo] = useState({
    name: '',
    description: '',
    craftType: '',
    culturalContext: ''
  });

  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({
    productDescription: '',
    socialMediaPosts: {},
    marketingCopy: '',
    storyContent: '',
    seoContent: ''
  });

  const [error, setError] = useState('');

  const contentTypes = [
    { key: 'productDescription', label: 'Product Description', icon: '📝' },
    { key: 'socialMediaPosts', label: 'Social Media Posts', icon: '📱' },
    { key: 'marketingCopy', label: 'Marketing Copy', icon: '📧' },
    { key: 'storyContent', label: 'Story Content', icon: '📖' },
    { key: 'seoContent', label: 'SEO Content', icon: '🔍' }
  ];

  const platforms = ['instagram', 'facebook', 'twitter'];

  const handleGenerateContent = async (contentType) => {
    if (!productInfo.name || !productInfo.description) {
      setError('Please fill in product name and description first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let endpoint = '';
      let payload = {};

      switch (contentType) {
        case 'productDescription':
          endpoint = '/api/ai/generate-product-description';
          payload = {
            productName: productInfo.name,
            craftType: productInfo.craftType,
            description: productInfo.description,
            culturalContext: productInfo.culturalContext
          };
          break;

        case 'socialMediaPosts':
          endpoint = '/api/ai/generate-social-post';
          payload = {
            productName: productInfo.name,
            description: generatedContent.productDescription || productInfo.description,
            platform: 'instagram'
          };
          break;

        case 'marketingCopy':
          endpoint = '/api/ai/generate-marketing-copy';
          payload = {
            productName: productInfo.name,
            artisanStory: productInfo.culturalContext,
            specialOffer: ''
          };
          break;

        case 'storyContent':
          endpoint = '/api/ai/generate-story-content';
          payload = {
            artisanName: 'Your Name', // This should come from user profile
            craftType: productInfo.craftType,
            personalStory: productInfo.culturalContext,
            culturalSignificance: productInfo.culturalContext
          };
          break;

        case 'seoContent':
          endpoint = '/api/ai/generate-seo-content';
          payload = {
            baseTitle: productInfo.name,
            keywords: `${productInfo.craftType}, handmade, traditional, Indian craft`
          };
          break;

        default:
          throw new Error('Invalid content type');
      }

      const response = await axios.post(endpoint, payload);

      setGeneratedContent(prev => ({
        ...prev,
        [contentType]: response.data[Object.keys(response.data)[0]]
      }));

    } catch (error) {
      setError(error.response?.data?.error || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          AI Content Generator
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Generate compelling content for your products using AI
        </Typography>

        {/* Product Information Form */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Product Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name"
                value={productInfo.name}
                onChange={(e) => setProductInfo(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Craft Type</InputLabel>
                <Select
                  value={productInfo.craftType}
                  label="Craft Type"
                  onChange={(e) => setProductInfo(prev => ({ ...prev, craftType: e.target.value }))}
                >
                  <MenuItem value="pottery">Pottery</MenuItem>
                  <MenuItem value="textile">Textile</MenuItem>
                  <MenuItem value="woodwork">Woodwork</MenuItem>
                  <MenuItem value="metalwork">Metalwork</MenuItem>
                  <MenuItem value="jewelry">Jewelry</MenuItem>
                  <MenuItem value="painting">Painting</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Product Description"
                value={productInfo.description}
                onChange={(e) => setProductInfo(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Cultural Context (Optional)"
                value={productInfo.culturalContext}
                onChange={(e) => setProductInfo(prev => ({ ...prev, culturalContext: e.target.value }))}
                placeholder="Share the traditional significance, history, or cultural story behind this craft..."
              />
            </Grid>
          </Grid>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Content Generation Options */}
        <Typography variant="h6" gutterBottom>
          Generate Content
        </Typography>

        <Grid container spacing={2}>
          {contentTypes.map((type) => (
            <Grid item xs={12} sm={6} md={4} key={type.key}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body1" sx={{ mr: 1 }}>
                      {type.icon}
                    </Typography>
                    <Typography variant="subtitle2">
                      {type.label}
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={loading ? <CircularProgress size={20} /> : <AIIcon />}
                    onClick={() => handleGenerateContent(type.key)}
                    disabled={loading}
                  >
                    Generate
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Generated Content Display */}
        {Object.entries(generatedContent).map(([key, content]) =>
          content && (
            <Box key={key} sx={{ mt: 4 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                {contentTypes.find(type => type.key === key)?.label}
              </Typography>

              <Box sx={{ position: 'relative' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={key === 'productDescription' ? 6 : key === 'storyContent' ? 8 : 4}
                  value={content}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button
                  size="small"
                  startIcon={<CopyIcon />}
                  onClick={() => copyToClipboard(content)}
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                  Copy
                </Button>
              </Box>
            </Box>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default AIContentGenerator;
