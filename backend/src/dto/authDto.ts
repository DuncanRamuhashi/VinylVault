/**
 * DTO (Data Transfer Object) for registering a user.
 */
export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
}

/**
 * DTO for logging in a user.
 */
export interface LoginUserDTO {
  email: string;
  password: string;
}
