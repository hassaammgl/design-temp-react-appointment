
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type UserRole = "cto" | "ceo" | "cfo" | "gm" | "receptionist";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers = [
  {
    id: "1",
    email: "cto@example.com",
    password: "password",
    name: "John CTO",
    role: "cto" as UserRole,
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    email: "ceo@example.com",
    password: "password",
    name: "Jane CEO",
    role: "ceo" as UserRole,
    avatar: "/placeholder.svg",
  },
  {
    id: "3",
    email: "cfo@example.com",
    password: "password",
    name: "Alex CFO",
    role: "cfo" as UserRole,
    avatar: "/placeholder.svg",
  },
  {
    id: "4",
    email: "gm@example.com",
    password: "password",
    name: "Sam GM",
    role: "gm" as UserRole,
    avatar: "/placeholder.svg",
  },
  {
    id: "5",
    email: "receptionist@example.com",
    password: "password",
    name: "Emma Receptionist",
    role: "receptionist" as UserRole,
    avatar: "/placeholder.svg",
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      toast.success(`Welcome back, ${foundUser.name}!`);
      
      // Redirect based on role
      switch (foundUser.role) {
        case "cto":
          navigate("/cto-dashboard");
          break;
        case "ceo":
          navigate("/ceo-dashboard");
          break;
        case "cfo":
          navigate("/cfo-dashboard");
          break;
        case "gm":
          navigate("/gm-dashboard");
          break;
        case "receptionist":
          navigate("/receptionist-dashboard");
          break;
        default:
          navigate("/");
      }
    } else {
      toast.error("Invalid email or password");
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("You have been logged out");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
