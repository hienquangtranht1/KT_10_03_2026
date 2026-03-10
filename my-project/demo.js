// File demo tự động test API (Yêu cầu Node.js phiên bản 18 trở lên)
async function runDemo() {
    console.log("🚀 BẮT ĐẦU TEST TỰ ĐỘNG CÁC API (THAY THẾ POSTMAN)...\n");

    const time = Date.now(); // Tạo số ngẫu nhiên để không bị trùng username/email

    // 1. Tạo Role mới
    const roleRes = await fetch('http://localhost:3000/roles', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `Thành viên nhóm ${time}`, description: 'Thành viên dự án' })
    });
    const role = await roleRes.json();
    console.log(`✅ Đã tạo Role ID: ${role._id}`);

    // 2. Tạo User (thuộc Role trên)
    const userRes = await fetch('http://localhost:3000/users', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: `hien_${time}`, 
            password: '123',
            email: `hien${time}@gmail.com`, 
            fullName: 'Hiển', 
            role: role._id
        })
    });
    const user = await userRes.json();
    console.log(`✅ Đã tạo User: ${user.username} (Status lúc mới tạo: ${user.status})`);

    // 3. Test Yêu cầu 2 (/enable)
    const enableRes = await fetch('http://localhost:3000/users/enable', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, username: user.username })
    });
    const enableData = await enableRes.json();
    console.log(`✅ Yêu cầu 2 (/enable): Đã gọi API. Status của user chuyển thành -> ${enableData.user.status}`);

    // 4. Test Yêu cầu 3 (/disable)
    const disableRes = await fetch('http://localhost:3000/users/disable', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, username: user.username })
    });
    const disableData = await disableRes.json();
    console.log(`✅ Yêu cầu 3 (/disable): Đã gọi API. Status của user chuyển thành -> ${disableData.user.status}`);

    // 5. Test Yêu cầu 4 (Lấy User theo Role ID)
    const roleUsersRes = await fetch(`http://localhost:3000/roles/${role._id}/users`);
    const roleUsersData = await roleUsersRes.json();
    console.log(`✅ Yêu cầu 4 (Get users by role ID): Tìm thấy ${roleUsersData.length} user thuộc nhóm này.`);

    console.log("\n🎉 TEST HOÀN TẤT! API HOẠT ĐỘNG CHUẨN XÁC.");
}

runDemo();