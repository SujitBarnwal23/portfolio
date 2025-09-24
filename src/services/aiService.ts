import resumeData from "../../resume.json"

// Gemini API configuration
const GEMINI_API_KEY = "AIzaSyCaCu-9OPiDghi1NxxcHnJYJU2bb9Xv0oE"
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent"
const GEMINI_FLASH_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
    finishReason: string
  }>
  usageMetadata: {
    promptTokenCount: number
    candidatesTokenCount: number
    totalTokenCount: number
  }
}

// Enhanced system prompt with RAG context
const createSystemPrompt = () => {
  const resume = resumeData.resume
  
  return `You are Sujit Barnwal's AI assistant, designed to help visitors learn about his professional background, skills, and experience. You have access to his complete resume data and should provide accurate, helpful, and engaging responses.

ABOUT SUJIT:
- Name: ${resume.personal_information.name}
- Email: ${resume.personal_information.email}
- LinkedIn: ${resume.personal_information.linkedin}

PROFESSIONAL SUMMARY:
${resume.professional_summary}

WORK EXPERIENCE:
${resume.work_experience.map(exp => `
${exp.title} at ${exp.company} (${exp.dates})
Location: ${exp.location}
Key Responsibilities:
${exp.responsibilities.map(resp => `- ${resp}`).join('\n')}
`).join('\n')}

TECHNICAL SKILLS:
- Programming Languages: ${resume.technical_skills.programming_languages.join(', ')}
- Web Development: ${resume.technical_skills.web_development.join(', ')}
- AI/LLM Systems: ${resume.technical_skills.ai_llm_systems.join(', ')}
- Databases & Storage: ${resume.technical_skills.databases_storage.join(', ')}
- DevOps & MLOps: ${resume.technical_skills.devops_mlops.join(', ')}
- Other Tools: ${resume.technical_skills.other_tools_frameworks.join(', ')}

PROJECTS:
${resume.professional_project_experience.map(exp => `
${exp.role} at ${exp.company}:
${exp.projects.map(project => `- ${project.title}: ${project.description}`).join('\n')}
Technologies: ${exp.technologies_used.join(', ')}
`).join('\n')}

EDUCATION:
${resume.education.degree} from ${resume.education.university} (${resume.education.graduation_year})
CGPA: ${resume.education.cgpa}

ACHIEVEMENTS:
${resume.achievements.map(achievement => `- ${achievement}`).join('\n')}

CERTIFICATIONS:
${resume.certifications.map(cert => `- ${cert.name} (${cert.issuer})`).join('\n')}

INSTRUCTIONS:
1. Be conversational, friendly, and professional
2. Provide specific details when asked about projects, skills, or experience
3. Use the exact information from the resume data
4. If asked about metrics or achievements, include the specific numbers/percentages mentioned
5. When discussing technical skills, mention relevant experience levels and use cases
6. For project inquiries, describe both the technical implementation and business impact
7. Keep responses concise but informative (2-4 sentences unless more detail is specifically requested)
8. If asked about something not in the resume, politely redirect to available information
9. Encourage visitors to explore specific sections of the portfolio for more details
10. Use a tone that reflects Sujit's expertise while remaining approachable

Remember: You represent Sujit professionally, so maintain a confident but humble tone that showcases his expertise and achievements.`
}

// Function to create enhanced prompts for better responses
const enhanceUserQuery = (query: string, conversationHistory: ChatMessage[] = []) => {
  const context = conversationHistory.length > 0 
    ? `\n\nConversation Context:\n${conversationHistory.slice(-3).map(msg => `${msg.role}: ${msg.content}`).join('\n')}`
    : ''

  return `${createSystemPrompt()}

User Query: "${query}"${context}

Please provide a helpful response about Sujit Barnwal based on the resume information above. Be specific and use relevant details from his background.`
}

// Main AI chat function
export async function chatWithAI(
  message: string, 
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
    const enhancedPrompt = enhanceUserQuery(message, conversationHistory)
    
    // Try Gemini 2.5 Pro first
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: enhancedPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.log('Gemini Pro failed, falling back to Flash...', response.status, errorText)
      return await fallbackToFlash(enhancedPrompt)
    }

    const data = await response.json()
    console.log('Gemini Pro response:', data)
    
    // Enhanced validation for Pro model response
    if (!data.candidates || !Array.isArray(data.candidates) || data.candidates.length === 0) {
      console.log('No candidates from Pro, trying Flash...')
      return await fallbackToFlash(enhancedPrompt)
    }

    const candidate = data.candidates[0]
    if (!candidate || !candidate.content || !candidate.content.parts || 
        !Array.isArray(candidate.content.parts) || candidate.content.parts.length === 0) {
      console.log('Invalid Pro response structure, trying Flash...')
      return await fallbackToFlash(enhancedPrompt)
    }

    const firstPart = candidate.content.parts[0]
    if (!firstPart || !firstPart.text) {
      console.log('No text in Pro response part, trying Flash...')
      return await fallbackToFlash(enhancedPrompt)
    }

    return firstPart.text.trim()

  } catch (error) {
    console.error('AI Chat Error:', error)
    
    // Try fallback to Flash model
    try {
      console.log('Trying fallback to Flash due to error...')
      return await fallbackToFlash(enhanceUserQuery(message, conversationHistory))
    } catch (fallbackError) {
      console.error('All AI models failed:', fallbackError)
      
      // Provide specific fallback responses based on common queries
      const lowerMessage = message.toLowerCase()
      if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
        return "Sujit has 4+ years of experience as a Senior AI Engineer, currently working at Servify where he's built production-grade AI solutions that reduced manual work by 65% and achieved 95%+ accuracy. He's also worked at Unico Connect and Sankey Solutions, improving delivery speeds and system performance significantly."
      } else if (lowerMessage.includes('project') || lowerMessage.includes('built')) {
        return "Sujit has built impressive AI projects including an AI Resume Analyzer (60% faster screening), Document Intelligence Assistants (95%+ accuracy), AI Device Diagnostics (13% fraud reduction), and automated claims processing systems. He's also developed scalable SaaS platforms and B2B e-commerce solutions."
      } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
        return "Sujit's technical expertise includes Python, FastAPI, RAG/GraphRAG systems, multi-agent architectures, LangChain, React.js, Node.js, PostgreSQL, MongoDB, AWS, Docker, and advanced AI/ML technologies. He specializes in bridging backend engineering with AI solutions."
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
        return `You can contact Sujit at ${resumeData.resume.personal_information.email} or connect via LinkedIn: ${resumeData.resume.personal_information.linkedin}`
      } else {
        return "I'm experiencing some technical difficulties with the AI service right now. However, I can tell you that Sujit is a Senior AI Engineer with 4+ years of experience building production-grade AI solutions. Feel free to ask about his specific experience, projects, or technical skills, or try refreshing and asking again!"
      }
    }
  }
}

