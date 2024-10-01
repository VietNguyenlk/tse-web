import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <nav className="sidebar">
        <ul>
          <li>Thành viên</li>
          <li>Sự kiện</li>
          <li>Tài chính</li>
          <li>Thống kê</li>
          <li>Thông báo</li>
          <li>Tài liệu</li>
        </ul>
      </nav>
      <div className="content">
        <header>
          <h1>Admin Dashboard</h1>
        </header>
        <section className="stats">
          <div className="stat-item">Tổng số thành viên: 120</div>
          <div className="stat-item">Sự kiện trong năm: 5</div>
          <div className="stat-item">Tổng số tiền trong quỹ: 30 triệu VND</div>
        </section>
        <section className="management">
          <h2>Quản lý</h2>
          <p>Chọn một mục bên trái để quản lý.</p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
