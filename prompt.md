Hey, act as senior prompt engineer best to give the prompt for the github copilot.
Build a premium, interactive portfolio for a Senior AI Engineer showcasing cutting-edge 3D visuals, AI-powered features, and professional credibility. The portfolio should demonstrate expertise in full-stack development, AI/ML systems, and modern web technologies.

🎯 Branding & Feel
Classy, sleek, futuristic → aurora backgrounds, glowing gradients, subtle 3D effects.
Smooth page transitions (Framer Motion style).
Clear hierarchy → recruiter-friendly but visually striking.

🎯 Design Vision
Theme: Classy, sleek, futuristic with aurora backgrounds, glowing gradients, subtle 3D effects
Feel: Professional credibility balanced with modern 3D visuals
Transitions: Smooth page transitions (Framer Motion style)
Hierarchy: Recruiter-friendly but visually striking
Interactive Elements: 3D visuals and elements

Aim:
I am planning to build my portfolio as I am a senior AI engineer with the backend knowledge and few about frontend as well. The portfolio will have AI Chat assistant in the Hero Section.
For now, we can have a 2Layered into the Hero Section so that in the second grid I can do mostly the AI related stuffs that I want to do.
Use a glassmorphism + gradient + dark/light toggle theme with 3D React Three Fiber visuals, smooth animations, and modern typography. The site should be designed for desktop-first with responsive mobile layouts.

Also for the Portfolio techstack that I have choosen is:
##Frontend (UI & Interactivity)
#Framework: Next.js 15 (with React Server Components App Router → modern, fast, SEO-friendly)
#Styling: TailwindCSS + Framer Motion (for animations & sleek interactions) + shadcn/ui (for modern, sleek UI)
#UI Library: shadcn/ui (super trending right now for polished UI components)
#3D/Visuals: Three.js or R3F (React Three Fiber)  3D effects in hero sections + Drei (helpers) + GSAP (for hero animations)
AI Layer: LangChain + Gemini API (can start with local resume.json JSON)

Also, the color theme that I have decided for now are:
- Primary Dark / Background / Headers: #111827
- Secondary Neutral / Background Sections: #F5F5F5
- Text Neutral / Secondary Elements: #2A3138 
- Primary Brand Color: #4A90E2 → Trust, tech, buttons, links
- Secondary Brand Color: #7D5BA6 → Sophisticated purple, AI/futuristic touch
- Highlight 1: #FEE440 → Yellow, sparingly for CTAs & hover states
- Highlight 2: #F15BB5 → Creative pink accent for micro-details
- Highlight 3: #E74C3C → Vermilion red for urgency / accent grabs

🔹 Site Requirements
Desktop-first responsive layout, mobile-optimized.
Smooth transitions (Framer Motion or Tailwind transitions).
Glassmorphism + gradient accents for cards, modals, and chat panel.
3D only for Hero Orb and Chat background visuals and About Me.
Use Gemini API for AI Chat (API key included).
Structure: /src/app with routes for each section; /components for reusable UI.
State management with Zustand for chat open/close.

AI/Smart Features (to stand out)
Add an AI-powered chatbot/assistant about your portfolio using:
LangChain + Gemini API + resume.json + prompt for enhancing the RAG from the JSON(resume.json)
curl:
curl --location 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent' \
--header 'Content-Type: application/json' \
--header 'X-goog-api-key: AIzaSyCaCu-9OPiDghi1NxxcHnJYJU2bb9Xv0oE' \
--data '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'
Response:
{
    "candidates": [
        {
            "content": {
                "parts": [
                    {
                        "text": "**AI learns from data to find patterns and make predictions.**"
                    }
                ],
                "role": "model"
            },
            "finishReason": "STOP",
            "index": 0
        }
    ],
    "usageMetadata": {
        "promptTokenCount": 8,
        "candidatesTokenCount": 12,
        "totalTokenCount": 1347,
        "promptTokensDetails": [
            {
                "modality": "TEXT",
                "tokenCount": 8
            }
        ],
        "thoughtsTokenCount": 1327
    },
    "modelVersion": "gemini-2.5-pro",
    "responseId": "CxvQaNeDJcvQz7IP-_GiyAs"
}
Could make it answer Qs like: “What projects has Sujit built in AI/Full Stack?”
AI-enhanced search for projects (semantic search from resume.json to format the answer, and also give the prompt along with Query to AI for enhancing the output quality.)
AI Features (My USP)
🔹 RAG-powered AI Chat
Knowledge Base: Your detailed resume + project docs embedded in vector DB
Chat: Conversational UI that doesn’t look like Slack — think:
Floating assistant with animated avatar (3D or Lottie)
Contextual responses (“Ask me about Sujit’s AI projects, Skills, or Experience)
UI Upgrade: Instead of simple text messages → include cards, images, project previews, and links in responses.
Fallback for AI: Use gemini 2.5 Pro as primary model and use 2.5 flash model as the fallback but make sure the Response from the AI is not very verbose, and it should also be able to handle questions like "What is the total experience in AWS?" and respond with correct answer saying "2years in AWS and further explaining where and how AWS is used"


