import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const callbackData = await req.json();
    
    console.log("M-Pesa callback received:", JSON.stringify(callbackData, null, 2));

    // Log the callback for debugging
    // In production, you might want to store this in a database
    
    return new Response(
      JSON.stringify({ ResultCode: 0, ResultDesc: "Success" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing callback:", error);
    return new Response(
      JSON.stringify({ ResultCode: 1, ResultDesc: "Failed" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
