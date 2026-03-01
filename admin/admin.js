const contactsData = [
    { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@email.com', phone: '0901234567', message: 'Tôi muốn hỏi về sản phẩm Collagen', date: '2026-02-28' },
    { id: 2, name: 'Trần Thị Bình', email: 'binh.tran@email.com', phone: '0912345678', message: 'Giá sản phẩm hiện tại là bao nhiêu?', date: '2026-02-27' },
    { id: 3, name: 'Lê Văn Cường', email: 'cuong.le@email.com', phone: '0923456789', message: 'Sản phẩm có ship tới Đà Nẵng không?', date: '2026-02-26' },
    { id: 4, name: 'Phạm Thị Dung', email: 'dung.pham@email.com', phone: '0934567890', message: 'Có chương trình khuyến mãi nào không?', date: '2026-02-25' },
    { id: 5, name: 'Hoàng Văn Em', email: 'em.hoang@email.com', phone: '0945678901', message: 'Tôi muốn đặt hàng số lượng lớn', date: '2026-02-24' },
    { id: 6, name: 'Võ Thị Phương', email: 'phuong.vo@email.com', phone: '0956789012', message: 'Sản phẩm có bảo hành không?', date: '2026-02-23' },
    { id: 7, name: 'Đặng Văn Giang', email: 'giang.dang@email.com', phone: '0967890123', message: 'Liên hệ hợp tác kinh doanh', date: '2026-02-22' },
    { id: 8, name: 'Bùi Thị Hoa', email: 'hoa.bui@email.com', phone: '0978901234', message: 'Thành phần sản phẩm gồm những gì?', date: '2026-02-21' },
];

const buyersData = [
    { id: 1, name: 'Nguyễn Thị Mai', email: 'mai.nguyen@email.com', phone: '0901111111', address: '123 Nguyễn Huệ, Q1, TP.HCM', totalOrders: 5, totalSpent: 2500000 },
    { id: 2, name: 'Trần Văn Hùng', email: 'hung.tran@email.com', phone: '0902222222', address: '456 Lê Lợi, Q3, TP.HCM', totalOrders: 3, totalSpent: 1800000 },
    { id: 3, name: 'Lê Thị Lan', email: 'lan.le@email.com', phone: '0903333333', address: '789 Võ Văn Tần, Q10, TP.HCM', totalOrders: 8, totalSpent: 4200000 },
    { id: 4, name: 'Phạm Văn Minh', email: 'minh.pham@email.com', phone: '0904444444', address: '321 Hai Bà Trưng, Q1, Hà Nội', totalOrders: 2, totalSpent: 980000 },
    { id: 5, name: 'Hoàng Thị Nga', email: 'nga.hoang@email.com', phone: '0905555555', address: '654 Trần Phú, Hải Châu, Đà Nẵng', totalOrders: 6, totalSpent: 3100000 },
    { id: 6, name: 'Võ Văn Phát', email: 'phat.vo@email.com', phone: '0906666666', address: '987 Lý Thường Kiệt, Ninh Kiều, Cần Thơ', totalOrders: 4, totalSpent: 2200000 },
];

const ordersData = [
    { id: 'DH001', customerId: 1, customerName: 'Nguyễn Thị Mai', product: 'Collagen Shinzo Kijo', quantity: 2, total: 1000000, status: 'completed', date: '2026-02-28' },
    { id: 'DH002', customerId: 2, customerName: 'Trần Văn Hùng', product: 'Collagen Shinzo Kijo', quantity: 1, total: 500000, status: 'shipping', date: '2026-02-27' },
    { id: 'DH003', customerId: 3, customerName: 'Lê Thị Lan', product: 'Combo 3 Hộp Collagen', quantity: 1, total: 1400000, status: 'confirmed', date: '2026-02-26' },
    { id: 'DH004', customerId: 4, customerName: 'Phạm Văn Minh', product: 'Collagen Shinzo Kijo', quantity: 2, total: 980000, status: 'pending', date: '2026-02-25' },
    { id: 'DH005', customerId: 5, customerName: 'Hoàng Thị Nga', product: 'Combo 5 Hộp Collagen', quantity: 1, total: 2200000, status: 'completed', date: '2026-02-24' },
    { id: 'DH006', customerId: 6, customerName: 'Võ Văn Phát', product: 'Collagen Shinzo Kijo', quantity: 3, total: 1500000, status: 'cancelled', date: '2026-02-23' },
    { id: 'DH007', customerId: 1, customerName: 'Nguyễn Thị Mai', product: 'Combo 3 Hộp Collagen', quantity: 1, total: 1400000, status: 'shipping', date: '2026-02-22' },
    { id: 'DH008', customerId: 3, customerName: 'Lê Thị Lan', product: 'Collagen Shinzo Kijo', quantity: 2, total: 1000000, status: 'completed', date: '2026-02-21' },
];

// Pagination state
const pageSize = 5;
let currentPages = { contacts: 1, buyers: 1, orders: 1 };

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    displayUserInfo();
    updateStats();
    renderRecentActivity();
    renderTable('contacts');
    renderTable('buyers');
    renderTable('orders');
    setupSearch();
    setupFilter();
});

