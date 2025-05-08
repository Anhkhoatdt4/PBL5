import React, { useState, useEffect } from 'react';
import './admin.css';
// Sidebar Component
function Sidebar({ onPageChange }: { onPageChange: (page: string) => void }) {
    return (
        <div className="sidebar">
            <div className="admin-info">
                <img src="https://i.pinimg.com/originals/78/46/75/7846752cfd7b02455fa07c42a5ab2f37.jpg" alt="Admin" />
                <p>Kong Bẻo</p>
                <li>Chào mừng bạn trở lại</li>
            </div>
            <ul>
                <SidebarItem icon="fa-chart-bar" text="Thống kê & Báo cáo" page="dashboard" onPageChange={onPageChange} />
                <SidebarItem icon="fa-box" text="Quản lý sản phẩm" page="product_ad" onPageChange={onPageChange} />
                <SidebarItem icon="fa-shopping-cart" text="Quản lý đơn hàng" page="order_ad" onPageChange={onPageChange} />
                <SidebarItem icon="fa-user" text="Quản lý nhân viên" page="staff_ad" onPageChange={onPageChange} />
            </ul>
        </div>
    );
}

// Sidebar Item Component
function SidebarItem({ icon, text, page, onPageChange }: { icon: string; text: string; page: string; onPageChange: (page: string) => void }) {
    return (
        <li>
            <a href="#" onClick={() => onPageChange(page)}>
                <i className={`fa-solid ${icon}`}></i> {text}
            </a>
        </li>
    );
}

// Header Component
function Header() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formattedTime = now.toLocaleString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).replace("lúc", "");
            setCurrentTime(formattedTime);
        };
        
        const interval = setInterval(updateTime, 500);
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <header>
            <div className="time">
                <i className="fa-solid fa-clock"></i> <span>{currentTime}</span>
            </div>
            <a href="login.html" className="logout-btn"><i className="fa-solid fa-sign-out-alt"></i> Đăng xuất</a>
        </header>
    );
}

// Content Component
function Content({ page }: { page: string }) {
    const [content, setContent] = useState('<p>Đang tải...</p>');

    useEffect(() => {
        // Fetching page content dynamically
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(data => setContent(data))
            .catch(error => {
                setContent('<p>Lỗi khi tải trang.</p>');
                console.error("Lỗi:", error);
            });
    }, [page]); // Dependency on 'page' so it refetches on page change

    return <div className="content" id="content" dangerouslySetInnerHTML={{ __html: content }} />;
}

// Main Admin Component
export default function Admin() {
    const [page, setPage] = useState('dashboard'); // Default page

    return (
        <div className="admin">
            <Sidebar onPageChange={setPage} />
            <div className="main-content">
                <Header />
                <Content page={page} />
            </div>
        </div>
    );
}
