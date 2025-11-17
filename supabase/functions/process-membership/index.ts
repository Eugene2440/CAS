import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MembershipRequest {
  fullName: string;
  email: string;
  yearOfStudy: string;
  course: string;
  mpesaNumber: string;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, yearOfStudy, course, mpesaNumber }: MembershipRequest = await req.json();

    console.log("Processing membership for:", fullName, email);

    // Get M-Pesa access token
    const consumerKey = Deno.env.get("MPESA_CONSUMER_KEY");
    const consumerSecret = Deno.env.get("MPESA_CONSUMER_SECRET");
    const shortcode = Deno.env.get("MPESA_SHORTCODE") || "561999";
    const passkey = Deno.env.get("MPESA_PASSKEY");

    if (!consumerKey || !consumerSecret || !passkey) {
      throw new Error("M-Pesa credentials not configured");
    }

    const auth = btoa(`${consumerKey}:${consumerSecret}`);
    
    const tokenResponse = await fetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const { access_token } = await tokenResponse.json();
    console.log("Got access token");

    // Generate timestamp
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const password = btoa(`${shortcode}${passkey}${timestamp}`);

    // Initiate STK Push
    const stkPushResponse = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: "200",
          PartyA: mpesaNumber,
          PartyB: shortcode,
          PhoneNumber: mpesaNumber,
          CallBackURL: `${Deno.env.get("SUPABASE_URL")}/functions/v1/mpesa-callback`,
          AccountReference: "ORDJ0172",
          TransactionDesc: "CSA-TUK Membership Fee",
        }),
      }
    );

    const stkData = await stkPushResponse.json();
    console.log("STK Push response:", stkData);

    if (stkData.ResponseCode !== "0") {
      throw new Error(stkData.errorMessage || "Failed to initiate payment");
    }

    // Record in Google Sheets
    const sheetsWebhook = Deno.env.get("GOOGLE_SHEETS_WEBHOOK_URL");
    if (sheetsWebhook) {
      await fetch(sheetsWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          yearOfStudy,
          course,
          mpesaNumber,
          timestamp: new Date().toISOString(),
          checkoutRequestId: stkData.CheckoutRequestID,
        }),
      });
      console.log("Recorded in Google Sheets");
    }

    return new Response(
      JSON.stringify({
        success: true,
        checkoutRequestId: stkData.CheckoutRequestID,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing membership:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
