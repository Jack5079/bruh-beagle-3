let i = -1
export default function playSnd (sounds) {
  const videos = sounds.map(url => {
    const vid = document.createElement('video')
    vid.src = url
    return vid
  })
  i++
  if (i === videos.length) {
    return
  }
  videos[i].addEventListener('ended', ()=>playSnd(videos))
  videos[i].play()
}
