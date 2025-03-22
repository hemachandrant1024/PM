

// DataB.js – Collect interested users' data from ExploreDog.js

// Load interested users from localStorage
let interestedUsers = JSON.parse(localStorage.getItem("interested")) || [];

// Function to get interest data
export function getInterestedUsers() {
    return interestedUsers;
}

// Optional: Log to verify data is retrieved
console.log("Loaded Interested Users:", interestedUsers);

