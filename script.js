// بيانات القائمة// بيانات القائمة مع مسارات الصور
const menuItems = [
    {
        id: 1,
        name: "فلافل مشكل",
        price: 500,
        category: "sandwiches",
        description: "ساندويش فادفل مشكل مع الخضار والصلصة الخاصة",
        image: "images/menu/sandwich-1.jpg",
        badge: "الأكثر مبيعاً"
    },
    {
        id: 2,
        name: "بركر لحم",
        price: 1000,
        category: "sandwiches",
        description: "برجر لحم بقري مع الخضار والصلصة",
        image: "images/menu/sandwich-2.jpg"
    },
    {
        id: 3,
        name: "بركر بالجبن",
        price: 1500,
        category: "sandwiches",
        description: "برجر لحم مع جبنة شيدر ذائبة",
        image: "images/menu/sandwich-3.jpg",
        badge: "جديد"
    },
    {
        id: 4,
        name: "كص دجاج",
        price: 1500,
        category: "sandwiches",
        description: "ساندويش دجاج مقرمش مع الخضار",
        image: "images/menu/sandwich-4.jpg"
    },
    {
        id: 5,
        name: "كص لحم",
        price: 1500,
        category: "sandwiches",
        description: "ساندويش لحم مقرمش مع الخضار",
        image: "images/menu/sandwich-5.jpg"
    },
    {
        id: 6,
        name: "وجبة فلافل",
        price: 3000,
        category: "meals",
        description: "وجبة كاملة مع بطاطس ومشروب",
        image: "images/menu/meal-1.jpg"
    },
    {
        id: 7,
        name: "فنكر",
        price: 1000,
        category: "sandwiches",
        description: "ساندويش دجاج صغير مع الخضار",
        image: "images/menu/sandwich-6.jpg"
    },
    {
        id: 8,
        name: "صاح فلافل",
        price: 1000,
        category: "meals",
        description: "وجبة فادفل مشكل كبيرة",
        image: "images/menu/meal-2.jpg"
    },
    {
        id: 9,
        name: "صاح دجاج",
        price: 2000,
        category: "meals",
        description: "وجبة دجاج كاملة مع الخضار",
        image: "images/menu/meal-3.jpg"
    },
    {
        id: 10,
        name: "صاح لحم",
        price: 2500,
        category: "meals",
        description: "وجبة لحم كاملة مع الخضار",
        image: "images/menu/meal-4.jpg"
    },
    {
        id: 11,
        name: "نص نفر كص دجاج",
        price: 9000,
        category: "meals",
        description: "وجبة دجاج كبيرة لعائلتك",
        image: "images/menu/meal-5.jpg"
    },
    {
        id: 12,
        name: "نص نفر كص لحم",
        price: 9000,
        category: "meals",
        description: "وجبة لحم كبيرة لعائلتك",
        image: "images/menu/meal-6.jpg"
    },
    {
        id: 13,
        name: "عصير برتقال",
        price: 500,
        category: "drinks",
        description: "عصير برتقال طازج",
        image: "images/menu/drink-1.jpg"
    },
    {
        id: 14,
        name: "عصير ليمون",
        price: 500,
        category: "drinks",
        description: "عصير ليمون منعش",
        image: "images/menu/drink-2.jpg"
    },
    {
        id: 15,
        name: "عصير زبيب",
        price: 500,
        category: "drinks",
        description: "عصير زيب طبيعي",
        image: "images/menu/drink-3.jpg"
    },
    {
        id: 16,
        name: "عصير رمان",
        price: 500,
        category: "drinks",
        description: "عصير رمان طبيعي",
        image: "images/menu/drink-4.jpg"
    },
    {
        id: 17,
        name: "نومي بصره",
        price: 500,
        category: "drinks",
        description: "مشروب النومي البصري التقليدي",
        image: "images/menu/drink-5.jpg"
    },
    {
        id: 18,
        name: "مقبلات ",
        price: 2000,
        category: "drinks",
        description: "مجموعة من المقبلات الخفيفة",
        image: "images/menu/drink-6.jpg"
    }
];

