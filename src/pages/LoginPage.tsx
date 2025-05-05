
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Moon } from "lucide-react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if already logged in
  if (isAuthenticated && user) {
    switch (user.role) {
      case "visitor":
        return <Navigate to="/visitor-dashboard" />;
      case "receptionist":
        return <Navigate to="/receptionist-dashboard" />;
      case "employee":
        return <Navigate to="/employee-dashboard" />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 rounded-full"
        onClick={toggleTheme}
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>
      
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-green-primary">Green</span> Meetings
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your account
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your-email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-green-primary hover:bg-green-dark" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-4 text-center text-sm">
          <p className="text-muted-foreground">
            Demo accounts:
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            visitor@example.com / password<br />
            receptionist@example.com / password<br />
            employee@example.com / password
          </p>
        </div>
      </div>
    </div>
  );
};
