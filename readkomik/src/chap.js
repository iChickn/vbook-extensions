function execute(url) {
    let response = fetch(url)
    if (response.ok) {
        let doc = response.html()
        let data = [];
        doc.select("script").forEach(script => {
            if (script.html().includes("noimagehtml")) {
                let tmp = script.html().replace("/*<![CDATA[*/ts_reader.run(", "")
                tmp = tmp.replace(");/*]]>*/", "")
                let srcObj = JSON.parse(tmp)
                let default3Src = srcObj.sources.find(e => e.source)
                default3Src.images.forEach(img => {
                    if (img) {
                        data.push({
                            link: img,
                            fallback: [
                                img,
                                'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image/*&url=' + encodeURIComponent(img)
                            ]
                        })
                    }
                })
            }
        })
        return Response.success(data)
    }
    return null
}