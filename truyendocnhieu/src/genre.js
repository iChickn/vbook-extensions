function execute() {
    const base = 'https://truyendocnhieu.com';
    const doc = Http.get(base).html();
    var cats = doc.select(".menu-show-full-cate > .list-menu.col-3 > li > a");
    const data = [];

    for (var i = 0; i < cats.size(); i++) {
        var cat = cats.get(i);
        data.push({
            title: cat.text(),
            input: base + cat.attr('href'),
            script: "gen.js"
        });
    }

    return Response.success(data);
}