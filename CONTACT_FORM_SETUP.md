# Contact Form Setup Guide

## 🎯 Recommended Solutions (Choose One)

### Option 1: Google Apps Script ⭐ (Most Reliable)

**Pros:**

- ✅ Free forever
- ✅ Direct integration with Google Sheets
- ✅ Reliable and fast
- ✅ Full control over data

**Setup:**

1. **Create Google Sheet**

   - Go to [Google Sheets](https://sheets.google.com)
   - Create new spreadsheet
   - Add headers in Row 1: `Timestamp`, `Name`, `Email`, `Subject`, `Message`

2. **Create Google Apps Script**
   - In your sheet: **Extensions** → **Apps Script**
   - Delete default code, paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.subject || "",
      data.message || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Data saved successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Deploy Script**

   - Click **Save** (💾)
   - Click **Deploy** → **New deployment**
   - Click gear ⚙️ → Select **Web app**
   - Set:
     - **Execute as**: Me
     - **Who has access**: Anyone
   - Click **Deploy**
   - Copy the **Web App URL**

4. **Add to Environment**
   - Create `.env.local`:

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

- Replace `YOUR_SCRIPT_ID` with your actual URL
- For Vercel: Add `GOOGLE_SCRIPT_URL` in Project Settings → Environment Variables

---

### Option 2: Web3Forms 🚀 (Easiest Setup)

**Pros:**

- ✅ Free (1000 submissions/month)
- ✅ Super simple setup (2 minutes)
- ✅ Email notifications
- ✅ Can export to Google Sheets
- ✅ No coding required

**Setup:**

1. **Get Access Key**

   - Go to [web3forms.com](https://web3forms.com)
   - Sign up (free)
   - Copy your access key

2. **Add to Environment**
   - Create `.env.local`:

```env
WEB3FORMS_ACCESS_KEY=your_access_key_here
```

- For Vercel: Add `WEB3FORMS_ACCESS_KEY` in Project Settings

3. **Enable Google Sheets Export** (Optional)
   - In Web3Forms dashboard, enable Google Sheets integration
   - Connect your Google Sheet

---

### Option 3: Keep SheetDB (Current)

If you want to keep using SheetDB, just ensure your `.env.local` has:

```env
SHEETDB_API_URL=https://sheetdb.io/api/v1/zis0mm3m2arpf
```

**Note:** SheetDB can be unreliable with response parsing. Consider switching to Option 1 or 2.

---

## 🔧 How It Works

The API route tries methods in this order:

1. **Google Apps Script** (if `GOOGLE_SCRIPT_URL` is set)
2. **Web3Forms** (if `WEB3FORMS_ACCESS_KEY` is set)
3. **SheetDB** (fallback)

Set up **one** method and the form will work automatically!

---

## ✅ Testing

After setup:

1. Submit the contact form
2. Check your Google Sheet (or Web3Forms dashboard)
3. You should see a success message

---

## 🆘 Troubleshooting

**Still getting errors?**

- Check browser console for error messages
- Verify environment variable is set correctly
- For Google Apps Script: Make sure script is deployed and accessible
- For Web3Forms: Verify access key is correct

**Need help?**

- Check the API route logs in Vercel
- Verify the environment variable is set in production