// عناصر DOM
const elements = {
    menuContainer: document.querySelector('.menu-items'),
    categoryBtns: document.querySelectorAll('.category-btn'),
    cartBtn: document.getElementById('cart-btn'),
    cartSidebar: document.getElementById('cart-sidebar'),
    closeCartBtn: document.getElementById('close-cart'),
    cartItemsContainer: document.querySelector('.cart-items'),
    cartCount: document.getElementById('cart-count'),
    totalAmount: document.getElementById('total-amount'),
    checkoutBtn: document.getElementById('checkout-btn'),
    checkoutModal: document.getElementById('checkout-modal'),
    closeModalBtn: document.querySelector('.close-modal'),
    checkoutForm: document.getElementById('checkout-form'),
    successModal: document.getElementById('success-modal'),
    closeSuccessBtn: document.getElementById('close-success'),
    menuToggle: document.querySelector('.menu-toggle'),
    navMenu: document.querySelector('nav ul'),
    header: document.querySelector('header'),
    customerName: document.getElementById('customer-name'),
    customerPhone: document.getElementById('customer-phone'),
    customerAddress: document.getElementById('customer-address'),
    customerNotes: document.getElementById('customer-notes')
};

// عربة التسوق
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// تهيئة التطبيق
function init() {
    displayMenuItems();
    updateCart();
    setupEventListeners();
    setupScrollEffect();
}

// عرض عناصر القائمة
function displayMenuItems(category = 'all') {
    elements.menuContainer.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    filteredItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.dataset.category = item.category;
        
        itemElement.innerHTML = `
            ${item.badge ? `<span class="item-badge">${item.badge}</span>` : ''}
            <img src="${item.image}" alt="${item.name}" class="menu-item-img">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">${item.price} دينار</span>
                <button class="add-to-cart" data-id="${item.id}">
                    <i class="fas fa-plus"></i> أضف إلى السلة
                </button>
            </div>
        `;
        
        elements.menuContainer.appendChild(itemElement);
    });
    
    // إضافة مستمعي الأحداث لأزرار الإضافة
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // تصفية القائمة
    elements.categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayMenuItems(btn.dataset.category);
        });
    });
    
    // عربة التسوق
    elements.cartBtn.addEventListener('click', openCart);
    elements.closeCartBtn.addEventListener('click', closeCart);
    
    // نافذة الطلب
    elements.checkoutBtn.addEventListener('click', openCheckoutModal);
    elements.closeModalBtn.addEventListener('click', closeCheckoutModal);
    elements.closeSuccessBtn.addEventListener('click', closeSuccessModal);
    
    // القائمة المتنقلة
    elements.menuToggle.addEventListener('click', toggleMobileMenu);
    
    // إرسال الطلب
    elements.checkoutForm.addEventListener('submit', processOrder);
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                elements.navMenu.classList.remove('open');
            }
        });
    });
}

// تأثير التمرير
function setupScrollEffect() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            elements.header.classList.add('scrolled');
        } else {
            elements.header.classList.remove('scrolled');
        }
    });
}

// إضافة عنصر للسلة
function addToCart(e) {
    const itemId = parseInt(e.target.closest('.add-to-cart').dataset.id);
    const item = menuItems.find(item => item.id === itemId);
    
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCart();
    showNotification(`تمت إضافة ${item.name} إلى السلة`);
    openCart();
}

// عرض إشعار
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }, 10);
}

// تحديث عربة التسوق
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // تحديث العداد
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    elements.cartCount.textContent = totalItems;
    
    // عرض العناصر
    elements.cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        elements.cartItemsContainer.innerHTML = '<p class="empty-cart">السلة فارغة</p>';
        elements.totalAmount.textContent = '0';
        elements.checkoutBtn.disabled = true;
    } else {
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
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
            
            elements.cartItemsContainer.appendChild(itemElement);
        });
        
        elements.totalAmount.textContent = total;
        elements.checkoutBtn.disabled = false;
        
        // إضافة مستمعي الأحداث للكمية
        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', () => adjustQuantity(btn.dataset.id, -1));
        });
        
        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', () => adjustQuantity(btn.dataset.id, 1));
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => removeItem(btn.dataset.id));
        });
    }
}

// تعديل الكمية
function adjustQuantity(itemId, change) {
    const item = cart.find(item => item.id === parseInt(itemId));
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity < 1) {
            cart = cart.filter(item => item.id !== parseInt(itemId));
        }
        
        updateCart();
    }
}

