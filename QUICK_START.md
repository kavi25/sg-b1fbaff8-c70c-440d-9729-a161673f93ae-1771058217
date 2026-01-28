# 🚀 Quick Deployment Guide for netjs.itprobit.com

## Prerequisites
- SSH access to your server
- Domain `netjs.itprobit.com` pointing to your server IP
- Root or sudo access

---

## 📋 Quick Steps

### 1️⃣ Connect to Your Server
```bash
ssh username@netjs.itprobit.com
# or
ssh username@your-server-ip
```

### 2️⃣ Install Required Software
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt-get update
sudo apt-get install -y nginx
```

### 3️⃣ Upload Project Files
```bash
# Create directory
sudo mkdir -p /var/www/netjs.itprobit.com
sudo chown -R $USER:$USER /var/www/netjs.itprobit.com
cd /var/www/netjs.itprobit.com

# Upload all project files here (via SCP, FTP, or Git)
```

**From your local machine:**
```bash
scp -r * username@netjs.itprobit.com:/var/www/netjs.itprobit.com/
```

### 4️⃣ Configure Environment
```bash
cd /var/www/netjs.itprobit.com
nano .env.local
```

Paste this and update with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_SITE_URL=https://netjs.itprobit.com
```

### 5️⃣ Build and Start
```bash
# Install and build
npm install
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6️⃣ Configure Nginx
```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/netjs.itprobit.com

# Enable site
sudo ln -s /etc/nginx/sites-available/netjs.itprobit.com /etc/nginx/sites-enabled/

# Test and restart
sudo nginx -t
sudo systemctl restart nginx
```

### 7️⃣ Setup SSL (HTTPS)
```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d netjs.itprobit.com
```

### 8️⃣ Verify
- Visit: `https://netjs.itprobit.com`
- Admin: `https://netjs.itprobit.com/admin/setup`

---

## ✅ Done!

Your site is now live at **https://netjs.itprobit.com**

For detailed instructions, see `DEPLOYMENT.md`

---

## 🔄 To Update Later

```bash
cd /var/www/netjs.itprobit.com
# Upload new files
npm install
npm run build
pm2 restart itprobit-app
```

---

## 🐛 Having Issues?

```bash
# Check app status
pm2 logs itprobit-app

# Check Nginx
sudo systemctl status nginx

# Restart everything
pm2 restart itprobit-app
sudo systemctl restart nginx
```