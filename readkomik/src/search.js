function execute(key, page) {
    const host = "https://readkomik.com";
    if (!page) page = "1";
    let response = fetch(`${host}/page/${page}/?s=${key}`);
    if (response.ok) {
        let doc = response.html();
        let hasNext = doc.select(".pagination .next")
        let next = ''
        if (hasNext) {
            doc.select(".pagination .page-numbers:not(.next, .prev, .dots)").last().text()
        }

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