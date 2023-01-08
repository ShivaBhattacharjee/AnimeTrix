# An anime streaming website made using *REACT JS* and *GOGOANIME API* with seemless and easy download 

React. js, more commonly known as React, is a free, open-source JavaScript library. It works best to build user interfaces by combining sections of code (components) into full websites. Originally built by Facebook, Meta and the open-source community now maintain it.

 API :- 
    Installation
        Local
        Docker
        Heroku
    Routes
        Get Recent Episodes
        Get Popular Anime
        Get Anime Search
        Get Anime Movies
        Get Top Airing
        Get Anime Genres
            Genres
        Get Anime Details
        Get Streaming URLs
            VIDCDN
            StreamSB
            Fembed (DEPRECATED)
        Get Download URLs (DEPRECATED)
            Download
        Get Episode Thread
    Contributing
    Showcases
    NEW API (v2) 🎉
        Currently supported sites
        How to get started?

Installation
Local

Run the following command to clone the repository, and install the dependencies:

git clone https://github.com/krishnenduroy52/Anime-Player.git
cd Anime-Player
npm install #or yarn install

start the server with the following command:

npm start #or yarn start

    Create a new Branch

git checkout -b my-new-branch

git add .

    Commit your changes.

git commit -m "Relevant message"

    Then push

git push origin my-new-branch

Avoid Conflicts {Syncing your fork}

An easy way to avoid conflicts is to add an 'upstream' for your git repo, as other PR's may be merged while you're working on your branch/fork.

git remote add upstream https://github.com/krishnenduroy52/Anime-Player.git

You can verify that the new remote has been added by typing

git remote -v

To pull any new changes from your parent repo simply run

git merge upstream/master

Now the server is running on http://localhost:3000
Docker

Docker image is available at Docker Hub.

run the following command to pull and run the docker image.

docker pull krishnenduroy52/Anime-Player
docker run -p 3000:3000 krishnenduroy52/Anime-Player

This will start the server on port 3000. You can access the server at http://localhost:3000/, And can change the port by changing the -p option to -p <port>:3000.

You can add -d flag to run the server in detached mode.
Heroku

Host your own instance of the api on heroku using the button below.

Deploy on Heroku
Routes

Below you'll find examples using Fetch API but you can use any other http library out there.
Get Recent Episodes
Parameter 	Description
type (int) 	(optional) by default the type is 1. type 1: japanese with subtitle. type 2: english dub with no subtitles. type 3: chinese with english subtitles. Example: GET /recent-release?type=2
page (int) 	type 1 page limit: [1-331]. type 2: [1-139]. type 3: [1-22].

fetch("https://gogoanime.herokuapp.com/recent-release")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));

Output >>

[
    {
        "episodeId": "deep-insanity-the-lost-child-episode-9",
        "animeTitle": "Deep Insanity: The Lost Child",
        "episodeNum": "9",
        "subOrDub": "SUB",
        "animeImg": "https://cdnimg.xyz/cover/deep-insanity-the-lost-child.png",
        "episodeUrl": "https://www1.gogoanime.cm//deep-insanity-the-lost-child-episode-9"
    },
    {...},
    ...
]

Get Popular Anime
Parameter 	Description
page (int) 	page limit: [1-504]

fetch("https://gogoanime.herokuapp.com/popular")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));

Output >>

[
    {
        "animeId": "boruto-naruto-next-generations",
        "animeTitle": "Boruto: Naruto Next Generations",
        "animeImg": "https://gogocdn.net/cover/boruto-naruto-next-generations.png",
        "releasedDate": "2017",
        "animeUrl": "https://www1.gogoanime.cm//category/boruto-naruto-next-generations"
    },
    {...},
    ...
]

Get Anime Search
Parameter 	Description
keyw (string) 	anime title
page (int) 	page limit may vary

fetch("https://gogoanime.herokuapp.com/search?keyw=naruto")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));

Output >>

[
    {
        "animeId": "naruto",
        "animeTitle": "Naruto",
        "animeUrl": "https://www1.gogoanime.cm//category/naruto",
        "animeImg": "https://gogocdn.net/images/anime/N/naruto.jpg",
        "status": "Released: 2002"
    },
    {...},
    ...
]

Get Anime Movies
Parameter 	Description
aph (string) 	(optional) by default the movie list is random. values are from [A-Z]. And 0 is Ascending order with page limit of [1-89].
page (int) 	page limit may vary

fetch("https://gogoanime.herokuapp.com/anime-movies")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));

Output >>

