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
                url: e.select("a").attr("href"),
                host: host
            })
        }
        return Response.success(list.reverse())
    }
    return null
}