function execute(url) {
    // var browser = Engine.newBrowser()
    var host = url.split('/truyen/')[0];
    var params = url.split('/truyen/')[1].split('/');
    var bookid = params[2];
    var currentid = params[3];
    var bookhost = params[0];
    var booksty = params[1];
    var currentidc = '';
    var newUrl = host + 'index.php?sajax=readchapter&bookid=' + bookid + '&h=' + bookhost + '&c2=' + currentidc + '&c=' + currentid + '&sty=' + booksty;

    var chapterfetcher = new XMLHttpRequest();
    chapterfetcher.open('POST', newUrl, true);
    chapterfetcher.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    chapterfetcher.onreadystatechange = function () {
        if (chapterfetcher.readyState === 4 && chapterfetcher.status === 200) {
            var x = JSON.parse(chapterfetcher.responseText);
            if (x.code === "0") {
                var data = x.data;
                data = data.replace(/<\/p>\r\n<p>/g, "<br><br>");
                data = data.replace(/đạo ?<\/i>:/g, "nói</i>:");
                data = data.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, "<br>");
                data = data.replace(/\n/g, "<br>");
                data = data.replace(/(\w) \./g, "$1.");
                data = data.replace(/((\w\.{1}[ \t])|(\w[!?]+(”|】)?))/g, "$1<br><br>");
                data = data.replace(/<br( ?\/)?>/ig, "<br><br>");
                data = data.replace(/(<br>(|\n|\t|\r| )*)+/g, "<br><br>");
                data = data.replace(/([\w>])“/g, "$1 “");
                data = data.replace(/(\w)<\/i><br>“/g, "$1</i>.<br>");
                data = data.replace(/ ”/g, "”");
                if (location.href.indexOf("uukanshu") > 0) {
                    data = data.replace(/<div class="ad_content">.*?<\/div>/g, "");
                }
                if (location.href.indexOf("aikanshu") > 0) {
                    data = data.replace(/<img.*?src="\/novel\/images.*?>/g, "");
                }
                if (location.href.indexOf("ciweimao") > 0) {
                    data = data.replace(/<span>.*?<\/span>/g, "");
                }
                data = data.replace(/<a href=.*?<\/a>/g, "");
                data = data.replace(/<br><br>([\)” 】!?]+)(<br>|$)/g, "$1$2");
                data = data.replace(/ ([,’]) /g, "$1 ");
                data = data.replace(/ ‘ /g, " ‘");
                data = data.replace("<a&nbsp;href=\"http:", "");

                data = data.replace(/<\/p><br><br><p>/g, "<br><br>");
                data = data.replace(/ ([,\.!\?”]+)/g, "$1");
                data = data.replace("\ufffe", "");

                return Response.success(data);
            }
        } else {
            return Response.success('Không lấy được nội dung truyện!');
        }
    }
    chapterfetcher.send("");
    // browser.launch(newUrl, 10000)
    // browser.waitUrl(".*?sajax=readchapter.*?", 10000)
    // const doc = browser.html(2000)

    // var content = doc.select("#maincontent").first().html();
    // var content = content.replace(/&(amp|quot|lt|gt);/g, "");
    // var content = content.replace(/&nbsp;/g, " ");
    // var content = content.replace(/(nbsp|amp|quot|lt|gt|bp);/g, "");
    // var content = content.replace("@Bạn đang đọc bản lưu trong hệ thống", "");
    // var content = content.replace("UUKANSHU đọc sách www.uukanshu.com", "");
    // var content = content.replace("69 sách a www.69shu.org, đổi mới nhanh nhất Chương mới nhất!", "");
    // var content = content.replace(/<\/?i.*?>/g, "");
    // var content = content.replace(/\s{2,}/g, " ");
    // var content = content.replace(/<div\s+class="ad_content">[\S\s]*?<\/div>/gi, " ");
    // browser.close()

    // return Response.success(content);
}