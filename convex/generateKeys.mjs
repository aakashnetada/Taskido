import { exportJWK, exportPKCS8, generateKeyPair } from "jose";
import { action } from "./_generated/server";

export default action(async ({}) => {
	const keys = await generateKeyPair("RS256");
	const privateKey = await exportPKCS8(keys.privateKey);
	const publicKey = await exportJWK(keys.publicKey);
	const jwks = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] });
  
	return {
	  privateKey: privateKey.replace(/\n/g, "\\n"),
	  jwks,
	};
});

// const keys = await generateKeyPair("RS256");
// const privateKey = await exportPKCS8(keys.privateKey);
// const publicKey = await exportJWK(keys.publicKey);
// const jwks = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] });

// process.stdout.write(
// 	`CONVEX_AUTH_PRIVATE_KEY="${privateKey.replace(/\n/g, "\\n")}"`,
// );
// process.stdout.write("\n\n");
// process.stdout.write(`JWKS=${jwks}`);
// process.stdout.write("\n");
