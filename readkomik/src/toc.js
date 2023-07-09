function execute(url) {
    const host = "https://readkomik.com"
    let response = fetch(url)
    if (response.ok) {
        let doc = response.html()
        let list = []
        let cl = doc.select("#chapterlist > ul > li")
        for (let i = 0; i < cl.size(); i++) {
            let e = cl.get(i)
            list.push({
                name: e.select(".chapternum").text(),
                chapter_num: e.select(".chapternum").text().match(/(\d+)/)[0],
                url: e.select("a").attr("href"),
                host: host
            })
        }

        list.sort((a,  b) => a.chapter_num - b.chapter_num)

        return Response.success(list)
    }
    return null
}