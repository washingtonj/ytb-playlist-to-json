import puppeteer from 'puppeteer'
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

export async function getPlaylistInfo(id) {
    // Puppeteer acessa a playlist e carrega o HTML da pagina.
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(`https://www.youtube.com/playlist?list=${id}`)

    const html = await page.evaluate(() => {
        return document.body.querySelector("ytd-app").innerHTML
    })
    await browser.close()

    // Transforma o HTML em DOM para coleta das informações.
    const dom = new JSDOM(html)
    
    // Coleta as informações da playlist na DOM.
    const userName = dom.window.document.querySelector('ytd-channel-name a').text
    const userChannel = `youtube.com${dom.window.document.querySelector('ytd-channel-name a').href}` 
    const userAvatar = dom.window.document.querySelector('yt-img-shadow#avatar img').src
    const userVideos = []

    
    const videos = dom.window.document.querySelectorAll("ytd-playlist-video-renderer")
    videos.forEach(video => {
        const videoName = video.querySelector('#video-title').title
        const videoURL = `youtube.com${video.querySelector(".yt-simple-endpoint").href}`
        const videoThumbnail = `https://img.youtube.com/vi/${videoURL.replace(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
        "$7")}/hqdefault.jpg`

        userVideos.push({
            videoName,
            videoURL,
            videoThumbnail
        })

    })

    // Retorna um objeto com todas as informações.
    return {
        userName,
        userChannel,
        userAvatar,
        userVideos
    } 
}


