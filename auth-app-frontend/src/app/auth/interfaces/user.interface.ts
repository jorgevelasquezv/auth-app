export interface User {
  email:     string;
  name:      string;
  isActive:  boolean;
  roles:     string[];
  createdAt: Date;
  updatedAt: Date;
  id:        string;
}
