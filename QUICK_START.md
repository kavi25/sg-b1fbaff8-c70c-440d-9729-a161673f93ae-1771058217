# 🚀 Quick Deployment Guide for netjs.itprobit.com (Windows Server)

## Prerequisites
- Windows Server 2016/2019/2022
- Administrator access
- Domain `netjs.itprobit.com` pointing to your server IP

---

## 📋 Quick Steps

### 1️⃣ Install Node.js
```powershell
# Download and install Node.js 18.x LTS from:
# https://nodejs.org/

# Verify in PowerShell
node --version
npm --version
```

### 2️⃣ Install PM2 Globally
```powershell
# Open PowerShell as Administrator
npm install -g pm2
npm install -g pm2-windows-startup
pm2-startup install
```

### 3️⃣ Create Project Directory
```powershell
New-Item -ItemType Directory -Path "C:\inetpub\wwwroot\netjs.itprobit.com"
cd C:\inetpub\wwwroot\netjs.itprobit.com
```

### 4️⃣ Upload Project Files
- Use Remote Desktop to copy files, OR
- Use FileZilla/WinSCP to upload files, OR
- Use Git to clone repository

Upload all project files to: `C:\inetpub\wwwroot\netjs.itprobit.com\`

### 5️⃣ Configure Environment
```powershell
cd C:\inetpub\wwwroot\netjs.itprobit.com
notepad .env.local
```

Paste this and update with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_SITE_URL=https://netjs.itprobit.com
NODE_ENV=production
```

### 6️⃣ Build and Start
```powershell
# Install dependencies
npm install

# Build production
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
```

### 7️⃣ Configure Windows Firewall
```powershell
# Open PowerShell as Administrator

# Allow HTTP (Port 80)
New-NetFirewallRule -DisplayName "HTTP Inbound" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow

# Allow HTTPS (Port 443)
New-NetFirewallRule -DisplayName "HTTPS Inbound" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow
```

### 8️⃣ Setup IIS Reverse Proxy

#### Install Required Components
1. Download and install **URL Rewrite**: https://www.iis.net/downloads/microsoft/url-rewrite
2. Download and install **ARR**: https://www.iis.net/downloads/microsoft/application-request-routing

#### Enable Proxy in ARR
1. Open **IIS Manager**
2. Click server name
3. Double-click **Application Request Routing Cache**
4. Click **Server Proxy Settings** (right panel)
5. Check **Enable proxy**
6. Click **Apply**

#### Create IIS Site
1. In **IIS Manager**, right-click **Sites** → **Add Website**
2. **Site name**: netjs.itprobit.com
3. **Physical path**: `C:\inetpub\wwwroot\netjs.itprobit.com`
4. **Binding**: HTTP, Port 80, Hostname: netjs.itprobit.com
5. Click **OK**

#### Create web.config
```powershell
cd C:\inetpub\wwwroot\netjs.itprobit.com
notepad web.config
```

Paste this content:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="ReverseProxyInboundRule1" stopProcessing="true">
                    <match url="(.*)" />
                    <action type="Rewrite" url="http://localhost:3000/{R:1}" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

### 9️⃣ Setup SSL with win-acme
```powershell
# Download win-acme from: https://www.win-acme.com/
# Extract to C:\win-acme

cd C:\win-acme
.\wacs.exe

# Follow prompts:
# - Choose N (New certificate)
# - Choose 1 (Single binding of an IIS site)
# - Select your site
# - Certificate will be automatically installed
```

### 🔟 Verify
- Visit: `https://netjs.itprobit.com`
- Admin: `https://netjs.itprobit.com/admin/setup`

---

## ✅ Done!

Your site is now live at **https://netjs.itprobit.com**

For detailed instructions, see `DEPLOYMENT.md`

---

## 🔄 To Update Later

```powershell
cd C:\inetpub\wwwroot\netjs.itprobit.com
# Upload new files via RDP/FTP
npm install
npm run build
pm2 restart itprobit-app
```

---

## 🐛 Having Issues?

```powershell
# Check app status
pm2 logs itprobit-app
pm2 status

# Check if running
netstat -ano | findstr :3000

# Restart everything
pm2 restart itprobit-app

# Check IIS logs
# C:\inetpub\logs\LogFiles
```

---

## 💡 Quick Commands

```powershell
# PM2 Commands
pm2 list                    # List all processes
pm2 logs itprobit-app       # View logs
pm2 restart itprobit-app    # Restart app
pm2 monit                   # Monitor resources

# Windows Service
pm2 save                    # Save process list
pm2-startup install         # Run on Windows boot
```