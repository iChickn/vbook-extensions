function execute() {
    return Response.success([
        {title: "Cập Nhật", input: "https://sangtacvietfpt.com/?find=&minc=0&sort=update&tag=", script: "gen.js"},
        {title: "Nhiều Like", input: "https://sangtacvietfpt.com/?find=&minc=0&sort=upvote&tag=", script: "gen.js"},
        {title: "Truyện HOT", input: "https://sangtacvietfpt.com/?find=&minc=0&sort=star&tag=", script: "gen.js"},
        {title: "Top Tuần", input: "https://sangtacvietfpt.com/?find=&minc=0&sort=viewweek&tag=", script: "gen.js"},
    ]);
}