function execute(url, page) {
    if (!page) page = 1;
    
    const doc = Http.get(url).params({"page": page}).html();
    const booksList = doc.select("#category-books-container > div > ul > li");
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

    return Response.success(data, page++)
}