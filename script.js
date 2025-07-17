// بيانات القائمة
const menuItems = [
    {
        id: 1,
        name: "فلافل مشكل",
        price: 500,
        category: "sandwiches",
        description: "ساندويش فادفل مشكل مع الخضار والصلصة الخاصة"
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
        description: "برجر لحم مع جبنة شيدر ذائبة"
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
        category: "sandwiches",
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
        name: "صاح فادفل",
        price: 1000,
        category: "meals",
        description: "وجبة فادفل مشكل كبيرة"
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

// عربة التسوق
let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
        
        menuItemElement.innerHTML = `
            <img src="https://via.placeholder.com/300x200?text=${encodeURIComponent(item.name)}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">${item.price} دينار</span>
                <button class="add-to-cart" data-id="${item.id}">أضف إلى السلة</button>
            </div>
        `;
        
        menuItemsContainer.appendChild(menuItemElement);
    });
    
    // إضافة مستمعي الأحداث لأزرار إضافة إلى السلة
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// تصفية العناصر حسب الفئة
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayMenuItems(button.dataset.category);
    });
});

// إضافة عنصر إلى السلة
function addToCart(e) {
    const itemId = parseInt(e.target.dataset.id);
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
}

// عرض إشعار عند الإضافة للسلة
function showCartNotification(itemName) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = `تمت إضافة ${itemName} إلى السلة`;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'var(--success-color)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2000);
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
        cartItemsContainer.innerHTML = '<p>السلة فارغة</p>';
        totalAmount.textContent = '0';
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

// فتح/إغلاق عربة التسوق
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('open');
});

closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

// فتح/إغلاق نافذة الطلب
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('السلة فارغة. أضف بعض العناصر أولاً.');
        return;
    }
    
    cartSidebar.classList.remove('open');
    checkoutModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
});

// إرسال الطلب
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const order = {
        customer: {
            name: formData.get('name'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            payment: formData.get('payment')
        },
        items: cart,
        total: parseInt(totalAmount.textContent),
        date: new Date().toISOString()
    };
    
    // هنا يمكنك إرسال الطلب إلى الخادم أو حفظه في localStorage
    console.log('تم استلام الطلب:', order);
    
    // عرض رسالة نجاح
    alert(`شكراً لك ${order.customer.name}! تم استلام طلبك وسيتم توصيله قريباً.`);
    
    // إفراغ السلة وإغلاق النوافذ
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
    checkoutModal.style.display = 'none';
    
    // إعادة تحميل الصفحة
    location.reload();
});

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
        }
    });
});

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems();
    updateCart();
});
