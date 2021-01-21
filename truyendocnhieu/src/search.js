function execute(key, page) {
    if (!page) page = 1;

    const doc = Http.get("https://truyendocnhieu.com/tim-kiem").params({"q": key, "page": page}).html();
    const booksList = doc.select("#search-result-container > div > ul > li");
    var next = doc.select('.box-page-view').select('a.active + a').text();
    const data = [];

    for (var i = 0; i < booksList.size(); i++) {
        var book = booksList.get(i);
        data.push({
            name: book.select(".box-book-info .name-book").text(),
            link: book.select(".box-book-info .name-book").attr("href"),
            cover: book.select(".img img").first().attr("src"),
            description: book.select(".box-book-info .info-book-des").text(),
            host: "https://truyendocnhieu.com/"
        });
    }

    return Response.success(data, next);
}