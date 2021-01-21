function execute() {
    return Response.success([
        {title: "Mới cập nhật", input: "https://truyendocnhieu.com/the-loai", script: "gen.js"},
        {title: "Xem nhiều", input: "https://truyendocnhieu.com/the-loai?type=2", script: "gen.js"},
        {title: "Full", input: "https://truyendocnhieu.com/the-loai?type=3", script: "gen.js"}
    ]);
}