// src/auth/entities/user.entity.ts
export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    this.id = partial.id || Date.now().toString();
    this.createdAt = partial.createdAt || new Date();
  }
}