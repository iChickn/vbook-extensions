function execute(url) {
    var doc = Http.get(url).string();
    doc = JSON.parse(doc);
    doc = doc.chapter.content.toString();
    
    return Response.success(doc.split("</p>").join(""));
}