// User database functions
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const saveUserToDB = async (user) => {
  if (user) {
    const userData = {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.primaryEmailAddress.emailAddress,
    };
    try {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      console.log("User saved to DB", result);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  }
};

export const updateUserInDB = async (user) => {
  if (user) {
    const userData = {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.primaryEmailAddress.emailAddress,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("User updated in DB:", result);
      } else {
        console.error("Failed to update user:", result.message);
      }
    } catch (error) {
      console.error("Error updating user in DB:", error);
    }
  }
};
