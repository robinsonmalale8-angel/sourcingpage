// gallery.js
document.querySelectorAll('.read-more').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        var card = this.closest('.product-card');
        var productName = card.dataset.name || "Product";
        var images = JSON.parse(card.dataset.gallery || '[]');

        if (images.length === 0) {
            alert("No images available.");
            return;
        }

        var galleryHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' 
            + productName + ' - Gallery</title><style>'
            + 'body{font-family:Arial,sans-serif;margin:0;padding:20px;background:#f8fafc;}h1{color:#1e40af;text-align:center;margin-bottom:30px;}'
            + '.gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;max-width:1400px;margin:0 auto;}'
            + '.gallery img{width:100%;border-radius:12px;box-shadow:0 8px 25px rgba(0,0,0,0.15);cursor:pointer;transition:all 0.3s;}'
            + '.gallery img:hover{transform:scale(1.05);box-shadow:0 15px 35px rgba(0,0,0,0.2);}'
            + '.modal{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:none;align-items:center;justify-content:center;z-index:10000;padding:20px;}'
            + '.modal-content{max-width:920px;width:100%;background:white;border-radius:16px;overflow:hidden;}'
            + '.modal-header{padding:20px;background:#1e40af;color:white;display:flex;justify-content:space-between;align-items:center;}'
            + '.modal-body{padding:25px;text-align:center;}#main-image{display:block;max-width:100%;max-height:58vh;margin:0 auto 15px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.25);}'
            + '.order-btn{display:block;margin:25px auto 0;background:#25D366;color:white;border:none;padding:16px 40px;font-size:1.15rem;border-radius:50px;cursor:pointer;font-weight:bold;}'
            + '.order-btn:hover{background:#20ba5a;transform:scale(1.04);}'
            + '.thumbnails{display:flex;gap:12px;margin-top:25px;overflow-x:auto;padding:10px 0;}'
            + '.thumbnails img{width:90px;height:90px;object-fit:cover;border-radius:8px;cursor:pointer;border:2px solid transparent;flex-shrink:0;transition:all 0.2s;}'
            + '.thumbnails img:hover,.thumbnails img.active{border:3px solid #1e88e5;transform:scale(1.08);}'
            + '.form-modal{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:none;align-items:center;justify-content:center;z-index:11000;padding:20px;}'
            + '.form-content{background:white;max-width:520px;width:100%;border-radius:16px;padding:30px;box-shadow:0 20px 60px rgba(0,0,0,0.5);}'
            + 'input,textarea{width:100%;padding:12px;margin:10px 0;border:1px solid #ccc;border-radius:8px;}'
            + '.submit-btn{width:100%;padding:16px;background:#25D366;color:white;border:none;border-radius:50px;font-size:1.1rem;cursor:pointer;margin-top:10px;}'
            + '</style></head><body><h1>' + productName + ' Gallery</h1>'
            + '<div class="gallery">' + images.map(function(img, i) { 
                return '<img src="' + img + '" data-index="' + i + '" alt="' + productName + '">'; 
            }).join('') + '</div>'
            + '<div class="modal" id="lightbox"><div class="modal-content">'
            + '<div class="modal-header"><h2>' + productName + '</h2><span id="close-lightbox" style="font-size:2.2rem;cursor:pointer;color:white;">×</span></div>'
            + '<div class="modal-body"><img id="main-image" src="" alt="">'
            + '<button class="order-btn" id="order-btn">Order This Product</button>'
            + '<div class="thumbnails" id="related-thumbnails">' 
            + images.map(function(img, i) { 
                return '<img src="' + img + '" data-index="' + i + '" alt="Related ' + (i+1) + '">'; 
            }).join('') 
            + '</div></div></div></div>'
            + '<div class="form-modal" id="order-form-modal"><div class="form-content">'
            + '<h2>Place Your Order</h2><form id="order-form">'
            + '<input type="text" id="client-name" placeholder="Full Name *" required>'
            + '<input type="email" id="email" placeholder="Email Address">'
            + '<input type="tel" id="phone" placeholder="Phone Number (with country code) *" required>'
            + '<input type="text" id="location" placeholder="Your Location / Residence *" required>'
            + '<input type="number" id="quantity" placeholder="Quantity" value="1" min="1" required>'
            + '<textarea id="notes" rows="3" placeholder="Describe of your order...&#10;Example I would like to order this item(color,size,model etc)." required> Describe your order </textarea>'
            + '<button type="submit" class="submit-btn">Send Order</button></form></div></div>'
            + '<script>'
            + 'var currentImageUrl="";'
            + 'function openBigImage(url){currentImageUrl=url;document.getElementById("main-image").src=url;document.getElementById("lightbox").style.display="flex";'
            + 'var thumbs=document.getElementById("related-thumbnails").querySelectorAll("img");'
            + 'thumbs.forEach(function(t){t.classList.toggle("active",t.src===url);});}'
            + 'document.querySelectorAll(".gallery img").forEach(function(img){img.addEventListener("click",function(){openBigImage(this.src);});});'
            + 'document.getElementById("related-thumbnails").addEventListener("click",function(e){if(e.target.tagName==="IMG")openBigImage(e.target.src);});'
            + 'document.getElementById("close-lightbox").addEventListener("click",function(){document.getElementById("lightbox").style.display="none";});'
            + 'document.getElementById("lightbox").addEventListener("click",function(e){if(e.target===this)this.style.display="none";});'
            + 'document.getElementById("order-btn").addEventListener("click",function(){document.getElementById("lightbox").style.display="none";document.getElementById("order-form-modal").style.display="flex";});'
            + 'document.getElementById("order-form").addEventListener("submit",function(e){'
            + 'e.preventDefault();'
            + 'var name=document.getElementById("client-name").value.trim();'
            + 'var email=document.getElementById("email").value.trim();'
            + 'var phone=document.getElementById("phone").value.trim();'
            + 'var location=document.getElementById("location").value.trim();'
            + 'var quantity=document.getElementById("quantity").value;'
            + 'var notes=document.getElementById("notes").value.trim();'
            + 'var msgText="*New Order from Website*\\n\\n *Product:* ' + productName.replace(/'/g, "\\'") + '\\n📸 *Image:* " + currentImageUrl + "\\n\\n👤 *Name:* " + name + "\\n📧 *Email:* " + (email||"Not provided") + "\\n📱 *Phone:* " + phone + "\\n📍 *Location:* " + location + "\\n🔢 *Quantity:* " + quantity + "\\n📝 *Notes:* " + (notes||"No additional notes") + "\\n\\nPlease confirm and reply with price and delivery details. Thank you!";'
            + 'var waLink="https://wa.me/255711819771?text=" + encodeURIComponent(msgText);'
            + 'window.open(waLink,"_blank");'
            + 'document.getElementById("order-form-modal").style.display="none";'
            + 'alert("Your order has been sent to WhatsApp with the product image.\\nWe will reply soon!");'
            + '});'
            + 'document.getElementById("order-form-modal").addEventListener("click",function(e){if(e.target===this)this.style.display="none";});'
            + '</script></body></html>';

        var newTab = window.open('', '_blank');
        if (newTab) {
            newTab.document.write(galleryHTML);
            newTab.document.close();
        } else {
            alert("Please allow pop-ups to view the gallery.");
        }
    });
});