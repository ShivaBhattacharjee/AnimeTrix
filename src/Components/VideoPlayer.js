import { memo } from "react"
import Artplayer from "../Components/ArtPlayer"
import "../css/ArtPlayer.css"

function VideoPlayer({
    videoUrl,
    download,
    quality,
    title,
}) {

    return (
        <Artplayer
            option={{
                title: `${title}`,
                setting: true,
                muted: false,
                autoplay: false,
                pip: false,
                autoSize: true,
                autoMini: false,
                screenshot: true,
                loop: true,
                flip: true,
                playbackRate: true,
                aspectRatio: true,
                fullscreen: true,
                fullscreenWeb: false,
                subtitleOffset: false,
                miniProgressBar: true,
                mutex: true,
                backdrop: true,
                playsInline: true,
                volume: 1,
                airplay: true,
                autoPlayback: true,
                theme: '#2196F3',
                quality: quality?.map((q) => ({
                    html: `${q.quality}`,
                    url: `${q.url}`,
                })),
                controls: [
                    {
                        position: 'right',
                        html: '<i class="fa-solid fa-download"></i>',
                        index: 1,
                        tooltip: 'Download',
                        style: {
                            marginRight: '0',
                        },
                        click: function () {
                            window.open(download)
                        },
                    },
                ],

                lang: navigator.language.toLowerCase(),
                whitelist: ["*"],
                moreVideoAttr: {
                    crossOrigin: "anonymous",
                },
                // icons: {
                //     loading: '<img src="/assets/img/ploading.gif">',
                //     state: '<img width="150" heigth="150" src="/assets/img/state.svg">',
                //     indicator: '<img width="16" heigth="16" src="/assets/img/indicator.svg">',
                // },
            }}
            videoUrl={videoUrl}
            className="video-art"

        />
    )
}

export default memo(VideoPlayer)