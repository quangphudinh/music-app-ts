export const changeDatime = (date : Date) : string => {
    const newDate : Date = new Date(date); 
    // Lấy ra ngày, tháng, năm
    const day : number = newDate.getDate(); // Ngày
    const month : number = newDate.getMonth() + 1; // Tháng (JavaScript tính từ 0 nên cần +1)
    const year : number = newDate.getFullYear(); // Năm

    // Tạo chuỗi ngày tháng năm theo định dạng mong muốn
    const formattedDate : string = `${day}/${month}/${year}`;
    return formattedDate
}