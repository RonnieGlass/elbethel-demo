import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const sunday = String(body.sunday || "").trim();
    const bringingKids = Boolean(
      body.bringingKids === true ||
        body.bringingKids === "on" ||
        body.bringingKids === "true"
    );

    if (!name || !email || !phone || !sunday) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const sheet = await appendToSheet({
      name,
      email,
      phone,
      sunday,
      bringingKids,
    });

    const mail = await sendHostTeamEmail({
      name,
      email,
      phone,
      sunday,
      bringingKids,
    });

    const sms = await sendVisitorSms({ name, phone, sunday });

    return NextResponse.json({ ok: true, sheet, mail, sms });
  } catch (err) {
    console.error("/api/plan-your-visit error", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 }
    );
  }
}

async function appendToSheet(data: {
  name: string;
  email: string;
  phone: string;
  sunday: string;
  bringingKids: boolean;
}) {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(
    /\\n/g,
    "\n"
  );
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const tab = process.env.GOOGLE_SHEETS_TAB_NAME || "VIPVisits";

  if (!clientEmail || !privateKey || !spreadsheetId) {
    console.log("[Sheets] SIMULATED APPEND:", { tab, ...data });
    return { simulated: true };
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const timestamp = new Date().toISOString();

  const values = [
    [
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.sunday,
      data.bringingKids ? "Yes" : "No",
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A:Z`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });

  return { simulated: false };
}

async function sendHostTeamEmail(data: {
  name: string;
  email: string;
  phone: string;
  sunday: string;
  bringingKids: boolean;
}) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const to = process.env.HOST_TEAM_EMAIL;
  const from = process.env.EMAIL_FROM || "no-reply@example.com";

  if (!apiKey || !to) {
    console.log("[Email] SIMULATED — To Host Team:", {
      to,
      from,
      subject: `VIP Visit: ${data.name} — ${data.sunday}`,
    });
    return { simulated: true };
  }

  try {
    const sg = await import("@sendgrid/mail");
    sg.default.setApiKey(apiKey);

    await sg.default.send({
      to,
      from,
      subject: `VIP Visit: ${data.name} — ${data.sunday}`,
      text: `${data.name} • ${data.email} • ${data.phone} • Kids: ${
        data.bringingKids ? "Yes" : "No"
      }`,
      html: `<p><strong>${data.name}</strong> plans a VIP visit on <strong>${data.sunday}</strong>.</p>
             <p>Email: ${data.email}<br/>Phone: ${data.phone}<br/>Bringing kids: ${
               data.bringingKids ? "Yes" : "No"
             }</p>`,
    });

    return { simulated: false };
  } catch (err) {
    console.warn("[Email] SendGrid error — simulated fallback:", err);
    return { simulated: true };
  }
}

async function sendVisitorSms(data: {
  name: string;
  phone: string;
  sunday: string;
}) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;

  if (!sid || !token || !from) {
    console.log("[SMS] SIMULATED — To Visitor:", {
      to: data.phone,
      from,
      body: `Hi ${data.name}! See you Sunday (${data.sunday}). — El Bethel Host Team`,
    });
    return { simulated: true };
  }

  try {
    const twilio = (await import("twilio")).default;
    const client = twilio(sid, token);

    await client.messages.create({
      to: data.phone,
      from,
      body: `Hi ${data.name}! See you Sunday (${data.sunday}). — El Bethel Host Team`,
    });

    return { simulated: false };
  } catch (err) {
    console.warn("[SMS] Twilio error — simulated fallback:", err);
    return { simulated: true };
  }
}
