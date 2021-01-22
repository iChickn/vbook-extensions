function execute(url) {
    const category = [];
    const doc = Http.get(url).html()
    const cats = doc.select(".info-book .r-if-book")[1].select("a");

    for (var i = 0; i < cats.size(); i++) {
        var cat = cats.get(i)
        category.push({
            name: cat.text(),
            link: cat.attr("href")
        });
    }

    var author = doc.select(".info-book .r-if-book").first().text();
    var status = doc.select(".info-book .r-if-book").last().text();
    var detail = author + "<br/>" + status + "<br/>" + doc.select(".info-book .r-if-book")[1].text();
    //doc.select(".box-show-des").text().trim().split("\n").splice(1).join("\n").trim()

    return Response.success({
        name: doc.select("h1.hl-name-book").text(),
        cover: doc.select(".book-thum img").first().attr("src"),
        author: author,
        description: doc.select(".box-show-des").html(),
        detail: doc.select(".box-show-des").html(),
        category: category,
        host: "https://truyendocnhieu.com"
    });
}