import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { content } = await request.json()
    
    // Process the content
    let formatted = content
    
    // Format headings
    formatted = formatted.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-neutral-dark mb-4">$1</h1>')
    formatted = formatted.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-neutral-dark mb-3">$1</h2>')
    formatted = formatted.replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-neutral-dark mb-2">$1</h3>')
    
    // Format lists
    formatted = formatted.replace(/^\* (.+)$/gm, '<li class="ml-6 mb-1">• $1</li>')
    formatted = formatted.replace(/^\d+\. (.+)$/gm, '<li class="ml-6 mb-1">$1</li>')
    
    // Format paragraphs
    const lines = formatted.split('\n')
    const processedLines = lines.map(line => {
      if (!line.startsWith('<')) {
        return `<p class="text-neutral-medium mb-4">${line}</p>`
      }
      return line
    })
    formatted = processedLines.join('\n')
    
    // Clean up
    formatted = formatted.replace(/\n{3,}/g, '\n\n').trim()
    
    return NextResponse.json({
      formatted,
      structure: {
        hasHeadings: /<h[1-3]/.test(formatted),
        hasLists: /<li/.test(formatted),
        wordCount: content.split(/\s+/).length
      },
      success: true
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Processing failed' },
      { status: 500 }
    )
  }
}
