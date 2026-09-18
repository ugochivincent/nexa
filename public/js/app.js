const SUPABASE_URL = "PASTE_YOUR_PROJECT_URL_HERE";
const SUPABASE_PUBLISHABLE_KEY = "PASTE_YOUR_PUBLISHABLE_KEY_HERE";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const authForm = document.getElementById("authForm");
const emailInput = document.getElementById("email");
const authMessage = document.getElementById("authMessage");

const authSection = document.getElementById("authSection");
const profileSection = document.getElementById("profileSection");
const userEmail = document.getElementById("userEmail");
const logoutButton = document.getElementById("logoutButton");

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    authMessage.textContent = "Please enter your email.";
    return;
  }

  authMessage.textContent = "Sending sign-in link...";

  const { error } = await supabaseClient.auth.signInWithOtp({
    email: email
  });

  if (error) {
    console.error(error);
    authMessage.textContent = "Error: " + error.message;
    return;
  }

  authMessage.textContent =
    "Check your email for the Nexa sign-in link.";
});

async function checkUser() {
  const {
    data: { session }
  } = await supabaseClient.auth.getSession();

  if (session) {
    authSection.style.display = "none";
    profileSection.style.display = "block";
    userEmail.textContent = session.user.email;
  } else {
    authSection.style.display = "block";
    profileSection.style.display = "none";
  }
}

logoutButton.addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  await checkUser();
});

checkUser();

supabaseClient.auth.onAuthStateChange(() => {
  checkUser();
});
