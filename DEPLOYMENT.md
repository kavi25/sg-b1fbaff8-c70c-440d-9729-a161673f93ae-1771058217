# Deployment Guide for netjs.itprobit.com

## 🎯 Server Requirements

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **PM2**: Process manager for Node.js
- **Nginx**: Web server and reverse proxy
- **Domain**: netjs.itprobit.com (DNS configured)

---

## 📦 Step 1: Prepare the Server

### Install Node.js (if not installed)
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should be v18.x or higher
npm --version
```

### Install PM2 Globally
```bash
sudo npm install -g pm2

# Verify PM2 installation
pm2 --version
```

### Install Nginx (if not installed)
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## 📁 Step 2: Upload Project Files

### Option A: Using Git (Recommended)
```bash
# On your server
cd /var/www
sudo mkdir -p netjs.itprobit.com
sudo chown -R $USER:$USER netjs.itprobit.com
cd netjs.itprobit.com

# Clone from your repository (if you have one)
git clone <your-git-repo-url> .

# Or use SCP/FTP to upload files (see Option B)
```

### Option B: Using SCP/FTP
From your local machine, upload all project files:
```bash
# From your local project directory
scp -r * username@netjs.itprobit.com:/var/www/netjs.itprobit.com/

# Or use FileZilla/WinSCP to upload:
# - All files and folders from this project
# - Upload to: /var/www/netjs.itprobit.com/
```

---

## 🔧 Step 3: Configure Environment Variables

Create `.env.local` file on the server:

```bash
cd /var/www/netjs.itprobit.com
nano .env.local
```

Add the following content:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration (if using payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here
STRIPE_SECRET_KEY=your_stripe_secret_here

# Site URL
NEXT_PUBLIC_SITE_URL=https://netjs.itprobit.com
```

**Important:** Replace the placeholder values with your actual credentials from Supabase dashboard.

---

## 🏗️ Step 4: Install Dependencies and Build

```bash
cd /var/www/netjs.itprobit.com

# Install dependencies
npm install

# Build the production version
npm run build

# This creates the .next folder with optimized production build
```

---

## 🚀 Step 5: Start Application with PM2

The project already includes `ecosystem.config.js`. Start the app:

```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Set PM2 to start on system boot
pm2 startup
# Follow the command output instructions

# Check application status
pm2 status
pm2 logs itprobit-app

# Useful PM2 commands:
# pm2 restart itprobit-app  # Restart the app
# pm2 stop itprobit-app     # Stop the app
# pm2 delete itprobit-app   # Remove from PM2
```

Your app should now be running on `http://localhost:3000`

---

## 🌐 Step 6: Configure Nginx

Create Nginx configuration for your domain:

```bash
sudo nano /etc/nginx/sites-available/netjs.itprobit.com
```

Add this configuration (already created in nginx.conf file):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name netjs.itprobit.com;

    # Redirect to HTTPS (after SSL is set up)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Next.js static files
    location /_next/static {
        proxy_cache STATIC;
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Public assets
    location /public {
        proxy_cache STATIC;
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

Enable the site and restart Nginx:

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/netjs.itprobit.com /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## 🔒 Step 7: Setup SSL Certificate (HTTPS)

Install Certbot and get free SSL certificate:

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate (Certbot will auto-configure Nginx)
sudo certbot --nginx -d netjs.itprobit.com

# Follow the prompts:
# - Enter email address
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (recommended)

# Test auto-renewal
sudo certbot renew --dry-run
```

After SSL setup, Certbot automatically updates your Nginx config to use HTTPS.

---

## ✅ Step 8: Verify Deployment

1. **Check PM2 status:**
```bash
pm2 status
pm2 logs itprobit-app --lines 50
```

2. **Check Nginx status:**
```bash
sudo systemctl status nginx
```

3. **Visit your website:**
- HTTP: `http://netjs.itprobit.com`
- HTTPS: `https://netjs.itprobit.com` (after SSL)

4. **Test admin panel:**
- Visit: `https://netjs.itprobit.com/admin/setup`
- Create admin account
- Login at: `https://netjs.itprobit.com/admin/login`

---

## 🔄 Updating Your Application

When you make changes and need to redeploy:

```bash
cd /var/www/netjs.itprobit.com

# Pull latest changes (if using Git)
git pull

# Or upload new files via SCP/FTP

# Install any new dependencies
npm install

# Rebuild the application
npm run build

# Restart PM2
pm2 restart itprobit-app

# Check logs
pm2 logs itprobit-app
```

---

## 🐛 Troubleshooting

### Application not starting
```bash
# Check PM2 logs
pm2 logs itprobit-app

# Check if port 3000 is in use
sudo netstat -tlnp | grep 3000

# Restart the app
pm2 restart itprobit-app
```

### Nginx 502 Bad Gateway
```bash
# Check if Next.js is running
pm2 status

# Check Nginx error logs
sudo tail -f /var/nginx/error.log

# Restart services
pm2 restart itprobit-app
sudo systemctl restart nginx
```

### Permission Issues
```bash
# Fix ownership
sudo chown -R $USER:$USER /var/www/netjs.itprobit.com

# Fix permissions
chmod -R 755 /var/www/netjs.itprobit.com
```

### Database Connection Issues
- Verify `.env.local` has correct Supabase credentials
- Check Supabase dashboard for connection status
- Restart the app: `pm2 restart itprobit-app`

---

## 📊 Monitoring

### View logs in real-time
```bash
pm2 logs itprobit-app
```

### Monitor application
```bash
pm2 monit
```

### Check resource usage
```bash
pm2 list
```

---

## 🔐 Security Checklist

- ✅ SSL certificate installed (HTTPS)
- ✅ Firewall configured (UFW/iptables)
- ✅ Environment variables secured (not in Git)
- ✅ Regular system updates
- ✅ Strong passwords for admin accounts
- ✅ Supabase RLS policies enabled

---

## 📞 Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs itprobit-app`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify environment variables in `.env.local`
4. Ensure Supabase connection is working

---

## 🎉 Deployment Complete!

Your ITProBit website is now live at:
**https://netjs.itprobit.com**

Next steps:
1. Visit `/admin/setup` to create your admin account
2. Login to admin panel
3. Start adding content (blog posts, services, etc.)
4. Configure payments if needed
5. Customize branding and content

**Enjoy your new website! 🚀**