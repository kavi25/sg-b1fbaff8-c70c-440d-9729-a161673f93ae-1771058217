# Deployment Guide for netjs.itprobit.com (Windows Server)

## 🎯 Server Requirements

- **Operating System**: Windows Server 2016/2019/2022
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **PM2 for Windows** OR **IIS with iisnode**
- **Domain**: netjs.itprobit.com (DNS configured)

---

## 📦 Step 1: Install Node.js on Windows Server

### Download and Install Node.js
1. Download Node.js 18.x LTS from: https://nodejs.org/
2. Run the installer (`node-v18.x.x-x64.msi`)
3. Check "Automatically install necessary tools" during installation
4. Verify installation in PowerShell or CMD:
```powershell
node --version  # Should show v18.x.x or higher
npm --version
```

---

## 📁 Step 2: Upload Project Files

### Recommended Location
Create project directory:
```powershell
# Open PowerShell as Administrator
New-Item -ItemType Directory -Path "C:\inetpub\wwwroot\netjs.itprobit.com"
```

### Upload Methods

**Option A: Using Remote Desktop + Copy/Paste**
1. Connect to your Windows Server via RDP
2. Copy all project files from your local machine
3. Paste into `C:\inetpub\wwwroot\netjs.itprobit.com\`

**Option B: Using FTP/SFTP (FileZilla)**
1. Install FileZilla Server on Windows Server
2. Upload all project files to `C:\inetpub\wwwroot\netjs.itprobit.com\`

**Option C: Using Git**
```powershell
cd C:\inetpub\wwwroot
git clone <your-repo-url> netjs.itprobit.com
cd netjs.itprobit.com
```

---

## 🔧 Step 3: Configure Environment Variables

Create `.env.local` file in your project root:

```powershell
cd C:\inetpub\wwwroot\netjs.itprobit.com
notepad .env.local
```

Add the following content:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration (if using payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here
STRIPE_SECRET_KEY=your_stripe_secret_here

# Site URL
NEXT_PUBLIC_SITE_URL=https://netjs.itprobit.com

# Node Environment
NODE_ENV=production
```

**Important:** Replace the placeholder values with your actual credentials from Supabase dashboard.

---

## 🏗️ Step 4: Install Dependencies and Build

Open PowerShell as Administrator:

```powershell
cd C:\inetpub\wwwroot\netjs.itprobit.com

# Install dependencies
npm install

# Build the production version
npm run build

# This creates the .next folder with optimized production build
```

---

## 🚀 Step 5: Choose Your Deployment Method

### **Method A: Using PM2 for Windows (Recommended)**

#### Install PM2 Globally
```powershell
npm install -g pm2
npm install -g pm2-windows-startup

# Verify PM2 installation
pm2 --version
```

#### Configure PM2 to Run as Windows Service
```powershell
# Setup PM2 to start on Windows boot
pm2-startup install

# Start the application
cd C:\inetpub\wwwroot\netjs.itprobit.com
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Check application status
pm2 status
pm2 logs itprobit-app
```

#### Useful PM2 Commands on Windows
```powershell
pm2 list               # List all processes
pm2 restart itprobit-app   # Restart the app
pm2 stop itprobit-app      # Stop the app
pm2 delete itprobit-app    # Remove from PM2
pm2 logs itprobit-app      # View logs
pm2 monit              # Monitor resources
```

Your app should now be running on `http://localhost:3000`

---

### **Method B: Using IIS with iisnode (Alternative)**

If you prefer using IIS (Internet Information Services):

#### Install iisnode
1. Download iisnode from: https://github.com/Azure/iisnode/releases
2. Install `iisnode-full-v0.2.x-x64.msi`

#### Install URL Rewrite Module
1. Download from: https://www.iis.net/downloads/microsoft/url-rewrite
2. Install `rewrite_amd64.msi`

#### Create web.config
Create `web.config` in your project root:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^server.js\/debug[\/]?" />
        </rule>
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="server.js"/>
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering>
        <hiddenSegments>
          <remove segment="bin"/>
        </hiddenSegments>
      </requestFiltering>
    </security>
    <httpErrors existingResponse="PassThrough" />
  </system.webServer>
</configuration>
```

#### Create IIS Site
1. Open **IIS Manager**
2. Right-click **Sites** → **Add Website**
3. **Site name**: netjs.itprobit.com
4. **Physical path**: `C:\inetpub\wwwroot\netjs.itprobit.com`
5. **Binding**: HTTP, Port 80, Hostname: netjs.itprobit.com
6. Click **OK**

---

## 🌐 Step 6: Configure Windows Firewall

Open ports for HTTP and HTTPS:

```powershell
# Open PowerShell as Administrator

# Allow HTTP (Port 80)
New-NetFirewallRule -DisplayName "HTTP Inbound" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow

