function execute(url, page) {
    const host = "https://readkomik.com";
    if (!page) page = "1";
    page = parseInt(page)
    let _url = url + "&page=" + page;
    let response = fetch(_url);

    if (response.ok) {
        let doc = response.html();
        let next = doc.select(".hpage > a").last().attr("href").match(/page=(\d+)/);
        if (next) next = next[1]; else next = '';
        let bsx = doc.select(".listupd .bs .bsx")

        let data = [];
        bsx.forEach(manga => {
            let cover = manga.select("img").first().attr("src") || 'https://i.imgur.com/KP0Z6Eh.png';
            let name = manga.select(".tt").first().text().trim()
            let link = manga.select("a").first().attr("href")
            let chapter = manga.select(".epxs").first().text()
            let rating = manga.select(".numscore").first().text()

            if (cover.startsWith('//')) cover = cover.replace('//', 'https://')

            data.push({
                name,
                link,
                cover,
                description: `${chapter}\n${rating}`,
                host
            })
        });

        return Response.success(data, next)
    }

    return null;
}