const SUPABASE_URL = "https://xoysbrevasfvfqmrjuiy.supabase.co/rest/v1/";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable__lSYAn7L2040FleoZxNydg_ucV1LVVn";

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

  if (!email) return;

  authMessage.textContent = "Sending sign-in link...";

  const { error } = await supabaseClient.auth.signInWithOtp({
    email: email
  });

  if (error) {
    authMessage.textContent = error.message;
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
  checkUser();
});

checkUser();

supabaseClient.auth.onAuthStateChange(() => {
  checkUser();
});