Portfolio Ideas with This Stack
Interactive Resume → looks like an app, not just static text.
AI Chatbot Guide → visitors can “chat” with your resume/projects.
Dark/Light Mode + Sleek/Cool UI → very modern.

3D & Visual Enhancements
To make it wow-factor classy:
Hero Section (Landing)
Your name/logo floating in 3D space with particles orbiting (R3F + Drei + shader effects)
Subtle parallax scroll effect
Animated tagline with gradient glow

Projects Section
Instead of plain grids → 3D rotating cards or a carousel with tilt effects
Each card opens with a glassmorphism modal that contains project details, code links, and maybe a mini-demo

AI Chat Assistant
Can appear as a 3D hologram/avatar in the 2nd Grid Layout in the Hero Section (React Three Fiber model)
When speaking, the avatar’s mouth animates (sync with speech synthesis)
Alternate idea: A liquid/glass orb assistant that pulses with AI activity
🔹 Chat Section (Text-to-Text First, Modern UI)

Instead of classic “chat bubbles”:
3D Orb Assistant
A floating, glowing orb in bottom-right.
Orb reacts (pulsates, changes colors, emits particles) when thinking/responding.
Chat opens as a sleek side panel with glassmorphism background and animation of unfolding from the ORB, not a plain window in the Hero Section with z-index in the second grid layout.

Message UI Upgrade
Instead of plain text → AI responses can include:
Cards with project previews
Clickable tags (“Tell me about AI Projects”, “Show me Full-Stack Work”)
Animated typing indicators (start with basic “…” in animating).
3D Chat Context
Background could have subtle animated waves/particles behind the chat panel. THe chat panel should have enough blurr to not mixup with other UI elements in the background.
User messages could “float up” as glowing chips, AI messages “slide in” as expanding hologram-like cards.
Background
Dynamic particle system or gradient waves (R3F shaders)
Aurora-like effect for classy vibes

Development Strategy
Scaffold with Next.js + Tailwind + shadcn/ui
Add Framer Motion transitions → polish navigation
Integrate R3F for hero visuals → keep performance in check (optimize with drei helpers + lazy loading)
Build AI chat as a standalone component → text → avatar integration
Incrementally enhance with 3D visuals Elements and 3D avatar

Suggested Page Flow: Screen count: 5 (desktop-first)
- Home (Hero) → 3D Name Animation + Call to Action: AI Chat → RAG assistant (chat/text) about your work from the resume.json
- About Me → Interactive timeline of career (scroll reveals animations) + Subtle 3D background wave.
- Experience → 3D cards with hover tilt 
- Projects → AI explanations on click
- Contact → Sleek form + floating 3D elements + Why to work with me card

Screen count: 5 (desktop-first)
#Home
Background: Aurora gradient + floating 3D particles.
Left:
H1: “Sujit Barnwal”
Subtitle: “Senior Full-Stack & AI Engineer — building scalable systems and intelligent assistants.”
Short bio (resume summary).
Quick impact metrics as glowing chips:
    “60% faster HR screening”
    “95%+ doc Q&A accuracy”
    “13% fraud reduction”
CTA buttons:
“Explore Projects” (primary)
“Chat with AI Assistant” (secondary → opens chat panel in the Right-2nd grid with z-index from the ORB as it should look like ORB is unfolded into chat section).
Right:
Placeholder 3D Looking ORB (spinning in Axis loop, orbiting animation) and when clicked on it opens in unfold animation and AI chat window shows up.

