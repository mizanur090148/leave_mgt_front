interface AppState {
  auth: {
    data: {
      id: string;
      name: string;
      mobile: string;
      userType: string;
      username: string;
      email: string;
      address: string;
      aboutMe: string;
      token: boolean;
      unionId: {
        id: string;
        name: string;
      };
    };
    // Other auth-related properties can be added here
  };
}
