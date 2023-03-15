function execute(url) {
  if (url.slice(-1) !== "/") url = url + "/";
  let host = url.split('/truyen/')[0];
  const source = url.split('/')[4];
  const bookId = url.split('/')[6];

  let chapListUrl = host + '/index.php?ngmar=chapterlist&h=' + source + '&bookid=' + bookId + '&sajax=getchapterlist&force=true';
  let list = [];

  var browser = Engine.newBrowser();
  browser.setUserAgent(UserAgent.android());
  browser.launch(url, 1000);
  browser.callJs(`
document.createElement = function(create) {
    return function() {
        var ret = create.apply(this, arguments);
        if (ret.tagName.toLowerCase() === "a" && arguments.callee.caller.toString().startsWith("function(e,a,b)")) { //
            arguments.callee.caller.arguments[0].setAttribute("chap-url", "/truyen/${source}/" + arguments.callee.caller.arguments[1] + "/${bookId}/" + arguments.callee.caller.arguments[2] + "/");
        }
        return ret;
    };
}(document.createElement)
`, 0);

  browser.callJs("renewchapter(true);", 1000);
  
  do {
    var listchapitems = browser.html().select(".listchapitem");
  } while (listchapitems.length == 0);

  listchapitems.forEach(chapItem => {
    let title = chapItem.text();
    let chapUrl = chapItem.attr("chap-url");
    list.push({
        name: title,
        url: chapUrl,
        host: host,
    });
  });

  return Response.success(list);
  let response = fetch(chapListUrl, {
    method: 'GET',
    headers: {
      'Referer': url,
    },
    redirect: 'follow',
  });

  if (response.ok) {
    let x = response.json();

    load("base64.js");
    load("stv_deobfuscator.js");
    load("crypto-js.js");
    if (x.code == 1) {
      if (x.enckey) {
        let decodedEncKey = Base64.decode(x.enckey);
        let encryptedAes = STV.getEncryptedAes(decodedEncKey, x.data);
        encryptedAes.encrypted = CryptoJS.enc.Base64.parse(encryptedAes.encrypted);
        encryptedAes.key = CryptoJS.enc.Utf8.parse(encryptedAes.key);
        encryptedAes.iv = CryptoJS.enc.Utf8.parse(encryptedAes.iv);
        let decrypted = CryptoJS.AES.decrypt({ciphertext: encryptedAes.encrypted}, encryptedAes.key, {iv: encryptedAes.iv});
        x.data = decrypted.toString(CryptoJS.enc.Utf8);
      }
      let chapList = x.data.split("-//-");
      let i = (source === "uukanshu") ? chapList.length - 1 : 0;
      let iend = (i > 0) ? -1 : chapList.length;
      for (; i !== iend;) {
        let chap = chapList[i].split("-/-");
        let title = "";
        if (i > 2900) {
          title = chap[2].replace(/([\t\n]+|<br>|&nbsp;)/g, "").replace(/Thứ ([\d\,]+) chương/i, "Chương $1:").replace(/^(.+)Chương/i, "Chương $1").trim();
        } else {
          title = chap[2].replace(/([\t\n]+|<br>|&nbsp;)/g, "").replace(/Thứ ([\d\,]+) chương/, "Chương $1:").trim();
        }
        if (source === "uukanshu") {
          i--;
        } else {
          i++;
        }
        if (title) {
          list.push({
            name: title,
            url: url + chap[1],
            host: host,
          });
        }
      }
    }
  }
  return Response.success(list);
}

