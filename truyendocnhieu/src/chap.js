function execute(url) {
    var data = [];
    var doc = Http.get(url).string();
    doc = JSON.parse(doc);
    data.push(doc.chapter.content.replaceAll('</p>', ''));
    
    return Response.success(doc.chapter.content);
}