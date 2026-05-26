// supabase-config.js — NasdaqPro
// Carrega Supabase SDK via CDN e expõe client global como window._supabase

const SUPABASE_URL  = 'https://lpwrinaodhuyafyjumcs.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwd3JpbmFvZGh1eWFmeWp1bWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDI2ODcsImV4cCI6MjA4OTg3ODY4N30.30h3LLzdygnj452hnjGyGkBj-TONet7EXrgVsmxyWjg';

(function () {
  function init() {
    if (window.supabase && window.supabase.createClient) {
      window._supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
      console.log('✅ Supabase inicializado');
      document.dispatchEvent(new Event('supabase-ready'));
    } else {
      setTimeout(init, 50);
    }
  }
  init();
})();
