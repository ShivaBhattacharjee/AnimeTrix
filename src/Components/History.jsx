import { Link, useNavigate } from 'react-router-dom'
import { React, useDebugValue, useEffect, useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomeApi, ServerApi } from './constants';
// const user = "Shiva";
function History() {
    const [animeData, setAnimeData] = useState([])
    const [userId, setUserId] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return undefined;
    }

    const navigate = useNavigate();
    const getHistory = async () => {
        try {
            if (userId) {
                axios.interceptors.response.use(response => {
                    return response;
                }, error => {
                    toast.error(error.response.data.error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    return;
                });
                const res = await axios.get(`${ServerApi}/user/history/${userId}`)
                const history = res.data.history;
                console.log(history)
                setHistory(history);

                const animeDataArray = [];
                for (const historyItem of history) {
                    const animeRes = await axios.get(`${HomeApi}/meta/anilist/info/${historyItem.animeId}`);
                    const animeDataItem = animeRes.data;
                    animeDataArray.push(animeDataItem);
                }
                setAnimeData(animeDataArray);
                setLoading(false)
            }
        } catch (err) {
            toast.error('Error loading history!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deleteHistory = async () => {
        try {
            const conf = window.confirm("Are you sure you want to delete your history?");
            if (conf) {
                axios.interceptors.response.use(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        toast.error(error.response.data.error, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            rtl: false,
                            pauseOnFocusLoss: true,
                            draggable: true,
                            pauseOnHover: true,
                            theme: "dark",
                        });
                        return;
                    }
                );
                const res = await axios.delete(
                    `${ServerApi}/user/history/${userId}`
                );
                console.log(res);
                await getHistory();
                if (res && res.data) {
                    toast.success(res.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    return res;
                }
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
                theme: "dark",
            });
        }
    };

    const removeHistory = async (animeId) => {
        try {
            const conf = window.confirm("Are you sure you want to delete your history?");
            if (conf) {
                axios.interceptors.response.use(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        toast.error(error.response.data.error, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            rtl: false,
                            pauseOnFocusLoss: true,
                            draggable: true,
                            pauseOnHover: true,
                            theme: "dark",
                        });
                        return;
                    }
                );
                const res = await axios.delete(
                    `${ServerApi}/user/single/history/${userId}/${animeId}`
                );
                console.log(res);
                await getHistory();
                if (res && res.data) {
                    toast.success(res.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    return res;
                }
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
                theme: "dark",
            });
        }
    }

    useEffect(() => {
        const id = getCookie("id");
        setUserId(id);
    });

    useEffect(() => {
        getHistory();
    }, [userId]);

    return (
        <>
            <ToastContainer />
            {loading ? (
                <div className="spinner-box">
                    <div className="configure-border-1">
                        <div className="configure-core"></div>
                    </div>
                    <div className="configure-border-2">
                        <div className="configure-core"></div>
                    </div>
                </div>
            ) : (
                <>
                    <section className='profile-wrapper'>
                        <div className="profile-greeting">
                            {/* <h1> Hi, {user}</h1> */}
                            <h1 className='history-head'><i class="fa-solid fa-clock-rotate-left lastwatch-icon continue-icon"></i> Continue Watching</h1>
                        </div>
                        <div className='profile-navbar'>
                            <ul>
                                <Link to="/profile">
                                    <li>Profile</li>
                                </Link>
                                <li style={{ cursor: "pointer" }}>History</li>
                                <Link to="/bookmark">
                                    <li>Bookmark</li>
                                </Link>
                            </ul>
                        </div>
                    </section>
                    <div className="lastwatch active">
                        <section className="movies">
                            <div className="lastwatch-bar">
                                <div className="lastwatch-heading">
                                    {history.length == 0 ? "" : <div className="clear-history">
                                        <button onClick={deleteHistory}>Clear all</button>
                                    </div>}
                                    {/* <h1><i class="fa-solid fa-clock-rotate-left lastwatch-icon continue-icon"></i> Continue Watching</h1> */}
                                    {history.length == 0 ? <h1>No History</h1> : ""}
                                    <div className="movies-grid">
                                        {animeData?.slice(0, 18).map((animeDataHis, index) => {
                                            return (
                                                <div className="movie-card">
                                                    <div className="lastwatch-close" onClick={ev => removeHistory(history[index].animeId)}>

                                                        <i
                                                            className="fa-solid fa-xmark"
                                                        />
                                                    </div>
                                                    <div className="card-head">
                                                        <Link to={`/watch/${history[index].epId}/${history[index].animeId}`}>
                                                            <img src={animeDataHis?.image} alt="its just an images" className="card-img" />
                                                        </Link>
                                                        <div className="card-details">
                                                            <h5 className="card-title">
                                                                {animeDataHis.title?.userPreferred || animeDataHis.title?.english || animeDataHis.romaji}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div >
                                            )
                                        })}
                                    </div>
                                    {history.length > 18 ? <div className="loadmore-recent">
                                        <button className="loadmore">View More</button>
                                    </div> : ""}
                                </div>
                            </div>
                        </section >

                    </div >
                </>
            )}
        </>
    );
};

export default History;
