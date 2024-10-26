
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
        autoplay: true,
        volume: 0.5
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

//Button Like
const buttonLike = document.querySelector('[button-like]');
if (buttonLike) {
    buttonLike.addEventListener('click', () => {
        const idSong = buttonLike.getAttribute('button-like');
        const isActive = buttonLike.classList.contains('active');

        const typeLike = isActive ? 'dislike' : 'like';

        const link = `/songs/like/${typeLike}/${idSong}`;
        const option = {
            method: 'PATCH'
        }
        fetch(link, option)
            .then(response => response.json())
            .then(data => {
                if (data.code == 200) {
                    const span = buttonLike.querySelector('span');
                    span.innerHTML = `${data.like} Thích`;
                    buttonLike.classList.toggle('active');
                }
            })
    })
}
//End Button Like

//Button Favorite
const listbuttonFavorite = document.querySelectorAll('[button-favorite]');
if (listbuttonFavorite.length > 0) {
    listbuttonFavorite.forEach(buttonFavorite => {
        buttonFavorite.addEventListener('click', () => {
            const idSong = buttonFavorite.getAttribute('button-favorite');
            const isActive = buttonFavorite.classList.contains('active');

            const typefavorite = isActive ? 'unfavorite' : 'favorite';

            const link = `/songs/favorite/${typefavorite}/${idSong}`;
            const option = {
                method: 'PATCH'
            }
            fetch(link, option)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        buttonFavorite.classList.toggle('active');
                    }
                })
        })
    })

}

//End Button Favorite