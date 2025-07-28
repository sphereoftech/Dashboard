import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';
import sphereHero from '@/assets/sphere-hero.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      toast.success('Welcome to SphereOfTech!');
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  const fillDemoCredentials = () => {
    setEmail('alex@sphereoftech.com');
    setPassword('demo123');
    toast.info('Demo credentials filled');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
        <img 
          src={sphereHero} 
          alt="SphereOfTech AI Learning Platform" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center p-8">

        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:hidden mb-8">
            <h1 className="text-2xl font-bold font-tomorrow">SphereOfTech</h1>
            <p className="text-muted-foreground">AI-Powered Learning Platform</p>
          </div>

          <Card className="glass-card shadow-ai">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-tomorrow">Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your learning dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="bg-muted/30 p-3 rounded-lg border border-dashed border-muted-foreground/30">
                  <p className="text-xs text-muted-foreground mb-2">
                    🎯 <strong>Demo Credentials:</strong>
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Email: alex@sphereoftech.com | Password: demo123
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={fillDemoCredentials}
                    className="w-full"
                  >
                    Use Demo Account
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary hover:underline font-medium">
                    Sign Up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;