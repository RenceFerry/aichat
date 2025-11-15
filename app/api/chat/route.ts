import { NextResponse, NextRequest } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    contents: prompt,
  })

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response){
        controller.enqueue(chunk.text);
      }

      controller.close();
    }
  });

  return new NextResponse(stream, {
    headers: { "Content-Type": "text/plain" }
  });
}
