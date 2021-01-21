function execute() {
    const doc = Http.get("https://truyendocnhieu.com").html();
    var cats = doc.select(".menu-show-full-cate > .list-menu.col-3 > li > a");
    const data = [];
    cats.forEach(cat => {
        data.push({
            title: cat.text,
            input: cat.href,
            script: "gen.js"
        });
    });

    return Response.success(data);
}