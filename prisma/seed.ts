import { PrismaClient } from '@prisma/client';
import { mapCategoryToId, CATEGORIES } from '../lib/categories';
import { generateLogoUrl, generateScreenshotUrl } from '../lib/tools';

const prisma = new PrismaClient();

// Curated AI tools data based on the mentioned sources
const aiTools = [
  // AI & Machine Learning
  {
    name: "ChatGPT",
    description: "OpenAI's conversational AI model that generates human-like responses.",
    url: "https://chat.openai.com",
    category: "artificial-intelligence",
  },
  {
    name: "Claude",
    description: "Anthropic's helpful, harmless, and honest AI assistant.",
    url: "https://claude.ai",
    category: "artificial-intelligence",
  },
  {
    name: "Gemini",
    description: "Google's multimodal AI model for reasoning and creativity.",
    url: "https://gemini.google.com",
    category: "artificial-intelligence",
  },
  {
    name: "Perplexity",
    description: "AI-powered search engine with conversational answers.",
    url: "https://www.perplexity.ai",
    category: "artificial-intelligence",
  },
  {
    name: "Hugging Face",
    description: "Platform for building, training, and deploying ML models.",
    url: "https://huggingface.co",
    category: "artificial-intelligence",
  },
  {
    name: "Replicate",
    description: "Run open-source machine learning models in the cloud.",
    url: "https://replicate.com",
    category: "artificial-intelligence",
  },
  {
    name: "Runway",
    description: "Creative tools for video generation and editing with AI.",
    url: "https://runwayml.com",
    category: "artificial-intelligence",
  },
  {
    name: "Midjourney",
    description: "AI-powered image generation tool for creating artwork.",
    url: "https://www.midjourney.com",
    category: "artificial-intelligence",
  },
  {
    name: "DALL-E",
    description: "OpenAI's AI system that creates images from text descriptions.",
    url: "https://openai.com/dall-e-3",
    category: "artificial-intelligence",
  },
  {
    name: "Stable Diffusion",
    description: "Open-source image generation model by Stability AI.",
    url: "https://stability.ai",
    category: "artificial-intelligence",
  },
  {
    name: "ElevenLabs",
    description: "AI voice generation tool for realistic text-to-speech.",
    url: "https://elevenlabs.io",
    category: "artificial-intelligence",
  },
  {
    name: "Whisper",
    description: "OpenAI's speech recognition model for transcription.",
    url: "https://openai.com/research/whisper",
    category: "artificial-intelligence",
  },
  {
    name: "Jasper",
    description: "AI content platform for marketing and business teams.",
    url: "https://www.jasper.ai",
    category: "artificial-intelligence",
  },
  {
    name: "Copy.ai",
    description: "AI-powered copywriting tool for marketing content.",
    url: "https://www.copy.ai",
    category: "artificial-intelligence",
  },
  {
    name: "Writesonic",
    description: "AI writing assistant for blogs, ads, and emails.",
    url: "https://writesonic.com",
    category: "artificial-intelligence",
  },
  {
    name: "Rytr",
    description: "AI writing tool that helps create content in seconds.",
    url: "https://rytr.me",
    category: "artificial-intelligence",
  },
  {
    name: "Notion AI",
    description: "AI-powered workspace for notes, docs, and collaboration.",
    url: "https://www.notion.so/product/ai",
    category: "artificial-intelligence",
  },
  {
    name: "Coda AI",
    description: "AI assistant for docs, spreadsheets, and workflows.",
    url: "https://coda.io/product/ai",
    category: "artificial-intelligence",
  },
  {
    name: "Mem",
    description: "AI-powered personal knowledge management tool.",
    url: "https://mem.ai",
    category: "artificial-intelligence",
  },
  {
    name: "Otter.ai",
    description: "AI meeting assistant for transcription and summaries.",
    url: "https://otter.ai",
    category: "artificial-intelligence",
  },
  
  // Productivity
  {
    name: "Todoist",
    description: "Popular task management app with AI-powered features.",
    url: "https://todoist.com",
    category: "productivity",
  },
  {
    name: "Notion",
    description: "All-in-one workspace for notes, docs, and projects.",
    url: "https://www.notion.so",
    category: "productivity",
  },
  {
    name: "Asana",
    description: "Work management platform for teams to organize tasks.",
    url: "https://asana.com",
    category: "productivity",
  },
  {
    name: "Trello",
    description: "Visual project management with boards and cards.",
    url: "https://trello.com",
    category: "productivity",
  },
  {
    name: "ClickUp",
    description: "All-in-one productivity platform for teams.",
    url: "https://clickup.com",
    category: "productivity",
  },
  {
    name: "Monday.com",
    description: "Work operating system for team collaboration.",
    url: "https://monday.com",
    category: "productivity",
  },
  {
    name: "Linear",
    description: "Issue tracking tool for modern software teams.",
    url: "https://linear.app",
    category: "productivity",
  },
  {
    name: "Notion",
    description: "AI-powered workspace for notes and collaboration.",
    url: "https://notion.so",
    category: "productivity",
  },
  {
    name: "Motion",
    description: "AI-powered calendar and task scheduling app.",
    url: "https://www.usemotion.com",
    category: "productivity",
  },
  {
    name: "Reclaim",
    description: "AI calendar scheduling for teams and individuals.",
    url: "https://reclaim.ai",
    category: "productivity",
  },
  {
    name: "Clockwise",
    description: "Smart calendar that optimizes your schedule.",
    url: "https://www.getclockwise.com",
    category: "productivity",
  },
  {
    name: "Calendly",
    description: "Scheduling automation for meetings and events.",
    url: "https://calendly.com",
    category: "productivity",
  },
  {
    name: "Loom",
    description: "Video messaging for async team communication.",
    url: "https://www.loom.com",
    category: "productivity",
  },
  {
    name: "Snipd",
    description: "AI-powered podcast player with smart summaries.",
    url: "https://www.snipd.com",
    category: "productivity",
  },
  {
    name: "Mem.ai",
    description: "AI-powered memory and knowledge organization.",
    url: "https://mem.ai",
    category: "productivity",
  },
  
  // Developer Tools
  {
    name: "GitHub Copilot",
    description: "AI pair programmer for code suggestions.",
    url: "https://github.com/features/copilot",
    category: "developer-tools",
  },
  {
    name: "Tabnine",
    description: "AI code completion for faster development.",
    url: "https://www.tabnine.com",
    category: "developer-tools",
  },
  {
    name: "Codeium",
    description: "Free AI-powered code completion and search.",
    url: "https://www.codium.ai",
    category: "developer-tools",
  },
  {
    name: "CodeRabbit",
    description: "AI-powered code review and pull request automation.",
    url: "https://coderabbit.ai",
    category: "developer-tools",
  },
  {
    name: "Mintlify",
    description: "AI-powered documentation writer for developers.",
    url: "https://mintlify.com",
    category: "developer-tools",
  },
  {
    name: "Swimm",
    description: "AI documentation that stays in sync with code.",
    url: "https://swimm.io",
    category: "developer-tools",
  },
  {
    name: "Codiga",
    description: "Static code analysis with AI-powered rules.",
    url: "https://www.codiga.io",
    category: "developer-tools",
  },
  {
    name: "Snyk",
    description: "AI-powered developer security platform.",
    url: "https://snyk.io",
    category: "developer-tools",
  },
  {
    name: "SonarSource",
    description: "Code quality and security analysis tools.",
    url: "https://www.sonarsource.com",
    category: "developer-tools",
  },
  {
    name: "DeepCode",
    description: "AI-powered code review and bug detection.",
    url: "https://deepcode.ai",
    category: "developer-tools",
  },
  {
    name: "GitHub",
    description: "Platform for version control and collaboration.",
    url: "https://github.com",
    category: "developer-tools",
  },
  {
    name: "GitLab",
    description: "Complete DevOps platform with AI features.",
    url: "https://about.gitlab.com",
    category: "developer-tools",
  },
  {
    name: "Vercel",
    description: "Develop, preview, and deploy with AI optimizations.",
    url: "https://vercel.com",
    category: "developer-tools",
  },
  {
    name: "Netlify",
    description: "Web development platform with AI features.",
    url: "https://www.netlify.com",
    category: "developer-tools",
  },
  {
    name: "Supabase",
    description: "Open-source Firebase alternative with AI tools.",
    url: "https://supabase.com",
    category: "developer-tools",
  },
  {
    name: "Appwrite",
    description: "Open-source backend server with AI integrations.",
    url: "https://appwrite.io",
    category: "developer-tools",
  },
  {
    name: "Raycast",
    description: "Productivity tool for developers with AI extensions.",
    url: "https://www.raycast.com",
    category: "developer-tools",
  },
  {
    name: "Fig",
    description: "Terminal with autocomplete and AI suggestions.",
    url: "https://fig.io",
    category: "developer-tools",
  },
  {
    name: "Warmer",
    description: "AI tool for generating emails and messages.",
    url: "https://warmer.ai",
    category: "developer-tools",
  },
  {
    name: "Bito",
    description: "AI-powered developer productivity assistant.",
    url: "https://bito.ai",
    category: "developer-tools",
  },
  
  // Design
  {
    name: "Figma",
    description: "Collaborative design tool with AI features.",
    url: "https://www.figma.com",
    category: "design",
  },
  {
    name: "Canva",
    description: "Online design platform with AI-powered tools.",
    url: "https://www.canva.com",
    category: "design",
  },
  {
    name: "Adobe Firefly",
    description: "AI-powered creative tools for Adobe applications.",
    url: "https://www.adobe.com/sensei/generative-ai/firefly.html",
    category: "design",
  },
  {
    name: "Leonardo",
    description: "AI-powered creative tool for game assets and design.",
    url: "https://leonardo.ai",
    category: "design",
  },
  {
    name: "Pika",
    description: "AI-powered video generation and editing tool.",
    url: "https://pika.art",
    category: "design",
  },
  {
    name: "Runway",
    description: "AI-powered creative tools for video and design.",
    url: "https://runway.ml",
    category: "design",
  },
  {
    name: "Luma AI",
    description: "AI-powered 3D capture and generation.",
    url: "https://lumalabs.ai",
    category: "design",
  },
  {
    name: "Spline",
    description: "3D design tool with AI-powered features.",
    url: "https://spline.design",
    category: "design",
  },
  {
    name: "Uizard",
    description: "AI-powered UI design and prototyping tool.",
    url: "https://uizard.com",
    category: "design",
  },
  {
    name: "Visily",
    description: "AI-powered UI design tool with screenshot-to-design.",
    url: "https://visily.ai",
    category: "design",
  },
  {
    name: "Galileo AI",
    description: "AI-powered design tool for UI and wireframes.",
    url: "https://usegalileo.ai",
    category: "design",
  },
  {
    name: "Figma AI",
    description: "AI features integrated into Figma design tool.",
    url: "https://www.figma.com/ai",
    category: "design",
  },
  {
    name: "Khroma",
    description: "AI-powered color palette generator for designers.",
    url: "https://khroma.co",
    category: "design",
  },
  {
    name: "Coolors",
    description: "Smart color palette generator with AI suggestions.",
    url: "https://coolors.co",
    category: "design",
  },
  {
    name: "Fontjoy",
    description: "AI-powered font pairing made simple.",
    url: "https://fontjoy.com",
    category: "design",
  },
  {
    name: "Remove.bg",
    description: "AI-powered background removal for images.",
    url: "https://www.remove.bg",
    category: "design",
  },
  {
    name: "unscreen",
    description: "AI-powered video background removal tool.",
    url: "https://www.unscreen.com",
    category: "design",
  },
  {
    name: "Let\'s Enhance",
    description: "AI-powered image enhancement and upscaling.",
    url: "https://letsenhance.io",
    category: "design",
  },
  {
    name: "VanceAI",
    description: "AI-powered image editing and enhancement tools.",
    url: "https://vanceai.com",
    category: "design",
  },
  
  // Marketing
  {
    name: "HubSpot",
    description: "Marketing automation platform with AI features.",
    url: "https://www.hubspot.com",
    category: "marketing",
  },
  {
    name: "Mailchimp",
    description: "Email marketing platform with AI-powered tools.",
    url: "https://mailchimp.com",
    category: "marketing",
  },
  {
    name: "Marketo",
    description: "Marketing automation for enterprise teams.",
    url: "https://www.marketo.com",
    category: "marketing",
  },
  {
    name: "Pardot",
    description: "B2B marketing automation by Salesforce.",
    url: "https://www.pardot.com",
    category: "marketing",
  },
  {
    name: "ActiveCampaign",
    description: "Marketing automation with AI features.",
    url: "https://www.activecampaign.com",
    category: "marketing",
  },
  {
    name: "ConvertKit",
    description: "Email marketing for creators with AI tools.",
    url: "https://convertkit.com",
    category: "marketing",
  },
  {
    name: "GetResponse",
    description: "Email marketing with AI-powered automation.",
    url: "https://www.getresponse.com",
    category: "marketing",
  },
  {
    name: "Ahrefs",
    description: "SEO tools with AI-powered content analysis.",
    url: "https://ahrefs.com",
    category: "marketing",
  },
  {
    name: "SEMrush",
    description: "All-in-one digital marketing toolkit with AI.",
    url: "https://www.semrush.com",
    category: "marketing",
  },
  {
    name: "Moz",
    description: "SEO software with AI-powered insights.",
    url: "https://moz.com",
    category: "marketing",
  },
  {
    name: "Surfer SEO",
    description: "AI-powered SEO content optimization tool.",
    url: "https://surferseo.com",
    category: "marketing",
  },
  {
    name: "Clearscope",
    description: "AI-powered content optimization platform.",
    url: "https://www.clearscope.com",
    category: "marketing",
  },
  {
    name: "MarketMuse",
    description: "AI-powered content strategy and planning.",
    url: "https://www.marketmuse.com",
    category: "marketing",
  },
  {
    name: "Frase",
    description: "AI-powered content optimization and briefs.",
    url: "https://www.frase.io",
    category: "marketing",
  },
  {
    name: "Copy.ai",
    description: "AI copywriting for marketing content.",
    url: "https://copy.ai",
    category: "marketing",
  },
  {
    name: "Jasper",
    description: "AI content platform for marketers.",
    url: "https://jasper.ai",
    category: "marketing",
  },
  {
    name: "Writesonic",
    description: "AI writing for marketing and ads.",
    url: "https://writesonic.com",
    category: "marketing",
  },
  {
    name: "Hypotenuse AI",
    description: "AI-powered content generation for e-commerce.",
    url: "https://hypotenuse.ai",
    category: "marketing",
  },
  {
    name: "AdCreative.ai",
    description: "AI-powered ad creative generation.",
    url: "https://www.adcreative.ai",
    category: "marketing",
  },
  {
    name: "Pencil",
    description: "AI ad creative platform for brands.",
    url: "https://www.pencil.so",
    category: "marketing",
  },
  
  // Chatbots
  {
    name: "Intercom",
    description: "Customer messaging platform with AI chatbots.",
    url: "https://www.intercom.com",
    category: "chatbots",
  },
  {
    name: "Drift",
    description: "Conversational AI for marketing and sales.",
    url: "https://www.drift.com",
    category: "chatbots",
  },
  {
    name: "Zendesk",
    description: "Customer service with AI-powered chatbots.",
    url: "https://www.zendesk.com",
    category: "chatbots",
  },
  {
    name: "Freshworks",
    description: "Customer service software with AI features.",
    url: "https://www.freshworks.com",
    category: "chatbots",
  },
  {
    name: "Tidio",
    description: "AI-powered live chat and chatbot platform.",
    url: "https://www.tidio.com",
    category: "chatbots",
  },
  {
    name: "LiveChat",
    description: "Customer support with AI assistance.",
    url: "https://www.livechat.com",
    category: "chatbots",
  },
  {
    name: "Crisp",
    description: "Customer messaging with AI chatbots.",
    url: "https://crisp.chat",
    category: "chatbots",
  },
  {
    name: "JivoChat",
    description: "Live chat and chatbot for business.",
    url: "https://www.jivochat.com",
    category: "chatbots",
  },
  {
    name: "Ada",
    description: "AI-powered customer service automation.",
    url: "https://www.ada.cx",
    category: "chatbots",
  },
  {
    name: "Infobip",
    description: "Customer engagement with AI chatbots.",
    url: "https://www.infobip.com",
    category: "chatbots",
  },
  {
    name: "Genesys",
    description: "Contact center with AI-powered chatbots.",
    url: "https://www.genesys.com",
    category: "chatbots",
  },
  {
    name: "ServiceNow",
    description: "Enterprise service management with AI.",
    url: "https://www.servicenow.com",
    category: "chatbots",
  },
  {
    name: "Kommunicate",
    description: "AI-powered customer support chatbot.",
    url: "https://www.kommunicate.io",
    category: "chatbots",
  },
  {
    name: "Botpress",
    description: "Open-source conversational AI platform.",
    url: "https://botpress.com",
    category: "chatbots",
  },
  {
    name: "Rasa",
    description: "Open-source conversational AI framework.",
    url: "https://rasa.com",
    category: "chatbots",
  },
  
  // Content Creation
  {
    name: "Descript",
    description: "AI-powered video and podcast editing.",
    url: "https://www.descript.com",
    category: "content-creation",
  },
  {
    name: "Runway",
    description: "AI video generation and editing tools.",
    url: "https://runway.video",
    category: "content-creation",
  },
  {
    name: "Synthesia",
    description: "AI video generation with virtual avatars.",
    url: "https://www.synthesia.io",
    category: "content-creation",
  },
  {
    name: "HeyGen",
    description: "AI-powered video avatar platform.",
    url: "https://www.heygen.com",
    category: "content-creation",
  },
  {
    name: "D-ID",
    description: "AI video generation with talking avatars.",
    url: "https://www.d-id.com",
    category: "content-creation",
  },
  {
    name: "Fliki",
    description: "AI video creation with lifelike voices.",
    url: "https://fliki.ai",
    category: "content-creation",
  },
  {
    name: "InVideo",
    description: "AI-powered video creation platform.",
    url: "https://invideo.io",
    category: "content-creation",
  },
  {
    name: "Pictory",
    description: "AI video creation from text and scripts.",
    url: "https://pictory.ai",
    category: "content-creation",
  },
  {
    name: "Lumen5",
    description: "AI video platform for content marketing.",
    url: "https://lumen5.com",
    category: "content-creation",
  },
  {
    name: "Creatomate",
    description: "AI-powered video generation API.",
    url: "https://creatomate.com",
    category: "content-creation",
  },
  {
    name: "Shuffl",
    description: "AI video editing for social media.",
    url: "https://www.shuffl.app",
    category: "content-creation",
  },
  {
    name: "Mubert",
    description: "AI-powered music generation for content.",
    url: "https://mubert.com",
    category: "content-creation",
  },
  {
    name: "Soundraw",
    description: "AI music generator for creators.",
    url: "https://soundraw.io",
    category: "content-creation",
  },
  {
    name: "Beatoven.ai",
    description: "AI-powered royalty-free music.",
    url: "https://beatoven.ai",
    category: "content-creation",
  },
  {
    name: "AIVA",
    description: "AI music composition assistant.",
    url: "https://www.aiva.ai",
    category: "content-creation",
  },
  
  // No-Code
  {
    name: "Bubble",
    description: "Visual programming for web applications.",
    url: "https://bubble.io",
    category: "no-code",
  },
  {
    name: "Webflow",
    description: "Visual website builder with CMS.",
    url: "https://webflow.com",
    category: "no-code",
  },
  {
    name: "Framer",
    description: "Design and publish websites visually.",
    url: "https://www.framer.com",
    category: "no-code",
  },
  {
    name: "Softr",
    description: "Build web apps from Airtable and Google Sheets.",
    url: "https://softr.io",
    category: "no-code",
  },
  {
    name: "Glide",
    description: "Create mobile apps from spreadsheets.",
    url: "https://www.glideapps.com",
    category: "no-code",
  },
  {
    name: "Adalo",
    description: "No-code mobile and web app builder.",
    url: "https://www.adalo.com",
    category: "no-code",
  },
  {
    name: "Retool",
    description: "Build internal tools with drag and drop.",
    url: "https://retool.com",
    category: "no-code",
  },
  {
    name: "Appsmith",
    description: "Open-source internal tool builder.",
    url: "https://www.appsmith.com",
    category: "no-code",
  },
  {
    name: "Budibase",
    description: "Open-source low-code platform.",
    url: "https://budibase.com",
    category: "no-code",
  },
  {
    name: "Tooljet",
    description: "Open-source low-code application builder.",
    url: "https://tooljet.com",
    category: "no-code",
  },
  {
    name: "Jetstrap",
    description: "Bootstrap interface builder.",
    url: "https://jetstrap.com",
    category: "no-code",
  },
  {
    name: "Anima",
    description: "Turn designs into React code.",
    url: "https://www.animaapp.com",
    category: "no-code",
  },
  {
    name: "Uizard",
    description: "Design to code with AI assistance.",
    url: "https://uizard.com",
    category: "no-code",
  },
  {
    name: "Stacker",
    description: "Build internal tools quickly.",
    url: "https://stackerhq.com",
    category: "no-code",
  },
  {
    name: "Drona",
    description: "No-code platform for automation.",
    url: "https://www.dronaHQ.com",
    category: "no-code",
  },
  
  // Writing
  {
    name: "Grammarly",
    description: "AI-powered writing assistant and grammar checker.",
    url: "https://www.grammarly.com",
    category: "writing",
  },
  {
    name: "ProWritingAid",
    description: "Writing improvement tool with AI analysis.",
    url: "https://www.prowritingaid.com",
    category: "writing",
  },
  {
    name: " Hemingway",
    description: "AI-powered writing enhancement editor.",
    url: "https://hemingwayapp.com",
    category: "writing",
  },
  {
    name: "QuillBot",
    description: "AI-powered paraphrasing tool.",
    url: "https://quillbot.com",
    category: "writing",
  },
  {
    name: "Wordtune",
    description: "AI writing companion for better expression.",
    url: "https://www.wordtune.com",
    category: "writing",
  },
  {
    name: "Rytr",
    description: "AI writing assistant for various content types.",
    url: "https://rytr.me",
    category: "writing",
  },
  {
    name: "ShortlyAI",
    description: "AI writing tool for long-form content.",
    url: "https://www.shortlyai.com",
    category: "writing",
  },
  {
    name: "ClosersCopy",
    description: "AI copywriting for sales and marketing.",
    url: "https://www.closerscopy.com",
    category: "writing",
  },
  {
    name: "Anyword",
    description: "AI copywriting platform for performance.",
    url: "https://www.anyword.com",
    category: "writing",
  },
  {
    name: "Copysmith",
    description: "AI content generation for e-commerce.",
    url: "https://copysmith.ai",
    category: "writing",
  },
  {
    name: "Article Forge",
    description: "AI article generator for content creation.",
    url: "https://www.articleforge.com",
    category: "writing",
  },
  {
    name: "ContentBot",
    description: "AI content writing for marketers.",
    url: "https://contentbot.ai",
    category: "writing",
  },
  {
    name: "Kafkai",
    description: "AI article writer with SEO optimization.",
    url: "https://kafkai.com",
    category: "writing",
  },
  {
    name: "TextCortex",
    description: "AI writing assistant with browser extension.",
    url: "https://textcortex.com",
    category: "writing",
  },
  {
    name: "Smodin",
    description: "Multi-language AI writing tool.",
    url: "https://smodin.io",
    category: "writing",
  },
  
  // Customer Support
  {
    name: "Zendesk",
    description: "Customer service platform with AI features.",
    url: "https://zendesk.com",
    category: "customer-support",
  },
  {
    name: "Freshdesk",
    description: "Customer support software with AI.",
    url: "https://freshdesk.com",
    category: "customer-support",
  },
  {
    name: "HelpScout",
    description: "Customer support platform with AI tools.",
    url: "https://helpscout.com",
    category: "customer-support",
  },
  {
    name: "Intercom",
    description: "Customer messaging with AI automation.",
    url: "https://intercom.com",
    category: "customer-support",
  },
  {
    name: "Front",
    description: "Shared inbox for customer support teams.",
    url: "https://front.com",
    category: "customer-support",
  },
  {
    name: "Olark",
    description: "Live chat for customer support.",
    url: "https://www.olark.com",
    category: "customer-support",
  },
  {
    name: "LiveAgent",
    description: "Customer support with live chat.",
    url: "https://www.liveagent.com",
    category: "customer-support",
  },
  {
    name: "Kayako",
    description: "Customer support platform.",
    url: "https://kayako.com",
    category: "customer-support",
  },
  {
    name: "Gorgias",
    description: "AI-powered customer support for e-commerce.",
    url: "https://gorgias.com",
    category: "customer-support",
  },
  {
    name: "Tidio",
    description: "Customer support with AI chatbots.",
    url: "https://tidio.com",
    category: "customer-support",
  },
  {
    name: "Re:amaze",
    description: "Customer service and live chat platform.",
    url: "https://www.reamaze.com",
    category: "customer-support",
  },
  {
    name: "ServiceSphere",
    description: "Customer service automation.",
    url: "https://servicesphere.com",
    category: "customer-support",
  },
  
  // Data Analytics
  {
    name: "Tableau",
    description: "Data visualization with AI-powered analytics.",
    url: "https://www.tableau.com",
    category: "data-analytics",
  },
  {
    name: "Power BI",
    description: "Microsoft's business analytics with AI.",
    url: "https://powerbi.microsoft.com",
    category: "data-analytics",
  },
  {
    name: "Looker",
    description: "Business intelligence platform by Google.",
    url: "https://looker.com",
    category: "data-analytics",
  },
  {
    name: "ThoughtSpot",
    description: "AI-powered analytics platform.",
    url: "https://www.thoughtspot.com",
    category: "data-analytics",
  },
  {
    name: "Alteryx",
    description: "Analytics automation platform.",
    url: "https://www.alteryx.com",
    category: "data-analytics",
  },
  {
    name: "Databricks",
    description: "Data engineering and AI platform.",
    url: "https://databricks.com",
    category: "data-analytics",
  },
  {
    name: "Snowflake",
    description: "Data cloud with AI capabilities.",
    url: "https://www.snowflake.com",
    category: "data-analytics",
  },
  {
    name: "BigQuery",
    description: "Google's serverless data warehouse.",
    url: "https://cloud.google.com/bigquery",
    category: "data-analytics",
  },
  {
    name: "Mode",
    description: "Collaborative analytics platform.",
    url: "https://mode.com",
    category: "data-analytics",
  },
  {
    name: "Metabase",
    description: "Open-source business intelligence.",
    url: "https://metabase.com",
    category: "data-analytics",
  },
  {
    name: "Chartio",
    description: "Business intelligence for teams.",
    url: "https://chartio.com",
    category: "data-analytics",
  },
  {
    name: "Sisense",
    description: "Analytics platform with AI insights.",
    url: "https://www.sisense.com",
    category: "data-analytics",
  },
  
  // Video
  {
    name: "OpenAI Sora",
    description: "AI video generation model by OpenAI.",
    url: "https://openai.com/sora",
    category: "video",
  },
  {
    name: "Pika Labs",
    description: "AI-powered video generation platform.",
    url: "https://pika.art",
    category: "video",
  },
  {
    name: "Runway Gen-2",
    description: "Multimodal AI video generation.",
    url: "https://runwayml.com",
    category: "video",
  },
  {
    name: "Kaiber",
    description: "AI video generation for creators.",
    url: "https://www.kaiber.ai",
    category: "video",
  },
  {
    name: "Gen-2",
    description: "AI video synthesis tool.",
    url: "https://runwayml.com/gen-2",
    category: "video",
  },
  {
    name: "Luma Dream Machine",
    description: "AI video generation from text.",
    url: "https://lumalabs.ai/dream-machine",
    category: "video",
  },
  {
    name: "Stable Video Diffusion",
    description: "AI video generation by Stability AI.",
    url: "https://stability.ai/stable-video-diffusion",
    category: "video",
  },
  {
    name: "Make-A-Video",
    description: "Meta's AI video generation model.",
    url: "https://make-a-video.meta.com",
    category: "video",
  },
  {
    name: "Wonder Studio",
    description: "AI-powered video character animation.",
    url: "https://wonder.studio",
    category: "video",
  },
  {
    name: "Runway",
    description: "AI video editing and generation tools.",
    url: "https://runway.video",
    category: "video",
  },
  {
    name: "Descript",
    description: "AI-powered video and podcast editing.",
    url: "https://descript.com",
    category: "video",
  },
  {
    name: "Filmora",
    description: "Video editing with AI features.",
    url: "https://filmora.wondershare.com",
    category: "video",
  },
  
  // Social Media
  {
    name: "Buffer",
    description: "Social media scheduling with AI tools.",
    url: "https://buffer.com",
    category: "social-media",
  },
  {
    name: "Hootsuite",
    description: "Social media management with AI insights.",
    url: "https://www.hootsuite.com",
    category: "social-media",
  },
  {
    name: "Sprout Social",
    description: "Social media management with AI analytics.",
    url: "https://sproutsocial.com",
    category: "social-media",
  },
  {
    name: "Later",
    description: "Instagram scheduling with AI features.",
    url: "https://later.com",
    category: "social-media",
  },
  {
    name: "Planoly",
    description: "Visual social media planner.",
    url: "https://planoly.com",
    category: "social-media",
  },
  {
    name: "Metricool",
    description: "Social media analytics and planning.",
    url: "https://metricool.com",
    category: "social-media",
  },
  {
    name: "Predis.ai",
    description: "AI-powered social media content creation.",
    url: "https://predis.ai",
    category: "social-media",
  },
  {
    name: "Flick",
    description: "AI hashtags and content planning.",
    url: "https://www.flick.social",
    category: "social-media",
  },
  {
    name: "Vista Social",
    description: "Social media management platform.",
    url: "https://vistasocial.com",
    category: "social-media",
  },
  {
    name: "Publer",
    description: "Social media scheduling and analytics.",
    url: "https://publer.com",
    category: "social-media",
  },
  
  // Sales
  {
    name: "Salesforce",
    description: "CRM with AI-powered sales tools.",
    url: "https://www.salesforce.com",
    category: "sales",
  },
  {
    name: "HubSpot CRM",
    description: "Free CRM with AI features.",
    url: "https://www.hubspot.com/products/crm",
    category: "sales",
  },
  {
    name: "Pipedrive",
    description: "CRM for sales teams with AI.",
    url: "https://www.pipedrive.com",
    category: "sales",
  },
  {
    name: "HubSpot Sales Hub",
    description: "Sales automation with AI.",
    url: "https://www.hubspot.com/products/sales",
    category: "sales",
  },
  {
    name: "Gong",
    description: "Revenue intelligence with AI analysis.",
    url: "https://www.gong.io",
    category: "sales",
  },
  {
    name: "ZoomInfo",
    description: "B2B database with AI insights.",
    url: "https://www.zoominfo.com",
    category: "sales",
  },
  {
    name: "Clearbit",
    description: "B2B data enrichment platform.",
    url: "https://clearbit.com",
    category: "sales",
  },
  {
    name: "Clay",
    description: "Data enrichment with AI automation.",
    url: "https://www.clay.com",
    category: "sales",
  },
  {
    name: "Apollo.io",
    description: "Sales intelligence platform.",
    url: "https://www.apollo.io",
    category: "sales",
  },
  {
    name: "Reply.io",
    description: "Sales engagement with AI.",
    url: "https://reply.io",
    category: "sales",
  },
  
  // Education
  {
    name: "Khanmigo",
    description: "AI tutor by Khan Academy.",
    url: "https://www.khan.org/khanmigo",
    category: "education",
  },
  {
    name: "Duolingo",
    description: "Language learning with AI features.",
    url: "https://www.duolingo.com",
    category: "education",
  },
  {
    name: "Coursera",
    description: "Online courses with AI recommendations.",
    url: "https://www.coursera.org",
    category: "education",
  },
  {
    name: "edX",
    description: "Online learning platform with AI tools.",
    url: "https://www.edx.org",
    category: "education",
  },
  {
    name: "Udacity",
    description: "Tech education with AI programs.",
    url: "https://www.udacity.com",
    category: "education",
  },
  {
    name: "MasterClass",
    description: "Online classes from experts.",
    url: "https://www.masterclass.com",
    category: "education",
  },
  {
    name: "Skillshare",
    description: "Creative skills with AI tools.",
    url: "https://www.skillshare.com",
    category: "education",
  },
  {
    name: "Brilliant",
    description: "Interactive learning with AI assistance.",
    url: "https://brilliant.org",
    category: "education",
  },
  {
    name: "Photomath",
    description: "Math learning with AI-powered explanations.",
    url: "https://photomath.com",
    category: "education",
  },
  {
    name: "Socratic",
    description: "AI-powered learning companion.",
    url: "https://socratic.org",
    category: "education",
  },
  {
    name: "Quizlet",
    description: "Learning with AI-powered study tools.",
    url: "https://quizlet.com",
    category: "education",
  },
  {
    name: "Chegg",
    description: "Study help with AI tutoring.",
    url: "https://www.chegg.com",
    category: "education",
  },
  
  // Email
  {
    name: "Superhuman",
    description: "AI-powered email client.",
    url: "https://superhuman.com",
    category: "email",
  },
  {
    name: "Shortwave",
    description: "AI email client for teams.",
    url: "https://shortwave.com",
    category: "email",
  },
  {
    name: "SaneBox",
    description: "AI email filtering and organization.",
    url: "https://sanebox.com",
    category: "email",
  },
  {
    name: "Clean Email",
    description: "Email management with AI.",
    url: "https://clean.email",
    category: "email",
  },
  {
    name: "Unroll.me",
    description: "Email subscription management.",
    url: "https://unroll.me",
    category: "email",
  },
  {
    name: "Mailbox",
    description: "Email organization with AI.",
    url: "https://mailbox.org",
    category: "email",
  },
  {
    name: "Postbox",
    description: "Desktop email client.",
    url: "https://postbox-inc.com",
    category: "email",
  },
  {
    name: "eM Client",
    description: "Desktop email client with AI features.",
    url: "https://www.emclient.com",
    category: "email",
  },
  {
    name: "Polymail",
    description: "Email for teams with AI.",
    url: "https://polymail.io",
    category: "email",
  },
  {
    name: "Missive",
    description: "Team email with collaboration.",
    url: "https://missiveapp.com",
    category: "email",
  },
  
  // Website Builders
  {
    name: "Wix",
    description: "Website builder with AI features.",
    url: "https://www.wix.com",
    category: "website-builders",
  },
  {
    name: "Squarespace",
    description: "Website builder with AI tools.",
    url: "https://www.squarespace.com",
    category: "website-builders",
  },
  {
    name: "Shopify",
    description: "E-commerce with AI-powered tools.",
    url: "https://www.shopify.com",
    category: "website-builders",
  },
  {
    name: "WordPress",
    description: "CMS with AI plugins and features.",
    url: "https://wordpress.org",
    category: "website-builders",
  },
  {
    name: "Webflow",
    description: "Professional website builder.",
    url: "https://webflow.com",
    category: "website-builders",
  },
  {
    name: "Framer",
    description: "Design and publish websites.",
    url: "https://www.framer.com",
    category: "website-builders",
  },
  {
    name: "Carrd",
    description: "Simple one-page websites.",
    url: "https://carrd.co",
    category: "website-builders",
  },
  {
    name: "Notion",
    description: "Website builder from Notion pages.",
    url: "https://www.notion.so/publish",
    category: "website-builders",
  },
  
  // Developer APIs
  {
    name: "OpenAI API",
    description: "Access to GPT and other AI models.",
    url: "https://platform.openai.com",
    category: "developer-apis",
  },
  {
    name: "Anthropic API",
    description: "Claude AI model API.",
    url: "https://www.anthropic.com/api",
    category: "developer-apis",
  },
  {
    name: "Stability AI API",
    description: "Image generation API.",
    url: "https://api.stability.ai",
    category: "developer-apis",
  },
  {
    name: "Hugging Face Inference",
    description: "ML models API.",
    url: "https://huggingface.co/inference",
    category: "developer-apis",
  },
  {
    name: "Replicate API",
    description: "Run ML models via API.",
    url: "https://replicate.com/docs",
    category: "developer-apis",
  },
  {
    name: "Cohere",
    description: "Large language model API.",
    url: "https://cohere.com",
    category: "developer-apis",
  },
  {
    name: "AI21 Labs",
    description: "Language model API.",
    url: "https://www.ai21.com",
    category: "developer-apis",
  },
  {
    name: "Anthropic",
    description: "AI language models for developers.",
    url: "https://anthropic.com",
    category: "developer-apis",
  },
  {
    name: "DeepInfra",
    description: "Serverless inference API.",
    url: "https://deepinfra.com",
    category: "developer-apis",
  },
  {
    name: "Together AI",
    description: "AI model hosting and API.",
    url: "https://together.ai",
    category: "developer-apis",
  },
  
  // SEO
  {
    name: "Ahrefs",
    description: "SEO toolkit with AI analysis.",
    url: "https://ahrefs.com",
    category: "seo",
  },
  {
    name: "SEMrush",
    description: "SEO and content marketing platform.",
    url: "https://www.semrush.com",
    category: "seo",
  },
  {
    name: "Moz Pro",
    description: "SEO software with AI insights.",
    url: "https://moz.com/products/pro",
    category: "seo",
  },
  {
    name: "Screaming Frog",
    description: "SEO crawler with AI features.",
    url: "https://www.screamingfrog.co.uk",
    category: "seo",
  },
  {
    name: "Ubersuggest",
    description: "SEO tool with AI-powered insights.",
    url: "https://neilpatel.com/ubersuggest",
    category: "seo",
  },
  {
    name: "AnswerThePublic",
    description: "SEO content research with AI.",
    url: "https://answerthepublic.com",
    category: "seo",
  },
  {
    name: "AlsoAsked",
    description: "Question-based SEO research.",
    url: "https://alsoasked.com",
    category: "seo",
  },
  {
    name: "Clearscope",
    description: "Content optimization for SEO.",
    url: "https://www.clearscope.com",
    category: "seo",
  },
  {
    name: "Surfer SEO",
    description: "AI-powered SEO content tool.",
    url: "https://surferseo.com",
    category: "seo",
  },
  {
    name: "MarketMuse",
    description: "AI content planning for SEO.",
    url: "https://www.marketmuse.com",
    category: "seo",
  },
];

async function main() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Clear existing data
    await prisma.tool.deleteMany({});
    await prisma.submission.deleteMany({});
    console.log('✅ Cleared existing data\n');

    let successCount = 0;
    let errorCount = 0;

    for (const tool of aiTools) {
      try {
        const logoUrl = generateLogoUrl(tool.url);
        const screenshotUrl = generateScreenshotUrl(tool.url);
        const category = mapCategoryToId(tool.category);

        await prisma.tool.create({
          data: {
            name: tool.name,
            description: tool.description,
            url: tool.url,
            category,
            logoUrl,
            screenshotUrl,
            views: Math.floor(Math.random() * 1000) + 100,
            isApproved: true,
          },
        });

        successCount++;
        process.stdout.write(`\r📦 Seeding: ${successCount}/${aiTools.length} tools`);
      } catch (error) {
        errorCount++;
        console.error(`\n❌ Failed to seed ${tool.name}:`, (error as Error).message);
      }
    }

    console.log('\n\n✅ Seeding completed!');
    console.log(`   - Successfully seeded: ${successCount} tools`);
    console.log(`   - Failed to seed: ${errorCount} tools`);

  } catch (error) {
    console.error('❌ Seeding failed:', (error as Error).message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
