async function testApi() {
  const baseUrl = "http://localhost:5173/api";

  console.log("1. Testing GET /api/db...");
  const dbRes = await fetch(`${baseUrl}/db`);
  const db = await dbRes.json();
  console.log("DB Loaded with tournaments:", db.tournaments.length);

  console.log("2. Testing POST /api/tournaments (Create Tournament 11)...");
  const createRes = await fetch(`${baseUrl}/tournaments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      number: "11",
      name: "Tournament 11",
      date: "20 October 2026",
      venue: "Racquet Club Ahmedabad",
      category: "Intermediate Doubles",
      status: "Upcoming"
    })
  });
  const createData = await createRes.json();
  console.log("Created Tournament 11:", createData);

  console.log("3. Testing PUT /api/tournaments/tourney-4 (Change venue to 'New Venue')...");
  const updateRes = await fetch(`${baseUrl}/tournaments/tourney-4`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      venue: "New Venue"
    })
  });
  const updateData = await updateRes.json();
  console.log("Updated Tournament 4:", updateData.tournament?.venue);

  console.log("4. Testing DELETE /api/tournaments/tourney-10...");
  const delRes = await fetch(`${baseUrl}/tournaments/tourney-10`, {
    method: "DELETE"
  });
  const delData = await delRes.json();
  console.log("Deleted Tournament 10:", delData);

  console.log("5. Verifying in-disk database.json...");
  const verifyRes = await fetch(`${baseUrl}/db`);
  const verifyDb = await verifyRes.json();
  const t11 = verifyDb.tournaments.find(t => t.name === "Tournament 11");
  const t4 = verifyDb.tournaments.find(t => t.id === "tourney-4");
  const t10 = verifyDb.tournaments.find(t => t.id === "tourney-10");

  console.log("Verification results:");
  console.log("- Tournament 11 exists:", !!t11);
  console.log("- Tournament 4 venue is 'New Venue':", t4?.venue === "New Venue", `(actual: ${t4?.venue})`);
  console.log("- Tournament 10 is deleted:", !t10);
}

testApi().catch(console.error);
