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
    var detail = "Tác giả: " + author + "\nThể loại: " + doc.select(".info-book .r-if-book")[1].text() + "\nTình trạng: " + status;
    detail = detail + "\n" + doc.select(".book-thum img").first().attr("data-src");

    return Response.success({
        name: doc.select("h1.hl-name-book").text(),
        cover: doc.select(".book-thum img").first().attr("data-src"),
        author: author,
        description: doc.select(".box-show-des").html().trim().split("\n").splice(1).join("\n").trim(),
        detail: detail,
        category: category,
        host: "https://truyendocnhieu.com"
    });
}