[
	{
		"animeId": "tenchi-muyou-manatsu-no-eve",
		"animeTitle": "Tenchi Muyou! Manatsu no Eve",
		"animeImg": "https://gogocdn.net/cover/tenchi-muyou-manatsu-no-eve.png",
		"releasedDate": "1997",
		"animeUrl": "https://www1.gogoanime.cm//category/tenchi-muyou-manatsu-no-eve"
	},
    {...},
    ...
]

Get Top Airing
Parameter 	Description
page (int) 	page limit [1-26]. -1 to fetch all the pages avaliable Warning: Waiting time will be much longer.

fetch("https://gogoanime.herokuapp.com/top-airing")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));

Output >>

[
	{
		"animeId": "sekai-saikou-no-ansatsusha-isekai-kizoku-ni-tensei-suru",
		"animeTitle": "Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru",
		"animeImg": "https://cdnimg.xyz/cover/sekai-saikou-no-ansatsusha-isekai-kizoku-ni-tensei-suru.png",
		"latestEp": "Episode 9",
		"animeUrl": "https://www1.gogoanime.cm//category/sekai-saikou-no-ansatsusha-isekai-kizoku-ni-tensei-suru",
		"genres": ["Action", "Drama", "Fantasy", "Mystery", "Romance"]
	}
    {...},
    ...
]

Get Anime Genres
Parameter 	Description
:genre (string) 	Genres are avaliable below
page (int) 	The page limit varies by genre.
Genres
Genres list
 

fetch("https://gogoanime.herokuapp.com/genre/action")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));

Output >>

[
    {
        "animeId": "isekai-meikyuu-de-harem-wo",
        "animeTitle": "Isekai Meikyuu de Harem wo",
        "animeImg": "https://gogocdn.net/cover/isekai-meikyuu-de-harem-wo.png",
        "releasedDate": "2022",
        "animeUrl": "https://www1.gogoanime.cm//category/isekai-meikyuu-de-harem-wo"
    },
    {...},
    ...

Get Anime Details
Parameter 	Description
:id (string) 	animeId can be found in every response body as can be seen in the above examples

fetch("https://gogoanime.herokuapp.com/anime-details/naruto")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));

Output >>

{
    "animeTitle": "Naruto",
    "type": "TV Series",
    "releasedDate": "2002",
    "status": "Completed",
    "genres": ["Action", "Comedy", "Martial Arts", "Shounen", "Super Power"],
    "otherNames": "ナルト",
    "synopsis": "...",
    "animeImg": "https://gogocdn.net/images/anime/N/naruto.jpg",
    "episodesAvaliable": "220",
    "episodesList": [
        {
            "episodeId": "naruto-episode-220",
            "episodeNum": "220",
            "episodeUrl": "https://www1.gogoanime.cm//naruto-episode-220"
        },
        {...},
        ...
    ]
}

Get Streaming URLs

You might need the referer url to bypass 403 (Forbidden) HTTP code.
Parameter 	Description
:id (string) 	episodeId. To verify the id of each episode, look at the episodesList property in the example above.
VIDCDN

fetch("https://gogoanime.herokuapp.com/vidcdn/watch/naruto-episode-220")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));

Output >>

{
  "headers": {
    "Referer": "https://gogoplay.io/"
  },
  "data": [
    {
      "file": "https://vidstreamingcdn.com/cdn34/a96411258da4b8a75319906d0cc507f7/EP.18.v0.1644104042.360p.mp4?mac=7GmeilE5nn5L7xGZqxt4YNTnzQ53eEazGha0ZBD15WU%3D&vip=&expiry=1644122389382",
      "label": "360 P",
      "type": "mp4"
    },
    {
      "file": "https://vidstreamingcdn.com/cdn34/a96411258da4b8a75319906d0cc507f7/EP.18.v0.1644104042.480p.mp4?mac=JBKmkO3IViHhGVSsXLekTDjhGICtfkmvXPuW7wEPGuw%3D&vip=&expiry=1644122389440",
      "label": "480 P",
      "type": "mp4"
    },
    ...
  ]
}

StreamSB

fetch("https://gogoanime.herokuapp.com/streamsb/watch/naruto-episode-220")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));

Output >>

{
  "headers": {
    "Referer": "https://sbplay2.xyz/e/84ob4f649y3j"
  },
  "data": [
    {
      "file": "https://delivery412.akamai-cdn-content.com/hls2/01/02251/84ob4f649y3j_,n,h,.urlset/master.m3u8?t=W6w3DBAuEd6Xc3cYAQiEy5rYqeqY84IBs1XeDkhdYxQ&s=1652035632&e=21600&f=11258098&srv=sto066"
    },
    {
      "backup": "https://delivery412.akamai-cdn-content.com/hls2/01/02251/84ob4f649y3j_,n,h,.urlset/master.m3u8?t=W6w3DBAuEd6Xc3cYAQiEy5rYqeqY84IBs1XeDkhdYxQ&s=1652035632&e=21600&f=11258098&srv=sto066"
    }
  ]
}

