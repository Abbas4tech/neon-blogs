import "dotenv/config";

async function triggerVercelDeploy() {
  const hook = process.env.VERCEL_DEPLOY_HOOK;
  if (!hook) {
    console.error("❌ VERCEL_DEPLOY_HOOK not set. Skipping deploy trigger.");
    process.exitCode = 1;
    return;
  }

  try {
    const res = await fetch(hook, { method: "POST" });
    if (!res.ok) {
      console.error(
        `❌ Deploy hook returned status ${res.status} ${res.statusText}`
      );
      const text = await res.text().catch(() => "");
      console.error("Response body:", text);
      process.exitCode = 1;
      return;
    }
    console.log("✅ Vercel deploy hook triggered successfully.");
  } catch (err) {
    console.error("⚠️ Failed to trigger Vercel deploy hook:", err);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  triggerVercelDeploy();
}

export { triggerVercelDeploy };
