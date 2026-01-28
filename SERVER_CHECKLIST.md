# 📋 Server Deployment Checklist for netjs.itprobit.com (Windows Server)

Use this checklist to ensure everything is properly configured on Windows Server.

---

## 🔧 System Requirements

- [ ] **Windows Server 2016/2019/2022** installed
  ```powershell
  systeminfo | findstr /C:"OS Name"
  ```

- [ ] **Node.js 18.x or higher** installed
  ```powershell
  node --version  # Should show v18.x.x or higher
  ```

- [ ] **npm 9.x or higher** installed
  ```powershell
  npm --version  # Should show 9.x.x or higher
  ```

- [ ] **PM2** process manager installed globally
  ```powershell
  pm2 --version
  ```

- [ ] **pm2-windows-startup** installed
  ```powershell
  npm list -g pm2-windows-startup
  ```

- [ ] **IIS (Internet Information Services)** installed and running
  - Open Server Manager → Add Roles and Features → Web Server (IIS)

---

## 📁 Files & Directories

- [ ] Project files uploaded to `C:\inetpub\wwwroot\netjs.itprobit.com`
- [ ] All node_modules deleted before upload (will reinstall on server)
- [ ] `.next` folder deleted before upload (will rebuild on server)
- [ ] `.env.local` created on server with production credentials
- [ ] `web.config` created for IIS reverse proxy
- [ ] File permissions set correctly (IIS_IUSRS has read access)

---

## 🔐 Environment Variables

- [ ] `.env.local` file created on server
- [ ] `NEXT_PUBLIC_SUPABASE_URL` configured
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configured
- [ ] `NEXT_PUBLIC_SITE_URL=https://netjs.itprobit.com` set
- [ ] `NODE_ENV=production` set
- [ ] Stripe keys configured (if using payments)
- [ ] Environment variables validated (no syntax errors)

---

## 🏗️ Application Build

- [ ] Dependencies installed: `npm install`
- [ ] Production build successful: `npm run build`
- [ ] No build errors in PowerShell output
- [ ] `.next` folder created in project root
- [ ] Build size is reasonable (check output)

---

## 🚀 PM2 Configuration

- [ ] PM2 Windows startup installed: `pm2-startup install`
- [ ] Application started: `pm2 start ecosystem.config.js`
- [ ] Application shows "online" status: `pm2 status`
- [ ] No errors in logs: `pm2 logs itprobit-app`
- [ ] PM2 process list saved: `pm2 save`
- [ ] PM2 configured to start on Windows boot
- [ ] Test PM2 restart: `pm2 restart itprobit-app`
- [ ] Port 3000 is accessible: `netstat -ano | findstr :3000`

---

## 🌐 IIS Configuration

- [ ] **URL Rewrite Module** installed
  - Download from: https://www.iis.net/downloads/microsoft/url-rewrite

- [ ] **Application Request Routing (ARR)** installed
  - Download from: https://www.iis.net/downloads/microsoft/application-request-routing

- [ ] ARR proxy enabled (IIS → ARR Cache → Server Proxy Settings → Enable proxy)

- [ ] IIS site created with:
  - Site name: netjs.itprobit.com
  - Physical path: `C:\inetpub\wwwroot\netjs.itprobit.com`
  - Binding: HTTP, Port 80, Hostname: netjs.itprobit.com

- [ ] `web.config` created with reverse proxy rules

- [ ] IIS site is started (green icon in IIS Manager)

- [ ] Site accessible locally: `http://localhost`

---

## 🔒 SSL/HTTPS Configuration

- [ ] **win-acme** downloaded and extracted to `C:\win-acme`
  - Download from: https://www.win-acme.com/

- [ ] SSL certificate obtained: `C:\win-acme\wacs.exe`

- [ ] HTTPS binding added to IIS site (Port 443)

- [ ] Certificate bound to site in IIS

- [ ] HTTPS redirect working (HTTP → HTTPS)

- [ ] SSL grade A or better (test at ssllabs.com)

- [ ] Auto-renewal configured with win-acme scheduled task

---

## 🌍 DNS & Domain

- [ ] DNS A record points to server's public IP address
- [ ] `netjs.itprobit.com` resolves to correct IP:
  ```powershell
  nslookup netjs.itprobit.com
  ```
- [ ] DNS propagation complete (may take up to 48 hours)
- [ ] Domain accessible via browser

---

