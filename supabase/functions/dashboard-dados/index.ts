import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const sheetsApiKey = Deno.env.get("SHEETS_API_KEY");
    const spreadsheetId = Deno.env.get("SHEETS_SPREADSHEET_ID");
    const tabName = Deno.env.get("SHEETS_TAB_NAME") || "atual dashboard NASDAQ";

    if (!sheetsApiKey || !spreadsheetId) {
      return new Response(
        JSON.stringify({ error: "Variáveis da planilha não configuradas na Edge Function." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const range = encodeURIComponent(`${tabName}!A:I`);
    const url =
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${sheetsApiKey}`;

    const response = await fetch(url);
    const json = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: json?.error?.message || "Erro ao ler Google Sheets." }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({ values: json.values || [] }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro interno." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
