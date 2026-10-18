import confetti from 'canvas-confetti';

export const handleClickConfetti = (e: React.MouseEvent<HTMLElement>) => {
    // 1. الحصول على مكان العنصر الذي تم النقر عليه في الشاشة
    const rect = e.currentTarget.getBoundingClientRect();
    
    // 2. حساب منتصف الزرار أفقياً وعمودياً بالنسبة لشاشة المتصفح
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // 3. إطلاق الـ Confetti من تلك الإحداثيات بالضبط
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x, y } // تحديد نقطة الانطلاق بناءً على مكان الماوس/الزرار
    });
  };