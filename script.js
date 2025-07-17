// بيانات القائمة
const menuItems = [
    {
        id: 1,
        name: "فلافل مشكل",
        price: 500,
        category: "sandwiches",
        description: "ساندويش فلافل مشكل مع الخضار والصلصة الخاصة",
        badge: "الأكثر مبيعاً"
    },
    {
        id: 2,
        name: "بركر لحم",
        price: 1000,
        category: "sandwiches",
        description: "برجر لحم بقري مع الخضار والصلصة"
    },
    {
        id: 3,
        name: "بركر بالجبن",
        price: 1500,
        category: "sandwiches",
        description: "برجر لحم مع جبنة شيدر ذائبة",
        badge: "جديد"
    },
    {
        id: 4,
        name: "كص دجاج",
        price: 1500,
        category: "sandwiches",
        description: "ساندويش دجاج مقرمش مع الخضار"
    },
    {
        id: 5,
        name: "كص لحم",
        price: 1500,
        category: "sandwiches",
        description: "ساندويش لحم مقرمش مع الخضار"
    },
    {
        id: 6,
        name: "وجبة فلافل",
        price: 3000,
        category: "meals",
        description: "وجبة كاملة مع بطاطس ومشروب"
    },
    {
        id: 7,
        name: "فنكر",
        price: 1000,
        category: "sandwiches",
        description: "ساندويش دجاج صغير مع الخضار"
    },
    {
        id: 8,
        name: "صاح فلافل",
        price: 1000,
        category: "meals",
        description: "وجبة فلافل مشكل كبيرة"
    },
    {
        id: 9,
        name: "صاح دجاج",
        price: 2000,
        category: "meals",
        description: "وجبة دجاج كاملة مع الخضار"
    },
    {
        id: 10,
        name: "صاح لحم",
        price: 2500,
        category: "meals",
        description: "وجبة لحم كاملة مع الخضار"
    },
    {
        id: 11,
        name: "نص نفر كص دجاج",
        price: 9000,
        category: "meals",
        description: "وجبة دجاج كبيرة لعائلتك"
    },
    {
        id: 12,
        name: "نص نفر كص لحم",
        price: 9000,
        category: "meals",
        description: "وجبة لحم كبيرة لعائلتك"
    },
    {
        id: 13,
        name: "عصير برتقال",
        price: 500,
        category: "drinks",
        description: "عصير برتقال طازج"
    },
    {
        id: 14,
        name: "عصير ليمون",
        price: 500,
        category: "drinks",
        description: "عصير ليمون منعش"
    },
    {
        id: 15,
        name: "عصير زيب",
        price: 500,
        category: "drinks",
        description: "عصير زيب طبيعي"
    },
    {
        id: 16,
        name: "عصير رمان",
        price: 500,
        category: "drinks",
        description: "عصير رمان طبيعي"
    },
    {
        id: 17,
        name: "نومي بصره",
        price: 500,
        category: "drinks",
        description: "مشروب النومي البصري التقليدي"
    },
    {
        id: 18,
        name: "مقبلات الفين",
        price: 500,
        category: "drinks",
        description: "مجموعة من المقبلات الخفيفة"
    }
];

// متغيرات DOM
const menuItemsContainer = document.querySelector('.menu-items');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.getElementById('cart-count');
const totalAmount = document.getElementById('total-amount');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeModalBtn = document.querySelector('.close-modal');
const checkoutForm = document.getElementById('checkout-form');
const successModal = document.getElementById('success-modal');
const closeSuccessBtn = document.getElementById('close-success');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');
const header = document.querySelector('header');

// عربة التسوق
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems();
    updateCart();
    setupEventListeners();
    
    // إضافة تأثير التمرير للهيدر
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // تصفية القائمة حسب الفئة
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayMenuItems(button.dataset.category);
        });
    });
    
    // فتح/إغلاق عربة التسوق
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    
    // فتح/إغلاق نافذة الطلب
    checkoutBtn.addEventListener('click', openCheckoutModal);
    closeModalBtn.addEventListener('click', closeCheckoutModal);
    closeSuccessBtn.addEventListener('click', closeSuccessModal);
    
    // إرسال الطلب
    checkoutForm.addEventListener('submit', processOrder);
    
    // القائمة المتنقلة
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('open');
            }
        });
    });
}

// عرض عناصر القائمة
function displayMenuItems(category = 'all') {
    menuItemsContainer.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    filteredItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        menuItemElement.dataset.category = item.category;
        
        let badgeHTML = '';
        if (item.badge) {
            badgeHTML = `<span class="item-badge">${item.badge}</span>`;
        }
        
        menuItemElement.innerHTML = `
            ${badgeHTML}
            <img src="images/menu-item-${item.id}.jpg" alt="${item.name}" class="menu-item-img">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">${item.price} دينار</span>
                <button class="add-to-cart" data-id="${item.id}">
                    <i class="fas fa-plus"></i> أضف إلى السلة
                </button>
            </div>
        `;
        
        menuItemsContainer.appendChild(menuItemElement);
    });
    
    // إضافة مستمعي الأحداث لأزرار إضافة إلى السلة
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// إضافة عنصر إلى السلة
function addToCart(e) {
    const itemId = parseInt(e.target.closest('.add-to-cart').dataset.id);
    const item = menuItems.find(item => item.id === itemId);
    
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCart();
    showCartNotification(item.name);
    openCart();
}