// Display user info
function displayUserInfo() {
    const username = sessionStorage.getItem('username') || localStorage.getItem('username') || 'Admin';
    const userRole = sessionStorage.getItem('userRole') || localStorage.getItem('userRole') || 'admin';

    const roleLabels = {
        'admin': 'Quản trị viên',
        'manager': 'Quản lý'
    };

    const userAvatar = document.getElementById('userAvatar');
    const displayUsername = document.getElementById('displayUsername');
    const displayRole = document.getElementById('displayRole');

    if (userAvatar) userAvatar.textContent = username.charAt(0).toUpperCase();
    if (displayUsername) displayUsername.textContent = username.charAt(0).toUpperCase() + username.slice(1);
    if (displayRole) displayRole.textContent = roleLabels[userRole] || userRole;
}

// Logout function
function logout() {
    showConfirmModal({
        title: 'Đăng xuất',
        message: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?',
        type: 'warning',
        confirmText: 'Đăng xuất',
        onConfirm: function() {
            // Clear session
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('userRole');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('userRole');

            // Redirect to login
            window.location.href = 'login.html';
        }
    });
}

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

// Show section
function showSection(sectionId) {
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active', 'bg-primary', 'text-accent');
    });
    event.target.closest('.nav-link').classList.add('active', 'bg-primary', 'text-accent');

    // Close sidebar on mobile
    if (window.innerWidth < 1024) {
        toggleSidebar();
    }
}

// Update stats
function updateStats() {
    document.getElementById('totalContacts').textContent = contactsData.length;
    document.getElementById('totalBuyers').textContent = buyersData.length;
    document.getElementById('totalOrders').textContent = ordersData.length;

    const totalRevenue = ordersData
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + o.total, 0);
    document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenue);
}

// Render recent activity
function renderRecentActivity() {
    const recentContacts = document.getElementById('recentContacts');
    const recentOrders = document.getElementById('recentOrders');

    recentContacts.innerHTML = contactsData.slice(0, 4).map(c => `
                <div onclick="viewDetail('contact', ${c.id})" class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <div class="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-semibold">
                        ${c.name.charAt(0)}
                    </div>
                    <div class="flex-1">
                        <p class="font-medium text-dark">${c.name}</p>
                        <p class="text-sm text-gray-500 truncate">${c.message}</p>
                    </div>
                    <span class="text-xs text-gray-400">${formatDate(c.date)}</span>
                </div>
            `).join('');

    recentOrders.innerHTML = ordersData.slice(0, 4).map(o => `
                <div onclick="viewDetail('order', '${o.id}')" class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        ${o.customerName.charAt(0)}
                    </div>
                    <div class="flex-1">
                        <p class="font-medium text-dark">${o.id} - ${o.customerName}</p>
                        <p class="text-sm text-gray-500">${formatCurrency(o.total)}</p>
                    </div>
                    ${getStatusBadge(o.status)}
                </div>
            `).join('');
}

