function execute() {
    const host = "https://readkomik.com";
    const genres = [
        {
            "title": "Academy",
            "input": "1676"
        },
        {
            "title": "Action",
            "input": "2"
        },
        {
            "title": "Acttion",
            "input": "949"
        },
        {
            "title": "Adult",
            "input": "523"
        },
        {
            "title": "Adventure",
            "input": "18"
        },
        {
            "title": "Adventurer",
            "input": "1717"
        },
        {
            "title": "Battle Royale",
            "input": "1376"
        },
        {
            "title": "Comedy",
            "input": "12"
        },
        {
            "title": "Crime",
            "input": "727"
        },
        {
            "title": "Demon",
            "input": "1467"
        },
        {
            "title": "Demons",
            "input": "473"
        },
        {
            "title": "Drama",
            "input": "137"
        },
        {
            "title": "Ecchi",
            "input": "141"
        },
        {
            "title": "Fansaty",
            "input": "829"
        },
        {
            "title": "Fantasi",
            "input": "1328"
        },
        {
            "title": "Fantasy",
            "input": "3"
        },
        {
            "title": "Fantasy Shounen",
            "input": "1611"
        },
        {
            "title": "Full Color",
            "input": "1370"
        },
        {
            "title": "Game",
            "input": "15"
        },
        {
            "title": "Gender Bender",
            "input": "544"
        },
        {
            "title": "Gore",
            "input": "1509"
        },
        {
            "title": "Harem",
            "input": "139"
        },
        {
            "title": "Historical",
            "input": "344"
        },
        {
            "title": "Horror",
            "input": "274"
        },
        {
            "title": "Hot blood",
            "input": "1371"
        },
        {
            "title": "Isekai",
            "input": "13"
        },
        {
            "title": "Josei",
            "input": "561"
        },
        {
            "title": "Lolicon",
            "input": "764"
        },
        {
            "title": "Magic",
            "input": "4"
        },
        {
            "title": "Manga",
            "input": "1212"
        },
        {
            "title": "Manhua",
            "input": "1243"
        },
        {
            "title": "Manhwa",
            "input": "1064"
        },
        {
            "title": "Martial Arts",
            "input": "22"
        },
        {
            "title": "Mature",
            "input": "138"
        },
        {
            "title": "Mecha",
            "input": "507"
        },
        {
            "title": "Medical",
            "input": "797"
        },
        {
            "title": "Murim",
            "input": "1547"
        },
        {
            "title": "Mystery",
            "input": "275"
        },
        {
            "title": "Otherworld",
            "input": "1627"
        },
        {
            "title": "Post-Apocalyptic",
            "input": "1244"
        },
        {
            "title": "Psychological",
            "input": "592"
        },
        {
            "title": "Rebirth",
            "input": "839"
        },
        {
            "title": "Reincarnation",
            "input": "349"
        },
        {
            "title": "Revenge",
            "input": "1339"
        },
        {
            "title": "Romance",
            "input": "308"
        },
        {
            "title": "School Life",
            "input": "160"
        },
        {
            "title": "Sci-Fi",
            "input": "23"
        },
        {
            "title": "Seinen",
            "input": "140"
        },
        {
            "title": "Shotacon",
            "input": "480"
        },
        {
            "title": "Shoujo",
            "input": "516"
        },
        {
            "title": "Shoujo Ai",
            "input": "689"
        },
        {
            "title": "Shounen",
            "input": "161"
        },
        {
            "title": "Slice of Life",
            "input": "162"
        },
        {
            "title": "Smut",
            "input": "765"
        },
        {
            "title": "Sports",
            "input": "163"
        },
        {
            "title": "Supernatural",
            "input": "165"
        },
        {
            "title": "Survival",
            "input": "1245"
        },
        {
            "title": "System",
            "input": "1282"
        },
        {
            "title": "Thriller",
            "input": "922"
        },
        {
            "title": "Time Travel",
            "input": "1018"
        },
        {
            "title": "Tragedy",
            "input": "276"
        },
        {
            "title": "Yuri",
            "input": "720"
        },
        {
            "title": "Zombies",
            "input": "1260"
        }
    ]

    return Response.success(genres.map(g => {
        g.script = "gen.js"
        g.input = `${host}/manga/?genre%5B%5D=${g.input}&order=update`
        return g;
    }))
}