Fembed (DEPRECATED)

Note: This is not available for all anime(s), so you might need to use another provider instead. VIDCDN and StreamSB are the most reliable

fetch("https://gogoanime.herokuapp.com/fembed/watch/spy-x-family-episode-5")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));

Output >>

{
  "headers": {
    "Referer": "https://fembed-hd.com/v/nd27xs2gjrpjle8"
  },
  "data": [
    {
      "file": "https://fvs.io/redirector?token=aHp4NVZDV3FZcStXQlFsOFNFQ3VvQWhRNXlpVlFUNlNaZWFOTTVpb0FWZ3FKMEtRL25qTXQ1UCtqNi9DRENJTXA1dWFVSUJrRkNQMnVnd1FQcXBrYXR4T2F6U2ZZdXIrNkx2bEh5TjBjZEZmd3JQandURzJrMTIyQitjR3dyYTJYYkI4OXZXRVlqd2QwbkFhVVdLYzdHdkZJV2RYMHNTYjpua3lLQ2lrSGw4dXFob0I0WmtoYkxBPT01iA4",
      "label": "480p",
      "type": "mp4"
    },
    {
      "file": "https://fvs.io/redirector?token=Tkc1dHYvcTI5bFFwekcyZjVoWXRsa2VSd1lwOEVtMGNXbStMdUxWWWZNcHJaK3FvazhQMWhKelFmTWNMZEZlQVhLbGt1d3dTMXZiNkQ5WEdjdlhaSEE5dFVyR2diQkgvcjhxcVdkb2haa3B2a2NZNDQ3eW9RZyttU0REVW1kbXMwdDhLQ0RkSFovellYcmxjZHdyVm54NkJtTm5ZRmlncjp0ODdVNG01dDVyeFZMKzBjZ2N6WWVnPT0eCGY",
      "label": "720p",
      "type": "mp4"
    }
  ]
}

Get Download URLs (DEPRECATED)

fetch("https://gogoanime.herokuapp.com/download-links/spy-x-family-episode-9")
  .then((response) => response.json())
  .then((links) => console.log(links));

Output >>

{
    "headers": {
        "Referer": "https://goload.pro/"
    },
    "sources": [
        {
            "quality": "360p",
            "link": "https://cdn32.anicache.net/user1342/eb0fc5c2a93ecb60b19b4d5802b578b3/EP.9.v0.1654358471.360p.mp4?token=EVLs0upbYa_U4gWKhjpMXQ&expires=1654561056&id=187373"
        },
        {
            "quality": "480p",
            "link": "https://cdn32.anicache.net/user1342/eb0fc5c2a93ecb60b19b4d5802b578b3/EP.9.v0.1654358471.480p.mp4?token=Zp7sVEbb-JOYFBMEtJ_AzA&expires=1654561056&id=187373"
        },
        {
            "quality": "720p",
            "link": "https://cdn32.anicache.net/user1342/eb0fc5c2a93ecb60b19b4d5802b578b3/EP.9.v0.1654358471.720p.mp4?token=vyq9wSLYVq_u8sWtLd7vkA&expires=1654561056&id=187373"
        },
        {
            "quality": "1080p",
            "link": "https://cdn32.anicache.net/user1342/eb0fc5c2a93ecb60b19b4d5802b578b3/EP.9.v0.1654358471.1080p.mp4?token=2JKC_e7s5qc7fh1Yso94jA&expires=1654561056&id=187373"
        }
    ]
}

you can use the headers.referer to bypass the 403 error and download the file. Or you can use the download route to download the file.
Download

Make sure to add downloadLink header to the headers, which should contain the link received from the response above.

fetch("https://gogoanime.herokuapp.com/download", {
  method: "GET",
  headers: {
    "downloadLink": "https://cdn34.anicache.net/user1342/eb0fc5c2a93ecb60b19b4d5802b578b3/EP.9.v0.1654358471.360p.mp4?token=-Dgjd_aQz6aIQKwY7hZyLQ&expires=1654562557&id=187373",
  }
})

Then it will start downloading the file.
Get Episode Thread
Parameter 	Description
:episodeId 	episodeId. To verify the id of each episode, look at the episodesList property in the example above.
page (optional) 	page number. Default is 0.

fetch("https://gogoanime.herokuapp.com/thread/spy-x-family-episode-9?page=1")
  .then((response) => response.json())
  .then((thread) => console.log(thread));

Output >>

