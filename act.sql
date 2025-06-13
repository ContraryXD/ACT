-- Database: vienthong_act

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'editor',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    content TEXT,
    icon VARCHAR(100),
    image VARCHAR(500),
    features JSONB,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News categories table disabled
-- CREATE TABLE news_categories (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     slug VARCHAR(100) UNIQUE NOT NULL,
--     description TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- News table
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    thumbnail VARCHAR(500),
   --  category_id INTEGER REFERENCES news_categories(id),
    tags JSONB,
    author_id INTEGER REFERENCES users(id),
    views INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    client VARCHAR(200),
    description TEXT,
    images JSONB,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'ongoing',
    technologies JSONB,
    order_index INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs table
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    department VARCHAR(100),
    location VARCHAR(200),
    type VARCHAR(50),
    requirements TEXT,
    description TEXT,
    benefits TEXT,
    salary_range VARCHAR(100),
    deadline DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contacts table
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    replied_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_published ON news(is_published, published_at);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_jobs_active ON jobs(is_active);

-- Insert default admin user
INSERT INTO users (username, email, password, full_name, role, is_active)
VALUES ('admin', 'admin@vienthongact.com', '$2a$10$encrypted_password_hash', 'Administrator', 'admin', true);

-- Data
INSERT INTO services (title, slug, description, icon, image, order_index, is_active, created_by)
VALUES
(
  'Cung cấp sản phẩm, giải pháp CNTT',
  'cung-cap-san-pham-giai-phap-cntt',
  'Cung cấp sản phẩm & giải pháp CNTT. Giải pháp nhà thông minh rạng đông. Kiến tạo cuộc sống, hoà hợp với thiên nhiên, thông minh hạnh phúc …',
  '/assets/images/cung_cap_san_pham_giai_phap_cntt.jpg',
  '/assets/images/cung_cap_san_pham_giai_phap_cntt.jpg',
  1,
  true,
  1
),
(
  'Cung cấp truyền hình số',
  'cung-cap-truyen-hinh-so',
  'Cung cấp dịch vụ viễn thông cho các khách hàng trong dự án và cho các doanh nghiệp Việt Nam.',
  '/assets/images/cung_cap_truyen_hinh_so.jpg',
  '/assets/images/cung_cap_truyen_hinh_so.jpg',
  2,
  true,
  1
),
(
  'Đầu tư hạ tầng viễn thông',
  'dau-tu-ha-tang-vien-thong',
  'Chia sẻ, sử dụng chung hạ tầng kỹ thuật viễn thông xu thế tất yếu, mang lại nhiều lợi ích cho doanh nghiệp và xã hội. Việc này không chỉ góp phần bảo đảm mỹ quan đô thị mà còn giúp tiết kiệm chi phí đầu tư cho các doanh nghiệp viễn thông.',
  '/assets/images/dau_tu_ha_tang_vien_thong.jpg',
  '/assets/images/dau_tu_ha_tang_vien_thong.jpg',
  3,
  true,
  1
),
(
  'Hạ tầng viễn thông cáp quang',
  'ha-tang-vien-thong-cap-quang',
  'Công ty Cổ phần Viễn thông ACT đang là đối tác hợp tác đầu tư, cung cấp dịch vụ của các đơn vị như: Tập đoàn Công nghiệp Viễn thông Quân đội Viettel,…',
  '/assets/images/vien_thong_cap_quang.jpg',
  '/assets/images/vien_thong_cap_quang.jpg',
  4,
  true,
  1
),
(
  'Quản lý, vận hành khai thác hạ tầng viễn thông',
  'quan-ly-van-hanh-khai-thac-ha-tang-vien-thong',
  'Trực tiếp Vận hành, khai thác các hệ thống CNTT đảm bảo hệ thống hoạt động ổn định phục vụ sự phát triển CNTT & Viễn thông.',
  '/assets/images/ql_vhkt_ha_tang_vien_thong.png',
  '/assets/images/ql_vhkt_ha_tang_vien_thong.png',
  5,
  true,
  1
),
(
  'Thi công công trình viễn thông',
  'thi-cong-cong-trinh-vien-thong',
  'Khảo sát, thi công kéo ngầm mạng cáp đồng và cáp quang theo yêu cầu khách hàng. Bảo trì, bảo dưỡng hạ tầng viễn thông (các tuyến cáp, hầm cống, tủ cáp,…)',
  '/assets/images/thi_cong_cong_trinh_vien_thong.jpg',
  '/assets/images/thi_cong_cong_trinh_vien_thong.jpg',
  6,
  true,
  1
);

INSERT INTO projects (name, client, description, status, images, created_at, updated_at)
VALUES
(
  'HƯNG PHÁT SILVER STAR',
  'Hưng Lộc Phát',
  '* HƯNG PHÁT SILVER STAR - Công trình BĐS của Hưng Lộc Phát* ACT - Đơn vị thi công lắp đặt hệ thống hạ tầng viễn thông cáp quang cho toàn khu dự án',
  'completed',
  '["/assets/images/Silver_Star_01.jpg"]',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'ECOGREEN',
  'Công ty Đầu tư xây dựng Xuân Mai',
  '* ECOGREEN - Công trình BĐS của Công ty Đầu tư xây dựng Xuân Mai * ACT - Đơn vị thi công lắp đặt hệ thống hạ tầng viễn thông cáp quang cho toàn khu dự án',
  'ongoing',
  '["/assets/images/Eco_Green_01.jpg"]',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'GREEN RIVER',
  'Công ty TNHH 276 Ngọc Long',
  '* GREEN RIVER: Công trình BĐS của Công ty TNHH 276 Ngọc Long * ACT - Đơn vị thi công lắp đặt hệ thống hạ tầng viễn thông cáp quang cho toàn khu dự án',
  'completed',
  '["/assets/images/Green_River_01.jpg"]',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'MIZUKI PARK',
  'Công ty CP Đầu Tư Nam Long',
  '** MIZUKI PARK - Công trình BĐS của Công ty CP Đầu Tư Nam Long * ACT - Đơn vị thi công lắp đặt hệ thống hạ tầng viễn thông cáp quang cho toàn khu dự án',
  'completed',
  '["/assets/images/Mizuky_01.jpg"]',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

