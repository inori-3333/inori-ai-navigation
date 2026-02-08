export const CATEGORIES = [
  { id: 'all', name: 'All Tools', icon: '🚀' },
  { id: 'artificial-intelligence', name: 'Artificial Intelligence', icon: '🤖' },
  { id: 'productivity', name: 'Productivity', icon: '⚡' },
  { id: 'marketing', name: 'Marketing', icon: '📢' },
  { id: 'developer-tools', name: 'Developer Tools', icon: '💻' },
  { id: 'design', name: 'Design', icon: '🎨' },
  { id: 'seo', name: 'SEO', icon: '🔍' },
  { id: 'chatbots', name: 'Chatbots', icon: '💬' },
  { id: 'social-media', name: 'Social Media', icon: '📱' },
  { id: 'content-creation', name: 'Content Creation', icon: '✍️' },
  { id: 'no-code', name: 'No-Code', icon: '🔧' },
  { id: 'writing', name: 'Writing', icon: '📝' },
  { id: 'customer-support', name: 'Customer Support', icon: '🎧' },
  { id: 'blogging', name: 'Blogging', icon: '📰' },
  { id: 'sales', name: 'Sales', icon: '💰' },
  { id: 'productized-services', name: 'Productized Services', icon: '📦' },
  { id: 'website-builders', name: 'Website Builders', icon: '🌐' },
  { id: 'data-analytics', name: 'Data Analytics', icon: '📊' },
  { id: 'ios', name: 'iOS', icon: '🍎' },
  { id: 'developer-apis', name: 'Developer APIs', icon: '🔌' },
  { id: 'video', name: 'Video', icon: '🎬' },
  { id: 'product-building', name: 'Product Building', icon: '🏗️' },
  { id: 'mac', name: 'Mac', icon: '🖥️' },
  { id: 'feedback-tools', name: 'Feedback Tools', icon: '💭' },
  { id: 'education', name: 'Education', icon: '📚' },
  { id: 'email', name: 'Email', icon: '📧' },
];

export async function getCategories() {
  // Return static categories - could be dynamic based on actual data
  return CATEGORIES;
}

export function getCategoryById(id: string) {
  return CATEGORIES.find(cat => cat.id === id) || null;
}

export function mapCategoryToId(categoryName: string): string {
  const normalized = categoryName.toLowerCase().trim();
  
  const mapping: Record<string, string> = {
    'ai': 'artificial-intelligence',
    'artificial intelligence': 'artificial-intelligence',
    'artificial-intelligence': 'artificial-intelligence',
    'productivity': 'productivity',
    'productivity tools': 'productivity',
    'marketing': 'marketing',
    'marketing tools': 'marketing',
    'developer': 'developer-tools',
    'developer tools': 'developer-tools',
    'devtools': 'developer-tools',
    'development': 'developer-tools',
    'coding': 'developer-tools',
    'programming': 'developer-tools',
    'design': 'design',
    'design tools': 'design',
    'ui/ux': 'design',
    'ui': 'design',
    'ux': 'design',
    'seo': 'seo',
    'search engine optimization': 'seo',
    'chatbot': 'chatbots',
    'chatbots': 'chatbots',
    'conversational ai': 'chatbots',
    'social media': 'social-media',
    'social-media': 'social-media',
    'social': 'social-media',
    'content': 'content-creation',
    'content creation': 'content-creation',
    'content creation tools': 'content-creation',
    'nocode': 'no-code',
    'no-code': 'no-code',
    'nocode tools': 'no-code',
    'no code': 'no-code',
    'writing': 'writing',
    'writing tools': 'writing',
    'copywriting': 'writing',
    'customer support': 'customer-support',
    'support': 'customer-support',
    'customer service': 'customer-support',
    'helpdesk': 'customer-support',
    'blogging': 'blogging',
    'blog': 'blogging',
    'blogs': 'blogging',
    'sales': 'sales',
    'sales tools': 'sales',
    'crm': 'sales',
    'productized': 'productized-services',
    'productized services': 'productized-services',
    'saas': 'productized-services',
    'website builder': 'website-builders',
    'website-builders': 'website-builders',
    'website': 'website-builders',
    'data': 'data-analytics',
    'analytics': 'data-analytics',
    'data analytics': 'data-analytics',
    'data analysis': 'data-analytics',
    'ios': 'ios',
    'iphone': 'ios',
    'ipad': 'ios',
    'mobile': 'ios',
    'api': 'developer-apis',
    'apis': 'developer-apis',
    'developer apis': 'developer-apis',
    'api tools': 'developer-apis',
    'video': 'video',
    'video tools': 'video',
    'video creation': 'video',
    'product': 'product-building',
    'product building': 'product-building',
    'product tools': 'product-building',
    'mac': 'mac',
    'macos': 'mac',
    'desktop': 'mac',
    'feedback': 'feedback-tools',
    'feedback tools': 'feedback-tools',
    'user feedback': 'feedback-tools',
    'education': 'education',
    'educational': 'education',
    'learning': 'education',
    'email': 'email',
    'email marketing': 'email',
    'email tools': 'email',
  };

  if (mapping[normalized]) {
    return mapping[normalized];
  }
  
  // Try to find partial matches
  for (const [key, value] of Object.entries(mapping)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  
  return 'artificial-intelligence'; // Default category
}
