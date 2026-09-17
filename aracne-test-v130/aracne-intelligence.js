(() => {
  "use strict";

  document.write('<script src="../aracne-intelligence.js?v=1.1.8"><\/script>');

  window.addEventListener("load", async () => {
    const loadScript=src=>new Promise((resolve,reject)=>{
      const s=document.createElement("script");
      s.src=src;
      s.async=false;
      s.onload=resolve;
      s.onerror=reject;
      document.head.appendChild(s);
    });

    try{
      await loadScript("../aracne-city-first-v122.js?v=1.3.0");
      await loadScript("../aracne-intent-v130.js?v=1.3.0");
      await loadScript("../aracne-territory-v130.js?v=1.3.0");

      const NativeMutationObserver=window.MutationObserver;
      window.MutationObserver=class SafeTestMutationObserver{
        constructor(callback){this.callback=callback;}
        observe(){}
        disconnect(){}
        takeRecords(){return [];}
      };
      try{
        await loadScript("../aracne-understanding-v121.js?v=1.3.0");
      }finally{
        window.MutationObserver=NativeMutationObserver;
      }

      await loadScript("../aracne-session-v130.js?v=1.3.0");
      await loadScript("../aracne-voice-v126.js?v=1.3.0");

      const badge=document.createElement("div");
      badge.textContent="ARACNE v1.3.0 TEST";
      badge.style.cssText="position:fixed;z-index:2147483647;top:max(6px,env(safe-area-inset-top));right:7px;padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.92);box-shadow:0 2px 12px rgba(0,0,0,.12);font:600 11px/1.1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;pointer-events:none;color:#5a2d67";
      document.body.appendChild(badge);
      console.info("[Aracne native test] v1.3.0 ready");
    }catch(error){
      console.error("[Aracne native test] v1.3.0 failed",error);
    }
  },{once:true});
})();
