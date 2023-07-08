function execute() {
    return Response.success([
        {title: "Home", input: "https://readkomik.com/manga/?order=", script: "gen.js"},
        {title: "Phổ biến", input: "https://readkomik.com/manga/?order=popular", script: "gen.js"},
        {title: "Đổi mới", input: "https://readkomik.com/manga/?order=update", script: "gen.js"},
        {title: "Thêm mới", input: "https://readkomik.com/manga/?order=latest", script: "gen.js"}
    ]);
}