// file này có chức năng copy 2 file public và views vào trong file dist
// (do 2 file này viết bằng js nên k build chung 1 lần với file ts được)
// sử dụng thư viện : fs-extra

const fs = require("fs-extra");

const listFolderCopy = [{
    sourceDirectory: "views",
    targetDirectory: "dist/views"
}, {
    sourceDirectory: "public",
    targetDirectory: "dist/public"
}];

listFolderCopy.forEach((item) => {
    fs.copy(item.sourceDirectory, item.targetDirectory, (err) => {
        if (err) {
            console.log(`Lỗi sao chép thư mục ${item.sourceDirectory} với ${item.targetDirectory}`,err);
        }
        console.log(`Sao chép thư mục ${item.sourceDirectory} thành công !`);
    });
})