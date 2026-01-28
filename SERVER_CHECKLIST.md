# 📋 Server Deployment Checklist for netjs.itprobit.com

Use this checklist to ensure everything is properly configured.

---

## 🔧 System Requirements

- [ ] **Node.js 18.x or higher** installed
  ```bash
  node --version  # Should show v18.x.x or higher
  ```

- [ ] **npm 9.x or higher** installed
  ```bash
  npm --version  # Should show 9.x.x or higher
  ```

- [ ] **PM2** process manager installed globally
  ```bash
  pm2 --version
  ```

- [ ] **Nginx** web server installed and running
  ```bash
  sudo systemctl status nginx
  ```

---

## 📁 Files & Directories

- [ ] Project files uploaded to `/var/www/netjs.itprobit.com`
- [ ] All node_modules deleted before upload (will reinstall on server)
- [ ] `.next` folder deleted before upload (will rebuild on server)
- [ ] `.env.local` created on server with production credentials
- [ ] File permissions set correctly (`chmod -R 755`)
- [ ] User ownership set correctly (`chown -R $USER:$USER`)

---

## 🔐 Environment Variables

- [ ] `.env.local` file created on server
- [ ] `NEXT_PUBLIC_SUPABASE_URL` configured
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configured
- [ ] `NEXT_PUBLIC_SITE_URL=https://netjs.itprobit.com` set
- [ ] Stripe keys configured (if using payments)
- [ ] Environment variables validated (no syntax errors)

---

## 🏗️ Application Build

- [ ] Dependencies installed: `npm install`
- [ ] Production build successful: `npm run build`
- [ ] No build errors in output
- [ ] `.next` folder created in project root
- [ ] Build size is reasonable (check output)

---

## 🚀 PM2 Configuration

- [ ] Application started: `pm2 start ecosystem.config.js`
- [ ] Application shows "online" status: `pm2 status`
- [ ] No errors in logs: `pm2 logs itprobit-app`
- [ ] PM2 startup configured: `pm2 startup`
- [ ] PM2 process list saved: `pm2 save`
- [ ] Test PM2 restart: `pm2 restart itprobit-app`

---

## 🌐 Nginx Configuration

- [ ] Nginx config file created at `/etc/nginx/sites-available/netjs.itprobit.com`
- [ ] Symlink created: `/etc/nginx/sites-enabled/netjs.itprobit.com`
- [ ] Nginx config test passed: `sudo nginx -t`
- [ ] Nginx restarted: `sudo systemctl restart nginx`
- [ ] Nginx enabled on boot: `sudo systemctl enable nginx`
- [ ] Port 80 accessible (test with curl or browser)

---

## 🔒 SSL/HTTPS Configuration

- [ ] Certbot installed: `sudo apt-get install certbot python3-certbot-nginx`
- [ ] SSL certificate obtained: `sudo certbot --nginx -d netjs.itprobit.com`
- [ ] HTTPS redirect working (HTTP → HTTPS)
- [ ] SSL grade A or better (test at ssllabs.com)
- [ ] Auto-renewal configured: `sudo certbot renew --dry-run`

---

## 🌍 DNS & Domain

- [ ] DNS A record points to server IP address
- [ ] `netjs.itprobit.com` resolves to correct IP: `nslookup netjs.itprobit.com`
- [ ] DNS propagation complete (may take up to 48 hours)
- [ ] Domain accessible via browser

---

## 🔥 Firewall Configuration

- [ ] Port 80 (HTTP) open
  ```bash
  sudo ufw allow 80/tcp
  ```

- [ ] Port 443 (HTTPS) open
  ```bash
  sudo ufw allow 443/tcp
  ```

- [ ] Port 22 (SSH) open
  ```bash
  sudo ufw allow 22/tcp
  ```

- [ ] Firewall enabled
  ```bash
  sudo ufw enable
  sudo ufw status
  ```

---

## ✅ Testing & Verification

- [ ] Website loads at `https://netjs.itprobit.com`
- [ ] Homepage renders correctly
- [ ] Navigation works (all menu links)
- [ ] Admin setup accessible: `/admin/setup`
- [ ] Admin login works: `/admin/login`
- [ ] Blog page loads: `/blog`
- [ ] Services pages load: `/services/*`
- [ ] Contact form works: `/contact`
- [ ] Payment flow works (if enabled): `/pricing`
- [ ] No console errors in browser DevTools
- [ ] Mobile responsive (test on phone)

---

## 📊 Monitoring & Logs

- [ ] PM2 logs accessible: `pm2 logs itprobit-app`
- [ ] Nginx access logs: `tail -f /var/log/nginx/access.log`
- [ ] Nginx error logs: `tail -f /var/log/nginx/error.log`
- [ ] Disk space sufficient: `df -h`
- [ ] Memory usage acceptable: `free -h`

---

## 🔄 Post-Deployment Tasks

- [ ] Create admin account via `/admin/setup`
- [ ] Test admin login
- [ ] Add initial blog posts (if needed)
- [ ] Update services content
- [ ] Add contact information
- [ ] Configure Stripe (if using payments)
- [ ] Test all features thoroughly
- [ ] Set up monitoring/uptime alerts (optional)
- [ ] Document custom configurations

---

## 🐛 Common Issues & Solutions

### Application won't start
```bash
pm2 logs itprobit-app
# Check for errors, usually environment variables or port conflicts
```

### 502 Bad Gateway
```bash
# Check if app is running
pm2 status
# Restart services
pm2 restart itprobit-app
sudo systemctl restart nginx
```

### Database connection errors
```bash
# Verify .env.local has correct Supabase credentials
cat .env.local
# Test connection by checking admin login page
```

### SSL certificate issues
```bash
# Renew certificate
sudo certbot renew
sudo systemctl restart nginx
```

---

## 📞 Support Resources

- **Deployment Guide**: See `DEPLOYMENT.md` for detailed instructions
- **Quick Start**: See `QUICK_START.md` for rapid deployment steps
- **PM2 Docs**: https://pm2.keymetrics.io/docs/usage/quick-start/
- **Nginx Docs**: https://nginx.org/en/docs/
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs

---

## ✨ Deployment Complete!

Once all items are checked, your deployment is complete and your website is live!

**Site URL**: https://netjs.itprobit.com
**Admin Panel**: https://netjs.itprobit.com/admin

Congratulations! 🎉