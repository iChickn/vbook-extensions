function execute(url) {
    const host = "https://readkomik.com"
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html()

        let name = doc.select("#titlemove .entry-title").text()
        let cover = doc.select(".info-left .thumb img").attr("src")
        let author = doc.select(".tsinfo .imptdt:nth-child(4) > i").text()
        let status = doc.select(".tsinfo .imptdt:nth-child(1) > i").text()
        let alternative = doc.select("#titlemove .alternative").text()
        let genres = doc.select(".info-desc .mgen").text()
        let description = doc.select(".info-desc .entry-content").text()

        return Response.success({
            name,
            cover,
            author,
            description,
            detail: `${alternative}\n${genres}`,
            host: host,
            ongoing: status === "Ongoing"
        });
    }
    return null;
}