#About Me
A brief narrative about Sujit's passion for bridging backend engineering with advanced AI.
Background: Subtle 3D background wave.
Split layout:
Left: illustrated/AI-generated portrait of Sujit (Place an Temporary Image sujit_0.jpg).
Right: summary from resume + skill tags.
A well-organized grid or list displaying his technical skills:
Programming Languages: Python, JavaScript
Web Development: FastAPI, Flask, Django, Node.js, ReactJS, Tailwind CSS
AI/LLM Systems: RAG & GraphRAG, Multi-Agent Architectures, Prompt Engineering, Open-Source Model Deployment (Llama, Mistral), LangChain, LlamaIndex
Databases & Storage: PostgreSQL, MongoDB, Redis, PG-Vector, AWS S3
DevOps & MLOps: AWS, GCP, Docker, CI/CD, Observability (Prometheus, Grafana)
Skill Tag chips (glow on hover): Python, FastAPI, RAG/GraphRAG, LangChain, Multi-Agent Systems, Node.js, PostgreSQL, AWS, Express.js, Docker, Monitoring (Prometheus, Grafana), etc.
Subtle 3D background wave but should continue with Hero Section colors so that it does not looks like a cut-off.
For the Skills Chip strictly do not implement any percentage sliders for the skills.
Tag style: pill-shaped, brand gradient border, hover glow.

#Experience
Interactive Vertical timeline with expandable job cards (alternating left/right):
- Servify - (Product Engineer II) - (July 2024 – Present)
    - AI HR screening tool (reduced manual screening by 60%).
    - Document intelligence AI assistants (95%+ response accuracy).
    - Multi-agent diagnostic assistant (cut fraudulent claims by 13%).
    - AI Chat Based claim filing framework ((reduced manual adjudication by 65%) + (boosting CSAT from 3.8 to 4.2))
- Unico Connect - (Software Engineer) - (Aug 2023 - July 2024)
    - Led backend development (improved delivery speed by 37%)
    - Optimized database architecture (boosted API performance by 66%)
    - Integrated key third-party platforms (Salesforce, Zendesk, JIRA)
- Sankey Solutions - (Solution Analyst) - (July 2021 - July 2023)
    - Spearheaded 3 full-stack projects (Node.js, Django)
    - Improved system performance metrics (by 50%)
    - Mentored teams and ensured 100% on-time project delivery
Each card opens glass modal → Impact (metrics) + Tech stack tags. 
Background: Add a 3D visual particle moment with aurora gradients in the section to match the above about me page effect.

#Projects
Project visuals: abstract mockups, Skills Chip icons.
Each project card includes "Ask AI for Details" button that opens chat with contextual information.
A grid of project cards with a title, short description, technologies used.
Also, show only the All section to be default selected and show only top 6 projects.
Filter Categories:
    All
    AI / ML
    Backend Development
    FullStack Development
Project Cards:
1. AI Resume Analyzer
Description: AI-powered HR screening platform that automates candidate ranking and matching to job descriptions.
Technologies: Python, FastAPI, RAG/GraphRAG, PG-Vector
Domain: AI / ML
Indicator: Servify
[CTA Button: Ask details to AI]
AI Explanation (for modal):
What it is: An intelligent HR screening tool designed to streamline the hiring process. It uses advanced RAG (Retrieval-Augmented Generation) and GraphRAG techniques to analyze resumes, enabling recruiters to perform interactive Q&A, rank candidates automatically, and match them precisely against job descriptions.
Impact: This platform significantly accelerated the recruitment cycle by reducing manual screening time by 60%, allowing the HR team to focus on qualified candidates.
Tech Stack: Python, FastAPI, Streamlit for the UI, LangChain, RAG/GraphRAG, Hugging Face Transformers, and PostgreSQL with the PG-Vector extension for efficient similarity search.

2. Document Intelligence Assistants
Description: Chat-based AI assistant providing highly accurate answers from large legal and HR documents.
Technologies: LangChain, Vector DBs, Mem0, Python
Domain: AI / ML
Indicator: Servify
[CTA Button: Ask details to AI]
AI Explanation (for modal):
What it is: A sophisticated Q&A system that allows users to "chat" with their documents. It leverages optimized context memory (Mem0) and vector retrieval to parse and understand vast amounts of information from legal or HR files.
Impact: Delivered 95%+ response accuracy, providing reliable and instant answers that previously required hours of manual document review.
Tech Stack: Python, LangChain for orchestration, optimised context memory (Mem0), PG-Vector/Redis for vector storage, Tesseract and PyPDF2 for document parsing, and AWS S3 for storage.

