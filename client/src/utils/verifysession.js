const verifysession = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      // Token is not available, handle this case as needed
      return;
    }

    const response = await fetch("http://localhost:3000/api/auth/verifysession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      // Handle non-OK response (e.g., server error)
      console.error(`Server returned ${response.status} ${response.statusText}`);
      return;
    }

    const result = await response.json();

    if (result.success) {
      console.log(result.data.isAdmin);

      if (result.data.isAdmin) {
        window.location.href = "/admin-dashboard";
      } else if (result.data.isWarden) {
        window.location.href = "/warden-dashboard";
      } else {
        window.location.href = "/student-dashboard";
      }
    } else {
      // Server response indicates failure
      console.error("Session verification failed:", result.error);
      localStorage.removeItem("token");
      localStorage.removeItem("student");
    }
  } catch (error) {
    // Handle unexpected errors (e.g., network issues)
    console.error("An unexpected error occurred:", error);
  }
};

export default verifysession;
