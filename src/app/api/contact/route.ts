import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("=== INCOMING CONTACT FORM DATA ===");
    console.log(JSON.stringify(data, null, 2));

    const scriptURL = "https://script.google.com/macros/s/AKfycbyOEGl-jlR9_hefTK3ZIXXTNa1KLGQ2hKBhSc98zTcU49EYyV3fNSevVOUgxYVQurSTNA/exec";
    
    // Note: Google Apps Script Web Apps often redirect when receiving POSTs.
    // Fetch follows redirects by default, which can sometimes drop the POST body or change method.
    console.log("-> Forwarding to Google Apps Script...");
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(`<- Google Apps Script responded with status: ${response.status}`);
    
    const responseText = await response.text();
    console.log("<- Google Apps Script response text:", responseText);

    if (!response.ok) {
      console.error("API Route Error: Google Apps Script returned a non-OK status.");
      return NextResponse.json({ success: false, message: `Google API Error: ${response.status} ${responseText}` }, { status: response.status });
    }

    // Try parsing the Google response as JSON if possible
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
      if (parsedResponse.result === "error") {
        console.error("API Route Error: Google Script returned a logical error:", parsedResponse.error);
        return NextResponse.json({ success: false, message: `Google Script Error: ${parsedResponse.error}` }, { status: 400 });
      }
    } catch (e) {
      console.log("Google response was not JSON or failed to parse. Proceeding as success anyway.");
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("=== API ROUTE CRITICAL ERROR ===");
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to send message due to a server error." },
      { status: 500 }
    );
  }
}
