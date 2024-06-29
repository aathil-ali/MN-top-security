import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext"; // Assuming you have a useAuth hook for Appwrite

const Profile = () => {
  const { user, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
      setAvatarUrl(user.avatar || "/placeholder-avatar.jpg");
    }
  }, [user]);

  const handleUpdateProfile = () => {
    // Handle profile update logic with Appwrite SDK
  };

  if (loading) {
    return (
      <section className="w-full flex justify-center items-center h-screen">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="container grid grid-cols-1 gap-8 py-8">
        <div className="col-span-1 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage alt={`@${name}`} src={avatarUrl} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                value={name}
                id="name"
                disabled
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                value={email}
                disabled
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                className="min-h-[100px]"
                value={bio}
                id="bio"
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <Button onClick={handleUpdateProfile}>Update</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;