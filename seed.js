import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import WebSocket from 'ws'

const supabaseUrl = 'https://thzzlyplwhludozjzbqt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoenpseXBsd2hsdWRvemp6YnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NTIyMDAsImV4cCI6MjA5NDEyODIwMH0.E63ayzIVpF4MoP6RCXI1SjpnXJfO4exf_O2A_QY2wcQ'
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  realtime: { transport: WebSocket }
})

const files = [
  { name: 'SaveClip.App_670346300_17944530753160015_8522901171552091664_n.jpg', type: 'image/jpeg' },
  { name: 'SaveClip.App_670526398_17945263563160015_968890754761429057_n.jpg', type: 'image/jpeg' },
  { name: 'SaveClip.App_AQM8gvrkqe9ohwCgOTVpexwuyPjW7DUGUpOHUUnTkpOxUGD-mm8sILGM3I75pSvYrGeU29uoH7aXL1oNC-vQA4K74HXaInB6JuWRvng.mp4', type: 'video/mp4' },
  { name: 'SaveClip.App_AQMe0hoPftzQSG2qAdI1tVdXG_dpInFU-D30-0O9OjaLztH001M6hW8btSHceyAxioc71VKgdUTjhWmHSEBKNxyHQAsct0w_LCV-UHg.mp4', type: 'video/mp4' },
  { name: 'SaveClip.App_AQN8JCaLmLde_5r-MQaO_zoxq99U65xM1kmyf8Nm8rCJuLrcFJ9af43efrsTfdss_QzIRhgbSx9mS5i1DFqXhyLiegu4alB8vU44GQY.mp4', type: 'video/mp4' },
  { name: 'SaveClip.App_AQNcjwpdtCZiNVN4jfUEk5q_9oxWLVxTWY2WBCl8Xex5OleMaunO8ExN7YOFELFVdOoHbf_dU0vMvDtBcF_zdTHbWMs6Oa6kBFbaofI.mp4', type: 'video/mp4' },
  { name: 'SaveClip.App_AQNfDG0CFZdjYuDsYZES0iqKem48_xxLlmZkYJ5Fp8FfyZ1Swh8tlTkmGRmZSeGbApk1o3kgjqPozkdonV6iwbBEq18k5nXnc9esKrQ.mp4', type: 'video/mp4' },
  { name: 'SaveClip.App_AQOJ15cCN3j7jNx_GxOlzvhVhGZeb5tT3Jqji5acLZEudVEVYSx6ksEL3NVC3Y8wbZG8CBhzwBN9g6EmqBCwigEn3mnTgc6ksQKcUUc.mp4', type: 'video/mp4' },
  { name: 'SaveClip.App_AQOQ4pBxYXtkCZ4VPDubb0IviZFfrIwukAyx_hyhkmzA99m_fuHdBOtvNTzj4uB54UY-2C4Rz19hJwmY9FSpvwJOkSza5fmfwQNnHO0.mp4', type: 'video/mp4' },
  { name: 'SaveClip.App_AQP3pIpZc_YCbScr6YOBJJnthMC82Rvo10ABK7ct-psn2iFhxRmGRy_umFq2jlwwN-ZjOQ8tkgTwzRp1Ey9yxud2FPEqCRyE7Nb-0Ls.mp4', type: 'video/mp4' },
  { name: 'SaveClip.App_AQP8W7KlrUeSIbO8W0ef27UFXXpDpj_bn8Tn0XP9GOvywNC9JNwMLbqN_np149OyM6r85AcGfQ_LPcZErML73leZtHsbJYMkX_QWEZ0.mp4', type: 'video/mp4' },
  { name: 'SaveClip.App_AQPG_4EtIUeN3OSl3VF4y0fRrJSl-ErTyjrvlJeLUj4laCB-LQJzcxkE-tzrn4nOGXZ00EAVAhUcIH76QjZRd8CvR3BVfPD_VH6v8J4.mp4', type: 'video/mp4' },
  { name: 'SaveClip.App_AQPNTs5ksXzOwRJvlHqfsX2y076hjH08jVOI9BYg0Y9AiBFKR04szupNufZuoVcrXqjJUDhRO3i71LwofnjeMbxzfZ1XLodGBf4N8z0.mp4', type: 'video/mp4' },
  { name: 'SaveClip.App_AQPiQ7LJyAj5bd0xbsGQkxmCUFRhGtFLK3_fL3k949jJTCYaRPuH6orsdUaaW0-jaKF8PV3Aq3anU5UC_VruQBM7JNnCyBlmgd9tkIA.mp4', type: 'video/mp4' },
  { name: 'SaveClip.App_AQPt6IMXd7--bVst7L57JHf3UobofIK8HkyDtaMAmPIeozqwLzPnL9Qt0FOXJtvJV3-iG9V_vlJDOc_tSW4eah76iQYbnSaQDMN9R70.mp4', type: 'video/mp4' },
  { name: 'SaveClip.App_AQPzQUxISooxLl1VUTpnxIeLlidOVmTQdNlvz1e61GFdtI0t7Hw4kuBm_iCF_6bKvW5ONbdoR4QE17m4SWIvlsZgkzU2PLbg22m4-MI.mp4', type: 'video/mp4' },
  { name: 'caja.mp4', type: 'video/mp4' },
]

async function seed() {
  console.log('Starting seed process...')
  const dbProducts = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const filePath = path.join(process.cwd(), 'public', file.name)
    
    if (fs.existsSync(filePath)) {
      console.log(`Uploading ${file.name}...`)
      const fileBuffer = fs.readFileSync(filePath)
      const ext = file.name.split('.').pop()
      const storageName = `${Math.random().toString(36).substring(2, 15)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(storageName, fileBuffer, {
          contentType: file.type,
          upsert: true
        })

      if (uploadError) {
        console.error(`Error uploading ${file.name}:`, uploadError)
        continue
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(storageName)

      const isBestseller = i % 3 === 0
      const isNew = i % 3 === 1

      dbProducts.push({
        name: `Curated Gift Set ${i + 1}`,
        subtitle: 'Exclusive selection wrapped with love',
        price: `$${(35 + (i * 5)).toFixed(2)}`,
        badge: isBestseller ? 'Bestseller' : isNew ? 'New In' : 'Gift Set',
        badge_color: isBestseller ? 'bg-bark text-cream' : isNew ? 'bg-clay text-cream' : 'bg-blush text-bark',
        media_url: publicUrl,
        media_type: file.type.startsWith('video') ? 'video' : 'image'
      })
    } else {
      console.warn(`File not found: ${filePath}`)
    }
  }

  if (dbProducts.length > 0) {
    console.log(`Inserting ${dbProducts.length} products into database...`)
    const { error: insertError } = await supabase
      .from('products')
      .insert(dbProducts)

    if (insertError) {
      console.error('Error inserting products:', insertError)
    } else {
      console.log('Seed completed successfully!')
    }
  }
}

seed()