# Allow HTTPS (Port 443)
New-NetFirewallRule -DisplayName "HTTPS Inbound" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow
```

---

## 🔒 Step 7: Setup SSL Certificate (HTTPS)

### Option A: Using Let's Encrypt with win-acme

#### Install win-acme
1. Download from: https://www.win-acme.com/
2. Extract to `C:\win-acme`
3. Run as Administrator: `wacs.exe`

#### Get SSL Certificate
```powershell
cd C:\win-acme
.\wacs.exe
```

Follow the prompts:
1. Choose **N** (New certificate)
2. Choose **1** (Single binding of an IIS site)
3. Select your site (netjs.itprobit.com)
4. Choose **2** (RSA certificate)
5. Choose **2** (Store in Windows Certificate Store)
6. Certificate will be automatically installed and bound to IIS

### Option B: Manual SSL Certificate (if you have one)

1. Open **IIS Manager**
2. Click on your server name
3. Double-click **Server Certificates**
4. Click **Import** (right panel)
5. Browse to your `.pfx` certificate file
6. Enter password
7. Right-click your site → **Edit Bindings**
8. **Add** → Type: https, Port: 443, SSL certificate: (select your certificate)

---

## 🔄 Step 8: Configure Reverse Proxy (if using PM2)

If you're using PM2 (Method A), you need IIS to proxy requests to Node.js:

### Install Application Request Routing (ARR)
1. Download from: https://www.iis.net/downloads/microsoft/application-request-routing
2. Install ARR
3. Open IIS Manager
4. Click on your server name
5. Double-click **Application Request Routing Cache**
6. Click **Server Proxy Settings** (right panel)
7. Check **Enable proxy**
8. Click **Apply**

### Create Reverse Proxy Rule

Create `web.config` in `C:\inetpub\wwwroot\netjs.itprobit.com`:

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

---

## ✅ Step 9: Verify Deployment

### Check Application Status

**If using PM2:**
```powershell
pm2 status
pm2 logs itprobit-app --lines 50
```

**If using IIS:**
1. Open IIS Manager
2. Check if site is started (green icon)
3. Browse to site (right-click → Manage Website → Browse)

### Test Your Website

1. **Local Test**: `http://localhost:3000` (if using PM2) or `http://localhost` (if using IIS)
2. **Domain Test**: `http://netjs.itprobit.com` (after DNS propagation)
3. **HTTPS Test**: `https://netjs.itprobit.com` (after SSL setup)

### Test Admin Panel
- Visit: `https://netjs.itprobit.com/admin/setup`
- Create admin account
- Login at: `https://netjs.itprobit.com/admin/login`

---

## 🔄 Updating Your Application

When you make changes and need to redeploy:

```powershell
cd C:\inetpub\wwwroot\netjs.itprobit.com

# Pull latest changes (if using Git)
git pull

# Or upload new files via RDP/FTP

# Install any new dependencies
npm install

# Rebuild the application
npm run build

# Restart PM2 (if using PM2)
pm2 restart itprobit-app

# Or Restart IIS site (if using IIS)
# In IIS Manager: Right-click site → Manage Website → Restart
```

---

## 🐛 Troubleshooting

### Application Not Starting (PM2)

```powershell
# Check PM2 logs
pm2 logs itprobit-app

# Check if port 3000 is in use
netstat -ano | findstr :3000

# Restart the app
pm2 restart itprobit-app
```

### IIS Site Not Working

1. Check **IIS logs**: `C:\inetpub\logs\LogFiles`
2. Check **Event Viewer**: Windows Logs → Application
3. Verify **iisnode** is installed: IIS Manager → Handler Mappings
4. Check **permissions**: IIS_IUSRS should have read access to project folder

### Port Already in Use

```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Permission Issues

```powershell
# Give IIS_IUSRS full control to project folder
icacls "C:\inetpub\wwwroot\netjs.itprobit.com" /grant "IIS_IUSRS:(OI)(CI)F" /T
```

### Database Connection Issues
- Verify `.env.local` has correct Supabase credentials
- Check Supabase dashboard for connection status
- Ensure Windows Firewall allows outbound connections
- Restart the app: `pm2 restart itprobit-app`

---

## 📊 Monitoring

### View Logs in Real-time (PM2)
```powershell
pm2 logs itprobit-app
```

### Monitor Application (PM2)
```powershell
pm2 monit
```

### Check Resource Usage (PM2)
```powershell
pm2 list
```

### IIS Logs
Located at: `C:\inetpub\logs\LogFiles\W3SVC[site-id]\`

---

## 🔐 Security Checklist

- ✅ SSL certificate installed (HTTPS)
- ✅ Windows Firewall configured (Ports 80, 443)
- ✅ Environment variables secured (not in Git)
- ✅ Regular Windows Updates enabled
- ✅ Strong passwords for admin accounts
- ✅ Supabase RLS policies enabled
- ✅ Antivirus/Antimalware active
- ✅ Remote Desktop with strong password/key

---

## 📞 Support

If you encounter issues:
1. **PM2**: Check logs with `pm2 logs itprobit-app`
2. **IIS**: Check `C:\inetpub\logs\LogFiles` and Event Viewer
3. Verify environment variables in `.env.local`
4. Ensure Supabase connection is working
5. Check Windows Firewall rules

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

**Enjoy your new website on Windows Server! 🚀**