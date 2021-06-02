function execute(url) {
    // var browser = Engine.newBrowser()
    var host = url.split('/truyen/')[0];
    var params = url.split('/truyen/')[1].split('/');
    var bookid = params[2];
    var currentid = params[3];
    var bookhost = params[0];
    var booksty = params[1];
    var currentidc = '';
    var params = {
        'sajax': 'readchapter',
        'sty': booksty,
        'c': currentid,
        'h': bookhost,
        'bookid': bookid,
        'c2': currentidc
    };

    var request = Http.post(host)
    .headers({
        'Content-type': 'application/x-www-form-urlencoded',
        'Referer': url
        })
    .params({
        'sajax': 'readchapter',
        'sty': booksty,
        'c': currentid,
        'h': bookhost,
        'bookid': bookid,
        'c2': currentidc
    });
    var data = request.string();
    var content = JSON.parse(data).data;

    content = content.replace(/&(amp|quot|lt|gt);/g, "");
    content = content.replace(/&nbsp;/g, " ");
    content = content.replace(/(nbsp|amp|quot|lt|gt|bp);/g, "");
    content = content.replace("@Bạn đang đọc bản lưu trong hệ thống", "");
    content = content.replace("UUKANSHU đọc sách www.uukanshu.com", "");
    content = content.replace("69 sách a www.69shu.org, đổi mới nhanh nhất Chương mới nhất!", "");
    content = content.replace(/<\/?i.*?>/g, "");
    content = content.replace(/\s{2,}/g, " ");
    // content = content.replace(/<div\s+class="ad_content">[\S\s]*?<\/div>/gi, " ");
    content = content.replace(/<\/p>\r\n<p>/g, "<br><br>");
    content = content.replace(/đạo ?<\/i>:/g, "nói</i>:");
    content = content.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, "<br>");
    content = content.replace(/\n/g, "<br>");
    content = content.replace(/(\w) \./g, "$1.");
    content = content.replace(/((\w\.{1}[ \t])|(\w[!?]+(”|】)?))/g, "$1<br><br>");
    content = content.replace(/<br( ?\/)?>/ig, "<br><br>");
    content = content.replace(/(<br>(|\n|\t|\r| )*)+/g, "<br><br>");
    content = content.replace(/([\w>])“/g, "$1 “");
    content = content.replace(/(\w)<\/i><br>“/g, "$1</i>.<br>");
    content = content.replace(/ ”/g, "”");
    if (url.indexOf("uukanshu") > 0) {
        content = content.replace(/<div class="ad_content">.*?<\/div>/g, "");
    }
    if (url.indexOf("aikanshu") > 0) {
        content = content.replace(/<img.*?src="\/novel\/images.*?>/g, "");
    }
    if (url.indexOf("ciweimao") > 0) {
        content = content.replace(/<span>.*?<\/span>/g, "");
    }
    content = content.replace(/<a href=.*?<\/a>/g, "");
    content = content.replace(/<br><br>([\)” 】!?]+)(<br>|$)/g, "$1$2");
    content = content.replace(/ ([,’]) /g, "$1 ");
    content = content.replace(/ ‘ /g, " ‘");
    content = content.replace("<a&nbsp;href=\"http:", "");

    content = content.replace(/<\/p><br><br><p>/g, "<br><br>");
    content = content.replace(/ ([,\.!\?”]+)/g, "$1");
    content = content.replace("\ufffe", "");

    Console.log(content);

    return Response.success(content);
}