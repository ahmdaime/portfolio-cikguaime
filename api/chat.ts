import type { VercelRequest, VercelResponse } from '@vercel/node';

// Gemini API endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Rate limiting: Simple in-memory store (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function getRateLimitKey(req: VercelRequest): string {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket?.remoteAddress || 'unknown';
    return ip;
}

function isRateLimited(key: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }

    if (record.count >= RATE_LIMIT) {
        return true;
    }

    record.count++;
    return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check rate limit
    const rateLimitKey = getRateLimitKey(req);
    if (isRateLimited(rateLimitKey)) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    // Get API key from environment variable (set in Vercel Dashboard)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('GEMINI_API_KEY not configured');
        return res.status(500).json({ error: 'API not configured' });
    }

    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Limit message length to prevent abuse
        if (message.length > 1000) {
            return res.status(400).json({ error: 'Message too long (max 1000 characters)' });
        }

        // System prompt for the chatbot
        const systemPrompt = `Anda adalah pembantu AI untuk laman web portfolio Cikgu Aime, seorang guru inovatif di Malaysia yang membangunkan extension Chrome untuk memudahkan kerja guru.

Maklumat penting:
- Cikgu Aime membangunkan extension seperti MOIES Helper, IDME PBD, dan PBD OnePage
- Extension ini membantu guru mengautomasikan kerja seperti mengisi kehadiran, PBD, dan pengurusan data
- Lebih 10,000 guru menggunakan extension beliau

Jawab dalam Bahasa Malaysia dengan mesra dan profesional. Bantu pengunjung memahami tentang Cikgu Aime dan extension yang dibangunkan.`;

        // Call Gemini API
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: `${systemPrompt}\n\nSoalan pengguna: ${message}` }]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                }
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Gemini API error:', errorData);
            return res.status(500).json({ error: 'Failed to get AI response' });
        }

        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, saya tidak dapat menjawab soalan anda.';

        return res.status(200).json({ response: aiResponse });

    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