3. AI Device Diagnostics Assistant
Description: A multi-agent, multimodal system to detect device issues and identify fraudulent claims.
Technologies: FastAPI, Multi-Agent Orchestration, Prompt Engineering
Domain: AI / ML
Indicator: Servify
[CTA Button: Ask details to AI]
AI Explanation (for modal):
What it is: A custom diagnostic system that uses multiple specialized AI agents working together to analyze both functional and physical device issues. It can process different data types (multimodal) to make highly accurate assessments.
Impact: A key project for the business that reduced fraudulent claims by 13% and significantly boosted Customer Satisfaction (CSAT) scores from 3.8 to 4.2.
Tech Stack: Python, FastAPI, a custom multi-agent orchestration framework, advanced prompt-tuning techniques, vLLM, and OpenAI APIs.

4. AI Claims Assistant
Description: Automated claim filing system using a multi-agent framework to reduce manual work.
Technologies: LLM Fine-Tuning, OpenLit, Prometheus, Grafana
Domain: AI / ML
Indicator: Servify
[CTA Button: Ask details to AI]
AI Explanation (for modal):
What it is: An end-to-end automated system for processing claims. It uses a custom framework to coordinate multiple AI agents, each fine-tuned on open-source LLMs for specific tasks in the adjudication workflow.
Impact: Revolutionized the claims process by reducing manual adjudication by 65%, leading to much faster customer turnaround times.
Tech Stack: Python, LLM Factory for fine-tuning, custom agent framework, and a full observability stack with OpenLit, Prometheus, and Grafana for monitoring and reliability.

5. Multi-Tenant SaaS Platform
Description: Scalable SaaS platform with deep integrations into Salesforce, Zendesk, and JIRA.
Technologies: Node.js, Express, MySQL, React.js, AWS
Domain: FullStack Development
Indicator: Backend Development
[CTA Button: Ask details to AI]
AI Explanation (for modal):
What it is: A robust, scalable Software-as-a-Service platform built for multiple clients (multi-tenancy). It features secure authentication, Role-Based Access Control (RBAC), and daily data synchronization with external services.
Impact: Streamlined client workflows by centralizing data and providing a single source of truth, integrating seamlessly with essential business tools like Salesforce, Zendesk, and JIRA.
Tech Stack: Node.js, Express.js, React.js, MySQL, PostgreSQL, Redis, Docker, and various AWS services (EC2, SQS, S3, Lambda).

6. B2B E-Commerce Platform
Description: Full-featured B2B e-commerce solution with advanced order workflows and admin management.
Technologies: Node.js, MongoDB, Stripe
Domain: Backend Development
Indicator: Unico Connect
[CTA Button: Ask details to AI]
AI Explanation (for modal):
What it is: A comprehensive B2B platform managing the entire e-commerce lifecycle, from user onboarding and complex order/return workflows to a dedicated Admin Web App for client and product management.
Impact: Provided a powerful, custom e-commerce solution for a B2B client, enabling them to manage their operations efficiently online.
Tech Stack: MERN Stack (MongoDB, Express.js, React.js, Node.js), Stripe for payments, and custom API architecture.

7. FSE SaaS Platform
Description: Low-code/no-code platform for Field Service Engineers built with the MERN stack.
Technologies: MERN Stack, RESTful APIs, JSON Scripting
Domain: FullStack Development
Indicator: Sankey Solutions
[CTA Button: Ask details to AI]
AI Explanation (for modal):
What it is: A flexible low-code/no-code platform that allows for the rapid development of applications for field service operations. I spearheaded its development, designing the core REST APIs and data validation logic.
Impact: Empowered the client to build and modify their own operational tools without extensive coding, improving agility and reducing development costs.
Tech Stack: MERN Stack (MongoDB, Express.js, React.js, Node.js), RESTful APIs, and JSON scripting for dynamic configurations.

8. HRMS Platform
Description: Built a comprehensive HRMS with CRUD operations, HR dashboards, RBAC, and document management; delivered full end-to-end development under tight timelines.
Technologies: Node.js, React, PostgreSQL, Azure, MongoDB, Sharepoint
Domain: FullStack Development
Indicator: Sankey Solutions
[CTA Button: Ask details to AI]
AI Explanation (for modal):
What it is: A complete Human Resource Management System featuring employee lifecycle management, role-based access control, interactive dashboards, and secure document handling. Developed as a full-stack solution with modern architecture patterns.
Impact: Centralized all HR operations into a single platform, improving HR efficiency by 80% and providing real-time insights through comprehensive dashboards and analytics.
Tech Stack: Node.js and Express.js for backend, React.js for frontend, MongoDB for data storage, AWS services for cloud infrastructure, JWT for authentication, and integrated document management system.

