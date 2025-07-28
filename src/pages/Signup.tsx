import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Lock, Mail, User } from 'lucide-react';
import { toast } from 'sonner';
import sphereHero from '@/assets/sphere-hero.jpg';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup
    setTimeout(() => {
      toast.success('Account created successfully! Welcome to SphereOfTech!');
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
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

      {/* Right side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:hidden mb-8">
            <h1 className="text-2xl font-bold font-tomorrow">SphereOfTech</h1>
            <p className="text-muted-foreground">AI-Powered Learning Platform</p>
          </div>

          <Card className="glass-card shadow-ai">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-tomorrow">Create Account</CardTitle>
              <CardDescription>
                Join thousands of learners advancing with AI-powered education
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

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
                      placeholder="Create a strong password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="bg-gradient-glass p-4 rounded-lg border border-primary/20">
                  <div className="flex items-start space-x-3">
                    
                    <div className="text-sm">
                      <p className="font-medium text-foreground mb-1">AI-Powered Features</p>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Personalized learning paths</li>
                        <li>• Smart assessments & feedback</li>
                        <li>• Career roadmap guidance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign In
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

export default Signup;