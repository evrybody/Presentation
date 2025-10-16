// import { useAuthStore } from "@/store/Auth/authStore";
// import { tokenService } from "@/services/token.service";
// import { User } from "@/types/user";

// export function setTestUser() {
//   const testUser: User = {
//     id: "test",
//     currencyCode: "EUR",
//     name: "Test User",
//     dateOfBirth: "11.02.1980",
//     email: "testmail@mail.com",
//     isEmailConfirmed: true,
//   };

//   // ставим фейковые токены в куки
//   tokenService.setTokens("fake-access-token", "fake-refresh-token");

//   // логиним юзера в zustand store
//   useAuthStore.getState().login(testUser);
// }
