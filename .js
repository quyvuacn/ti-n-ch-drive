// Hướng dẫn liệt kê danh sách file trong folder Google Drive - GDrive.VIP

// GDRIVE.VIP: Dán ID folder vào dưới
var folderId = 'ID Folder';

// Function 1: Liệt kê tất cả folder và viết vào sheet.
function listFolers(){
getFolderTree(folderId, false);
};

// Function 2.
function listAll(){
getFolderTree(folderId, true);
};

// Lấy Folder Tree
function getFolderTree(folderId, listAll) {
try {

// Lấy folder id
var parentFolder = DriveApp.getFolderById(folderId);

// Khởi tạo sheet
var file, data, sheet = SpreadsheetApp.getActiveSheet();
sheet.clear();
sheet.appendRow(["Đường dần đầy đủ", "Tên", "Ngày", "URL", "Cập nhập lần cuối", "Mô tả", "Kích thước"]);

// Lấy file và folder
getChildFolders(parentFolder.getName(), parentFolder, data, sheet, listAll);
} catch (e) {
Logger.log(e.toString());
}
};

// Lấy danh sách file, folder và metadata của chúng ở chế độ đệ quy
function getChildFolders(parentName, parent, data, sheet, listAll) {
var childFolders = parent.getFolders();

// Liệt kê folder con
while (childFolders.hasNext()) {
var childFolder = childFolders.next();

// Logger.log("Folder Name: " + childFolder.getName());
data = [
parentName + "/" + childFolder.getName(),
childFolder.getName(),
childFolder.getDateCreated(),
childFolder.getUrl(),
childFolder.getLastUpdated(),
childFolder.getDescription(),
childFolder.getSize()
];

// Ghi
sheet.appendRow(data);

// Liệt kê các file trong folder
var files = childFolder.getFiles();
while (listAll & files.hasNext()) {
var childFile = files.next();

// Logger.log("File Name: " + childFile.getName());
data = [
parentName + "/" + childFolder.getName() + "/" + childFile.getName(),
childFile.getName(),
childFile.getDateCreated(),
childFile.getUrl(),
childFile.getLastUpdated(),
childFile.getDescription(),
childFile.getSize()
];

// Ghi
sheet.appendRow(data);
}

// Gọi đệ quy của folder con
getChildFolders(parentName + "/" + childFolder.getName(), childFolder, data, sheet, listAll);
}
};
