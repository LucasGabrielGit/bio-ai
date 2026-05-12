import { QRCodeSVG } from 'qrcode.react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Download, Share2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface QRCodeGeneratorProps {
  url: string
  title: string
}

export function QRCodeGenerator({ url, title }: QRCodeGeneratorProps) {
  const [copied, setCopied] = useState(false)

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = `qr-code-${title.toLowerCase().replace(/\s+/g, '-')}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    toast.success('QR Code baixado com sucesso!')
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('URL copiada para a área de transferência!')
    setTimeout(() => setCopied(false), 2000)
  }

  const shareUrl = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Bio de ${title}`,
          text: 'Confira minha biografia no Bio-AI!',
          url: url,
        })
      } catch (err) {
        console.error('Erro ao compartilhar:', err)
      }
    } else {
      copyUrl()
    }
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Share2 className="w-5 h-5 text-primary" />
          Compartilhar Bio
        </CardTitle>
        <CardDescription>
          Divulgue sua biografia usando o QR Code ou o link direto
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="p-4 bg-white rounded-2xl shadow-inner border-2 border-primary/10">
          <QRCodeSVG
            id="qr-code-svg"
            value={url}
            size={200}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: "/logo.svg", // Tentativa de usar a logo se existir
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>

        <div className="w-full space-y-3">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={copyUrl}
            >
              {copied ? (
                <Check className="w-4 h-4 mr-2 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              {copied ? 'Copiado!' : 'Copiar Link'}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={shareUrl}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
          
          <Button 
            className="w-full bg-linear-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-md" 
            onClick={downloadQRCode}
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar QR Code (PNG)
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
