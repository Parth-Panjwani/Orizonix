# Google Sheets Integration Setup

## Method 1: Google Apps Script (Recommended - Free)

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Orizonix Contact Form Submissions"
4. Add headers in Row 1:
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`
   - Column D: `Subject`
   - Column E: `Message`

### Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete the default code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Add row to sheet
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.subject || "",
      data.message || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Data saved successfully",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (💾) and name your project "Contact Form Handler"
4. Click **Deploy** → **New deployment**
5. Click the gear icon ⚙️ → Select **Web app**
6. Set:
   - **Execute as**: Me
   - **Who has access**: Anyone
7. Click **Deploy**
8. Copy the **Web App URL** (you'll need this)

### Step 3: Add URL to Environment

1. Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

2. Replace `YOUR_SCRIPT_ID` with your actual Web App URL

### Step 4: Test

Submit the form and check your Google Sheet - data should appear automatically!

---

## Method 2: Using SheetDB.io (Alternative - Free Tier Available)

1. Go to [sheetdb.io](https://sheetdb.io)
2. Create a free account
3. Connect your Google Sheet
4. Get your API endpoint
5. Update the form submission URL in `Contact.tsx`

---

## Method 3: Next.js API Route (Full Control)

If you prefer to use Next.js API routes, I can help you set that up with Google Sheets API.

---

**Note**: The current implementation uses `mode: "no-cors"` because Google Apps Script doesn't support CORS. This means you won't see the response in the browser, but the data will still be saved to your sheet.
