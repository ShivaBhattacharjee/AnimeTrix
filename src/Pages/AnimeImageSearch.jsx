import React, { useState, useEffect } from "react"
import { FileUploader } from "react-drag-drop-files"
import axios from "axios"
import AnimeImageSearchLayout from "../Components/AnimeImageSearchLayout"
const fileTypes = ["JPG", "PNG", "JPEG"]
function AnimeImageSearch() {
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(true)
    const [searchResult, setSearchResult] = useState({})

    useEffect(() => {
        return () => URL.revokeObjectURL(preview)
    }, [preview])

    const handleChange = async (e) => {
        const objectUrl = URL.createObjectURL(e)
        setPreview(objectUrl)
        setFile(e)
    }

    const handleSubmit = async (file) => {
        try {
            setLoading(true)
            if (typeof file === "object") {
                const formData = new FormData()
                formData.append("file", file)
                const response = await axios({
                    method: "post",
                    url: "https://api.trace.moe/search?anilistInfo&cutBorders",
                    data: formData,
                    headers: { "Content-Type": "image/jpeg" },
                })
                URL.revokeObjectURL(preview)
                setPreview(null)
                setFile(null)
                setSearchResult(response.data)
            } else {
                const response = await axios({
                    method: "post",
                    url: `https://api.trace.moe/search?anilistInfo&cutBorders&url=${encodeURIComponent(
                        `${text}`
                    )}`,
                })
                setText("")
                setSearchResult(response.data)
                const idk = response.data
                console.log(idk)

            }
            setLoading(false)
            setToggle(false)
        } catch (error) {
            setText("")
            setFile(null)
            setPreview(null)
            setLoading(false)
            setToggle(true)
            console.log(error)
        }
    }

    const handleRemoveImage = async () => {
        setFile(null)
        setPreview(null)
    }



    return (
        <>
            {!toggle && (
                <AnimeImageSearchLayout
                    searchResult={searchResult}
                    setToggle={setToggle}
                />
            )}

            {toggle ? (
                <>
                    <div className="image-search-container">
                        <h1 className="search-image">Search Anime by Scene</h1>
                        <div className="image-search-note">
                            <p className="image-note">
                                Disclaimer:{" "}
                                This feature may not be 100% accurate and only works with in-scene anime episodes, not anime wallpapers

                            </p>
                        </div>
                    </div>
                    {preview ? (
                        <div className="preview-image-submit">
                            {!loading ? (
                                <div className="preview-image-container">
                                    <div className="image-prev">
                                        <div className="image-search">
                                            <img
                                                className=""
                                                src={preview || ""}
                                                alt=""
                                            />
                                            <i class="fa-solid fa-trash" onClick={handleRemoveImage}></i>
                                        </div>
                                    </div>
                                    <div className="other-image-container">
                                        <label className="other-image-label">
                                            Wrong image?
                                            <FileUploader
                                                handleChange={(e) => handleChange(e)}
                                                name="file"
                                                types={fileTypes}
                                                multiple={false}
                                                maxSize={25}
                                            />
                                        </label>
                                    </div>
                                    <button
                                        className="image-search-btn"
                                        onClick={() => handleSubmit(file)}
                                    >
                                        SEARCH
                                    </button>
                                    <br /><br />
                                </div>
                            ) : (

                                <div class="spinner-box">
                                    <div class="blue-orbit leo">
                                    </div>

                                    <div class="green-orbit leo">
                                    </div>

                                    <div class="red-orbit leo">
                                    </div>

                                    <div class="white-orbit w1 leo">
                                    </div><div class="white-orbit w2 leo">
                                    </div><div class="white-orbit w3 leo">
                                    </div>
                                    <div className="text-message">
                                    <h1 className="solar-text">Hunting the universe for the sauce, no luck yet</h1>
                                    </div>
                                </div>




                            )}
                        </div>
                    ) : (
                        <div className="image-upload-else-container">
                            {!loading ? (
                                <div className="file-upload-else">
                                    <FileUploader
                                        handleChange={(e) => handleChange(e)}
                                        name="file"
                                        types={fileTypes}
                                        multiple={false}
                                        maxSize={25}
                                        classes="upload-section"
                                        label="Insert Anime Image Here"
                                    />
                                    <div className="url-container">
                                        <span>OR</span>
                                        <input
                                            type="text"
                                            className="url-enter-search"
                                            placeholder="Enter Image Url"
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                        />
                                        <button
                                            className="image-search-btn"
                                            onClick={() => handleSubmit(text)}
                                            aria-label="URL search button"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            ) : (

                                <div class="spinner-box">
                                    <div class="blue-orbit leo">
                                    </div>

                                    <div class="green-orbit leo">
                                    </div>

                                    <div class="red-orbit leo">
                                    </div>

                                    <div class="white-orbit w1 leo">
                                    </div><div class="white-orbit w2 leo">
                                    </div><div class="white-orbit w3 leo">
                                        <h1>Hunting the universe for the sauce, no luck yet</h1>
                                    </div>
                                </div>

                            )}
                        </div>
                    )}
                </>
            ) : (
                null
            )}
        </>
    )
}

export default AnimeImageSearch