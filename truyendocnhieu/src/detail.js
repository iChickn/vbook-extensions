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

    return Response.success({
        name: doc.select("h1.hl-name-book").text(),
        cover: doc.select(".book-thum img").first().attr("data-src"),
        author: doc.select(".info-book .r-if-book").first().text(),
        description: doc.select(".box-show-des").html().trim().split("\n").splice(1).join("\n").trim(),
        detail: doc.select(".info-book .r-if-book").last().text(),
        category: category,
        host: "https://truyendocnhieu.com"
    });
}