// عرض إشعار عند الإضافة للسلة
function showCartNotification(itemName) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>تمت إضافة ${itemName} إلى السلة</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// تحديث عربة التسوق
function updateCart() {
    // حفظ السلة في localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // تحديث عدد العناصر في السلة
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // عرض العناصر في السلة
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">السلة فارغة</p>';
        totalAmount.textContent = '0';
        checkoutBtn.disabled = true;
    } else {
        let total = 0;
        
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">${item.price} دينار</span>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">&times;</button>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        totalAmount.textContent = total;
        checkoutBtn.disabled = false;
        
        // إضافة مستمعي الأحداث لأزرار الكمية والإزالة
        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }
}

// تقليل الكمية
function decreaseQuantity(e) {
    const itemId = parseInt(e.target.dataset.id);
    const item = cart.find(item => item.id === itemId);
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== itemId);
    }
    
    updateCart();
}

// زيادة الكمية
function increaseQuantity(e) {
    const itemId = parseInt(e.target.dataset.id);
    const item = cart.find(item => item.id === itemId);
    
    item.quantity += 1;
    updateCart();
}

// إزالة العنصر
function removeItem(e) {
    const itemId = parseInt(e.target.dataset.id);
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

// فتح عربة التسوق
function openCart() {
    cartSidebar.classList.add('open');
}

// إغلاق عربة التسوق
function closeCart() {
    cartSidebar.classList.remove('open');
}

// فتح نافذة الطلب
function openCheckoutModal() {
    if (cart.length === 0) {
        alert('السلة فارغة. أضف بعض العناصر أولاً.');
        return;
    }
    
    closeCart();
    checkoutModal.classList.add('open');
}

// إغلاق نافذة الطلب
function closeCheckoutModal() {
    checkoutModal.classList.remove('open');
}

// إغلاق نافذة النجاح
function closeSuccessModal() {
    successModal.classList.remove('open');
}

// معالجة الطلب
async function processOrder(e) {
    e.preventDefault();
    
    const formData = new FormData(checkoutForm);
    const orderNumber = generateOrderNumber();
    
    const order = {
        orderNumber: orderNumber,
        customer: {
            name: formData.get('name'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            notes: formData.get('notes')
        },
        payment: formData.get('payment'),
        items: cart,
        total: parseInt(totalAmount.textContent),
        date: new Date().toLocaleString('ar-IQ')
    };
    
    // إرسال الطلب إلى بوت تلغرام
    const isSent = await sendOrderToTelegram(order);
    
    if (isSent) {
        // عرض رسالة النجاح
        document.getElementById('order-number').textContent = orderNumber;
        checkoutModal.classList.remove('open');
        successModal.classList.add('open');
        
        // إفراغ السلة
        cart = [];
        localStorage.removeItem('cart');
        updateCart();
    } else {
        alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.');
    }
}

// توليد رقم طلب عشوائي
function generateOrderNumber() {
    const letters = 'AR';
    const numbers = Math.floor(10000 + Math.random() * 90000);
    return `${letters}-${numbers}`;
}

// إرسال الطلب إلى تلغرام
async function sendOrderToTelegram(order) {
    const botToken = '7945152379:AAFtLazXVvOSYzxdwFkQKkRDf7HzRgzG9_s'; // استبدل ب token بوتك
    const chatId = '909090929'; // استبدل ب chat id الخاص بالمدير/المطعم
    
    // تنسيق رسالة الطلب
    let message = `🎉 **طلب جديد #${order.orderNumber}** 🎉\n\n`;
    message += `📅 التاريخ: ${order.date}\n\n`;
    message += `👤 **العميل**:\n`;
    message += `- الاسم: ${order.customer.name}\n`;
    message += `- الهاتف: ${order.customer.phone}\n`;
    message += `- العنوان: ${order.customer.address}\n`;
    if (order.customer.notes) {
        message += `- الملاحظات: ${order.customer.notes}\n`;
    }
    message += `💳 طريقة الدفع: ${order.payment === 'cash' ? 'نقداً عند الاستلام' : 'الدفع بالبطاقة'}\n\n`;
    message += `🛒 **الطلبات**:\n`;
    
    order.items.forEach(item => {
        message += `- ${item.name} (${item.quantity}x) - ${item.price * item.quantity} دينار\n`;
    });
    
    message += `\n💰 **المجموع الكلي**: ${order.total} دينار`;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        const data = await response.json();
        return data.ok;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

// تبديل القائمة المتنقلة
function toggleMobileMenu() {
    navMenu.classList.toggle('open');
}

// التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // إغلاق القائمة المتنقلة إذا كانت مفتوحة
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('open');
            }
        }
    });
});