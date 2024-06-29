import { useState, useEffect } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext"; // Assuming you have a useAuth hook for Appwrite

export function Profile() {
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
      setAvatarUrl(user.avatarUrl || "/placeholder-avatar.jpg");
    }
  }, [user]);

  const handleUpdateProfile = () => {
    // Handle profile update logic with Appwrite SDK
  };

  if (loading) {
    
    return (
      <main className="flex-1 bg-gray-100 dark:bg-gray-800 flex justify-center items-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gray-100 dark:bg-gray-800">
      <div className="container grid grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-950">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage alt={name} src={avatarUrl} />
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
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                id="email"
                type="email"
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
            <Button className="w-full" onClick={handleUpdateProfile}>
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;