{
    "threadId": "9201260224",
    "currentPage": "1",
    "hasNextPage": true,
    "comments": [
        {
            "editableUntil": "2022-06-11T15:50:14",
            "dislikes": 0,
            "thread": "9201260224",
            "numReports": 0,
            "likes": 75,
            "message": "<p>Like brother, like sister I guess. Neither of them could handle the kiss, but Yuri was the one to suffer for it. Poor guy looked like he needed a trip to the ER, lol</p>",
            "id": "5878499824",  // comment id
            "createdAt": "2022-06-04T15:50:14",
            "author": {
                "username": "Judgment526",
                "about": "",
                "name": "Judgment526",
                "disable3rdPartyTrackers": false,
                "isPowerContributor": false,
                "joinedAt": "2016-03-01T19:52:06",
                "profileUrl": "https://disqus.com/by/Judgment526/",
                "url": "https://myanimelist.net/profile/Judgment526",
                "location": "",
                "isPrivate": false,
                "signedUrl": "https://disq.us/?url=https%3A%2F%2Fmyanimelist.net%2Fprofile%2FJudgment526&key=1_hPDEw0NPhrhEqk1en2nA",
                "isPrimary": true,
                "isAnonymous": false,
                "id": "198796971",
                "avatar": {
                    "permalink": "https://disqus.com/api/users/avatars/Judgment526.jpg",
                    "xlarge": {
                        "permalink": "https://disqus.com/api/users/avatars/Judgment526.jpg",
                        "cache": "https://c.disquscdn.com/uploads/users/19879/6971/avatar200.jpg?1649817631"
                    },
                    "cache": "https://c.disquscdn.com/uploads/users/19879/6971/avatar92.jpg?1649817631",
                    "large": {
                        "permalink": "https://disqus.com/api/users/avatars/Judgment526.jpg",
                        "cache": "https://c.disquscdn.com/uploads/users/19879/6971/avatar92.jpg?1649817631"
                    },
                    "small": {
                        "permalink": "https://disqus.com/api/users/avatars/Judgment526.jpg",
                        "cache": "https://c.disquscdn.com/uploads/users/19879/6971/avatar32.jpg?1649817631"
                    },
                    "isCustom": true
                }
            },
            "media": [],
            "isSpam": false,
            "isDeletedByAuthor": false,
            "isHighlighted": false,
            "hasMore": false,
            "parent": null,
            "isApproved": true,
            "isNewUserNeedsApproval": false,
            "isDeleted": false,
            "isFlagged": false,
            "raw_message": "Like brother, like sister I guess. Neither of them could handle the kiss, but Yuri was the one to suffer for it. Poor guy looked like he needed a trip to the ER, lol",
            "isAtFlagLimit": false,
            "canVote": false,
            "forum": "gogoanimetv",
            "depth": 0, // comment depth. 0 means top level comment (root)
            "points": 75,
            "moderationLabels": [],
            "isEdited": false,
            "sb": false
        },
        {...},
    ]
}

The id, parent and depth keys on the comments list can be used to determine the comment structure in your app.
Contributing

    Fork the repository
    Clone your fork to your local machine using the following command (make sure to change <your_username> to your GitHub username):

git clone https://github.com/<your-username>/gogoanime.git

    Create a new branch: git checkout -b <new-branch-name> (e.g. git checkout -b my-new-branch)
    Make your changes.
    Stage the changes: git add .
    Commit the changes: git commit -m "My commit message"
    Push the changes to GitHub: git push origin <new-branch-name> (e.g. git push origin my-new-branch)
    Open a pull request.

Showcases

Projects using this api or smaller parts of it:

    Animeflix - A streaming service made with NextJs and TailwindCSS. It lets you search, watch animes without any ads with a beautiful ui. It can be self hosted or deployed online.

    miru - A cross platform anime streaming app made using flutter.

    AnimeEZ - A Website Made using html and express as its server for streaming anime without any ads.

    Gogoanime Clone - PHP clone of GogoAnime Website (No Video Ads) | Anime Website

    Anikatsu - Free Anime Streaming Website Made with PHP and Gogoanime API. No Video ads (zoro.to clone)

    For other projects that are using this api or smaller parts of it, please reach out to me at my discord rem#1723 or join the discord server or make a pull request to add it to the list.

NEW API (v2) 🎉

I have made a new api and a nodejs library (called consumet) for developers to use in their projects. This new api/library is able to support any piracy site that is for anime, manga, books, light novels, movie/tvshows, comics, and even personal meta providers like mapping anilist -> gogoanime -> kitsu, or tmbd -> movie-database.
Currently supported sites
Anime
Manga
Books
Light Novels
Movie/TV Shows
Comics
Personal Meta Providers
How to get started?

    Rest API Documentation, Rest API Repository
    NodeJS Package Documentation: where most of the development is happening.
