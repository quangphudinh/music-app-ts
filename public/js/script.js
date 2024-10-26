
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
    ap.on('ended', () => {
        const link = `/songs/listen/${datasong._id}`;
        const option = {
            method: 'PATCH'
        }
        fetch(link, option)
            .then(response => response.json())
            .then(data => {
                const elemenListenSpan = document.querySelector('.singer-detail .inner-listen span');
                elemenListenSpan.innerHTML = `${data.listen} Lượt nghe`;
            })
    });
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

// Search Suggest
const boxSearch = document.querySelector('.box-search');
if (boxSearch) {
    const inputSearch = boxSearch.querySelector('input[name="keyword"]');
    const boxSuggest = boxSearch.querySelector('.inner-suggest');

    inputSearch.addEventListener('keyup', () => {
        const keyword = inputSearch.value;

        const link = `/search/suggest?keyword=${keyword}`;

        fetch(link)
            .then(response => response.json())
            .then(data => {
                if (data.code == 200) {
                    const songs = data.songs;
                    if (songs.length > 0) {
                        boxSuggest.classList.add('show');

                        const htmls = songs.map((item) => {
                            return `
                            <a href="/songs/detail/${item.slug}" class="inner-item">
                                <div class="inner-image">
                                    <img src="${item.avatar}" />
                                </div>
                                <div class="inner-info">
                                    <div class="inner-title">${item.title}</div>
                                    <div class="inner-singer">
                                        <i class="fa-solid fa-microphone-lines"></i> ${item.singer.fullName}
                                    </div>
                                </div>
                            </a> 
                            `
                        })
                        const boxList = boxSuggest.querySelector('.inner-list');
                        boxList.innerHTML = htmls.join('');
                    }
                    else {
                        boxSuggest.classList.remove('show');
                    }   
                }
            })
    })
}
//End Search Suggest