9. Reimbursement Platform
Description: Architected an advanced reimbursement system with currency conversion and timezone management; implemented triggers and conditional rules to streamline approval workflows.
Technologies: "Node.js", "Express.js", "PostgreSQL", "React", "Azure", "Sharepoint",
Domain: "FullStack Development",
Indicator: "Sankey Solutions",
[CTA Button: Ask details to AI]
AI Explanation (for modal):
What it is: A comprehensive reimbursement management system that handles complex business logic including multi-currency conversions, timezone-aware processing, and automated approval workflows. Built with modern full-stack architecture for scalability and maintainability.
Impact: "Streamlined the entire reimbursement process, reducing manual approval time by 70% and enabling seamless global operations with proper currency and timezone handling.
Tech Stack: Python, FastAPI for backend APIs, PostgreSQL for data persistence, React for frontend UI, Docker for containerization, and automated workflow engines for approval processes.

10. Multi-Biometric Authentication System
Description: Final Year Project using machine learning to create a secure, multi-factor authentication system.
Technologies: Machine Learning, Python
Domain: AI / ML
Indicator: Personal
[CTA Button: Ask details to AI]
AI Explanation (for modal):
What it is: My final year engineering project, this system combined multiple biometric inputs (like face and fingerprint data) to create a highly secure authentication process. It was an early exploration into applying ML for security.
Impact: Served as a foundational project that solidified my interest in machine learning and its practical applications. Achieved high accuracy in authentication trials.
Tech Stack: Python, Scikit-learn, and other machine learning libraries for model training and evaluation.

11. Travel Guide Website
Description: A dynamic, freelance-built travel website with cloud storage and serverless deployment.
Technologies: Django, PostgreSQL, AWS S3, Netlify
Domain: FullStack Development
Indicator: Personal
[CTA Button: Ask details to AI]
AI Explanation (for modal):
What it is: A freelance project to build a feature-rich travel website. The site was built on a robust backend framework and deployed using modern cloud infrastructure.
Impact: Delivered a complete, scalable web solution for a freelance client, showcasing my ability to manage a project from conception to deployment.
Tech Stack: Django, PostgreSQL, Amazon S3 for media storage, and deployed on Netlify for continuous integration and delivery.

#Contact & Footer
Glassmorphism form: Name, Email, Message.
Social links(Lets Connect): LinkedIn, GitHub, Email.
Include email address (sujitbarnwal23@gmail.com) and a link to his LinkedIn profile.
Why to work with me card.
Footer: minimal → quick links + theme toggle.

🎨 3D Visual Requirements
Hero Section 3D Elements
3D ORB Model: Create a glowing and spinning 3D orb which has elements around it reflecting that it is under process and learning.
Animation: Continuous axis rotation with subtle orbital movement and when clicked on CTA for AI to chat then it opens in unfolding animation with a chat interface where visitor can chat with my AI and resume about myself.
Particles: Aurora-style floating particles around 3D ord.
Performance: Optimize with lazy loading and Drei helpers

Chat Interface Specifications
Orb Behavior: Pulsates/changes colors when thinking/responding
Panel Design: UNfolds in from ORB with glassmorphism background and for the project and other section it just slides in from Right with the same matching consistent animation that we have in Hero Section.
Message Types:
User messages: Floating glowing chips
AI responses: Expanding hologram-like cards with rich content
Background: Subtle animated waves/particles behind chat panel
Position: For Hero section, it has to be in that second grid but for the rest pages or sections it has to be in the Right side of the UI.

Performance & Optimization
- Desktop-first responsive design but keep it mobile friendly
- Smooth 60fps animations
- Lazy loading for 3D models
- Optimized bundle sizes
- SEO-friendly with Next.js SSR

Accessibility & UX

Proper contrast ratios
Semantic HTML structure
Keyboard navigation support
Screen reader compatibility
Loading states for all async operations

Important:
All the files and models required are in the folder.
Smooth Transitions: Parallax scroll effects throughout site.
Portfolio has to be SEO friendly and optimised.

NOTE:
This portfolio is going to be in the hosted, and someones carrer relies on this so please make it the best possible in terms of decision.