// Fallback function using Gemini Flash
async function fallbackToFlash(prompt: string): Promise<string> {
  try {
    const response = await fetch(GEMINI_FLASH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.6,
          topK: 32,
          topP: 0.9,
          maxOutputTokens: 512,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Flash API error response:', errorText)
      throw new Error(`Flash API error: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Flash API full response:', JSON.stringify(data, null, 2))
    
    // Enhanced validation with detailed logging
    if (!data) {
      console.error('No data received from Flash API')
      throw new Error('No data received from Flash model')
    }

    if (!data.candidates) {
      console.error('No candidates field in response:', data)
      throw new Error('No candidates field in Flash model response')
    }

    if (!Array.isArray(data.candidates) || data.candidates.length === 0) {
      console.error('Empty or invalid candidates array:', data.candidates)
      throw new Error('No candidates generated from Flash model')
    }

    const candidate = data.candidates[0]
    console.log('Candidate structure:', JSON.stringify(candidate, null, 2))
    
    // Check if candidate exists and is an object
    if (!candidate || typeof candidate !== 'object') {
      console.error('Invalid candidate object:', candidate)
      throw new Error('Invalid candidate object from Flash model')
    }

    // Check for content field
    if (!candidate.content) {
      console.error('No content in candidate:', candidate)
      
      // Check for alternative response structures
      if (candidate.text) {
        console.log('Found direct text field in candidate')
        return candidate.text.trim()
      }
      
      throw new Error('No content field in Flash model candidate')
    }

    // Check for parts field
    if (!candidate.content.parts) {
      console.error('No parts in candidate content:', candidate.content)
      
      // Check for direct text in content
      if (candidate.content.text) {
        console.log('Found direct text in content')
        return candidate.content.text.trim()
      }
      
      throw new Error('No parts field in Flash model response content')
    }

    // Check if parts is an array with content
    if (!Array.isArray(candidate.content.parts) || candidate.content.parts.length === 0) {
      console.error('Empty or invalid parts array:', candidate.content.parts)
      throw new Error('No text parts in Flash model response')
    }

    const firstPart = candidate.content.parts[0]
    if (!firstPart || !firstPart.text) {
      console.error('No text in first part:', firstPart)
      throw new Error('No text content in Flash model response part')
    }

    return firstPart.text.trim()
  } catch (error) {
    console.error('Fallback Flash error:', error)
    
    // Provide a graceful fallback instead of throwing
    console.log('Providing fallback response due to Flash model error')
    return "I'm experiencing some technical difficulties with the AI service right now. Please try asking your question again, or feel free to explore Sujit's portfolio sections for detailed information about his experience, projects, and skills."
  }
}

// Helper function to extract specific information from resume
export function getResumeSection(section: string): unknown {
  const resume = resumeData.resume
  
  switch (section.toLowerCase()) {
    case 'experience':
    case 'work':
      return resume.work_experience
    case 'skills':
    case 'technical':
      return resume.technical_skills
    case 'projects':
      return resume.professional_project_experience
    case 'education':
      return resume.education
    case 'achievements':
      return resume.achievements
    case 'certifications':
      return resume.certifications
    case 'personal':
      return resume.personal_information
    default:
      return resume
  }
}

// Quick response for common questions
export function getQuickResponse(query: string): string | null {
  const lowerQuery = query.toLowerCase()
  
  if (lowerQuery.includes('email') || lowerQuery.includes('contact')) {
    return `You can contact Sujit at ${resumeData.resume.personal_information.email} or connect via LinkedIn: ${resumeData.resume.personal_information.linkedin}`
  }
  
  if (lowerQuery.includes('experience') && lowerQuery.includes('years')) {
    return "Sujit has 4+ years of experience as a Senior Full-Stack & AI Engineer, specializing in building production-grade AI solutions and scalable backend systems."
  }
  
  if (lowerQuery.includes('current') && lowerQuery.includes('role')) {
    const currentRole = resumeData.resume.work_experience[0]
    return `Sujit is currently working as ${currentRole.title} at ${currentRole.company} since ${currentRole.dates}, where he builds production-grade AI solutions including RAG systems, multi-agent architectures, and document intelligence assistants.`
  }
  
  return null
}
