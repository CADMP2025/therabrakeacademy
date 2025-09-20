import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { content, type = 'auto' } = await request.json()
    
    // Intelligent content processing
    const processors = {
      // Detect Word/Google Docs formatting
      detectFormat: (text) => {
        const hasWordStyles = /mso-|MsoNormal/.test(text)
        const hasGoogleStyles = /docs-internal/.test(text)
        return { isWord: hasWordStyles, isGoogle: hasGoogleStyles }
      },
      
      // Clean Word/Google formatting
      cleanFormatting: (text) => {
        // Remove Word-specific tags
        text = text.replace(/<o:p\s*\/?>|<\/o:p>/g, '')
        text = text.replace(/<!--\[if[^\]]*\]>.*?<!\[endif\]-->/gs, '')
        text = text.replace(/mso-[^;"']*/g, '')
        
        // Remove excessive spans
        text = text.replace(/<span[^>]*>(.*?)<\/span>/gi, '$1')
        
        // Clean empty paragraphs
        text = text.replace(/<p[^>]*>[\s&nbsp;]*<\/p>/gi, '')
        
        return text
      },
      
      // Format headings with hierarchy detection
      headings: (text) => {
        // Detect heading patterns
        text = text.replace(/^#{1}\s+(.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-4 mt-8">$1</h1>')
        text = text.replace(/^#{2}\s+(.+)$/gm, '<h2 class="text-2xl font-bold text-gray-800 mb-3 mt-6">$2</h2>')
        text = text.replace(/^#{3}\s+(.+)$/gm, '<h3 class="text-xl font-semibold text-gray-700 mb-2 mt-4">$1</h3>')
        
        // Also detect ALL CAPS as headings
        text = text.replace(/^([A-Z\s]{5,})$/gm, '<h2 class="text-2xl font-bold text-gray-800 mb-3 mt-6">$1</h2>')
        
        return text
      },
      
      // Enhanced list formatting
      lists: (text) => {
        // Bullet lists with various markers
        text = text.replace(/^[\*\-\•]\s+(.+)$/gm, '<li class="ml-6 mb-2 flex items-start"><span class="text-blue-500 mr-2">•</span><span>$1</span></li>')
        
        // Numbered lists
        let listCounter = 0
        text = text.replace(/^\d+[\.\)]\s+(.+)$/gm, (match, p1) => {
          listCounter++
          return `<li class="ml-6 mb-2 flex items-start"><span class="text-blue-500 font-semibold mr-2">${listCounter}.</span><span>${p1}</span></li>`
        })
        
        // Wrap consecutive li elements in ul
        text = text.replace(/(<li.*?<\/li>\n?)+/g, (match) => {
          return `<ul class="space-y-2 my-4">${match}</ul>`
        })
        
        return text
      },
      
      // Format tables
      tables: (text) => {
        // Detect pipe-separated tables
        const tableRegex = /\|(.+)\|[\r\n]+\|[-\s|]+\|[\r\n]+((\|.+\|[\r\n]*)+)/gm
        text = text.replace(tableRegex, (match, header, separator, body) => {
          const headers = header.split('|').filter(h => h.trim())
          const rows = body.trim().split('\n').map(row => 
            row.split('|').filter(cell => cell.trim())
          )
          
          let table = '<table class="min-w-full divide-y divide-gray-200 my-4">'
          table += '<thead class="bg-gray-50"><tr>'
          headers.forEach(h => {
            table += `<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${h.trim()}</th>`
          })
          table += '</tr></thead><tbody class="bg-white divide-y divide-gray-200">'
          
          rows.forEach(row => {
            if (row.length > 0) {
              table += '<tr>'
              row.forEach(cell => {
                table += `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${cell.trim()}</td>`
              })
              table += '</tr>'
            }
          })
          
          table += '</tbody></table>'
          return table
        })
        
        return text
      },
      
      // Format paragraphs
      paragraphs: (text) => {
        const lines = text.split('\n')
        const processedLines = lines.map(line => {
          // Skip if already formatted
          if (line.startsWith('<') || line.trim() === '') {
            return line
          }
          
          // Check for key terms to highlight
          line = line.replace(/\b(IMPORTANT|NOTE|WARNING|TIP):/gi, 
            '<strong class="text-orange-600">$1:</strong>')
          
          return `<p class="text-gray-700 mb-4 leading-relaxed">${line}</p>`
        })
        return processedLines.join('\n')
      },
      
      // Detect and format links
      links: (text) => {
        const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
        return text.replace(urlRegex, '<a href="$&" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener">$&</a>')
      },
      
      // Format quotes
      quotes: (text) => {
        // Block quotes
        text = text.replace(/^>\s+(.+)$/gm, 
          '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-600">$1</blockquote>')
        
        // Inline quotes
        text = text.replace(/"([^"]+)"/g, '<q class="text-gray-700 italic">"$1"</q>')
        
        return text
      },
      
      // Clean up
      cleanup: (text) => {
        // Remove excessive line breaks
        text = text.replace(/\n{3,}/g, '\n\n')
        
        // Remove trailing whitespace
        text = text.replace(/[ \t]+$/gm, '')
        
        return text.trim()
      }
    }
    
    // Process content through all processors
    let processed = content
    const format = processors.detectFormat(processed)
    
    if (format.isWord || format.isGoogle) {
      processed = processors.cleanFormatting(processed)
    }
    
    processed = processors.headings(processed)
    processed = processors.lists(processed)
    processed = processors.tables(processed)
    processed = processors.quotes(processed)
    processed = processors.links(processed)
    processed = processors.paragraphs(processed)
    processed = processors.cleanup(processed)
    
    // Analyze content structure
    const structure = {
      format: format,
      hasHeadings: /<h[1-3]/.test(processed),
      hasLists: /<li/.test(processed),
      hasTables: /<table/.test(processed),
      hasLinks: /<a/.test(processed),
      hasQuotes: /<blockquote|<q/.test(processed),
      wordCount: content.split(/\s+/).length,
      estimatedReadTime: Math.ceil(content.split(/\s+/).length / 200),
      paragraphCount: (processed.match(/<p/g) || []).length,
      
      // CE requirements check
      meetsMinimumContent: content.split(/\s+/).length >= 500,
      suggestedCEHours: Math.ceil(content.split(/\s+/).length / 3000)
    }
    
    return NextResponse.json({
      formatted: processed,
      structure,
      success: true,
      suggestions: {
        needsMoreContent: structure.wordCount < 500,
        suggestedModules: Math.ceil(structure.wordCount / 1500),
        recommendedQuizQuestions: Math.ceil(structure.wordCount / 500)
      }
    })
  } catch (error) {
    console.error('Processing error:', error)
    return NextResponse.json(
      { error: 'Processing failed', details: error.message },
      { status: 500 }
    )
  }
}
