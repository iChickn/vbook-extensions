function execute(url) {
  if (url.slice(-1) !== "/") url = url + "/";
  const host = url.split('/truyen/')[0];
  const locationReplacement = url.split('/truyen/')[1];
  const params = url.split('/truyen/')[1].split('/');
  const bookId = params[2];
  const chapId = params[3];
  const bookHost = params[0];
  const bookSty = params[1];
  const lsKey = `${bookHost}${bookId}`;
  console.log(lsKey);
  const currentIdc = '';
  const chapDetailUrl = host + '/index.php';
  const bookNameSysUrl = host + `/namesys.php?host=${bookHost}&book=${bookId}`;
  const setCookie = `document.cookie = "PHPSESSID=652olicmb4bncln4d22rmli6eo; _ac=43aa8b42f57120652b39594778b68c40;"; `;
  const qtOnline = `${host}/qtOnline.js?ver=3429`;

  const namesys = fetch(bookNameSysUrl);

  if (namesys.ok) {
    var namew = Html.parse(namesys.text().replace(/(?:\r\n|\r|\n)/g, '~//~')).select("div").first().text();

    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());
    // b_rowser.block([chapDetailUrl]);
    browser.launch(url, 4000);
    browser.callJs(`localStorage["${lsKey}"] = "${namew}";`, 500);
    browser.callJs(setCookie, 500);
    browser.callJs(`document.location='/truyen/${locationReplacement}';`, 5000);
    //   b_rowser.waitUrl(qtOnline, 5000);
    browser.callJs(`document.querySelector(".blk-item2").click();`, 2000);
    browser.callJs(`document.querySelector("#content-container .contentbox").innerText = document.querySelector("#content-container .contentbox").innerText`, 500);
    const contentbox = browser.html().select("#content-container .contentbox").html();

    console.log(contentbox);

    return Response.success(contentbox);
  }
  return Response.error;
}