🚀 Short URL System
ระบบย่อลิงก์ (Short URL) ที่สามารถสร้างลิงก์สั้นจากลิงก์ยาว พร้อมระบบเก็บสถิติการคลิก (Analytics) และประวัติการใช้งาน โดยรองรับการเข้าสู่ระบบผู้ใช้งาน

✨ Features
✅ สร้าง Short URL จาก Full URL
✅ Redirect ไปยังลิงก์ต้นทางอัตโนมัติ
✅ เก็บจำนวนการคลิก (Click Count)
✅ เก็บประวัติการคลิก (Click Logs)
✅ Dashboard แสดง Analytics
✅ ระบบ Login (Clerk Authentication)
✅ เชื่อมต่อ PostgreSQL (Neon)

🛠 Tech Stack
Frontend: Next.js (App Router)
Backend: Next.js API Route
Database: PostgreSQL (Neon)
ORM: Prisma
Authentication: Clerk
Deployment: Vercel

Installation (วิธีติดตั้ง)
git clone https://github.com/your-username/shorturl-app.git
cd shorturl-app
npm install

Environment Variables (.env)
สร้างไฟล์ .env ที่ root project แล้วใส่ค่า:

DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DBNAME?sslmode=require"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

Setup Database
รันคำสั่ง:
npx prisma generate
npx prisma db push

Run Project (วิธีรัน)
npm run dev
