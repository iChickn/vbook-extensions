function execute (url) {
  if (url.slice(-1) !== '/') url = url + '/'
  const regex = /https:\/\/sangtacviet\.app\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^\/]+)\//
  let host = url.split('/truyen/')[0]
  const source = url.split('/')[4]
  const bookId = url.split('/')[6]

  let chapListUrl = host + '/index.php?ngmar=chapterlist&h=' + source +
    '&bookid=' + bookId + '&sajax=getchapterlist&force=true'
  let list = []

  let resp = fetch(chapListUrl, {
    method: 'GET',
    'headers': {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'no-cache',
      'pragma': 'no-cache',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'cookie': 'hideavatar=false; lang=vi; _acx=UemVEoUiPTTncsFaskENqQ==; _gid=GA1.2.153508239.1734536118; arouting=e; PHPSESSID=3rrm54q8bmr0l21g42mr0rof6h; prefetchAd_3763521=true; _gat_gtag_UA_145395004_1=1; _ga_MNX3PR1HR4=GS1.1.1734536118.2.1.1734537719.0.0.0; _ga=GA1.1.2016460250.1734274737',
      'Referer': url,
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    'body': null,
  })

  if (resp.ok) {
    let x = resp.json()
    try {
      if (x.code === 1) {
        if (x.enckey) {
          eval(atob(x.enckey))
        }
        if (!x.data) {
          return
        }
        const cachechapter = x.data.split('-//-')
        let i = (source === 'uukanshu') ? cachechapter.length - 1 : 0
        const iend = (i > 0) ? -1 : cachechapter.length
        for (; i !== iend;) {
          const da = cachechapter[i].split('-/-')

          list.push({
            name: da[2],
            url: host + '/truyen/dich/' + da[0] + '/28319/' + da[1] + '/',
            host: host,
          })

          if (source === 'uukanshu') {
            i--
          } else i++
        }
      } else { }
    } catch (exc) { }
  }

  return Response.success(list);
}