## 🔥 Windows Firewall Configuration

- [ ] Port 80 (HTTP) open
  ```powershell
  New-NetFirewallRule -DisplayName "HTTP Inbound" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
  ```

- [ ] Port 443 (HTTPS) open
  ```powershell
  New-NetFirewallRule -DisplayName "HTTPS Inbound" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow
  ```

- [ ] Port 3389 (RDP) open for remote access
  ```powershell
  New-NetFirewallRule -DisplayName "RDP Inbound" -Direction Inbound -Protocol TCP -LocalPort 3389 -Action Allow
  ```

- [ ] Firewall rules verified:
  ```powershell
  Get-NetFirewallRule | Where-Object {$_.DisplayName -like "*HTTP*" -or $_.DisplayName -like "*RDP*"}
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
- [ ] No console errors in browser DevTools (F12)
- [ ] Mobile responsive (test on phone)
- [ ] All images and assets load correctly

---

## 📊 Monitoring & Logs

- [ ] PM2 logs accessible: `pm2 logs itprobit-app`
- [ ] IIS logs location: `C:\inetpub\logs\LogFiles\W3SVC[site-id]\`
- [ ] Event Viewer configured (Windows Logs → Application)
- [ ] Disk space sufficient: 
  ```powershell
  Get-PSDrive C
  ```
- [ ] Memory usage acceptable:
  ```powershell
  Get-Counter '\Memory\Available MBytes'
  ```
- [ ] CPU usage normal: Open Task Manager

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
- [ ] Configure Windows Defender exclusions for project folder (if needed)
- [ ] Set up automated backups

---

## 🐛 Common Issues & Solutions

### Application won't start
```powershell
pm2 logs itprobit-app
# Check for errors, usually environment variables or port conflicts

# Check if port is in use
netstat -ano | findstr :3000

# Kill process if needed
taskkill /PID <PID> /F
```

### 502 Bad Gateway or IIS Error
```powershell
# Check if PM2 app is running
pm2 status

# Restart services
pm2 restart itprobit-app

# Restart IIS site
# IIS Manager → Right-click site → Manage Website → Restart

# Check IIS logs
Get-Content C:\inetpub\logs\LogFiles\W3SVC*\*.log -Tail 50
```

### Database connection errors
```powershell
# Verify .env.local has correct Supabase credentials
Get-Content C:\inetpub\wwwroot\netjs.itprobit.com\.env.local

# Test connection by checking admin login page
# Restart app
pm2 restart itprobit-app
```

### SSL certificate issues
```powershell
# Renew certificate with win-acme
cd C:\win-acme
.\wacs.exe --renew

# Check certificate in IIS
# IIS Manager → Server Certificates → View certificate details
```

### Permission Issues
```powershell
# Give IIS_IUSRS full control
icacls "C:\inetpub\wwwroot\netjs.itprobit.com" /grant "IIS_IUSRS:(OI)(CI)F" /T

# Reset permissions
icacls "C:\inetpub\wwwroot\netjs.itprobit.com" /reset /T
```

---

## 📞 Support Resources

- **Deployment Guide**: See `DEPLOYMENT.md` for detailed instructions
- **Quick Start**: See `QUICK_START.md` for rapid deployment steps
- **PM2 Docs**: https://pm2.keymetrics.io/docs/usage/quick-start/
- **IIS Docs**: https://docs.microsoft.com/en-us/iis/
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **win-acme Docs**: https://www.win-acme.com/manual/getting-started

---

## 🪟 Windows-Specific Commands Reference

```powershell
# System Info
systeminfo
Get-ComputerInfo

# Network
netstat -ano                    # Show all connections
ipconfig /all                   # Network configuration
Test-NetConnection netjs.itprobit.com -Port 80

# Services
Get-Service | Where-Object {$_.Name -like "*w3svc*"}  # IIS service
Restart-Service W3SVC          # Restart IIS

# Processes
Get-Process node               # Find Node.js processes
Stop-Process -Name node -Force # Stop all Node processes

# Disk Space
Get-PSDrive
Get-Volume

# Event Viewer (GUI)
eventvwr.msc

# IIS Manager (GUI)
inetmgr
```

---

## ✨ Deployment Complete!

Once all items are checked, your deployment is complete and your website is live on Windows Server!

**Site URL**: https://netjs.itprobit.com
**Admin Panel**: https://netjs.itprobit.com/admin

Congratulations! 🎉🪟