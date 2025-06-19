# Công ty Viễn thông ACT - Ứng dụng Web Next.js

## Báo cáo Thực tập - Tài liệu Dự án

---

## Mục lục

1. [Tổng quan dự án](#tong-quan-du-an)
2. [Công nghệ sử dụng](#cong-nghe-su-dung)
3. [Cấu trúc dự án](#cau-truc-du-an)
4. [Tính năng & Chức năng](#tinh-nang--chuc-nang)
5. [Kiến trúc cơ sở dữ liệu](#kien-truc-co-so-du-lieu)
6. [API Endpoints](#api-endpoints)
7. [Phân tích thành phần chính](#phan-tich-thanh-phan-chinh)
8. [Cài đặt & Thiết lập](#cai-dat--thiet-lap)
9. [Quy trình phát triển](#quy-trinh-phat-trien)
10. [Bảo mật](#bao-mat)
11. [Triển khai](#trien-khai)
12. [Mẫu mã nguồn](#mau-ma-nguon)

---

## Tổng quan dự án

**Tên dự án:** Website Công ty Viễn thông ACT  
**Loại hình:** Website giới thiệu doanh nghiệp với Hệ thống Quản lý Nội dung  
**Framework:** Next.js 15.3.1 với App Router  
**Mục đích:** Một website hiện đại cho công ty ACT Viễn thông, giới thiệu dịch vụ, dự án, tin tức và cung cấp khả năng quản trị cho việc quản lý nội dung.

### Thông tin về công ty

Công ty Viễn thông ACT là một công ty viễn thông tại Việt Nam cung cấp:

- Giải pháp và sản phẩm CNTT
- Dịch vụ truyền hình kỹ thuật số
- Đầu tư hạ tầng viễn thông
- Hạ tầng viễn thông bằng sợi quang
- Quản lý và vận hành hạ tầng viễn thông
- Dự án xây dựng viễn thông

---

## Công nghệ sử dụng

### Công nghệ Frontend

- **Next.js 15.3.1** - Framework React với App Router
- **React 19.0.0** - Thư viện giao diện với các tính năng đồng thời mới nhất
- **Ant Design 5.26.0** - Thư viện thành phần giao diện người dùng
- **Tailwind CSS 4.1.4** - Framework CSS tiện ích
- **@ant-design/icons** - Thư viện biểu tượng

### Công nghệ Backend

- **Next.js API Routes** - Điểm cuối API phía máy chủ
- **Supabase** - Backend as a Service (BaaS)
- **MySQL2** - Trình điều khiển cơ sở dữ liệu
- **bcryptjs** - Băm mật khẩu
- **jsonwebtoken** - Xác thực JWT

### Công cụ phát triển

- **ESLint** - Kiểm tra mã
- **PostCSS** - Xử lý CSS
- **Turbopack** - Trình đóng gói nhanh cho phát triển

---

## Cấu trúc dự án

```
ACT/
├── public/                          # Tài nguyên tĩnh
│   ├── assets/images/              # Hình ảnh và tài nguyên công ty
│   │   ├── logo_ACT.png
│   │   ├── home_bannertop_*.jpg
│   │   ├── dịch vụ hình ảnh/
│   │   └── logo đối tác/
│   └── *.svg                       # Tệp biểu tượng
├── src/
│   ├── app/                        # Cấu trúc App Router của Next.js
│   │   ├── (public)/              # Các trang công khai (nhóm tuyến đường)
│   │   │   ├── Giới thiệu/             # Thông tin công ty
│   │   │   ├── Liên hệ/           # Trang liên hệ
│   │   │   ├── Trang chủ/              # Các thành phần trang chủ
│   │   │   ├── Tin tức/              # Tin tức và bài viết
│   │   │   ├── Dự án/          # Triển lãm dự án của công ty
│   │   │   ├── Tuyển dụng/       # Cơ hội việc làm
│   │   │   ├── Dịch vụ/          # Các dịch vụ của công ty
│   │   │   ├── layout.js          # Bố cục công khai (Đầu trang/Chân trang)
│   │   │   └── page.js            # Điểm nhập trang chủ
│   │   ├── admin/                 # Bảng điều khiển quản trị (đường dẫn được bảo vệ)
│   │   │   ├── contacts/          # Quản lý liên hệ
│   │   │   ├── dashboard/         # Bảng điều khiển quản trị
│   │   │   ├── jobs/              # Quản lý đăng tuyển
│   │   │   ├── login/             # Xác thực quản trị
│   │   │   ├── news/              # Quản lý tin tức
│   │   │   ├── projects/          # Quản lý dự án
│   │   │   ├── services/          # Quản lý dịch vụ
│   │   │   ├── users/             # Quản lý người dùng
│   │   │   └── layout.js          # Bố cục quản trị
│   │   ├── api/                   # Các điểm cuối API
│   │   │   ├── admin/             # API quản trị được bảo vệ
│   │   │   ├── auth/              # API xác thực
│   │   │   ├── contacts/          # API biểu mẫu liên hệ
│   │   │   ├── news/              # API tin tức
│   │   │   ├── projects/          # API dự án
│   │   │   └── services/          # API dịch vụ
│   │   ├── globals.css            # Kiểu toàn cục
│   │   └── layout.js              # Bố cục gốc
│   ├── components/                # Các thành phần UI tái sử dụng
│   │   ├── Admin/                 # Các thành phần riêng cho quản trị
│   │   ├── Common/                # Các thành phần chia sẻ
│   │   ├── Home/                  # Các thành phần trang chủ
│   │   ├── Layout/                # Các thành phần bố cục
│   │   │   ├── Header.js          # Điều hướng chính
│   │   │   ├── Footer.js          # Chân trang
│   │   │   └── AntdAppWrapper.js  # Bọc Ant Design
│   │   └── UI/                    # Các thành phần UI chung
│   ├── data/                      # Dữ liệu tĩnh và cấu hình
│   │   ├── menu.js                # Dữ liệu điều hướng và liên hệ
│   │   └── services.js            # Cấu hình dịch vụ
│   ├── lib/                       # Thư viện tiện ích
│   │   ├── antd-compat.js         # Tương thích Ant Design
│   │   └── supabase.js            # Cấu hình cơ sở dữ liệu
│   └── services/                  # Các hàm dịch vụ API
│       └── services.js            # Lớp dịch vụ cho các cuộc gọi API
├── middleware.js                   # Middleware của Next.js (xác thực, CORS)
├── next.config.mjs                # Cấu hình Next.js
├── package.json                   # Các phụ thuộc và kịch bản
├── tailwind.config.js             # Cấu hình Tailwind CSS
└── act.sql                        # Lược đồ cơ sở dữ liệu
```

---

## Tính năng & Chức năng

### Tính năng công khai

1. **Trang chủ**

   - Biểu ngữ carousel với các điểm nổi bật của công ty
   - Lịch sử và cột mốc quan trọng của công ty
   - Thẻ dịch vụ
   - Triển lãm đối tác và khách hàng
   - Dự án nổi bật

2. **Thông tin công ty (Giới thiệu)**

   - Tổng quan và sứ mệnh của công ty
   - Đội ngũ lãnh đạo
   - Thống kê và thành tựu của công ty
   - Cơ cấu tổ chức

3. **Dịch vụ**

   - Giải pháp và sản phẩm CNTT
   - Dịch vụ truyền hình kỹ thuật số
   - Hạ tầng viễn thông
   - Dịch vụ sợi quang
   - Quản lý hạ tầng
   - Dịch vụ xây dựng

4. **Danh mục Dự án**

   - Triển lãm các dự án đã hoàn thành
   - Chi tiết và thông số kỹ thuật của dự án
   - Lời chứng thực của khách hàng
   - Phân loại dự án

5. **Tin tức & Cập nhật**

   - Tin tức và thông báo của công ty
   - Xu hướng ngành
   - Đưa tin sự kiện
   - Thông cáo báo chí

6. **Tuyển dụng**

   - Các vị trí tuyển dụng
   - Quy trình ứng tuyển
   - Thông tin văn hóa công ty
   - Cơ hội phát triển nghề nghiệp

7. **Liên hệ**
   - Biểu mẫu liên hệ với xác thực
   - Địa điểm và bản đồ công ty
   - Nhiều phương thức liên hệ
   - Giờ làm việc

### Tính năng quản trị

1. **Bảng điều khiển**

   - Tổng quan thống kê (dịch vụ, dự án, tin tức, liên hệ)
   - Hoạt động gần đây
   - Truy cập nhanh vào các phần quản lý
   - Thống kê hiệu suất

2. **Quản lý Nội dung**

   - **Quản lý Dịch vụ**: Tạo, chỉnh sửa, xóa dịch vụ
   - **Quản lý Dự án**: Quản lý danh mục đầu tư với hình ảnh
   - **Quản lý Tin tức**: Tạo và xuất bản bài viết
   - **Quản lý Liên hệ**: Xem và phản hồi các yêu cầu

3. **Quản lý Người dùng**

   - Tạo và quản lý người dùng quản trị
   - Kiểm soát truy cập dựa trên vai trò
   - Quản lý mật khẩu
   - Theo dõi hoạt động người dùng

4. **Hệ thống Xác thực**
   - Đăng nhập an toàn với mã thông báo JWT
   - Băm mật khẩu với bcrypt
   - Quản lý phiên làm việc
   - Các tuyến đường được bảo vệ

---

## Kiến trúc cơ sở dữ liệu

### Các bảng trong cơ sở dữ liệu (Supabase/PostgreSQL)

```sql
-- Bảng người dùng cho xác thực quản trị
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng dịch vụ
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng dự án
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    client VARCHAR(255),
    status VARCHAR(50) DEFAULT 'completed',
    start_date DATE,
    end_date DATE,
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng tin tức
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author VARCHAR(100),
    image_url VARCHAR(500),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng liên hệ
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    responded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng đăng tuyển
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    location VARCHAR(100),
    type VARCHAR(50) DEFAULT 'full-time',
    description TEXT NOT NULL,
    requirements TEXT,
    salary_range VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    posted_date DATE DEFAULT CURRENT_DATE,
    closing_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Các điểm cuối API công khai

```javascript
// Dịch vụ
GET / api / services; // Lấy tất cả dịch vụ đang hoạt động
GET / api / services / [id]; // Lấy dịch vụ cụ thể

// Dự án
GET / api / projects; // Lấy tất cả dự án
GET / api / projects / [id]; // Lấy dự án cụ thể
GET / api / projects / featured; // Lấy dự án nổi bật

// Tin tức
GET / api / news; // Lấy tin tức đã xuất bản
GET / api / news / [id]; // Lấy bài viết cụ thể

// Liên hệ
POST / api / contacts; // Gửi biểu mẫu liên hệ
```

### Các điểm cuối API quản trị

```javascript
// Xác thực
POST / api / auth / login; // Đăng nhập quản trị
POST / api / auth / logout; // Đăng xuất quản trị

// Dịch vụ quản trị
GET / api / admin / services; // Lấy tất cả dịch vụ (bao gồm không hoạt động)
POST / api / admin / services; // Tạo dịch vụ mới
PUT / api / admin / services / [id]; // Cập nhật dịch vụ
DELETE / api / admin / services / [id]; // Xóa dịch vụ

// Dự án quản trị
GET / api / admin / projects; // Lấy tất cả dự án
POST / api / admin / projects; // Tạo dự án mới
PUT / api / admin / projects / [id]; // Cập nhật dự án
DELETE / api / admin / projects / [id]; // Xóa dự án

// Tin tức quản trị
GET / api / admin / news; // Lấy tất cả tin tức (bao gồm bản nháp)
POST / api / admin / news; // Tạo bài viết mới
PUT / api / admin / news / [id]; // Cập nhật bài viết
DELETE / api / admin / news / [id]; // Xóa bài viết

// Liên hệ quản trị
GET / api / admin / contacts; // Lấy tất cả yêu cầu liên hệ
PUT / api / admin / contacts / [id]; // Cập nhật trạng thái liên hệ

// Người dùng quản trị
GET / api / admin / users; // Lấy tất cả người dùng
POST / api / admin / users; // Tạo người dùng mới
PUT / api / admin / users / [id]; // Cập nhật người dùng
DELETE / api / admin / users / [id]; // Xóa người dùng
```

---

## Phân tích thành phần chính

### 1. Các thành phần Bố cục

#### Thành phần Đầu trang (`/src/components/Layout/Header.js`)

```javascript
// Điều hướng đáp ứng với ngăn kéo di động
// Tính năng:
// - Biểu tượng công ty
// - Menu điều hướng trên máy tính để bàn
// - Menu hamburger di động với ngăn kéo
// - Đánh dấu tuyến đường đang hoạt động
// - Vị trí dính

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới thiệu", href: "/About" },
  { name: "Dịch vụ", href: "/Services" },
  { name: "Dự án", href: "/Projects" },
  { name: "Tin tức", href: "/News" },
  { name: "Tuyển dụng", href: "/Recruitment" },
  { name: "Liên hệ", href: "/Contact" },
];
```

#### Thành phần Chân trang (`/src/components/Layout/Footer.js`)

- Thông tin liên hệ công ty
- Liên kết mạng xã hội
- Liên kết điều hướng nhanh
- Địa chỉ và thông tin doanh nghiệp

### 2. Các thành phần Trang chủ

#### Biểu ngữ Carousel (`/src/app/(public)/Home/CarouselBanner.js`)

- Carousel hình ảnh tự động
- Biểu ngữ điểm nổi bật của công ty
- Lớp phủ kêu gọi hành động

#### Thẻ Dịch vụ (`/src/app/(public)/Home/ProvidingService.js`)

- Bố cục lưới của các dịch vụ cung cấp
- Hình ảnh và mô tả cho mỗi dịch vụ
- Liên kết đến các trang dịch vụ chi tiết

### 3. Các thành phần Quản trị

#### Bảng điều khiển (`/src/app/admin/dashboard/page.js`)

```javascript
// Các tính năng chính:
// - Thẻ thống kê (dịch vụ, dự án, tin tức, liên hệ)
// - Bảng hoạt động gần đây
// - Nút truy cập nhanh
// - Biểu đồ dữ liệu

const stats = {
  services: 0,
  projects: 0,
  news: 0,
  contacts: 0,
};
```

#### Các thành phần Quản lý Dữ liệu

- Các thao tác CRUD cho tất cả các loại nội dung
- Xác thực biểu mẫu và xử lý lỗi
- Khả năng tải lên hình ảnh
- Hỗ trợ các thao tác hàng loạt

---

## Cài đặt & Thiết lập

### Các yêu cầu tiên quyết

- Node.js 18+
- Trình quản lý gói npm hoặc yarn
- Tài khoản Supabase (cho cơ sở dữ liệu)
- Git

### Hướng dẫn Cài đặt Từng bước

1. **Nhân bản Kho lưu trữ**

```bash
git clone <repository-url>
cd ACT
```

2. **Cài đặt Các phụ thuộc**

```bash
npm install
# hoặc
yarn install
```

3. **Cấu hình Môi trường**
   Tạo tệp `.env.local`:

```env
# Cấu hình Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Bí mật JWT cho xác thực
JWT_SECRET=your_jwt_secret_key

# Cấu hình Cơ sở dữ liệu (nếu sử dụng MySQL trực tiếp)
DATABASE_URL=your_database_connection_string
```

4. **Thiết lập Cơ sở dữ liệu**

```bash
# Chạy lược đồ SQL từ act.sql
# Nhập lược đồ cơ sở dữ liệu vào phiên bản Supabase của bạn
```

5. **Tạo Người dùng Quản trị**

```bash
# Chạy kịch bản băm mật khẩu
npm run hash-passwords
```

6. **Bắt đầu Máy chủ Phát triển**

```bash
npm run dev
# hoặc
yarn dev
```

7. **Truy cập Ứng dụng**

- Trang công khai: `http://localhost:3000`
- Bảng điều khiển quản trị: `http://localhost:3000/admin/login`

---

## Quy trình phát triển

### Các Kịch bản Phát triển

```json
{
  "dev": "next dev --turbopack", // Bắt đầu máy chủ phát triển
  "build": "next build", // Xây dựng cho sản xuất
  "start": "next start", // Bắt đầu máy chủ sản xuất
  "lint": "next lint", // Chạy ESLint
  "hash-passwords": "node scripts/hash-existing-passwords.js"
}
```

### Quy ước Đặt tên Tệp

- **Trang**: Sử dụng `page.js` cho các trang tuyến đường
- **Bố cục**: Sử dụng `layout.js` cho các bố cục tuyến đường
- **Thành phần**: PascalCase (ví dụ: `CarouselBanner.js`)
- **API Routes**: Sử dụng `route.js` cho các điểm cuối API
- **Tiện ích**: camelCase (ví dụ: `supabase.js`)

### Cấu trúc Thành phần

```javascript
// Cấu trúc thành phần chuẩn
"use client"; // Đối với các thành phần phía máy khách

import { useState, useEffect } from "react";
import { ComponentLibrary } from "library";

export default function ComponentName() {
  // Logic thành phần
  return (
    // Nội dung JSX
  );
}
```

---

## Bảo mật

### Hệ thống Xác thực

1. **Xác thực Mã thông báo JWT**

   - Tạo mã thông báo an toàn
   - Hết hạn mã thông báo (24 giờ)
   - Middleware xác thực mã thông báo

2. **Bảo mật Mật khẩu**

   - Băm bcrypt với số vòng muối
   - Yêu cầu mật khẩu mạnh
   - Lưu trữ mật khẩu an toàn

3. **Bảo vệ Tuyến đường**
   - Bảo vệ tuyến đường dựa trên middleware
   - Kiểm soát truy cập dựa trên vai trò
   - Bảo mật điểm cuối API

### Tiêu đề Bảo mật

```javascript
// Được thực hiện trong middleware.js
response.headers.set("X-Frame-Options", "DENY");
response.headers.set("X-Content-Type-Options", "nosniff");
response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
```

### Xác thực Đầu vào

- Xác thực biểu mẫu ở phía máy khách và máy chủ
- Ngăn chặn tiêm SQL
- Bảo vệ XSS thông qua việc thoát tích hợp của React

---

## Triển khai

### Xây dựng Sản xuất

```bash
npm run build
npm start
```

### Biến môi trường cho Sản xuất

- Cập nhật tất cả biến môi trường cho sản xuất
- Sử dụng bí mật JWT an toàn
- Cấu hình kết nối cơ sở dữ liệu sản xuất
- Thiết lập chính sách CORS phù hợp

### Nền tảng Lưu trữ Đề xuất

1. **Vercel** (Đề xuất cho Next.js)
2. **Netlify**
3. **AWS Amplify**
4. **Railway**
5. **DigitalOcean App Platform**

### Tối ưu hóa Hiệu suất

- Tối ưu hóa hình ảnh với thành phần Hình ảnh của Next.js
- Tạo trang tĩnh khi có thể
- Bộ đệm tuyến đường API
- Gói CSS và JavaScript
- Tải lười các thành phần

---

## Mẫu mã nguồn

### 1. Ví dụ về Điểm cuối API - Biểu mẫu Liên hệ

```javascript
// /src/app/api/contacts/route.js
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Xác thực
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Tên, email và tin nhắn là bắt buộc" }, { status: 400 });
    }

    // Chèn liên hệ vào cơ sở dữ liệu
    const { data, error } = await supabaseAdmin.from("contacts").insert([{ name, email, phone, subject, message }]).select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Liên hệ đã được gửi thành công", data }, { status: 201 });
  } catch (error) {
    console.error("Lỗi API Liên hệ:", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
```

### 2. Middleware Xác thực

```javascript
// middleware.js
export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    // Thêm tiêu đề bảo mật cho các tuyến đường quản trị
    const response = NextResponse.next();
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    return response;
  }

  if (pathname.startsWith("/api/admin")) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return new NextResponse(JSON.stringify({ error: "Cần xác thực" }), { status: 401 });
    }
  }

  return NextResponse.next();
}
```

### 3. Thành phần với Tích hợp Ant Design

```javascript
// Ví dụ về thành phần thẻ dịch vụ
"use client";
import { Card, Button, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";

const { Meta } = Card;
const { Paragraph } = Typography;

export default function ServiceCard({ service }) {
  return (
    <Card
      hoverable
      cover={
        <div className="relative h-48">
          <Image src={service.icon} alt={service.title} fill className="object-cover" />
        </div>
      }
      actions={[
        <Link href={`/Services/${service.key}`} key="view">
          <Button type="primary">Xem chi tiết</Button>
        </Link>,
      ]}
    >
      <Meta title={service.title} description={<Paragraph ellipsis={{ rows: 3 }}>{service.content}</Paragraph>} />
    </Card>
  );
}
```

### 4. Lớp Dịch vụ Cơ sở dữ liệu

```javascript
// /src/services/services.js
const API_BASE_URL = "/api";

export const servicesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/services`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`);
    return response.json();
  },

  create: async (serviceData, token) => {
    const response = await fetch(`${API_BASE_URL}/admin/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });
    return response.json();
  },
};
```

---

## Kết luận

Ứng dụng Next.js này cho Công ty Viễn thông ACT chứng minh một giải pháp web hiện đại, đầy đủ với:

- **Giao diện/Trải nghiệm người dùng chuyên nghiệp** sử dụng các thành phần Ant Design
- **Hệ thống xác thực mạnh mẽ** với mã thông báo JWT
- **Bảng điều khiển quản trị toàn diện** cho việc quản lý nội dung
- **Kiến trúc API RESTful** với xử lý lỗi thích hợp
- **Thiết kế đáp ứng** cho tất cả các loại thiết bị
- **Thực hành tốt nhất về bảo mật** được triển khai
- **Cấu trúc dự án có thể mở rộng** theo các quy
