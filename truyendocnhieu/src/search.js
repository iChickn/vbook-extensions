function execute(key, page) {
    if (!page) page = 1;

    const doc = Http.get("https://truyendocnhieu.com/tim-kiem").params({"q": key, "page": page}).html();
    const booksList = doc.select("#search-result-container > div > ul > li");
    const data = [];

    bookList.forEach(book => {
        data.push({
            name: book.select(".box-book-info .name-book").text,
            link: book.select(".box-book-info .name-book").href,
            cover: book.select(".img img").src,
            description: book.select(".box-book-info .info-book-des").outerText,
            host: "https://truyendocnhieu.com/"
        });
    });

    return Response.success(data, page++);
}