// إزالة عنصر
function removeItem(itemId) {
    cart = cart.filter(item => item.id !== parseInt(itemId));
    updateCart();
}

// إدارة عربة التسوق
function openCart() {
    elements.cartSidebar.classList.add('open');
}

function closeCart() {
    elements.cartSidebar.classList.remove('open');
}

// إدارة نافذة الطلب
function openCheckoutModal() {
    if (cart.length === 0) {
        alert('السلة فارغة. أضف بعض العناصر أولاً.');
        return;
    }
    
    closeCart();
    elements.checkoutModal.classList.add('open');
}

function closeCheckoutModal() {
    elements.checkoutModal.classList.remove('open');
}

function closeSuccessModal() {
    elements.successModal.classList.remove('open');
}

// معالجة الطلب
async function processOrder(e) {
    e.preventDefault();
    
    // التحقق من الحقول المطلوبة
    if (!elements.customerName.value || !elements.customerPhone.value || !elements.customerAddress.value) {
        alert('الرجاء تعبئة جميع الحقول المطلوبة');
        return;
    }
    
    const order = {
        orderNumber: generateOrderNumber(),
        customer: {
            name: elements.customerName.value,
            phone: elements.customerPhone.value,
            address: elements.customerAddress.value,
            notes: elements.customerNotes.value || ''
        },
        payment: document.querySelector('input[name="payment"]:checked').value,
        items: cart,
        total: parseInt(elements.totalAmount.textContent),
        date: new Date().toLocaleString('ar-IQ')
    };
    
    console.log('بيانات الطلب:', order); // لأغراض التصحيح
    
    const isSent = await sendOrderToTelegram(order);
    
    if (isSent) {
        showSuccess(order.orderNumber);
        resetCart();
    } else {
        alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.');
    }
}

// إرسال الطلب إلى تلغرام
async function sendOrderToTelegram(order) {
    const botToken = '7945152379:AAFtLazXVvOSYzxdwFkQKkRDf7HzRgzG9_s'; // استبدل بتوكن البوت الخاص بك
    const chatId = '909090929'; // استبدل بمعرف الدردشة الخاص بك
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: formatTelegramMessage(order),
                parse_mode: 'HTML'
            })
        });
        
        return response.ok;
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        return false;
    }
}

// تنسيق رسالة تلغرام
function formatTelegramMessage(order) {
    let message = `🎉 <b>طلب جديد #${order.orderNumber}</b> 🎉\n\n`;
    message += `📅 <b>التاريخ:</b> ${order.date}\n\n`;
    message += `👤 <b>العميل:</b>\n`;
    message += `- الاسم: ${order.customer.name}\n`;
    message += `- الهاتف: ${order.customer.phone}\n`;
    message += `- العنوان: ${order.customer.address}\n`;
    
    if (order.customer.notes) {
        message += `- الملاحظات: ${order.customer.notes}\n`;
    }
    
    message += `\n💳 <b>طريقة الدفع:</b> ${order.payment === 'cash' ? 'نقداً عند الاستلام' : 'الدفع بالبطاقة'}\n\n`;
    message += `🛒 <b>الطلبات:</b>\n`;
    
    order.items.forEach(item => {
        message += `- ${item.name} (${item.quantity}x) - ${item.price * item.quantity} دينار\n`;
    });
    
    message += `\n💰 <b>المجموع الكلي:</b> ${order.total} دينار`;
    
    return message;
}

// عرض نجاح الطلب
function showSuccess(orderNumber) {
    document.getElementById('order-number').textContent = orderNumber;
    closeCheckoutModal();
    elements.successModal.classList.add('open');
}

// إعادة تعيين السلة
function resetCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
}

// توليد رقم طلب
function generateOrderNumber() {
    return `AR-${Math.floor(10000 + Math.random() * 90000)}`;
}

// تبديل القائمة المتنقلة
function toggleMobileMenu() {
    elements.navMenu.classList.toggle('open');
}

// التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            if (window.innerWidth <= 768) {
                elements.navMenu.classList.remove('open');
            }
        }
    });
});

// بدء التطبيق
init();
