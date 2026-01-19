import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import type { CustomerAvatar } from '@/types'

interface AvatarExportProps {
  avatar: CustomerAvatar
}

export function AvatarExport({ avatar }: AvatarExportProps) {
  const generatePDF = () => {
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Customer Avatar: ${avatar.name}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { color: #7C3AED; border-bottom: 4px solid #FFD700; padding-bottom: 10px; }
          h2 { color: #333; margin-top: 30px; border-left: 4px solid #7C3AED; padding-left: 10px; }
          .section { background: #f9f9f9; border: 2px solid #333; padding: 20px; margin: 15px 0; }
          .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
          .value { font-size: 16px; margin-top: 5px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .list { margin: 0; padding-left: 20px; }
          .list li { margin: 5px 0; }
          .badge { display: inline-block; background: #FFD700; border: 2px solid #333; padding: 4px 12px; margin: 4px; font-size: 12px; font-weight: bold; }
          .footer { margin-top: 40px; text-align: center; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>🎯 Customer Avatar: ${avatar.name}</h1>
        
        <div class="section">
          <div class="grid">
            <div>
              <p class="label">Age Range</p>
              <p class="value">${avatar.ageRangeStart || 25} - ${avatar.ageRangeEnd || 55} years</p>
            </div>
            <div>
              <p class="label">Gender</p>
              <p class="value">${avatar.gender || 'All'}</p>
            </div>
            <div>
              <p class="label">Location</p>
              <p class="value">${avatar.location || 'Not specified'}</p>
            </div>
            <div>
              <p class="label">Income Level</p>
              <p class="value">${avatar.incomeLevel || 'Not specified'}</p>
            </div>
            <div>
              <p class="label">Job Title</p>
              <p class="value">${avatar.jobTitle || 'Not specified'}</p>
            </div>
            <div>
              <p class="label">Industry</p>
              <p class="value">${avatar.industry || 'Not specified'}</p>
            </div>
          </div>
        </div>

        ${avatar.goals?.length ? `
        <h2>🎯 Goals</h2>
        <div class="section">
          <ul class="list">
            ${avatar.goals.map((g: string) => `<li>${g}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${avatar.frustrations?.length ? `
        <h2>😣 Frustrations</h2>
        <div class="section">
          <ul class="list">
            ${avatar.frustrations.map((f: string) => `<li>${f}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${avatar.fears?.length ? `
        <h2>😰 Fears</h2>
        <div class="section">
          <ul class="list">
            ${avatar.fears.map((f: string) => `<li>${f}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${avatar.desires?.length ? `
        <h2>✨ Desires</h2>
        <div class="section">
          <ul class="list">
            ${avatar.desires.map((d: string) => `<li>${d}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${avatar.objections?.length ? `
        <h2>🚫 Common Objections</h2>
        <div class="section">
          <ul class="list">
            ${avatar.objections.map((o: string) => `<li>${o}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${avatar.buyingTriggers?.length ? `
        <h2>⚡ Buying Triggers</h2>
        <div class="section">
          <ul class="list">
            ${avatar.buyingTriggers.map((t: string) => `<li>${t}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${avatar.whereTheyHangOut?.length ? `
        <h2>📍 Where They Hang Out</h2>
        <div class="section">
          ${avatar.whereTheyHangOut.map((w: string) => `<span class="badge">${w}</span>`).join('')}
        </div>
        ` : ''}

        ${avatar.influencersTheyFollow?.length ? `
        <h2>👥 Influencers They Follow</h2>
        <div class="section">
          ${avatar.influencersTheyFollow.map((i: string) => `<span class="badge">${i}</span>`).join('')}
        </div>
        ` : ''}

        ${avatar.painPointLanguage?.length ? `
        <h2>💬 Pain Point Language</h2>
        <div class="section">
          <ul class="list">
            ${avatar.painPointLanguage.map((p: string) => `<li>"${p}"</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${avatar.phrasesTheyUse?.length ? `
        <h2>🗣️ Phrases They Use</h2>
        <div class="section">
          <ul class="list">
            ${avatar.phrasesTheyUse.map((p: string) => `<li>"${p}"</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        <div class="footer">
          <p>Generated by AdPilot • ${new Date().toLocaleDateString()}</p>
        </div>
      </body>
      </html>
    `

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(content)
      printWindow.document.close()
      printWindow.onload = () => {
        printWindow.print()
      }
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={generatePDF}
      style={{ border: '2px solid black', boxShadow: '2px 2px 0px 0px black' }}
    >
      <Download className="h-4 w-4 mr-2" />
      Export PDF
    </Button>
  )
}
