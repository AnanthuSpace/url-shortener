export interface ShortenedUrl {
    shortLink: string
    originalLink: string
    platform: 'twitter' | 'youtube' | 'website' | 'vimeo'
    qrCode: string
    clicks: number
    status: 'active' | 'inactive'
    date: string
  }
  
  