//APlayer
const aplayer = document.querySelector('#aplayer');
if (aplayer) {
    let datasong = JSON.parse(aplayer.getAttribute('data-song')) 
    let datasinger = JSON.parse(aplayer.getAttribute('data-singer'))
    const ap = new APlayer({
        container: aplayer,
        audio: [{
            name: datasong.title,
            artist: datasinger.fullName,
            url: datasong.audio,
            cover: datasong.avatar,
        },
    ],
        autoplay : true,
        volume : 0.5
    });
    const avatar = document.querySelector('.singer-detail .inner-avatar img');

    ap.on('play', () => {
        avatar.style.animationPlayState = 'running';
    })
    ap.on('pause', () => {
        avatar.style.animationPlayState = 'paused';
    })
}

//APlayer