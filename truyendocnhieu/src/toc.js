function execute(url) {
    const data = [];
    var doc = Http.get(url).html();
    var bookId = doc.select("input[id=book-id]").attr("value");
    doc = Http.get("https://truyendocnhieu.com/ajax/books/" + bookId +"/read-chapter-menu").string();

    var chaps = JSON.parse(doc);

    chaps.forEach(chap => {
        data.push({
            name: chap.name,
            url: "https://truyendocnhieu.com/ajax/books/" + bookId + "/chapters/" + chap._id + "?number=" + chap.number,
            host: "https://truyendocnhieu.com"
        })
    });

    return Response.success(data);
}