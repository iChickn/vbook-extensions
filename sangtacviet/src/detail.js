function execute(url) {
    let _defaultCover = 'https://i.imgur.com/KP0Z6Eh.png';
    let host = url.split('/truyen/')[0];
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    browser.launch(url, 3000);
    let doc = browser.html();
    let author = doc.html().match(/Tác giả:.*?\s+(.*?)\s*</);
    if (author) author = author[1];
    let des = doc.select(".blk:has(.fa-water) .blk-body").html();
    des = des.replace('www.uukanshu.com', '');
    des = des.replace('https://www.uukanshu.com', '');
    let _detail = 'Tên gốc : ' + doc.select("#oriname").text() + '<br>' + doc.select(".blk:has(.fa-info-circle) > div:nth-child(4)").text() + '<br>' + doc.select(".blk:has(.fa-info-circle) > div:nth-child(3)").text();
    let _cover = doc.select(".container:has(#book_name2) img").first().attr("src");
    if (_cover.indexOf("reportbookcover") > 0) _cover = _defaultCover;
    var res = {
        name: doc.select("#book_name2").first().text(),
        cover: _cover,
        author: author || 'Unknow',
        description: des,
        detail: _detail,
        ongoing: true,
        host: host,
    };
    console.log(res);
    return Response.success(res);
}