// Render tables
function renderTable(type, data = null) {
    const tableBody = document.getElementById(`${type}TableBody`);
    const showingEl = document.getElementById(`${type}Showing`);
    const totalEl = document.getElementById(`${type}Total`);

    let items;
    if (type === 'contacts') items = data || contactsData;
    else if (type === 'buyers') items = data || buyersData;
    else items = data || ordersData;

    const page = currentPages[type];
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedItems = items.slice(start, end);

    showingEl.textContent = Math.min(end, items.length);
    totalEl.textContent = items.length;

    if (type === 'contacts') {
        tableBody.innerHTML = paginatedItems.map(c => `
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-semibold">
                                    ${c.name.charAt(0)}
                                </div>
                                <span class="font-medium text-dark">${c.name}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-gray-600">${c.email}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-gray-600">${c.phone}</td>
                        <td class="px-6 py-4 max-w-xs truncate text-gray-600">${c.message}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-gray-600">${formatDate(c.date)}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button onclick="viewDetail('contact', ${c.id})" class="text-accent hover:text-pink-600 mr-3">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="openEditModal('contact', ${c.id})" class="text-blue-500 hover:text-blue-600 mr-3">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteItem('contact', ${c.id})" class="text-red-500 hover:text-red-600">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('');
    } else if (type === 'buyers') {
        tableBody.innerHTML = paginatedItems.map(b => `
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    ${b.name.charAt(0)}
                                </div>
                                <span class="font-medium text-dark">${b.name}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-gray-600">${b.email}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-gray-600">${b.phone}</td>
                        <td class="px-6 py-4 max-w-xs truncate text-gray-600">${b.address}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-center">
                            <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">${b.totalOrders}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-green-600 font-medium">${formatCurrency(b.totalSpent)}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button onclick="viewDetail('buyer', ${b.id})" class="text-accent hover:text-pink-600 mr-3">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="openEditModal('buyer', ${b.id})" class="text-blue-500 hover:text-blue-600 mr-3">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteItem('buyer', ${b.id})" class="text-red-500 hover:text-red-600">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('');
    } else {
        tableBody.innerHTML = paginatedItems.map(o => `
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap font-medium text-accent">${o.id}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-dark">${o.customerName}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-gray-600">${o.product}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-center text-gray-600">${o.quantity}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-green-600 font-medium">${formatCurrency(o.total)}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${getStatusBadge(o.status)}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-gray-600">${formatDate(o.date)}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button onclick="viewDetail('order', '${o.id}')" class="text-accent hover:text-pink-600 mr-3">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="openEditModal('order', '${o.id}')" class="text-blue-500 hover:text-blue-600 mr-3">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteItem('order', '${o.id}')" class="text-red-500 hover:text-red-600">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('');
    }
}

// Setup search
function setupSearch() {
    ['Contact', 'Buyer', 'Order'].forEach(type => {
        const input = document.getElementById(`search${type}`);
        if (input) {
            input.addEventListener('input', function () {
                const query = this.value.toLowerCase();
                let data;
                const typeLower = type.toLowerCase() + 's';

                if (type === 'Contact') {
                    data = contactsData.filter(c =>
                        c.name.toLowerCase().includes(query) ||
                        c.email.toLowerCase().includes(query) ||
                        c.phone.includes(query)
                    );
                } else if (type === 'Buyer') {
                    data = buyersData.filter(b =>
                        b.name.toLowerCase().includes(query) ||
                        b.email.toLowerCase().includes(query) ||
                        b.phone.includes(query)
                    );
                } else {
                    data = ordersData.filter(o =>
                        o.id.toLowerCase().includes(query) ||
                        o.customerName.toLowerCase().includes(query)
                    );
                }

                currentPages[typeLower] = 1;
                renderTable(typeLower, data);
            });
        }
    });
}

// Setup filter for orders
function setupFilter() {
    const filterSelect = document.getElementById('filterOrderStatus');
    if (filterSelect) {
        filterSelect.addEventListener('change', function () {
            const status = this.value;
            const data = status ? ordersData.filter(o => o.status === status) : ordersData;
            currentPages.orders = 1;
            renderTable('orders', data);
        });
    }
}

// Pagination
function prevPage(type) {
    if (currentPages[type] > 1) {
        currentPages[type]--;
        renderTable(type);
    }
}

function nextPage(type) {
    let totalItems;
    if (type === 'contacts') totalItems = contactsData.length;
    else if (type === 'buyers') totalItems = buyersData.length;
    else totalItems = ordersData.length;

    const maxPage = Math.ceil(totalItems / pageSize);
    if (currentPages[type] < maxPage) {
        currentPages[type]++;
        renderTable(type);
    }
}

// View detail
function viewDetail(type, id) {
    const modal = document.getElementById('detailModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');

    let item;
    if (type === 'contact') {
        item = contactsData.find(c => c.id === id);
        title.textContent = 'Chi tiết liên hệ';
        content.innerHTML = `
                    <div class="space-y-4">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                ${item.name.charAt(0)}
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold text-dark">${item.name}</h4>
                                <p class="text-gray-500">ID: ${item.id}</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <p class="text-sm text-gray-500">Email</p>
                                <p class="font-medium">${item.email}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <p class="text-sm text-gray-500">Số điện thoại</p>
                                <p class="font-medium">${item.phone}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg md:col-span-2">
                                <p class="text-sm text-gray-500">Ngày liên hệ</p>
                                <p class="font-medium">${formatDate(item.date)}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg md:col-span-2">
                                <p class="text-sm text-gray-500">Nội dung</p>
                                <p class="font-medium">${item.message}</p>
                            </div>
                        </div>
                    </div>
                `;
    } else if (type === 'buyer') {
        item = buyersData.find(b => b.id === id);
        const buyerOrders = ordersData.filter(o => o.customerId === id);
        title.textContent = 'Chi tiết người mua';
        content.innerHTML = `
                    <div class="space-y-4">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                ${item.name.charAt(0)}
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold text-dark">${item.name}</h4>
                                <p class="text-gray-500">ID: ${item.id}</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <p class="text-sm text-gray-500">Email</p>
                                <p class="font-medium">${item.email}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <p class="text-sm text-gray-500">Số điện thoại</p>
                                <p class="font-medium">${item.phone}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg md:col-span-2">
                                <p class="text-sm text-gray-500">Địa chỉ</p>
                                <p class="font-medium">${item.address}</p>
                            </div>
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <p class="text-sm text-blue-500">Tổng đơn hàng</p>
                                <p class="text-2xl font-bold text-blue-600">${item.totalOrders}</p>
                            </div>
                            <div class="bg-green-50 p-4 rounded-lg">
                                <p class="text-sm text-green-500">Tổng chi tiêu</p>
                                <p class="text-2xl font-bold text-green-600">${formatCurrency(item.totalSpent)}</p>
                            </div>
                        </div>
                        <div class="mt-6">
                            <h5 class="font-semibold text-dark mb-3">Lịch sử đơn hàng</h5>
                            <div class="space-y-2">
                                ${buyerOrders.map(o => `
                                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <span class="font-medium text-accent">${o.id}</span>
                                            <span class="text-gray-500 mx-2">•</span>
                                            <span class="text-gray-600">${o.product}</span>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <span class="text-green-600 font-medium">${formatCurrency(o.total)}</span>
                                            ${getStatusBadge(o.status)}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
    } else {
        item = ordersData.find(o => o.id === id);
        const buyer = buyersData.find(b => b.id === item.customerId);
        title.textContent = 'Chi tiết đơn hàng';
        content.innerHTML = `
                    <div class="space-y-4">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h4 class="text-2xl font-bold text-accent">${item.id}</h4>
                                <p class="text-gray-500">${formatDate(item.date)}</p>
                            </div>
                            ${getStatusBadge(item.status)}
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <p class="text-sm text-gray-500">Khách hàng</p>
                                <p class="font-medium">${item.customerName}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <p class="text-sm text-gray-500">Số điện thoại</p>
                                <p class="font-medium">${buyer ? buyer.phone : 'N/A'}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg md:col-span-2">
                                <p class="text-sm text-gray-500">Địa chỉ giao hàng</p>
                                <p class="font-medium">${buyer ? buyer.address : 'N/A'}</p>
                            </div>
                        </div>
                        <div class="border-t border-gray-200 pt-4 mt-4">
                            <h5 class="font-semibold text-dark mb-3">Sản phẩm đặt hàng</h5>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="font-medium">${item.product}</p>
                                        <p class="text-sm text-gray-500">Số lượng: ${item.quantity}</p>
                                    </div>
                                    <p class="text-lg font-bold text-green-600">${formatCurrency(item.total)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    }

    modal.classList.remove('hidden');
}

// Close modal
function closeModal() {
    document.getElementById('detailModal').classList.add('hidden');
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
}

// Confirm modal state
let confirmCallback = null;

// Show confirm modal
function showConfirmModal(options = {}) {
    const modal = document.getElementById('confirmModal');
    const title = document.getElementById('confirmTitle');
    const message = document.getElementById('confirmMessage');
    const iconContainer = document.getElementById('confirmIconContainer');
    const icon = document.getElementById('confirmIcon');
    const confirmBtn = document.getElementById('confirmBtn');

    // Set content
    title.textContent = options.title || 'Xác nhận';
    message.textContent = options.message || 'Bạn có chắc chắn muốn thực hiện thao tác này?';
    confirmBtn.textContent = options.confirmText || 'Xác nhận';

    // Set type styling
    const typeConfig = {
        warning: {
            iconBg: 'bg-yellow-100',
            iconClass: 'fa-exclamation-triangle',
            iconColor: 'text-yellow-500',
            btnBg: 'bg-yellow-500 hover:bg-yellow-600'
        },
        danger: {
            iconBg: 'bg-red-100',
            iconClass: 'fa-trash-alt',
            iconColor: 'text-red-500',
            btnBg: 'bg-red-500 hover:bg-red-600'
        },
        info: {
            iconBg: 'bg-blue-100',
            iconClass: 'fa-info-circle',
            iconColor: 'text-blue-500',
            btnBg: 'bg-blue-500 hover:bg-blue-600'
        },
        default: {
            iconBg: 'bg-primary',
            iconClass: 'fa-question-circle',
            iconColor: 'text-accent',
            btnBg: 'bg-accent hover:bg-pink-600'
        }
    };

    const config = typeConfig[options.type] || typeConfig.default;

    // Reset classes
    iconContainer.className = `flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full ${config.iconBg}`;
    icon.className = `fas ${config.iconClass} text-4xl ${config.iconColor}`;
    confirmBtn.className = `flex-1 px-4 py-3 text-white rounded-lg font-medium transition-colors ${config.btnBg}`;

    // Store callback
    confirmCallback = options.onConfirm || null;

    // Show modal
    modal.classList.remove('hidden');
}

// Close confirm modal
function closeConfirmModal() {
    document.getElementById('confirmModal').classList.add('hidden');
    confirmCallback = null;
}

// Execute confirm action
function executeConfirmAction() {
    if (confirmCallback && typeof confirmCallback === 'function') {
        confirmCallback();
    }
    closeConfirmModal();
}

// Open edit modal
function openEditModal(type, id) {
    const modal = document.getElementById('editModal');
    const title = document.getElementById('editModalTitle');
    const content = document.getElementById('editModalContent');

    let item;
    if (type === 'contact') {
        item = contactsData.find(c => c.id === id);
        title.textContent = 'Chỉnh sửa liên hệ';
        content.innerHTML = `
                    <form onsubmit="saveEdit(event, 'contact', ${id})">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                                <input type="text" id="editName" value="${item.name}"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" id="editEmail" value="${item.email}"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                                <input type="tel" id="editPhone" value="${item.phone}"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                                <textarea id="editMessage" rows="3"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">${item.message}</textarea>
                            </div>
                            <div class="flex justify-end gap-3 pt-4">
                                <button type="button" onclick="closeEditModal()"
                                    class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Hủy</button>
                                <button type="submit"
                                    class="px-4 py-2 bg-accent text-white rounded-lg hover:bg-pink-600 transition-colors">Lưu thay đổi</button>
                            </div>
                        </div>
                    </form>
                `;
    } else if (type === 'buyer') {
        item = buyersData.find(b => b.id === id);
        title.textContent = 'Chỉnh sửa người mua';
        content.innerHTML = `
                    <form onsubmit="saveEdit(event, 'buyer', ${id})">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                                <input type="text" id="editName" value="${item.name}"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" id="editEmail" value="${item.email}"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                                <input type="tel" id="editPhone" value="${item.phone}"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                                <textarea id="editAddress" rows="2"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">${item.address}</textarea>
                            </div>
                            <div class="flex justify-end gap-3 pt-4">
                                <button type="button" onclick="closeEditModal()"
                                    class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Hủy</button>
                                <button type="submit"
                                    class="px-4 py-2 bg-accent text-white rounded-lg hover:bg-pink-600 transition-colors">Lưu thay đổi</button>
                            </div>
                        </div>
                    </form>
                `;
    } else {
        item = ordersData.find(o => o.id === id);
        title.textContent = 'Chỉnh sửa đơn hàng';
        content.innerHTML = `
                    <form onsubmit="saveEdit(event, 'order', '${id}')">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Mã đơn hàng</label>
                                <input type="text" value="${item.id}" disabled
                                    class="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Khách hàng</label>
                                <input type="text" id="editCustomerName" value="${item.customerName}"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Sản phẩm</label>
                                <input type="text" id="editProduct" value="${item.product}"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
                                    <input type="number" id="editQuantity" value="${item.quantity}" min="1"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Tổng tiền (VNĐ)</label>
                                    <input type="number" id="editTotal" value="${item.total}" min="0"
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                                <select id="editStatus"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
                                    <option value="pending" ${item.status === 'pending' ? 'selected' : ''}>Chờ xử lý</option>
                                    <option value="confirmed" ${item.status === 'confirmed' ? 'selected' : ''}>Đã xác nhận</option>
                                    <option value="shipping" ${item.status === 'shipping' ? 'selected' : ''}>Đang giao</option>
                                    <option value="completed" ${item.status === 'completed' ? 'selected' : ''}>Hoàn thành</option>
                                    <option value="cancelled" ${item.status === 'cancelled' ? 'selected' : ''}>Đã hủy</option>
                                </select>
                            </div>
                            <div class="flex justify-end gap-3 pt-4">
                                <button type="button" onclick="closeEditModal()"
                                    class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Hủy</button>
                                <button type="submit"
                                    class="px-4 py-2 bg-accent text-white rounded-lg hover:bg-pink-600 transition-colors">Lưu thay đổi</button>
                            </div>
                        </div>
                    </form>
                `;
    }

    modal.classList.remove('hidden');
}

// Save edit
function saveEdit(event, type, id) {
    event.preventDefault();

    if (type === 'contact') {
        const item = contactsData.find(c => c.id === id);
        item.name = document.getElementById('editName').value;
        item.email = document.getElementById('editEmail').value;
        item.phone = document.getElementById('editPhone').value;
        item.message = document.getElementById('editMessage').value;
        renderTable('contacts');
    } else if (type === 'buyer') {
        const item = buyersData.find(b => b.id === id);
        item.name = document.getElementById('editName').value;
        item.email = document.getElementById('editEmail').value;
        item.phone = document.getElementById('editPhone').value;
        item.address = document.getElementById('editAddress').value;
        renderTable('buyers');
    } else {
        const item = ordersData.find(o => o.id === id);
        item.customerName = document.getElementById('editCustomerName').value;
        item.product = document.getElementById('editProduct').value;
        item.quantity = parseInt(document.getElementById('editQuantity').value);
        item.total = parseInt(document.getElementById('editTotal').value);
        item.status = document.getElementById('editStatus').value;
        renderTable('orders');
        updateStats();
    }

    renderRecentActivity();
    closeEditModal();
    showNotification('Cập nhật thành công!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Delete item
function deleteItem(type, id) {
    const typeLabels = {
        'contact': 'liên hệ',
        'buyer': 'người mua',
        'order': 'đơn hàng'
    };

    showConfirmModal({
        title: 'Xóa dữ liệu',
        message: `Bạn có chắc chắn muốn xóa ${typeLabels[type] || type} này không? Thao tác này không thể hoàn tác.`,
        type: 'danger',
        confirmText: 'Xóa',
        onConfirm: function() {
            // Demo: Remove from array and re-render
            if (type === 'contact') {
                const index = contactsData.findIndex(c => c.id === id);
                if (index > -1) contactsData.splice(index, 1);
                renderTable('contacts');
            } else if (type === 'buyer') {
                const index = buyersData.findIndex(b => b.id === id);
                if (index > -1) buyersData.splice(index, 1);
                renderTable('buyers');
            } else if (type === 'order') {
                const index = ordersData.findIndex(o => o.id === id);
                if (index > -1) ordersData.splice(index, 1);
                renderTable('orders');
            }
            updateStats();
            renderRecentActivity();
            showNotification(`Đã xóa ${typeLabels[type] || type} thành công!`);
        }
    });
}

// Update order status (demo only)
function updateOrderStatus(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    const newStatus = prompt('Nhập trạng thái mới (pending, confirmed, shipping, completed, cancelled):', order.status);
    if (newStatus && ['pending', 'confirmed', 'shipping', 'completed', 'cancelled'].includes(newStatus)) {
        order.status = newStatus;
        renderTable('orders');
        updateStats();
        renderRecentActivity();
        alert('Đã cập nhật trạng thái đơn hàng!');
    }
}

// Export data to CSV
function exportData(type) {
    let csvContent = '';
    let filename = '';

    if (type === 'contacts') {
        csvContent = 'ID,Họ tên,Email,Số điện thoại,Nội dung,Ngày liên hệ\n';
        csvContent += contactsData.map(c =>
            `${c.id},"${c.name}","${c.email}","${c.phone}","${c.message}","${c.date}"`
        ).join('\n');
        filename = 'danh-sach-lien-he.csv';
    } else if (type === 'buyers') {
        csvContent = 'ID,Họ tên,Email,Số điện thoại,Địa chỉ,Tổng đơn,Tổng chi tiêu\n';
        csvContent += buyersData.map(b =>
            `${b.id},"${b.name}","${b.email}","${b.phone}","${b.address}",${b.totalOrders},${b.totalSpent}`
        ).join('\n');
        filename = 'danh-sach-nguoi-mua.csv';
    } else if (type === 'orders') {
        csvContent = 'Mã đơn,Khách hàng,Sản phẩm,Số lượng,Tổng tiền,Trạng thái,Ngày đặt\n';
        csvContent += ordersData.map(o =>
            `"${o.id}","${o.customerName}","${o.product}",${o.quantity},${o.total},"${o.status}","${o.date}"`
        ).join('\n');
        filename = 'danh-sach-don-hang.csv';
    }

    // Add BOM for UTF-8 encoding (helps Excel recognize Vietnamese characters)
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Helper functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
}

function getStatusBadge(status) {
    const statusConfig = {
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-600', label: 'Chờ xử lý' },
        confirmed: { bg: 'bg-blue-100', text: 'text-blue-600', label: 'Đã xác nhận' },
        shipping: { bg: 'bg-purple-100', text: 'text-purple-600', label: 'Đang giao' },
        completed: { bg: 'bg-green-100', text: 'text-green-600', label: 'Hoàn thành' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-600', label: 'Đã hủy' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return `<span class="px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}">${config.label}</span>`;
}

// Close modal on escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
        closeEditModal();
        closeConfirmModal();
    }
});

// Close modal on outside click
document.getElementById('detailModal').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
});

// Close edit modal on outside click
document.getElementById('editModal').addEventListener('click', function (e) {
    if (e.target === this) closeEditModal();
});

// Close confirm modal on outside click
document.getElementById('confirmModal').addEventListener('click', function (e) {
    if (e.target === this) closeConfirmModal();
});